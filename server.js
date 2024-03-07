import express from "express";
import mongoose from "mongoose";
import path from "path";
import { v2 } from "cloudinary";
import cloudinary from "cloudinary";
import fs from "fs/promises";
import { GoogleGenerativeAI } from "@google/generative-ai";
import nodemailer from "nodemailer";
import multer from "multer";
import "dotenv/config";
import cron from "node-cron";
import jwt from "jsonwebtoken";
import cors from "cors";
import User from "./schema/UserSchems.js";
import Company from "./schema/CollegeSchema.js";
import CompanyCredSchema from "./schema/CompanyCredSchema.js";

const server = express();

server.use(express.json());
server.use(cors());

const genAI = new GoogleGenerativeAI("AIzaSyDbUQj2jSe1THDWuFVdGKRCJ7ozrzd1MyA");

let PORT = 5000;

mongoose.connect(
  "mongodb+srv://varad:varad6862@cluster0.0suvvd6.mongodb.net/vega",
  {
    autoIndex: true,
  }
);

const sendEmail = async function (data, user) {
  console.log("varad");
  const transporter = nodemailer.createTransport({
    // host:process.env.SMPT_HOST,
    // port: process.env.SMPT_PORT,
    host: "smtp.elasticemail.com",
    port: 587,
    secure: false,
    auth: {
      user: "fakeacc6862@gmail.com",

      pass: "47E85993DC7394854F4E87B9F47289D636F1",
    },
  });

  const emailTemplate = `<html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Placement Offer</title>
      <style>
          body {
              font-family: Arial, sans-serif;
              background-color: #f4f4f4;
              padding: 20px;
          }
          .container {
              max-width: 600px;
              margin: 0 auto;
              background-color: #fff;
              border-radius: 10px;
              padding: 20px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }
          .logo {
              text-align: center;
              margin-bottom: 20px;
          }
          .logo img {
              width: 150px;
          }
          .content {
              padding: 20px;
          }
          .cta-button {
              display: inline-block;
              background-color: #007bff;
              color: #fff;
              text-decoration: none;
              padding: 10px 20px;
              border-radius: 5px;
          }
          .cta-button:hover {
              background-color: #0056b3;
          }
      </style>
  </head>
  <body>
      <div class="container">
          <div class="logo">
              <img src="YOUR_LOGO_URL" alt="Company Logo">
          </div>
          <div class="content">
              <h2>New Placement Offer</h2>
              <p>Hello,</p>
              <p>We are pleased to offer you a new placement opportunity from our college.</p>
              <p>Please click the button below to access the offer:</p>
              <a href=${data} class="cta-button">View Placement Offer</a>
              <p>If you have any questions, feel free to contact us.</p>
              <p>Best regards,<br>Your College Placement Team</p>
          </div>
      </div>
  </body>
  </html>`;

  await transporter.sendMail({
    // from: process.env.SMPT_FROM_HOST ,
    from: "fakeacc6862@gmail.com",
    to: user,
    subject: "new placement offer from your college",
    html: emailTemplate,
  });
};
const sendEmail2 = async function (data, user) {
  console.log("varad");
  const transporter = nodemailer.createTransport({
    // host:process.env.SMPT_HOST,
    // port: process.env.SMPT_PORT,
    host: "smtp.elasticemail.com",
    port: 587,
    secure: false,
    auth: {
      user: "fakeacc6862@gmail.com",

      pass: "47E85993DC7394854F4E87B9F47289D636F1",
    },
  });

  const emailTemplate = `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Congratulations!</title>
      <style>
          body {
              font-family: Arial, sans-serif;
              background-color: #f0f0f0;
              margin: 0;
              padding: 0;
          }
          .container {
              max-width: 600px;
              margin: 20px auto;
              background-color: #fff;
              padding: 20px;
              border-radius: 10px;
              box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
          }
          .header {
              text-align: center;
              margin-bottom: 30px;
          }
          .header h1 {
              color: #333;
          }
          .message {
              padding: 20px;
              background-color: #f9f9f9;
              border-radius: 5px;
              text-align: center;
          }
          .message h2 {
              color: #007bff;
              margin-bottom: 10px;
          }
          .signature {
              margin-top: 30px;
              text-align: center;
          }
          .signature p {
              margin: 5px 0;
          }
      </style>
  </head>
  <body>
      <div class="container">
          <div class="header">
              <h1>Congratulations!</h1>
          </div>
          <div class="message">
              <h2>You are hired!</h2>
              <p>We are thrilled to inform you that you have been hired at [Company Name].</p>
              <p>Welcome to the team! We look forward to working with you and achieving great success together.</p>
          </div>
          <div class="signature">
              <p>Best regards,</p>
              <p>${data}</p>
             
          </div>
      </div>
  </body>
  </html>
  `;

  await transporter.sendMail({
    // from: process.env.SMPT_FROM_HOST ,
    from: "fakeacc6862@gmail.com",
    to: user,
    subject: "new placement offer from your college",
    html: emailTemplate,
  });
};

