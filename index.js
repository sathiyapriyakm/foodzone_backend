import express from "express";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import cors from "cors";
import bcrypt from "bcrypt";
import {productRouter} from "./routes/products.js";
import {adminRouter} from "./routes/admin.js";
import {userRouter} from "./routes/user.js"
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;
app.use(express.json());
app.use(cors());

const MONGO_URL = process.env.MONGO_URL;
async function createConnection() {
  const client = new MongoClient(MONGO_URL);
  await client.connect();
  console.log("Mongo is connected ");
  return client;
}

export const client = await createConnection();

app.listen(PORT, () => console.log("Server started in port number:", PORT));

export async function generateHashedPassword(password) {
  const NO_OF_ROUNDS = 10; //Number of rounds of salting
  const salt = await bcrypt.genSalt(NO_OF_ROUNDS);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}
// express.json() is a inbuilt middleware to convert data inside body to json format.


app.use("/product",productRouter);
app.use("/admin",adminRouter);
app.use("/user",userRouter);


app.get("/", function (req, res) {
  res.send("Hello, Welcome to the APP");
});
