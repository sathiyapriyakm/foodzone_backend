import express from "express";
import {
  getUserByAdminEmail,
  createAdmin,
} from "./helper.js";
import { generateHashedPassword } from "../index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { authorizedUser } from "../middleware/auth.js";

const router = express.Router();

router.post("/signup", async function (request, response) {
  const { FirstName, LastName, Email, Password } = request.body;
  const userFromDB = await getUserByAdminEmail(Email);

  if (userFromDB) {
    response.status(400).send({ message: "Username already exists" });
  } else {
    const hashedPassword = await generateHashedPassword(Password);
    const result = await createAdmin({
      FirstName: FirstName,
      LastName: LastName,
      Email: Email,
      Password: hashedPassword,
    });
    response.send({ message: "successful Signup" });
  }
});

router.post("/login", async function (request, response) {
  const { Email, Password } = request.body;
  const userFromDB = await getUserByAdminEmail(Email);

  if (!userFromDB) {
    response.status(400).send({ message: "Invalid Credential" });
    return;
  } else {
    // check password
    const storedPassword = userFromDB.Password;
    const isPasswordMatch = await bcrypt.compare(Password, storedPassword);
    if (isPasswordMatch) {
      const secret = process.env.SECRET_KEY;
      const payload = {
        Email: Email,
      };

      let token = jwt.sign(payload, secret, { expiresIn: "1h" });
      let userData = {
        id: userFromDB._id,
        FirstName: userFromDB.FirstName,
        LastName: userFromDB.LastName,
        Email: userFromDB.Email,
        type: "admin",
      };
      response
        .status(200)
        .send({ code: 0, message: "ok", data: token, user: userData });
    } else {
      response.status(400).send({ message: "Invalid Credential" });
      return;
    }
  }
});


export const adminRouter = router;