 const bcrypt = require('bcryptjs');

//==========================================

const checkEncryptedPassword = async (password, encryptedPassword) => {
    const isPasswordValid = await bcrypt.compare(password, encryptedPassword);
    return isPasswordValid
}




module.exports = checkEncryptedPassword