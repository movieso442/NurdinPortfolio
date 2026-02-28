const supabase = require('./src/services/supabaseClient');
const bcrypt = require('bcryptjs');

async function createAdmin() {
    const email = 'admin@nurdine.academy';
    const password = 'AdminPassword123!'; // User should change this
    const username = 'admin';

    console.log('Creating admin user...');

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const { data, error } = await supabase
        .from('users')
        .insert([{
            name: 'System Admin',
            first_name: 'System',
            last_name: 'Admin',
            username,
            email,
            password_hash: passwordHash,
            role: 'admin',
            application_status: 'APPROVED'
        }])
        .select()
        .single();

    if (error) {
        console.error('Error creating admin:', error.message);
    } else {
        console.log('Admin created successfully!');
        console.log('Email:', email);
        console.log('Password:', password);
        console.log('Role: admin');
    }
    process.exit();
}

createAdmin();
