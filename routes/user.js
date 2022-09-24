import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import randomstring from "randomstring";
import {
  createUser,
  getUserByName,
  getUserByEmail,
  getUserById,
} from "./helper.js";
import { authorizedUser } from "../middleware/auth.js";

const router = express.Router();


export async function generateHashedPassword(password) {
  const NO_OF_ROUNDS = 10; //Number of rounds of salting
  const salt = await bcrypt.genSalt(NO_OF_ROUNDS);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}


router.post("/signup", async function (request, response) {
  const { FirstName, LastName, Email, Password } = request.body;
  const userFromDB = await getUserByName(Email);

  if (userFromDB) {
    response.status(400).send({ message: "User already exists" });
  } else {
    const hashedPassword = await generateHashedPassword(Password);
    const result = await createUser({
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
  const userFromDB = await getUserByName(Email);

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
      
    let token = jwt.sign(payload, secret, { expiresIn: "2h" });
    let userData={
      id:userFromDB._id,
      FirstName:userFromDB.FirstName,
      LastName:userFromDB.LastName,
      Email:userFromDB.Email,
       type: "users"
      }
    response.status(200).send({ code: 0, message: 'ok', data: token, user: userData });

      
    } else {
      response.status(400).send({ message: "Invalid Credential" });
      return;
    }
  }
});


router.post("/forgetPassword", async function (request, response) {
  const { Email } = request.body;
  const userFromDB = await getUserByEmail(Email);

  if (!userFromDB) {
    response.status(400).send({ message: "This is not a registered E-mail" });
  } else {
    //generate random string
    let randomString = randomstring.generate();

    //send a mail using nodemailer

    //Create Transporter
    const linkForUser = `${process.env.FRONTEND_URL}/reset-password/${userFromDB._id}/${randomString}`;
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        // type: 'OAUTH2',
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
        // clientId: process.env.OAUTH_CLIENTID,
        // clientSecret: process.env.OAUTH_CLIENT_SECRET,
        // refreshToken: process.env.OAUTH_REFRESH_TOKEN
      },
    });
    //Mail options
    let mailOptions = {
      from: "no-reply@noreply.com",
      to: Email,
      subject: "Reset Password",
      html: `<h4>Hello User,</h4><br><p> You can reset the password by clicking the link below.</p><br><u><a href=${linkForUser}>${linkForUser}</a></u>`,
    };
    //Send mail
    transporter.sendMail(mailOptions, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        console.log("email sent successfully");
      }
    });
    //Expiring date
    const expiresin = new Date();
    expiresin.setHours(expiresin.getHours() + 1);
    //store random string
    await client
      .db("foodZone")
      .collection("users")
      .findOneAndUpdate(
        { Email: Email },
        {
          $set: {
            resetPasswordToken: randomString,
            resetPasswordExpires: expiresin,
          },
        }
      );
    //Close the connection
    response.send({
      message: "User exists and password reset mail is sent",
    });
  }
});

router.post("/verifyToken", async function (request, response) {
  const { id, token } = request.body;
  const userFromDB = await getUserById(id);
  const currTime = new Date();
  currTime.setHours(currTime.getHours());
  try {
    if (currTime <= userFromDB.resetPasswordExpires) {
      if (token === userFromDB.resetPasswordToken) {
        response.send({ message: "Changing Password Approved" });
      } else {
        response.status(400).send({ message: "Token not valid" });
      }
    } else {
      response.status(400).send({ message: "Time expired" });
    }
  } catch (error) {
    response.status(500).send({
      message: "Something went wrong!",
    });
  }
});

router.put("/changePassword", async function (request, response) {
  const { Password, id } = request.body;
  
  try {
    // check password
    const hashedPassword = await generateHashedPassword(Password);
    await client
      .db("foodZone")
      .collection("users")
      .findOneAndUpdate(
        { _id: ObjectId(id) },
        { $set: { Password: hashedPassword } }
      );
    //db.users.insertOne(data);
    response.send({ message: "Password updated successfully" });
  } catch (error) {
    response.send({ message: "Unexpected error in password updation" });
  }
});

export const userRouter = router;