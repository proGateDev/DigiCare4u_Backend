 const bcrypt = require('bcryptjs');
const model = require("../model/user");

//==========================================

const checkEncryptedPassword = async (password, encryptedPassword) => {
    const isPasswordValid = await bcrypt.compare(password, encryptedPassword);
    return isPasswordValid
}


const decodeJWT = async (req) => {
    try {
      // Extract token from the Authorization header
      const token = req.headers.authorization?.split(" ")[1];
   
  
      // Verify and decode the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const userId = decoded.userId;
  
      // Fetch the user data from the database using the userId
      const userData = await model.findOne({ _id: userId });
  
      if (!userData) {
        throw new Error("User not found");
      }
  
      return userData; // Return the user data
    } catch (error) {
      console.error("Error decoding JWT:", error);
      throw new Error("Failed to decode token or fetch user data");
    }
  };

module.exports = checkEncryptedPassword,decodeJWT