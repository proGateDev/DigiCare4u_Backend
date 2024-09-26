const express = require("express");
const http = require("http"); // Import http to create the server
const cors = require("cors");
require("dotenv").config();
require("./database");
const routes = require('./routes');
const SocketService = require('./service/socket'); // Adjust the path accordingly

const app = express(); // Initialize the express app

//====================================================

// Use the session middleware
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

//====================================================
const coldStartSolution = () => {
  setTimeout(() => {
    console.log("-------- Cold Start -------------");
  }, 1000);
  coldStartSolution();
};

app.get("/", (req, res) => {
  res.send("<h1> AstroLogics Server </h1>");
});

//===================================================
// Create the HTTP server
const server = http.createServer(app);

// Initialize the SocketService with the HTTP server
const socketService = new SocketService(server);

//===================================================
// Define your routes
app.use(routes);
// Uncomment the following lines if these routes are needed
// app.use("/admin", require("./routes/transit"));
// app.use("/user", require("./routes/user"));
// app.use("/aspect", require("./routes/aspect"));
// app.use("/chartData", require("./routes/chartData"));
// app.use("/prediction", require("./routes/prediction"));
// app.use("/natal", require("./routes/natal"));
// app.use("/transit", require("./routes/transitData"));

//===================================================
// Start the server
server.listen(process.env.PORT, () => {
  console.log(`Server started on PORT : ${process.env.PORT}`);
});
