const supabase = require('./src/services/supabaseClient');

async function verifyAll() {
    const cols = 'id,name,email,password_hash,role,institution_id,created_at,first_name,last_name,username,phone,age,country,application_status';
    const colArray = cols.split(',');

    console.log('Verifying columns individually...');

    for (const col of colArray) {
        const { error } = await supabase.from('users').select(col).limit(0);
        if (error) {
            console.log(`[MISSING] ${col}: ${error.message}`);
        } else {
            console.log(`[OK]      ${col}`);
        }
    }
    process.exit();
}

verifyAll();
