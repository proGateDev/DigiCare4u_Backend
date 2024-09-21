const model = require("../models/user");
// const superAdminCreationValidation = require("../../validation/superAdminCreation")
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
//==================================================
const checkEncryptedPassword = async (password, encryptedPassword) => {
  const isPasswordValid = await bcrypt.compare(password, encryptedPassword);
  return isPasswordValid
}

module.exports = {
  login: async (req, res) => {
    try {
      console.log("--------  started ----------");
      const { email, password } = req.body;

      if (!email) {
        return res.status(400).json({
          status: 400,
          message: "Email is required"
        });
      }

      if (!password) {
        return res.status(400).json({
          status: 400,
          message: "Password is required"
        });
      }



      // Find the user by email
      const user = await model.findOne({ email });
      // console.log(user,'---- USER --');        

      if (!user) {
        return res.status(401).json({
          status: 401,
          message: "User is not registered with Digicare"
        });
      }

      // Compare provided password with hashed password in the database
      console.log('-----> ', password, user?.password);

      const isPasswordValid = await checkEncryptedPassword(password, user?.password);
      console.log('--------->', isPasswordValid);

      if (!isPasswordValid) {
        return res.status(401).json({
          status: 401,
          message: "Invalid  password"
        });
      }

      // If authenticated, generate a JWT token with 1 day expiry
      const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET,
        { expiresIn: '10m' } // Token expires in 1 day
      );

      // Send response with the token
      res.status(200).json({
        status: 200,
        message: "User authenticated successfully",
        token,
      });

    } catch (error) {
      console.error("Error during user login:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },


};
