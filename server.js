const app = require("./app");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const http = require("http");
const { Server } = require("socket.io");

// Accessing the environment variables
dotenv.config({ path: "./config.env" });

// Connecting to the DB through mongoose
const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("Connected to the DB ..."));

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "https://code-evaluation-mentor.onrender.com/",
  },
});

let isAdmin = false;

io.on("connection", (socket) => {
  socket.on("givePermission", () => {
    if (!isAdmin) {
      isAdmin = true;
      socket.emit("roleChanged", "admin");
    } else {
      socket.emit("roleChanged", "student");
    }
  });

  socket.on("send-text", (value) => {
    socket.broadcast.emit("get-text", value);
  });

  socket.on("leave-page", () => {
    if (isAdmin) {
      isAdmin = false;
    }
  });
});

// Defining a port for the server
const port = process.env.PORT;

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
