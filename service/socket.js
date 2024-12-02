const { Server } = require('socket.io'); // Correct import for socket.io server
const memberModel = require('../member/models/profile');
const userModel = require('../user/models/profile');
const trackingHistoryModel = require('../model/trackingHistory');
const chatModel = require('../model/chat');
const jwt = require('jsonwebtoken');
let io;

//------------------ Helpers function(s) -------------------------
const getConnectedMemberDetails = async (memberId) => {
  try {

    const user = await userModel
      .findById(memberId);
    if (user == null) {

      const member = await memberModel
        .findById(memberId).populate('parentUser')
      return member;
    }
    // console.log('details -------:', user, member);
    return user;
    // console.log('member details ---:', member);
  } catch (error) {
    console.error('Error fetching member details:', error);
    throw error;
  }
};
//----------------------------------------------------------------

const socketService = (server) => {
  io = new Server(server, {
    cors: {
      origin: '*', // Adjust based on your needs
      methods: ['GET', 'POST'],
    },
    // transports: ['websocket'], // Use websocket transport
  });
  const socketToMemberMap = {}; // Simple in-memory mapping (replace with Redis for scalability)

  io.on('connection', async (socket) => {
    console.log('----------------- CONNECTED ! -------------------');

    const token = socket?.handshake?.auth?.token?._j; // Example: JWT passed during connection
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const memberId = decoded?.userId;
    const member = await getConnectedMemberDetails(memberId);
    socketToMemberMap['socketId'] = socket.id;
    socketToMemberMap['clientId'] = memberId;


    socketToMemberMap['clientType'] = member?.role;
    // Super Admin
    if (member?.role === 'super_admin') {
      socket.join('super_admin'); // Room for Super Admin
      console.log(`Super Admin joined room: super_admin`);
    }

    // User
    if (member?.role === 'user') {
      socket.join(`user_${memberId}`); // Room for the User
      console.log(`User joined room: user_${memberId}`);
    }
    // Member
    if (member?.role === 'member') {
      let roomName = `user_${member?.parentUser?.id}`
      // console.log(`roomName -------`,roomName);
      socket.join(`member_${memberId}`); // Room for the Member
      socket.emit(roomName, socketToMemberMap);


      // console.log(`Socket ${socket.id} joined member room: member_${memberId}`);
    }

    socket.join(memberId); // Use memberId as the room name

    // socket.emit('liveMembers', socketToMemberMap)


    console.log(` ---------- ${member.name} ${member?.role} GOT Connected!`);


    // Handle disconnection
    socket.on('disconnect', () => {
      console.log(`Socket ${socket.id} disconnected from room: ${memberId}`);

      delete socketToMemberMap[socket.id];

    });
  });
};





//== Server side socket function(s) ==================================================================
const sendNotification = (userId, notification) => {
  if (io) {
    console.log('============  SOCKET  ------------>', userId)
    io.to(userId).emit('notification', notification);
    // io.to(userId).emit('notification', notification);
  }
};


const sendServerDetailToClient = (data) => {
  if (io) {
    console.log('============  sendServerDetailToClient  ------------>', data)
    io.emit('getUserId', data);
  }
};



const updateLocation = (data) => {
  if (io) {
    console.log('============  updateLocation  ------------>', data)
    io.emit('locationUpdate', '------- current location : ');
  }
};



const onMemberVerified = (message) => {
  if (io) {
    console.log('============  onMemberVerified chala    ................')
    io.emit('onMemberVerified', message);
  }
};
//--------------- Chat sockets ----------------------------------------
const onUserJoined = (roomId, user) => {
  if (io) {
    console.log(`User ${user.username} joined room ${roomId}`);
    io.to(roomId).emit("onUserJoined", { roomId, user });
  }
};


//==================================================================
module.exports = {
  socketService,
  sendNotification,
  sendServerDetailToClient,
  updateLocation,
  onMemberVerified,
  onUserJoined,
  // sendUserMemberChatHistory,
};
