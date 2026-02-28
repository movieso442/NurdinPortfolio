const supabase = require('./src/services/supabaseClient');
const bcrypt = require('bcryptjs');

async function test() {
    console.log("Checking user...");
    const { data: user, error: userError } = await supabase
        .from('users')
        .select('*')
        .eq('email', 'admin@nurdine.academy')
        .single();

    if (userError || !user) {
        console.log("User not found in DB! Error:", userError);
    } else {
        console.log("User found:", user.email, "Role:", user.role);

        console.log("Checking password...");
        const isMatch = await bcrypt.compare('AdminPassword123!', user.password_hash);
        console.log("Password match:", isMatch);

        console.log("Checking coupon...");
        const { data: coupon, error: couponError } = await supabase
            .from('coupons')
            .select('*')
            .eq('code', 'ADMIN-ACCESS-2026')
            .eq('user_id', user.id)
            .single();

        if (couponError || !coupon) {
            console.log("Coupon not found or error:", couponError);
        } else {
            console.log("Coupon found:", coupon.code, "Status:", coupon.status);
        }
    }
    process.exit();
}

test();
