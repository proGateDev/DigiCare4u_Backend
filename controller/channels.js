
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
      const { channelId } = req.query;
      console.log('fetching channeld : ', channelId, userId);
      // console.log(channelId);

      // Step 1: Find all members in channels created by the logged-in user
      const channelMembers = await channelMemberModel
        .find({ addedBy: userId, channelId: channelId })
        .populate("channelId", "name description") // Populate channel details
        .populate("memberId", "name email mobile") // Populate member details
        .select("channelId memberId role addedBy addedByModel joinedAt "); // Select specific fields

      const channelMembers_ = await channelMemberModel
        .find({ id: channelId })
      console.log('channelMembers_', channelMembers_);


      if (!channelMembers.length) {
        return res.status(404).json({
          status: 404,
          message: "No members found for channels added by the user.",
        });
      }

      // Step 2: Format the response data
      const result = channelMembers.map((channelMember) => ({
        channelId: channelMember.channelId._id,
        channelName: channelMember.channelId.name,
        channelDescription: channelMember.channelId.description,
        memberId: channelMember.memberId._id,
        memberName: channelMember.memberId.name,
        memberEmail: channelMember.memberId.email,
        memberMobile: channelMember.memberId.mobile,
        role: channelMember.role,
        addedBy: channelMember.addedBy,
        addedByModel: channelMember.addedByModel,
        joinedAt: channelMember.joinedAt,
      }));

      res.status(200).json({
        status: 200,
        message: "Members fetched successfully.",
        data: result,
        totalMembers: result.length,
      });
    } catch (error) {
      console.error("Error fetching channel members:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },






  addMemberToChannel: async (req, res) => {
    try {
      console.log("-------- Adding member to channel --------");

      const { channelId, memberId, role, addedByModel } = req.body;
      const loggedInUserId = req.userId;

      // Validate required fields
      if (!channelId || !memberId || !loggedInUserId || !addedByModel) {
        return res.status(400).json({ message: "All fields are required" });
      }

      // Check if the channel exists
      const channel = await channelModel.findById(channelId);
      if (!channel) {
        return res.status(404).json({ message: "Channel not found" });
      }

      // Validate the role (optional if enum ensures it)
      const validRoles = ['admin', 'member', 'user'];
      if (role && !validRoles.includes(role)) {
        return res.status(400).json({ message: "Invalid role specified" });
      }

      // Check if the member already exists in the channel
      const isMemberExists = await channelMemberModel.findOne({ channelId, memberId });
      if (isMemberExists) {
        return res.status(400).json({ message: "Member already exists in the channel" });
      }

      // Create a new channel member
      const newChannelMember = new channelMemberModel({
        channelId,
        memberId,
        role: role || 'member',
        addedBy: loggedInUserId,
        addedByModel,
        joinedAt: new Date(),
      });

      await newChannelMember.save();

      res.status(201).json({
        status: 201,
        message: "Member added to channel successfully",
        channelMember: newChannelMember,
      });
    } catch (error) {
      console.error("Error adding member to channel:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
}




