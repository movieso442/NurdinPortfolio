# Certificates

Drop certificate images/PDFs here when they're earned, then update the matching entry in
`assets/js/data.js` (`certificatesData`):

```js
{
    id: 1,
    title: "Google Cybersecurity Professional Certificate",
    issuer: "Google (Coursera)",
    year: "2026",                                  // actual year earned
    category: "cybersecurity",
    status: "completed",                           // "completed" | "in-progress" | "planned"
    image: "assets/certificates/google-cyber.jpg",  // path to the uploaded file
    credentialUrl: "https://www.credly.com/..."    // real verification link, or null
}
```

Cards with `status: "planned"` and no `credentialUrl` automatically show a
"Certificate will be uploaded soon" placeholder - no fake links needed.
