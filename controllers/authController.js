import bcrypt from "bcrypt";
import dotenv from "dotenv";
import User from "../models/userModel.js";
import { validateData } from "../middlewares/verifyUserInput.js";
import Jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

dotenv.config();

const secretKey = process.env.JWT_SECRET;
const transportor = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: true,
  service: "gmail",
  auth: {
    user: process.env.SMTP_MAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});

export const registerUser = async (req, res) => {
  const { email, password, role } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      error: "Enter the email and password for successful registration",
    });
  }
  try {
    validateData(password, email);
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        email,
        password: hashedPassword,
        role,
      });
      await newUser.save();
      return res
        .status(201)
        .json({ Success: true, message: "User registered successfully" });
    } else {
      return res
        .status(409)
        .json({ message: "This user is already registered" });
    }
  } catch (error) {
    console.error("Error in registering user:");
    return res.status(500).json({ error: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: "Enter the email and password for Login",
      });
    }
    const isRegisteredUser = await User.findOne({ email });
    if (!isRegisteredUser) {
      return res.status(404).json({ error: "User not found with this email." });
    }
    const isValidPassword = await bcrypt.compare(
      password,
      isRegisteredUser.password
    );
    if (!isValidPassword) {
      return res.status(401).json({ error: "Invalid password." });
    }
    const token = Jwt.sign(
      {
        userId: isRegisteredUser._id,
        email: isRegisteredUser.email,
        role: isRegisteredUser.role
      },
      secretKey
    );
    res.status(200).json({ message: "Login Successful", token });
  } catch (error) {
    console.log("Error in login");
    res.status(400).json({ error: error.message });
  }
};

export const forgetPassword = async (req, res) => {
  const { email } = req.body;
  const registeredUser = await User.findOne({ email });
  if (!registeredUser) {
   return res.status(404).json({ error: "User not found" });
  }
 
  try {
    if (registeredUser) {
        const user_id = registeredUser._id;
      let mailOptions = {
        from: process.env.SMTP_MAIL,
        to: email,
        subject: "Sending email for reset you Password",
        text: `This link is valid for 2 Minutes {Copy this link and paste in postman as frontend is not connected for now} http://localhost:5000/api/auth/reset-password/${user_id}`,
      };
      transportor.sendMail(mailOptions, (error, info) => {
        if (error) {
          return res.status(401).json({ error: "Email not send" });
        } else {
          return res
            .status(201)
            .json({ message: "Email sent successfully...!" });
        }
      });
    }
  } catch (error) {
    console.log("Error in sending mail");
    res.status(500).json({ error: error.message });
  }
};

export const resetPassword = async(req, res)=>{
    const {user_id} = req.params;
    const {password} = req.body;
    if (!password) {
        return res.status(400).json({
          error: "Enter the email and password for successful registration",
        });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      try {
        validateData(password)
        const findUserAndUpdate = await User.findByIdAndUpdate({_id:user_id}, {password: hashedPassword});
        if(findUserAndUpdate){
           return res.status(201).json({Success: true, message: "Password update successfully...!"})
        } else {
            return res.status(400).json({error: "Unable to update password"})
        }
      } catch (error) {
        console.log("Error in password reset..");
        res.status(500).json({error: error.message});
      }
}
