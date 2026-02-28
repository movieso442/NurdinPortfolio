const bcrypt = require('bcryptjs');

async function genHash() {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash('AdminPassword123!', salt);
    console.log(hash);
    process.exit();
}

genHash();
