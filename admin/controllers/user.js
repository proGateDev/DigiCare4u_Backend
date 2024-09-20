const model = require("../models/user");
// const planetModel = require("../models/planet");
// const houseModel = require("../models/house");
const superAdminCreationValidation = require("../../validation/superAdminCreation")
const { default: axios } = require("axios");
const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// const model = require('./path/to/user/model'); // Adjust the path as needed
// const Event = require('../models/event');
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

  createUser: async (req, res) => {
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

  getUser: async (req, res) => {
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




  getUserById: async (req, res) => {
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



};
