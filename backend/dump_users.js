const supabase = require('./src/services/supabaseClient');

async function dumpUsers() {
    console.log('Fetching all users...');
    const { data, error } = await supabase.from('users').select('*');
    if (error) {
        console.error('Error:', error.message);
    } else {
        console.log('Users count:', data.length);
        if (data.length > 0) {
            console.log('First user record keys:', Object.keys(data[0]));
            console.log('First user data:', JSON.stringify(data[0], null, 2));
        } else {
            console.log('Table is empty.');
        }
    }
    process.exit();
}

dumpUsers();
