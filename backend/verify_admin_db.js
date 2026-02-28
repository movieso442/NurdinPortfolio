const supabase = require('./src/services/supabaseClient');

async function checkUsers() {
    console.log('Fetching users from database...');
    const { data: users, error } = await supabase
        .from('users')
        .select('email, role, password_hash, application_status')
        .eq('email', 'admin@nurdine.academy');

    if (error) {
        console.error('Error fetching users:', error.message);
    } else {
        console.log('Admin users found:', users.length);
        if (users.length > 0) {
            console.log('Admin record:', JSON.stringify(users[0], null, 2));
        } else {
            console.log('No user found with email "admin@nurdine.academy".');
            // Check all users
            const { data: allUsers } = await supabase.from('users').select('email, role');
            console.log('Total users in table:', allUsers ? allUsers.length : 0);
            if (allUsers && allUsers.length > 0) {
                console.log('Emails in DB:', allUsers.map(u => u.email).join(', '));
            }
        }
    }
    process.exit();
}

checkUsers();
