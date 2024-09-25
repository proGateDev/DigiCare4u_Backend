const userModel = require("../models/profile");
const memberModel = require("../../member/models/profile");
const superAdminCreationValidation = require("../validation/superAdminCreation");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const XLSX = require('xlsx');
const sendMail = require("../../service/email");
const clientURL = require("../../constant/endpoint");
const { generatePassword, encryptPassword } = require('../../util/auth')
//==================================================

module.exports = {
  getUserMembers: async (req, res) => {
    try {
      const userId = req.userId;
      const userData = await memberModel.find({ parentUser: userId });

      if (!userData) {
        return res.status(404).json({
          status: 404,
          message: "No members added yet, please add members to track them."
        });
      }

      res.status(200).json({
        status: 200,
        message: "Members found successfully",
        members: userData,
        count: userData.length
      });
    } catch (error) {
      console.error("Error fetching user data:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  createUserMember: async (req, res) => {
    try {
      const userId = req.userId;
      let membersData = [];

      //============ AUTO uploading members ======================
      if (req.file) {
        const workbook = XLSX.readFile(req.file.path);
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        membersData = XLSX.utils.sheet_to_json(worksheet);
      }
      //============ MANUAL uploading members ======================
      else if (req.body && Object.keys(req.body).length > 0) { // Check if req.body is not empty
        membersData = req.body;
      } else {
        return res.status(400).json({
          status: 400,
          message: "No file or member data provided"
        });
      }

      const createdMembers = [];
      const password = generatePassword()
      // const passwordEncrypted = await encryptPassword()
      const passwordEncrypted = await bcrypt.hash(password, 10);

      console.log('passwordEncrypted --------', passwordEncrypted);


      for (const memberData of membersData) {
        if (!memberData?.name || !memberData?.email || !memberData?.mobile) {
          return res.status(400).json({
            status: 400,
            message: "Missing required fields in data"
          });
        }

        // Send email after creating the member
        try {
          const newMember = await memberModel.create({
            ...memberData,
            parentUser: userId,
            password: passwordEncrypted
          });

          createdMembers.push(newMember);

          if (newMember) {

            const verificationToken = jwt.sign(
              { email: memberData.email, userId: newMember._id }, // Payload
              process.env.JWT_SECRET, // Secret key from your environment variables
              { expiresIn: '360m' } // Token expiration time
            );



            const verificationLink = `${clientURL}/verify-email?token=${verificationToken}`;
            const messageData = {
              from: '<nischal@progatetechnology.com>',
              to: memberData?.email,
              subject: 'Welcome to DigiCare4u! Please Verify Your Email',
              html: `
                            <div style="max-width: 600px; margin: auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden; font-family: Arial, sans-serif; color: #333;">
                                <div style="background-color: #4CAF50; padding: 20px; text-align: center;">
                                    <h1 style="color: white; margin: 0;">DigiCare4u</h1>
                                    <p style="color: #f0f0f0;">Your well-being, our priority.</p>
                                </div>
                                <div style="padding: 20px;">
                                    <h2 style="color: #4CAF50;">Welcome, ${memberData?.name}!</h2>
                                    <p>Thank you for joining DigiCare4u! To get started, please verify your email address by clicking the button below and use the password for first time login:</p>
                                    <p>Password : <strong>${password}</strong></p>
                                    <a href=${verificationLink} 
                                       style="display: inline-block; margin: 20px 0; padding: 12px 25px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 5px; font-weight: bold;">
                                      Verify Email
                                    </a>
                                    <h3 style="color: #4CAF50;">What Can You Do with DigiCare4u?</h3>
                                    <ul style="list-style-type: disc; margin-left: 20px;">
                                      <li>📍 Monitor locations in real-time</li>
                                      <li>⚠️ Receive instant alerts in emergencies</li>
                                      <li>🤝 Stay connected with family and friends</li>
                                    </ul>
                                    <p>If you have any questions or need assistance, feel free to reach out!</p>
                                    <p style="margin-top: 20px;">Best regards,<br>The DigiCare4u Team</p>
                                </div>
                                <footer style="background-color: #f9f9f9; padding: 10px; text-align: center; font-size: 0.8em; color: #777;">
                                    <p>&copy; ${new Date().getFullYear()} DigiCare4u. All rights reserved.</p>
                                </footer>
                            </div>
                        `,
            };

            await sendMail(messageData);
            res.status(201).json({
              message: "Members imported successfully",
              members: createdMembers,
              verificationToken
            });
          } else {
            return res.status(500).json({
              status: 500,
              message: "Error saving members to the database"
            });
          }

          console.log(`Email sent to ${memberData.email} }`);
        } catch (emailError) {
          console.error(`Failed to send email to ${memberData.email}:`, emailError);
        }
      }

      // res.status(201).json({
      //   message: "Members imported successfully",
      //   members: createdMembers,
      // });
    } catch (error) {
      console.error("Error importing members:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

};
