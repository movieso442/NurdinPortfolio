const supabase = require('./src/services/supabaseClient');

async function introspect() {
    const { data: users, error } = await supabase
        .from('users')
        .select('*')
        .limit(1);

    if (error) {
        console.error('Error fetching users:', error.message);
    } else if (users.length > 0) {
        console.log('Columns found:', Object.keys(users[0]));
    } else {
        console.log('Users table is empty.');
    }
    process.exit();
}

introspect();
