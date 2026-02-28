const supabase = require('../services/supabaseClient');
const crypto = require('crypto');

class CertificateController {
    /**
     * Issues a certificate for a user if they have completed a course
     * For this initial version, we'll allow issuing if they are enrolled.
     */
    static async issueCertificate(req, res) {
        const { courseId } = req.body;
        const userId = req.user.id;

        if (!courseId) {
            return res.status(400).json({ error: 'Course ID is required' });
        }

        // 1. Check if user is enrolled
        const { data: enrollment, error: enrollError } = await supabase
            .from('enrollments')
            .select('*')
            .eq('user_id', userId)
            .eq('course_id', courseId)
            .single();

        if (enrollError || !enrollment) {
            return res.status(403).json({ error: 'You must be enrolled in this course to get a certificate' });
        }

        // 2. Check if certificate already exists
        const { data: existingCert } = await supabase
            .from('certificates')
            .select('*')
            .eq('user_id', userId)
            .eq('course_id', courseId)
            .single();

        if (existingCert) {
            return res.json({ message: 'Certificate already issued', certificate: existingCert });
        }

        // 3. Generate verification code
        const verificationCode = crypto.randomBytes(6).toString('hex').toUpperCase();

        // 4. Create Certificate
        const { data: certificate, error: certError } = await supabase
            .from('certificates')
            .insert([{
                user_id: userId,
                course_id: courseId,
                verification_code: verificationCode,
                certificate_url: `https://nurdine-learning.com/verify/${verificationCode}` // Placeholder URL
            }])
            .select()
            .single();

        if (certError) {
            return res.status(500).json({ error: 'Error issuing certificate: ' + certError.message });
        }

        return res.status(201).json({
            message: 'Certificate issued successfully',
            certificate
        });
    }

    /**
     * Get all certificates for the logged-in user
     */
    static async getMyCertificates(req, res) {
        const userId = req.user.id;

        const { data, error } = await supabase
            .from('certificates')
            .select('*, courses(title)')
            .eq('user_id', userId);

        if (error) return res.status(500).json({ error: error.message });
        return res.json(data);
    }

    /**
     * Verify a certificate by code
     */
    static async verifyCertificate(req, res) {
        const { code } = req.params;

        const { data, error } = await supabase
            .from('certificates')
            .select('*, users(name), courses(title)')
            .eq('verification_code', code)
            .single();

        if (error || !data) {
            return res.status(404).json({ error: 'Certificate not found or invalid code' });
        }

        return res.json({
            isValid: true,
            issuedTo: data.users.name,
            course: data.courses.title,
            issueDate: data.issue_date
        });
    }
}

module.exports = CertificateController;
