const supabase = require('./src/services/supabaseClient');

async function checkAdmin() {
    const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', 'admin@nurdine.academy')
        .single();

    if (error) {
        console.error('Admin not found:', error.message);
    } else {
        console.log('Admin found:', data.email, 'Role:', data.role);
    }
    process.exit();
}

checkAdmin();
