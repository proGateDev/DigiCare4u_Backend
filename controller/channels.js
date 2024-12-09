
//==================================================

const { message } = require("../admin/validation/superAdminCreation");
const memberModel = require("../member/models/profile");
const channelModel = require("../model/channels");
const channelMemberModel = require("../model/channelsMembers");
const userModel = require("../user/models/profile");


module.exports = {

  createChannel: async (req, res) => {
    try {
      console.log("-------- Creating Channels ----------");

      const { name, description, createdByModel } = req.body;
      const loggedInUserId = req.userId;

      // Validate required fields
      if (!name || !loggedInUserId || !createdByModel) {
        return res.status(400).json({ message: "All fields are required" });
      }

      // Check if the channel already exists
      const isChannelExists = await channelModel.findOne({ name });

      if (isChannelExists) {
        return res.status(400).json({
          status: 400,
          message: "Channel already exists",
        });
      }

      // Create a new channel
      const newChannel = new channelModel({
        name,
        description,
        createdBy: loggedInUserId,
        createdByModel, // 'User' or 'Member'
      });

      await newChannel.save();

      res.status(201).json({
        status: 201,
        message: "Channel created successfully",
        channel: newChannel,
      });
    } catch (error) {
      console.error("Error creating channel:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },




  getChannels: async (req, res) => {
    try {
      console.log("-------- Fetching User Channels ----------");

      const userId = req.userId; // Assuming `userId` is extracted from middleware via JWT

      // Validate the userId
      if (!userId) {
        return res.status(400).json({
          status: 400,
          message: "User ID is required",
        });
      }

      // Fetch channels where the user or member created the channel
      const channels = await channelModel.find({
        createdBy: userId,
        createdByModel: 'User', // Assuming we are fetching channels created by users
      }).select('name description createdAt'); // Adjust fields based on what you need to return

      // Return the fetched channels
      res.status(200).json({
        status: 200,
        message: "Channels fetched successfully",
        channels,
      });
    } catch (error) {
      console.error("Error fetching channels:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },


  getChannelMembers: async (req, res) => {
    try {
      const userId = req.userId; // Extracted from JWT middleware
      console.log('userId -----', userId);
      
      // Step 1: Find all channels created by the current user
      const channels = await channelModel.find({ createdBy: userId }, { _id: 1 }); // Fetch only _id
      const channelIds = channels.map((channel) => channel._id);
      console.log(' ids -----', channelIds);
      
      if (!channelIds.length) {
        return res.status(404).json({ status: 404, message: "No channels found for this user." });
      }
      
      // Step 2: Find all channel members for the fetched channel IDs
      const channelMembers = await channelMemberModel.find({ channelId: { $in: channelIds } });
      console.log('members -----', channelMembers);

      if (!channelMembers.length) {
        return res.status(404).json({ status: 404, message: "No members found for the specified channels." });
      }

      // Step 3: Fetch user details for the member IDs
      const memberIds = channelMembers.map((member) => member.memberId);
      const members = await memberModel.find({ _id: { $in: memberIds } }, { name: 1, email: 1, mobile: 1 });

      if (!members.length) {
        return res.status(404).json({ status: 404, message: "No member details found." });
      }

      // Step 4: Format the result
      const result = channelMembers.map((channelMember) => {
        const memberDetails = members.find((member) => member._id.equals(channelMember.memberId));
        return {
          channelId: channelMember.channelId,
          memberId: channelMember.memberId,
          memberDetails: memberDetails || null, // Handle cases where member details are missing
        };
      });

      res.status(200).json({
        status: 200,
        message: "Members fetched successfully.",
        data: result,
        totalMember: result.length,
      });
    } catch (error) {
      console.error("Error fetching channel members:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },



  createChannelMembers: async (req, res) => {
    try {
      console.log("-------- Creating Channels ----------");

      const { name, description, createdByModel } = req.body;
      const loggedInUserId = req.userId;

      // Validate required fields
      if (!name || !loggedInUserId || !createdByModel) {
        return res.status(400).json({ message: "All fields are required" });
      }

      // Check if the channel already exists
      // const isChannelExists = await channelModel.findOne({ name });

      // if (isChannelExists) {
      //   return res.status(400).json({
      //     status: 400,
      //     message: "Channel already exists",
      //   });
      // }

      // Create a new channel
      const newChannel = new channelMemberModel({
        channelId: "67541ae4d5090e3c19a47854",
        memberId: "672b1a0a2c602f29a52ca408",
        role: 'member',
        joinedAt: "2024-11-06T07:26:02.289+00:00", // 'User' or 'Member'
      });

      await newChannel.save();

      res.status(201).json({
        status: 201,
        message: "Channel created successfully",
        channel: newChannel,
      });
    } catch (error) {
      console.error("Error creating channel:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

};
