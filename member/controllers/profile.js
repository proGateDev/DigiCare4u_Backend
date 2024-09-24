// const model = require("../models/member");
// const superAdminCreationValidation = require("../validation/superAdminCreation")
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');

// const XLSX = require('xlsx');

// //==================================================

// module.exports = {

//   getUserMembers: async (req, res) => {
//     try {
//       console.log('---- user members -------->');

//       const userId = req.userId


//       const userData = await model.findOne({ _id: userId });

//       if (!userData) {
//         return res.status(404).json({ message: "User not found" });
//       }

//       const jsonResponse = {
//         message: "User found successfully",
//         user: userData,
//       };

//       res.status(200).json(jsonResponse);
//     } catch (error) {
//       console.error("Error fetching user data:", error);
//       res.status(500).json({ error: "Internal Server Error" });
//     }
//   },




//   createUserMember: async (req, res) => {
//     try {
//       const userId = req.userId;
//       let membersData = [];

//       // Check if the request contains a file
//       if (req.file) {
//         // Read and parse the uploaded Excel or CSV file
//         console.log('---- File waala flow ------>')
//         const workbook = XLSX.readFile(req.file.path);
//         const sheetName = workbook.SheetNames[0];
//         const worksheet = workbook.Sheets[sheetName];
//         membersData = XLSX.utils.sheet_to_json(worksheet);
//         console.log('---- membersData ------>', membersData)
//       } else if (req.body) {
//         // If no file is uploaded, read data from request body
//         membersData = req.body; // expecting an array of member objects
//       } else {
//         return res.status(400).json({ message: "No file or member data provided" });
//       }

//       // Store the created members
//       const createdMembers = [];

//       // Loop through and create new members
//       for (const memberData of membersData) {
//         // Ensure member data is valid
//         if (!memberData.name || !memberData.email || !memberData.mobile) {
//           return res.status(400).json({ message: "Missing required fields in data" });
//         }

//         // Create new member linked to the user
//         const newMember = await model.create({
//           ...memberData,
//           userId: userId,
//         });
//         createdMembers.push(newMember);
//       }

//       // Respond with created members
//       res.status(201).json({
//         message: "Members imported successfully",
//         members: createdMembers,
//       });
//     } catch (error) {
//       console.error("Error importing members:", error);
//       res.status(500).json({ error: "Internal Server Error" });
//     }
//   }



// };
