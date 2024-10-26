const { Server } = require('socket.io'); // Correct import for socket.io server
const memberModel = require('../member/models/profile');
const trackingHistoryModel = require('../model/trackingHistory');
const chatModel = require('../model/chat');

let io; // Define io globally

const socketService = (server) => {
  io = new Server(server, {
    cors: {
      origin: '*', // Adjust based on your needs
      methods: ['GET', 'POST'],
    },
    // transports: ['websocket'], // Use websocket transport
  });

  io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);
    socket.on('onLocationUpdate', async (data) => {
      console.log('-------- updating location in the background ---------------', [data.latitude, data.longitude]);


      const newTrackingHistory = await trackingHistoryModel.create(
        {
          memberId: '670df8794ac80f26f99dd7ee',
          userId: '670df8794df80f26f99dd7ee',
          location: {
            type: 'Point',
            coordinates: [data.latitude, data.longitude],
          },
        },

      );

      // await   newTrackingHistory.save()

      const updatedMember = await memberModel.findByIdAndUpdate(
        '670df8794ac80f26f99dd7ee',
        {
          location: {
            type: 'Point',
            coordinates: [data.latitude, data.longitude],
          },
          locationStatus: 'active',
        },
        { new: true }
      );
      if (updatedMember) {

        socket.emit('locationUpdateResponse', true);
      }


      // Emit notification only to the specific user
      // sendNotification(userId, notification);
    });

    socket.on('chat', async (data) => {
      try {
        const chatObject = {
          sender: data?.userId,
          message: data?.message?.text,


        }
        console.log(' --- chatObject  ------------------', chatObject);

        const newMessage = new chatModel(chatObject);
        await newMessage.save();

        // io.to(data.roomId).emit('newChatMessage', newMessage);
      } catch (error) {
        console.error('Error posting chat data:', error);
      }
    });



    socket.on('getChatHistory', async (userId) => {
      try {
        
        const chatHistory = await chatModel.find({ sender:userId }); // Fetch messages for the room
        console.log('chatHistory  ',chatHistory );
        socket.emit('chatHistory', chatHistory); // Send the chat history back to the client
      } catch (error) {
        // console.error('Error fetching chat history:', error);
        // socket.emit('chatHistoryError', 'Unable to fetch chat history.');
      }
    });



    // Listen for the event to join a user room
    socket.on('joinRoom', (userId) => {
      socket.join(userId);
      console.log(`User ${userId} joined room: ${userId}`);
    });

    // Handle disconnection
    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });
};

// Function to send notification
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


//=====================================

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





// Assuming you have Express and Socket.IO set up

// Fetching chat history
// const sendUserMemberChatHistory = async () => {
//   try {
//     const chatHistory = await Chat.find({ roomId }); // Replace with your database call
//     socket.emit('chatHistory', chatHistory); // Send history back to the client
//   } catch (error) {
//     console.error('Error fetching chat history:', error);
//   }
// };

// Posting chat messages




//=====================================



// Function to broadcast notification
const broadcastNotification = (notification) => {
  if (io) {
    io.emit('notification', notification);
  }
};

// Export the functions
module.exports = {
  socketService,
  sendNotification,
  broadcastNotification,
  sendServerDetailToClient,
  updateLocation,
  onMemberVerified,
  onUserJoined,
  // sendUserMemberChatHistory,
};
