const supabase = require('./src/services/supabaseClient');

async function checkActualSchema() {
    console.log('Introspecting "users" table schema...');

    // We try to fetch 1 row to see what columns come back. 
    // If the table is empty, we'll try a different approach.
    const { data, error } = await supabase
        .from('users')
        .select('*')
        .limit(1);

    if (error) {
        console.error('Error selecting from users:', error.message);
        console.error('Code:', error.code);
    } else {
        if (data.length > 0) {
            console.log('Columns found in first row:', Object.keys(data[0]));
        } else {
            console.log('Table is empty. Attempting to get column names via select()...');
            // Some clients return column info in the metadata, but let's try a different trick.
            // We'll try to insert a row with a bogus column to see if the error lists valid ones,
            // or better yet, try to select a known-to-exist column and see if it fails.

            const { data: cols, error: colError } = await supabase
                .from('users')
                .select('id, name, email, role')
                .limit(0);

            if (colError) {
                console.log('Select failed. One or more of (id, name, email, role) might be missing.');
                console.log('Error message:', colError.message);
            } else {
                console.log('Success selecting (id, name, email, role). These columns exist.');
            }
        }
    }
    process.exit();
}

checkActualSchema();
