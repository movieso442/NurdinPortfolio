const supabase = require('../services/supabaseClient');
const crypto = require('crypto');

class ApplicationController {
    /**
     * List all applications for Admin
     */
    static async getAllApplications(req, res) {
        try {
            const { data, error } = await supabase
                .from('users')
                .select('*, application_details(*)')
                .neq('role', 'admin')
                .order('created_at', { ascending: false });

            if (error) throw error;
            res.json(data);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    /**
     * Approve an application and generate a coupon
     */
    static async approveApplication(req, res) {
        const { id } = req.params;
        const { expiryDays = 30 } = req.body;

        try {
            // 1. Generate unique 12-char coupon
            const couponCode = crypto.randomBytes(6).toString('hex').toUpperCase(); // 12 chars
            const expiresAt = new Date();
            expiresAt.setDate(expiresAt.getDate() + expiryDays);

            // 2. Update user status
            const { error: userError } = await supabase
                .from('users')
                .update({ application_status: 'APPROVED' })
                .eq('id', id);

            if (userError) throw userError;

            // 3. Create Coupon linked to user
            const { data: coupon, error: couponError } = await supabase
                .from('coupons')
                .insert({
                    user_id: id,
                    code: couponCode,
                    type: 'course', // Default
                    status: 'ACTIVE',
                    expires_at: expiresAt.toISOString()
                })
                .select()
                .single();

            if (couponError) throw couponError;

            // 4. Send Email (Mocked)
            console.log(`Email sent to user ${id} with coupon ${couponCode}`);

            res.json({
                message: 'Application approved and coupon issued.',
                couponCode,
                expiresAt
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    /**
     * Reject an application
     */
    static async rejectApplication(req, res) {
        const { id } = req.params;
        const { reason } = req.body;

        try {
            const { error } = await supabase
                .from('users')
                .update({ application_status: 'REJECTED' })
                .eq('id', id);

            if (error) throw error;

            // Optionally store reason in application_details.admin_notes
            await supabase
                .from('application_details')
                .update({ admin_notes: reason })
                .eq('user_id', id);

            res.json({ message: 'Application rejected.' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = ApplicationController;
