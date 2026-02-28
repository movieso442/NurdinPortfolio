const supabase = require('./src/services/supabaseClient');

async function listTables() {
    console.log('Listing all tables in "public" schema...');

    // We can't directly list tables via RPC easily without a custom function,
    // but we can try to join many tables or use a known-to-exist Supabase feature.
    // Alternatively, let's just try to select from 'Users' (uppercase) and see.

    const { error: upperError } = await supabase.from('Users').select('*').limit(0);
    console.log('Select from "Users" (Upper Case):', upperError ? 'FAILED: ' + upperError.message : 'SUCCESS');

    const { error: lowerError } = await supabase.from('users').select('*').limit(0);
    console.log('Select from "users" (Lower Case):', lowerError ? 'FAILED: ' + lowerError.message : 'SUCCESS');

    process.exit();
}

listTables();
