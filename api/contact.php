<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    json_response(false, 'Method not allowed', 405);
}

load_env(dirname(__DIR__) . DIRECTORY_SEPARATOR . '.env');

$apiKey = env_value('RESEND_API_KEY');
$fromEmail = env_value('RESEND_FROM_EMAIL', 'CyberNurdin <hello@cybernurdin.com>');
$toEmail = env_value('CONTACT_TO_EMAIL', 'hello@cybernurdin.com');

if ($apiKey === '' || starts_with($apiKey, 'replace_')) {
    json_response(false, 'Resend API key is not configured.', 500);
}

$payload = json_decode(file_get_contents('php://input') ?: '', true);
if (!is_array($payload)) {
    json_response(false, 'Invalid request body.', 400);
}

$name = trim((string)($payload['name'] ?? ''));
$email = trim((string)($payload['email'] ?? ''));
$message = trim((string)($payload['message'] ?? ''));
$company = trim((string)($payload['company'] ?? ''));
$sourceUrl = trim((string)($payload['source_url'] ?? ($_SERVER['HTTP_REFERER'] ?? '')));
$userAgent = trim((string)($payload['user_agent'] ?? ($_SERVER['HTTP_USER_AGENT'] ?? '')));

if ($company !== '') {
    json_response(true, 'Message sent.');
}

if (strlen($name) < 2 || strlen($name) > 120) {
    json_response(false, 'Please enter a valid name.', 422);
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    json_response(false, 'Please enter a valid email address.', 422);
}

if (strlen($message) < 5 || strlen($message) > 5000) {
    json_response(false, 'Please enter a message between 5 and 5000 characters.', 422);
}

$safeName = escape_html($name);
$safeEmail = escape_html($email);
$safeMessage = nl2br(escape_html($message));
$safeSourceUrl = escape_html($sourceUrl);
$safeUserAgent = escape_html($userAgent);

$subject = "Portfolio inquiry from {$name}";
$html = <<<HTML
<h2>New portfolio message</h2>
<p><strong>Name:</strong> {$safeName}</p>
<p><strong>Email:</strong> {$safeEmail}</p>
<p><strong>Message:</strong></p>
<p>{$safeMessage}</p>
<hr>
<p><strong>Source:</strong> {$safeSourceUrl}</p>
<p><strong>User agent:</strong> {$safeUserAgent}</p>
HTML;

$text = "New portfolio message\n\n"
    . "Name: {$name}\n"
    . "Email: {$email}\n\n"
    . "Message:\n{$message}\n\n"
    . "Source: {$sourceUrl}\n"
    . "User agent: {$userAgent}\n";

$resendPayload = [
    'from' => $fromEmail,
    'to' => [$toEmail],
    'reply_to' => [$email],
    'subject' => $subject,
    'html' => $html,
    'text' => $text,
];

$ch = curl_init('https://api.resend.com/emails');
curl_setopt_array($ch, [
    CURLOPT_POST => true,
    CURLOPT_HTTPHEADER => [
        'Authorization: Bearer ' . $apiKey,
        'Content-Type: application/json',
    ],
    CURLOPT_POSTFIELDS => json_encode($resendPayload, JSON_UNESCAPED_SLASHES),
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_TIMEOUT => 20,
]);

$resendResponse = curl_exec($ch);
$curlError = curl_error($ch);
$statusCode = (int)curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($resendResponse === false) {
    json_response(false, 'Unable to contact Resend: ' . $curlError, 502);
}

$decodedResponse = json_decode((string)$resendResponse, true);
if ($statusCode < 200 || $statusCode >= 300) {
    $resendMessage = is_array($decodedResponse)
        ? (string)($decodedResponse['message'] ?? $decodedResponse['error'] ?? 'Resend rejected the message.')
        : 'Resend rejected the message.';
    json_response(false, $resendMessage, 502);
}

json_response(true, 'Message sent.', 200, [
    'id' => is_array($decodedResponse) ? ($decodedResponse['id'] ?? null) : null,
]);

function load_env(string $path): void
{
    if (!is_file($path)) {
        return;
    }

    $lines = file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    if ($lines === false) {
        return;
    }

    foreach ($lines as $line) {
        $line = trim($line);
        if ($line === '' || starts_with($line, '#') || !contains($line, '=')) {
            continue;
        }

        [$key, $value] = explode('=', $line, 2);
        $key = trim($key);
        $value = trim($value);

        if ($key === '') {
            continue;
        }

        if (
            (starts_with($value, '"') && ends_with($value, '"')) ||
            (starts_with($value, "'") && ends_with($value, "'"))
        ) {
            $value = substr($value, 1, -1);
        }

        $_ENV[$key] = $value;
        putenv($key . '=' . $value);
    }
}

function env_value(string $key, string $default = ''): string
{
    $value = $_ENV[$key] ?? getenv($key);
    return is_string($value) ? $value : $default;
}

function escape_html(string $value): string
{
    return htmlspecialchars($value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

function starts_with(string $value, string $prefix): bool
{
    return substr($value, 0, strlen($prefix)) === $prefix;
}

function ends_with(string $value, string $suffix): bool
{
    if ($suffix === '') {
        return true;
    }

    return substr($value, -strlen($suffix)) === $suffix;
}

function contains(string $value, string $needle): bool
{
    return $needle === '' || strpos($value, $needle) !== false;
}

function json_response(bool $ok, string $message, int $status = 200, array $extra = []): void
{
    http_response_code($status);
    echo json_encode(array_merge([
        'ok' => $ok,
        'message' => $message,
    ], $extra), JSON_UNESCAPED_SLASHES);
    exit;
}
