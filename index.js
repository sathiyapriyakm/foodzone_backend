import express from "express";
import dotenv from "dotenv";
import { authRouter } from "./routes/auth.js";
import { ChangeStream, MongoClient } from "mongodb";
import cors from "cors";
import { productrouter } from "./routes/productRoutes.js";
import { orderrouter } from "./routes/orderRoutes.js";
import { paymentrouter } from "./routes/paymentRoutes.js";
import { Server } from "socket.io";
import http from "http";

const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};
const app = express();
dotenv.config();
const server = http.createServer(app);
const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL;
export const activeUsers = new Set();

app.use(cors(corsOptions));
app.use(express.json());

export const io = new Server(server, {
  cors: {
    origin: `${process.env.CLIENT_URL}`,
    methods: ["GET", "POST"],
  },
});

async function createConnection() {
  try {
    const client = new MongoClient(MONGO_URL);
    await client.connect();
    console.log("connected to database");
    return client;
  } catch (error) {
    console.log("error while connecting to database", error);
  }
}

io.on("connection", function (socket) {
  console.log("Made socket connection");

  socket.on("new user", function (username) {
    console.log(username);
    console.log(activeUsers);

    if (!activeUsers.has((user) => user.username === username)) {
      activeUsers.add({ username: username, socketId: socket.id });
      console.log("New User Connected", activeUsers);
    }
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
    activeUsers.forEach((user) => {
      if (user.socketId == socket.id) {
        activeUsers.delete(user);
      }
    });
    console.log("User Disconnected", activeUsers);
  });
});

server.listen(PORT, () => {
  console.log("listening to PORT :", PORT);
});

app.get("/", (req, res) => {
  //   console.log("default request");
  res.send("Welcome to the  Food ordering Application");
});

export const client = await createConnection();
app.use("/auth", authRouter);
app.use("/product", productrouter);
app.use("/order", orderrouter);
app.use("/payment", paymentrouter);
