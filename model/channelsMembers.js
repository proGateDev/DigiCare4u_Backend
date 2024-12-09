const mongoose = require("mongoose");

const channelMemberSchema = new mongoose.Schema({
  channelId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Channel', 
    required: true 
  },
  memberId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Member', 
    required: true 
  },
  role: { 
    type: String, 
    enum: ['admin', 'member', 'viewer'], 
    default: 'member' 
  },
  joinedAt: { 
    type: Date, 
    default: Date.now 
  }
});

channelMemberSchema.index({ channelId: 1, memberId: 1 }, { unique: true }); // Ensure no duplicate entries

const channelMemberModel = mongoose.model('ChannelMember', channelMemberSchema);
module.exports = channelMemberModel;
