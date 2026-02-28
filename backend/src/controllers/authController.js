const supabase = require('../services/supabaseClient');
const CouponService = require('../services/couponService');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const SECRET = process.env.JWT_SECRET || 'fallback_secret';

class AuthController {
    /**
     * Stage 1: Submit Application
     * Creates a PENDING user and stores application details.
     */
    static async submitApplication(req, res) {
        const { personalInfo, academicInfo, motivationInfo } = req.body;
        const { firstName, lastName, username, email, password, phone, age, country } = personalInfo;

        if (!email || !password || !username) {
            return res.status(400).json({ error: 'Email, username, and password are required' });
        }

        try {
            // 1. Hash Password
            const salt = await bcrypt.genSalt(10);
            const passwordHash = await bcrypt.hash(password, salt);

            // 2. Create User in PENDING status
            const { data: newUser, error: userError } = await supabase
                .from('users')
                .insert([{
                    name: `${firstName} ${lastName}`,
                    first_name: firstName,
                    last_name: lastName,
                    username,
                    email,
                    password_hash: passwordHash,
                    phone,
                    age,
                    country,
                    application_status: 'PENDING',
                    role: 'student' // Default role
                }])
                .select()
                .single();

            if (userError) throw userError;

            // 3. Create Application Details
            const { error: detailError } = await supabase
                .from('application_details')
                .insert([{
                    user_id: newUser.id,
                    highest_education: academicInfo.highestEducation,
                    field_of_study: academicInfo.fieldOfStudy,
                    occupation: academicInfo.occupation,
                    experience_level: academicInfo.experienceLevel,
                    github_link: academicInfo.githubLink,
                    device_type: academicInfo.deviceType,
                    internet_reliability: academicInfo.internetReliability,
                    motivation: motivationInfo.motivation,
                    goals: motivationInfo.goals,
                    commitment_hours: parseInt(motivationInfo.commitmentHours),
                    previous_training: motivationInfo.previousTraining,
                    referral_source: motivationInfo.referralSource
                }]);

            if (detailError) throw detailError;

            return res.status(201).json({
                message: 'Application submitted successfully. Please wait for admin approval.',
                status: 'PENDING'
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    /**
     * Stage 2: Login with Coupon Check
     */
    static async login(req, res) {
        const { loginId, password, couponCode } = req.body; // loginId can be email or username

        if (!loginId || !password || !couponCode) {
            return res.status(400).json({ error: 'Email/Username, password, and coupon code are required' });
        }

        try {
            // 1. Fetch User (by email or username)
            const { data: user, error } = await supabase
                .from('users')
                .select('*')
                .or(`email.eq.${loginId},username.eq.${loginId}`)
                .single();

            if (error || !user) {
                return res.status(401).json({ error: 'Invalid credentials' });
            }

            // 2. Check Application Status
            if (user.application_status !== 'APPROVED' && user.role !== 'admin') {
                return res.status(403).json({ error: 'Your application is not yet approved' });
            }

            // 3. Verify Password
            const isMatch = await bcrypt.compare(password, user.password_hash);
            if (!isMatch) {
                return res.status(401).json({ error: 'Invalid credentials' });
            }

            // 4. Validate Coupon
            const { data: coupon, error: couponError } = await supabase
                .from('coupons')
                .select('*')
                .eq('code', couponCode)
                .eq('user_id', user.id)
                .eq('status', 'ACTIVE')
                .single();

            if (couponError || !coupon) {
                return res.status(401).json({ error: 'Invalid or inactive coupon code assigned to this account' });
            }

            // 5. Generate Token
            const token = jwt.sign({ id: user.id, role: user.role, email: user.email }, SECRET, { expiresIn: '24h' });

            return res.json({
                token,
                user: {
                    id: user.id,
                    name: user.name,
                    role: user.role,
                    email: user.email,
                    username: user.username
                }
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    /**
     * Get current user profile
     */
    static async getMe(req, res) {
        const userId = req.user.id;
        const { data: user, error } = await supabase
            .from('users')
            .select('id, name, email, role, application_status, created_at')
            .eq('id', userId)
            .single();

        if (error || !user) return res.status(404).json({ error: 'User not found' });
        return res.json(user);
    }

    /**
     * Get users by role (for discovery)
     */
    static async getUsers(req, res) {
        const { role } = req.query;
        let query = supabase.from('users').select('id, name, email, role');

        if (role) {
            query = query.eq('role', role);
        }

        const { data, error } = await query;
        if (error) return res.status(500).json({ error: error.message });
        return res.json(data);
    }
}

module.exports = AuthController;
