const supabase = require('./src/services/supabaseClient');

async function listAllColumns() {
    console.log('Attempting to list all columns of "users" table...');

    // Attempting a select on a non-existent column often returns the valid ones in some environments,
    // but better to just try selecting the whole row and looking at keys of an empty result if possible.
    // Since select('*') works, let's see if we can get ANY row.

    const { data, error } = await supabase.from('users').select('*').limit(5);
    if (error) {
        console.error('Error:', error.message);
    } else {
        console.log('Sample data keys:', data.length > 0 ? Object.keys(data[0]) : 'No data found');

        // If no data, we can try to find what columns ARE missing by trying to select them.
        // We know id, name, email work.
        // Let's check password_hash specifically again.
        const { error: pError } = await supabase.from('users').select('password_hash').limit(1);
        if (pError) console.log('Confirming MISSING password_hash:', pError.message);

        const { error: uError } = await supabase.from('users').select('username').limit(1);
        if (!uError) console.log('Confirming EXISTS username');
    }
    process.exit();
}

listAllColumns();
