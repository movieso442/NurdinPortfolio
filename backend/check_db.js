const supabase = require('./src/services/supabaseClient');

async function check() {
    const { data, error } = await supabase.from('courses').select('count');
    if (error) {
        console.error('Error checking courses:', error.message);
    } else {
        console.log('Course count:', data);
    }
}

check();
