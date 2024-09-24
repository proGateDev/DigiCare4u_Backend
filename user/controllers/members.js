const userModel = require("../models/profile");
const memberModel = require("../../member/models/profile");
const superAdminCreationValidation = require("../validation/superAdminCreation")
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const XLSX = require('xlsx');



//==================================================
const formData = require('form-data');
const Mailgun = require('mailgun.js');
const mailgun = new Mailgun(formData);
const mg = mailgun.client({ username: 'api', key: process.env.MAILGUN_API_KEY });



const sendEmail = (email, memberName) => {
  const subject = 'You have been added to the app';
  const htmlContent = `
    <h3>Hello ${memberName},</h3>
    <p>You have been added as a member. Please complete your signup to access the app.</p>
    <a href="https://yourapp.com/signup">Complete Signup</a>
  `;

  return mg.messages.create('your-domain.com', {
    from: 'nischal@progatetechnology.com',
    to: email,
    subject,
    html: htmlContent,
  });
};


//==================================================

module.exports = {

  getUserMembers: async (req, res) => {
    try {


      const userId = req.userId


      const userData = await memberModel.find({ parentUser: userId });

      if (!userData) {
        return res.status(404).json({
          status: 404,
          message: "No members added yet , please add members to able to track them"
        });
      }

      const jsonResponse = {
        status: 200,
        message: "Members found successfully",
        members: userData,
        count: userData.length
      };

      res.status(200).json(jsonResponse);
    } catch (error) {
      console.error("Error fetching user data:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },



  createUserMember: async (req, res) => {
    try {
      const userId = req.userId;
      let membersData = [];

      if (req.file) {
        // console.log('---- File waala flow ------>');
        const workbook = XLSX.readFile(req.file.path);
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        membersData = XLSX.utils.sheet_to_json(worksheet);
        // console.log('---- membersData ------>', membersData);
      } else if (req.body) {
        membersData = req.body;
      } else {
        return res.status(400).json({ message: "No file or member data provided" });
      }

      const createdMembers = [];

      for (const memberData of membersData) {
        if (!memberData?.name || !memberData?.email || !memberData?.mobile) {
          return res.status(400).json({ message: "Missing required fields in data" });
        }
        console.log('userId ==', userId);

        const newMember = await memberModel.create({
          ...memberData,
          parentUser: userId,
        });

        // Send email after creating the member
        try {
          // await sendEmail(memberData.email, memberData.name);

          //=======================================================
          const API_KEY = "81de212cf0dad8d4781276adcd9a711e-1b5736a5-e767baa3";
          const DOMAIN = "marketingwaala.in";
          
          const formData = require('form-data');
          const Mailgun = require('mailgun.js');
          
          const mailgun = new Mailgun(formData);
          const client = mailgun.client({
            username: 'api',
            key: API_KEY,
            url:"https://api.eu.mailgun.net"
          });
          // console.log(client)
          
          const messageData = {
            from: 'Yoopster <joep@mydomain.com>',
            to: 'gupta.nischal014@gmail.com',
            subject: 'Hello',
            text: 'Testing some Mailgun awesomeness!'
          };
          
          client.messages.create(DOMAIN, messageData)
            .then((res) => {
              console.log(res);
            })
            .catch((err) => {
              console.error(err);
            });

          //=======================================================

          console.log(`Email sent to ${memberData.email}`);
        } catch (emailError) {
          console.error(`Failed to send email to ${memberData.email}:`, emailError);
        }

        createdMembers.push(newMember);
      }

      res.status(201).json({
        message: "Members imported successfully",
        members: createdMembers,
      });
    } catch (error) {
      console.error("Error importing members:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }



};
