// Import required modules
const { Server } = require('socket.io'); // Correct import for socket.io server

class SocketService {
  constructor(server) {
    this.io = new Server(server, {
      cors: {
        origin: '*', // Adjust based on your needs
        methods: ['GET', 'POST'],
      },
      transports: ['websocket'], // Use websocket transport
    });
    
    this.initialize();
  }

  initialize() {
    this.io.on('connection', (socket) => {
      console.log('A user connected:', socket.id);

      // Listen for the event to join a user room
      socket.on('joinRoom', (userId) => {
        this.joinUserRoom(userId, socket);
      });

      // Handle disconnection
      socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
      });

      // Other event listeners can be added here if needed
    });
  }

  // Method to send a notification to a specific user
  sendNotification(userId, notification) {
    this.io.to(userId).emit('notification', notification);
  }

  // Method to join a specific user to a room
  joinUserRoom(userId, socket) {
    socket.join(userId); // This allows a specific user to receive notifications
    console.log(`User ${userId} joined room: ${userId}`);
  }

  // Optionally, you can provide a method to broadcast notifications to all users
  broadcastNotification(notification) {
    this.io.emit('notification', notification);
  }
}

// Export the class, not an instance
module.exports = SocketService;
