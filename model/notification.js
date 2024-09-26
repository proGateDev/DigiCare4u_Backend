const mongoose = require("mongoose");
//===================================

const NotificationSchema = new mongoose.Schema({
    userId: { type: String, required: true },  
    message: { type: String, required: true }, 
    isRead: { type: Boolean, default: false },  
    createdAt: { type: Date, default: Date.now }
  });
  

  const notificationModel = mongoose.model('notification', NotificationSchema);
module.exports = notificationModel;
