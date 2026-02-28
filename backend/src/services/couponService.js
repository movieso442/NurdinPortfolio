const supabase = require('./supabaseClient');

class CouponService {
    /**
     * Validates a coupon code against a specific user
     * @param {string} code - The coupon code
     * @param {string} userId - The user ID it should belong to
     * @returns {Promise<object|null>}
     */
    static async validateUserCoupon(code, userId) {
        const { data, error } = await supabase
            .from('coupons')
            .select('*')
            .eq('code', code)
            .eq('user_id', userId)
            .eq('status', 'ACTIVE')
            .single();

        if (error || !data) return null;

        // Check expiration
        if (data.expires_at && new Date(data.expires_at) < new Date()) {
            await this.updateStatus(data.id, 'EXPIRED');
            return null;
        }

        return data;
    }

    /**
     * Updates coupon status (ACTIVE, USED, EXPIRED)
     */
    static async updateStatus(couponId, status) {
        const { error } = await supabase
            .from('coupons')
            .update({ status })
            .eq('id', couponId);

        return !error;
    }
}

module.exports = CouponService;
