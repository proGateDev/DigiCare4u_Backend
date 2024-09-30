const punchLogSchema = new mongoose.Schema({
  memberId: { type: mongoose.Schema.Types.ObjectId, ref: 'member', required: true }, // Reference to member
  punchInTime: { type: Date, required: true },
  punchOutTime: { type: Date },
  totalWorkHours: { type: Number, default: 0 }, // Track total hours worked in the session
  locationDuringPunchIn: {
    latitude: { type: Number },
    longitude: { type: Number }
  },
  locationDuringPunchOut: {
    latitude: { type: Number },
    longitude: { type: Number }
  },
  createdAt: { type: Date, default: Date.now }
});

const PunchLog = mongoose.model('punchLog', punchLogSchema);
module.exports = PunchLog;
