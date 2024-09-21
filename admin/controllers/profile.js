const model = require("../models/user");
const superAdminCreationValidation = require("../validation/superAdminCreation")
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
//==================================================
const checkEncryptedPassword = async (password, encryptedPassword) => {
  const isPasswordValid = await bcrypt.compare(password, encryptedPassword);
  return isPasswordValid
}

module.exports = {


  createAdminProfile: async (req, res) => {
    try {
      // =========== VALIDATION ==================
      const { error, value } = superAdminCreationValidation.validate(req.body);

      if (error) {
        let message = error?.details[0]?.message;
        const formattedMessage = message.replace(/"/g, '');

        return res.status(400).json({
          message: formattedMessage,
          status: 400, // Updated status to 400 for bad request
        });
      }

      // Hash the password before saving the user
      const saltRounds = 10;  // Number of salt rounds for bcrypt
      const hashedPassword = await bcrypt.hash(value.password, saltRounds);

      // Replace the plain text password with the hashed password
      value.password = hashedPassword;

      // Create a new user with the hashed password
      const user = new model(value);
      await user.save();

      // Return the newly created user (excluding the password from the response for security)
      const { password, ...userWithoutPassword } = user._doc;

      return res.status(201).json(userWithoutPassword);

    } catch (error) {
      res.status(500).json({
        message: "Error creating user",
        error: error.message,
      });
    }
  },

  getAllAdminProfiles: async (req, res) => {
    try {
      const data = await model.find({});
      console.log("-------- data ----------", data);
      jsonResponse = {
        message: "user found successfully",
        data,
        count: data.length,
      };
      res.status(200).json(jsonResponse);
    } catch (error) {
      console.error("Error fetching user data:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },




  getAdminProfile: async (req, res) => {
    try {
      console.log("-------- user data----------",);
      let userId = req?.userId
      const userData = await model.findOne({ id: userId });
      jsonResponse = {
        message: "user found successfully",
        user: userData,
      };
      res.status(200).json(jsonResponse);
    } catch (error) {
      console.error("Error fetching user data:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  deleteAdminProfile: async (req, res) => {
    try {
        const userId = req?.userId;
        
        // Find the admin profile by userId and update the IsDeleted field
        const updatedUser = await model.findOneAndUpdate(
            { id: userId },               // Filter by userId
            { IsDeleted: '1' },           // Set IsDeleted to '1'
            { new: true }                 // Return the updated document
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "Admin profile not found" });
        }

        const jsonResponse = {
            message: "Admin profile deleted successfully",
            user: updatedUser,
        };
        res.status(200).json(jsonResponse);
    } catch (error) {
        console.error("Error deleting admin profile:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}


};
