const userModel = require("../user/models/profile");
const memberModel = require('../member/models/profile'); // Import the User model
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");
const { checkEncryptedPassword } = require('../util/auth')
//==================================================


module.exports = {

  signup: async (req, res) => {
    try {
      console.log("--------  started User signup ----------");

      const { name, email, password, mobile } = req.body;

      // Validate input
      if (!name) {
        return res.status(400).json({
          status: 400,
          message: "Name is required"
        });
      }

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

      if (!mobile) {
        return res.status(400).json({
          status: 400,
          message: "Mobile number is required"
        });
      }

      // Check if the user already exists
      const existingUser = await userModel.findOne({ email });
      if (existingUser) {
        return res.status(409).json({
          status: 409,
          message: "User already registered"
        });
      }

      // Hash the password before saving
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user
      const newUser = new userModel({
        name,
        email,
        mobile,
        password: hashedPassword,
        createdBy: "system", // or replace with appropriate user ID if needed
        updatedBy: "system",
      });

      // Save the user to the database
      await newUser.save();

      // Generate a JWT token with 2 hours expiry
      const token = jwt.sign(
        { userId: newUser._id },
        process.env.JWT_SECRET,
        { expiresIn: '360m' } // Token expires in 2 hours
      );

      // Send response with the token
      res.status(201).json({
        status: 201,
        message: "User registered successfully",
        token,
      });

    } catch (error) {
      console.error("Error during user signup:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },


  login: async (req, res) => {
    try {
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
      const user = await userModel.findOne({ email });
      if (user) {
        const isPasswordValid = await checkEncryptedPassword(password, user.password);
        if (!isPasswordValid) {
          return res.status(401).json({
            status: 401,
            message: "Invalid password"
          });
        }
  
        // If authenticated, generate a JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '360m' });
  
        // Send response with the token
        return res.status(200).json({
          status: 200,
          type: "user",
          message: "User authenticated successfully",
          token
        });
      }
  
      // If not found in User, check in the Member collection
      const member = await memberModel.findOne({ email });
      if (member) {
        const isPasswordValid = await checkEncryptedPassword(password, member.password);
        if (!isPasswordValid) {
          return res.status(401).json({
            status: 401,
            message: "Invalid password"
          });
        }
  
        // If authenticated, generate a JWT token
        const token = jwt.sign({ userId: member._id }, process.env.JWT_SECRET, { expiresIn: '360m' });
  
        // Send response with the token
        return res.status(200).json({
          status: 200,
          message: "Member authenticated successfully",
          type: "member",
          token
        });
      }
  
      // If neither a user nor member is found
      return res.status(401).json({
        status: 401,
        message: "User is not registered with DigiCare"
      });
  
    } catch (error) {
      res.status(500).json({ error: error });
    }
  },
  

};
