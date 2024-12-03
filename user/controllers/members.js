const userModel = require("../models/profile");
const memberModel = require("../../member/models/profile");
const notificationModel = require("../../model/notification");
const superAdminCreationValidation = require("../validation/superAdminCreation");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const XLSX = require('xlsx');
// const sendMail = require("../../service/email");
const sendMail = require("../../service/sgMail");
const clientURL = require("../../constant/endpoint");
const { generatePassword, encryptPassword } = require('../../util/auth')

const socketService = require('../../service/socket');
const { sendNotification, sendServerDetailToClient } = require('../../service/socket');
const mongoose = require("mongoose");
const trackingHistoryModel = require("../../model/trackingHistory");

//==================================================
module.exports = {
  // getUserMembers: async (req, res) => {
  //   try {
  //     const userId = req.userId;
  //     console.log('------------- getUserMembers --------',userId);

  //     const userData = await memberModel.find({ parentUser: userId });

  //     if (!userData) {
  //       return res.status(404).json({
  //         status: 404,
  //         message: "No members added yet, please add members to track them."
  //       });
  //     }

  //     res.status(200).json({
  //       status: 200,
  //       message: "Members found successfully",
  //       members: userData,
  //       count: userData.length
  //     });
  //   } catch (error) {
  //     console.error("Error fetching user data:", error);
  //     res.status(500).json({ error: "Internal Server Error" });
  //   }
  // },





  getUserMembers: async (req, res) => {
    try {
      const userId = mongoose.Types.ObjectId(req.userId); // Convert the userId to ObjectId
      // console.log('------------- getUserMembers --------');

      // Fetch members associated with the userId using aggregate
      const userData = await memberModel.aggregate([
        {
          $match: {
            parentUser: userId // Filter by the user's ID
          }
        },
        {
          $lookup: {
            from: 'trackinghistories', // Collection name in lowercase
            localField: '_id', // Field from member model (member's _id)
            foreignField: 'memberId', // Field from trackingHistories model (memberId)
            as: 'trackingHistories' // Output array field
          }
        },
        {
          $unwind: {
            path: '$trackingHistories',
            preserveNullAndEmptyArrays: true // Keep members even if they have no tracking history
          }
        },
        {
          $sort: {
            'trackingHistories.timestamp': -1 // Sort by the latest tracking history timestamp
          }
        },
        {
          $group: {
            _id: '$_id',
            name: { $first: '$name' },
            email: { $first: '$email' },
            mobile: { $first: '$mobile' },
            groupType: { $first: '$groupType' },
            location: { $first: '$location' },
            latestTracking: { $first: '$trackingHistories' } // Get the latest tracking history
          }
        },
        {
          $project: {
            _id: 1,
            name: 1,
            email: 1,
            mobile: 1,
            groupType: 1,
            location: 1,
            latestTracking: {
              $cond: {
                if: { $ne: ['$latestTracking', null] }, // Check if latestTracking is not null
                then: '$latestTracking',
                else: null // or some default value
              }
            },
          }
        }
      ]);

      if (!userData.length) {
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
      // const password = '1234'
      // const passwordEncrypted = await encryptPassword()
      const passwordEncrypted = await bcrypt.hash(password, 10);



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

          const notifyTo = await notificationModel.create({
            userId,
            message: `You have added a new member: ${memberData?.name}`,
            isRead: false,


          });

          createdMembers.push(newMember);

          if (newMember && notifyTo) {

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
            // await sendMail();

            // sendNotification(userId, `You have added a new member: ${memberData?.name}`);
            // sendServerDetailToClient(` --------- server se aaya mera DOST ---------------- : ${memberData?.name}`);

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

          // console.log(` ---------- Email sent ----------------- `,memberData.email);
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


  getUserMemberById: async (req, res) => {
    try {

      const userId = req.userId; // Get the logged-in user's ID from the request
      // const userId ='66f673eaa447d313a6747f9a'
      // console.log(req?.body, ' ============= getUserMemberById---------------------------');
      const memberId = req?.params?.memberId; // Get the memberId from the route parameters
      // console.log('params', req?.params);


      // console.log('--------  IDs ---------------',userId,memberId);
      // Find the member by ID, ensuring that it belongs to the user
      const memberData = await memberModel.findOne({ _id: memberId, parentUser: userId });
      // console.log('--------  memberData ---------------',memberData);


      if (!memberData) {
        return res.status(404).json({
          status: 404,
          message: "Member not found or does not belong to the current user."
        });
      }

      res.status(200).json({
        status: 200,
        message: "Member found successfully",
        member: memberData
      });
    } catch (error) {
      console.error("Error fetching member data:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },



  deleteUserMemberById: async (req, res) => {
    try {
      const userId = req.userId; // Get the logged-in user's ID from the request
      const memberId = req?.params?.memberId; // Get the memberId from the route parameters


      // Find and delete the member by ID, ensuring that it belongs to the user
      const memberData = await memberModel.findOneAndDelete({
        _id: memberId,
        //  parentUser: userId
      });

      if (!memberData) {
        return res.status(404).json({
          status: 404,
          message: "Member not found or does not belong to the current user."
        });
      }

      res.status(200).json({
        status: 200,
        message: "Member deleted successfully",
        member: memberData
      });
    } catch (error) {
      console.error("Error deleting member data:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },


  getUserMemberDailyTransit: async (req, res) => {
    const { memberId } = req.params;
    const { date } = req.query;

    console.log('memberId 672b1a0a2c602f29a52ca408', memberId);


    if (!memberId || !date) {
      return res.status(400).json({ error: "Member ID and date are required" });
    }

    try {
      // Parse the date and get the start and end of the day
      const startOfDay = new Date(date);
      startOfDay.setUTCHours(0, 0, 0, 0);

      const endOfDay = new Date(date);
      endOfDay.setUTCHours(23, 59, 59, 999);

      // Query database for locations within the specified date range
      const locations = await trackingHistoryModel.find({
        memberId,
        timestamp: { $gte: startOfDay, $lte: endOfDay }
      }).sort('timestamp');
      console.log(locations);

      res.json({
        status: 200,
        data: locations,
        message: "Location found successfully"
      });
    } catch (error) {
      console.error("Error fetching locations: ", error);
      res.status(500).json({ error: "An error occurred while fetching locations." });
    }
  },


  getUserMemberDailyTransitActivityFrequency: async (req, res) => {



    try {
      const memberId  = req.userId;
      // console.log('memberId =========================', memberId);
      const { date } = req.body;
      console.log(date, memberId);

      const startDate = new Date(date);
      const endDate = new Date(date);
      endDate.setDate(endDate.getDate() + 1);

      const result = await trackingHistoryModel.aggregate([
        {
          $match: {
            memberId: mongoose.Types.ObjectId(memberId),
            timestamp: { $gte: startDate, $lt: endDate },
          },
        },
        {
          $group: {
            _id: "$sublocality",
            count: { $sum: 1 },
          },
        },
        {
          $sort: { count: -1 },
        },
      ]);

      res.json({
        status:200,
        data:result
      });
    } catch (error) {
      res.status(404).json({ 
        status:400,
        message: "Failed to fetch visit frequencies" });
    }
  }



}