// function myTask() {
//   console.log("Cron job is running...");
// }

// // Schedule a cron job to run myTask every minute
// cron.schedule("* 0 * * * *", myTask);

const formatDataToSend = (user) => {
  const access_token = jwt.sign(
    {
      id: user._id,
    },
    "varad177"
  );

  return {
    access_token,
    email: user.email,
    username: user.username,
    _id: user._id,
    status: user.status,
  };
};
const formatDataToSend2 = (user) => {
  const access_token = jwt.sign(
    {
      id: user._id,
    },
    "varad177"
  );

  return {
    access_token,
    email: user.email,
    name: user.cname,
    username: user.username,
    status: user.status,
  };
};

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    return res.status(401).json({
      error: "no access token",
    });
  }

  jwt.verify(token, "varad177", (err, user) => {
    if (err) {
      return res.status(403).json({
        error: "access token invalid",
      });
    }

    req.user = user.id;
    next();
  });
};

// config cloudinary
v2.config({
  cloud_name: "do8ji7uqc",
  api_key: "738935516257416",
  api_secret: "DX5PLGdpT-OBOxYhTlq6l5vCNxY",
});

const upload = multer({
  dest: "uploads/",
  limits: { fileSize: 50 * 1024 * 1024 }, // 50 mb in size max limit
  storage: multer.diskStorage({
    destination: "uploads/",
    filename: (_req, file, cb) => {
      cb(null, file.originalname);
    },
  }),
  fileFilter: (_req, file, cb) => {
    let ext = path.extname(file.originalname);
    if (
      ext !== ".jpg" &&
      ext !== ".jpeg" &&
      ext !== ".webp" &&
      ext !== ".png" &&
      ext !== ".mp4"
    ) {
      cb(new Error(`Unsupported file type! ${ext}`), false);
      return;
    }

    cb(null, true);
  },
});

//server creates above

//all routes come below

server.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if the email is already registered
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }

    // Create a new user
    const newUser = new User({ username, email, password });
    return newUser.save().then((u) => {
      return res.status(200).json(formatDataToSend(u));
    });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

server.post("/login", async (req, res) => {
  const { emailOrUsername, password } = req.body;

  try {
    // Check if the user exists with the provided email or username
    const user = await User.findOne({
      $or: [{ email: emailOrUsername }, { username: emailOrUsername }],
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if the provided password matches the stored password

    if (user.password != password) {
      return res.status(401).json({ error: "Invalid password" });
    }

    return res.status(200).json(formatDataToSend(user));
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

//compony routes

server.post("/add-company", async (req, res) => {
  try {
    const {
      cname,
      jobRole,
      logoUrl,
      eligibility,
      applicationDeadline,
      companyVisitDate,
      description,
    } = req.body;

    // Create a new company document
    const newCompany = new Company({
      cname,
      jobRole,
      logoUrl,
      eligibility,
      applicationDeadline,
      companyVisitDate,
      description,
    });

    const user = await User.find({});

    for (let i = 0; i < user.length; i++) {
      await sendEmail("http://localhost:5173", user[i].email);
    }

    // Save the new company document to the database
    console.log(newCompany);

    const savedCompany = await newCompany.save();

    res.status(201).json(savedCompany); // Return the saved company document
  } catch (error) {
    res.status(500).json({ error: error.message }); // Handle errors
  }
});

server.get("/get-all-company", async (req, res) => {
  try {
    // Fetch all companies from the database
    const companies = await Company.find();

    // Initialize an array to store data for all 12 months
    const companiesByMonth = Array.from({ length: 12 }, (_, index) => {
      const monthName = new Date(2022, index, 1).toLocaleString("default", {
        month: "long",
      });
      return { month: monthName, companies: [] };
    });

    // Iterate over the fetched companies
    companies.forEach((company) => {
      // Extract months from company visit date and application deadline
      const visitDate = new Date(company.companyVisitDate);
      const deadlineDate = new Date(company.applicationDeadline);

      // Determine the month based on the earliest of the visit date and application deadline
      const earliestMonthIndex =
        visitDate <= deadlineDate
          ? visitDate.getMonth()
          : deadlineDate.getMonth();

      // Add company to the respective month
      const companyData = {
        _id: company._id,
        companyName: company.cname,
        applicationDeadline: company.applicationDeadline,
        companyVisitDate: company.companyVisitDate,
      };

      companiesByMonth[earliestMonthIndex].companies.push(companyData);

      // If the company's visit date falls into a different month, add it to that month as well
      if (visitDate.getMonth() !== earliestMonthIndex) {
        const visitMonthIndex = visitDate.getMonth();
        const visitMonthCompany = {
          ...companyData,
          applicationDeadline: "",
          companyVisitDate: company.companyVisitDate,
        };
        companiesByMonth[visitMonthIndex].companies.push(visitMonthCompany);
      }
    });

    // Send the formatted data as response
    return res.status(200).json(companiesByMonth);
  } catch (error) {
    console.error("Error fetching companies:", error.message);
    res.status(500).json({ error: "Error fetching companies" });
  }
});

// componay cred

server.post("/add-compony-cred", async (req, res) => {
  try {
    const { cname, email, password, status } = req.body;
    const newCredentials = new CompanyCredSchema({
      cname,
      email,
      password,
      status,
    });
    await newCredentials.save();
    res
      .status(201)
      .json({ message: "Company credentials created successfully" });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

server.post("/company-login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists with the provided email
    const user = await CompanyCredSchema.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "company not found" });
    }

    // Check if the provided password matches the stored password
    if (user.password !== password) {
      return res.status(401).json({ error: "Invalid password" });
    }

    return res.status(200).json(formatDataToSend2(user));
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

server.get("/all-company-names", async (req, res) => {
  try {
    // Fetch all company names from the database
    const companies = await CompanyCredSchema.find({}, { cname: 1 });

    // Extract only the cname field from the retrieved documents

    const companyNames = companies.map((company) => company.cname);

    res.status(200).json(companyNames);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

server.post("/company-by-id", async (req, res) => {
  const { _id } = req.body;

  try {
    // Find the company by _id
    const company = await Company.findById(_id).populate("userIds"); // Populate the userIds field with user details if needed

    if (!company) {
      return res.status(404).json({ error: "Company not found" });
    }

    res.status(200).json(company);
  } catch (error) {
    console.error("Error getting company details:", error.message);
    res.status(500).json({ error: "Server error" });
  }
});

server.post("/apply", verifyJWT, async (req, res) => {
  const { companyId, name, jobRole } = req.body;
  const userId = req.user;

  try {
  
    // Find the company document by companyId
    const company = await Company.findById(companyId);

    if (!company) {
      return res.status(404).json({ error: "Company not found" });
    }

    // Check if the user has already applied by searching for userId in userIds array
    const userAlreadyApplied = company.userIds.some(
      (user) => user.userId.toString() === userId.toString()
    );

    if (userAlreadyApplied) {
      return res.status(400).json({ error: "User has already applied" });
    }

    // Find the user document by userId to retrieve the email
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Push the new userId, email, and jobRole to the userIds array
    company.userIds.push({ userId, name, jobRole });

    // Save the updated company document
    await company.save();

    // Return the updated company document
    res.status(200).json({ company });
  } catch (error) {
    console.error("Error adding user and job role to company:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Server code to fetch all users associated with a company job using populate

server.post("/get-all-user-job", async (req, res) => {
  try {
    const name = req.body.name; // Assuming name is sent from the frontend

    // Retrieve all entries from the Company collection and populate the userIds.userId field
    const companies = await Company.find({ cname: name }).populate(
      "userIds.userId",
      "username email logourl cover hired" // Specify the fields to select from the populated document
    );

    console.log(companies);

    return res.status(200).json(companies); // Send the companies as JSON response
  } catch (error) {
    console.error("Error fetching companies:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

//gemini

server.post("/google", async (req, res) => {
  const { prompt } = req.body;

  console.log(prompt);

  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();

  return res.status(200).json(text);
});

server.post("/update-profile", upload.single("avatar"), async (req, res) => {
  try {
    const { heading, _id } = req.body;

    // Find the user by ID
    const user = await User.findById(_id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Update user's profile information
    user.cover = heading;

    // If file is uploaded
    if (req.file) {
      const result = await cloudinary.v2.uploader.upload(req.file.path, {
        folder: "bll",
        crop: "fill",
      });

      if (result && result.secure_url) {
        user.public_url = result.public_id;
        user.logourl = result.secure_url;

        // Remove the file from the local system
        fs.rm(`uploads/${req.file.filename}`);
      } else {
        return res.status(500).json({ error: "Failed to upload image" });
      }
    } else {
      return res.status(400).json({ error: "File not found" });
    }

    // Save the updated user profile
    await user.save();

    return res
      .status(200)
      .json({ message: "Profile updated successfully", user });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

server.post("/change-status", async (req, res) => {
  const { userId } = req.body;

  try {
    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (user.hired == false) {
      await sendEmail2(user.name, user.email);
    }

    user.hired = !user.hired;
    await user.save();

    return res.json({ message: "Hire status toggled successfully", user });
  } catch (error) {
    console.error("Error toggling hire status:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

server.get("/get-count", async (req, res) => {
  try {
    const hiredTrueCount = await User.countDocuments({ hired: true });
    const hiredFalseCount = await User.countDocuments({ hired: false });

    return res.status(200).json({ hiredTrueCount, hiredFalseCount });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

server.post("/best-students", async (req, res) => {
  try {
    const users = await User.find({ cover: { $exists: true, $ne: "" } });

    let { cname } = req.body;

    if (!cname) {
      throw new Error("Company name is required");
    }

    // Convert cname to case-insensitive regular expression
    cname = new RegExp(cname, "i");

    // Map each user to extract specific fields

    const companies = await Company.find({ cname });
    console.log(companies);

    if (!companies || companies.length === 0) {
      throw new Error("Companies not found");
    }

    const companyDescriptions = companies.map((company) => company.description);

    console.log(companyDescriptions);

    const prompt = `See, I have an array of students which is ${users}. From that, see the cover part and compare it with the following company description: ${companyDescriptions}. Then, give the highest student with their id, name, email, logoUrl and compare on the basis of keyword and give me student if exist otherwise dont give me anything`;

    console.log(prompt);

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return res.status(200).json(text);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: error.message });
  }
});

server.get("/hired", async (req, res) => {
  try {
    const users = await User.find({ hired: true }).exec();
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


server.listen(PORT, () => {
  console.log(`listing on ${PORT}`);
});
