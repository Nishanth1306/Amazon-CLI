import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import crypto from "crypto";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";

import User from "../api/models/userModel.js";
import Order from "../api/models/order.js";

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(cors());
//   cors({
//     origin: "*",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//   })
// );

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB", process.env.MONGO_URI);
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

app.get("/", (req, res) => {
  res.send("Server is not running");
});

const IP = "192.168.0.107";


const PORT = 3000;

app.listen(PORT, IP, () => {
  console.log(`Server is running at http://${IP}:${PORT}`);
});

const sendVerificationEmail = async (email, verificationToken) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Verify Your Email",
    text: `Please click the following link to verify your email: http://${IP}:${PORT}/verify/${verificationToken}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Verification email sent successfully");
  } catch (error) {
    console.error("Error sending verification email:", error);
  }
};
const sendForgotPasswordOTPEmail = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Reset Your Password - OTP Verification",
    text: `Your OTP for password reset is: ${otp}\nThis OTP is valid for 10 minutes.`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Password reset OTP email sent successfully");
  } catch (error) {
    console.error("Error sending OTP email:", error);
  }
};


app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    //console.log(req.body);

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }
    const newUser = new User({
      name,
      email,
      password: password,
      verificationToken: crypto.randomBytes(20).toString("hex"),
    });

    await newUser.save();

    await sendVerificationEmail(newUser.email, newUser.verificationToken);

    res.status(201).json({
      message: "User registered successfully. Please verify your email.",
    });
  } catch (error) {
    console.error("Error registering user:", error);
    
    res.status(500).json({ message:error.message,
      errors : error.errors});
  }
});

app.get("/verify/:token", async (req, res) => {
  try {
    const token = req.params.token;
    const user = await User.findOne({ verificationToken: token });

    if (!user) {
      return res.status(400).json({ message: "Invalid verification token" });
    }

    user.verified = true;
    user.verificationToken = undefined;

    await user.save();
    res.json({ message: "Email verified successfully" });
    console.log("Email verified successfully");
  } catch (error) {
    console.error("Error verifying user:", error);
    res.status(500).json({ message: "Email verification failed" });
  }
});

const generateSecretKey = () => {
  const secretKey = crypto.randomBytes(32).toString("hex");

  return secretKey;
};

const secretKey = generateSecretKey();

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

 
    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid password" });
    }

    if (!user.verified) {
      return res.status(403).json({
        message: "Account not verified. Please check your email for verification link.",
      });
    }
    const token = jwt.sign({ userId: user._id }, secretKey);
    console.log("User logged in successfully");

    res.status(200).json({ token });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Login failed. Please try again later." });
  }
});


app.post("/addresses", async (req, res) => {
  try {
    const { userId, address } = req.body;
    
    
    const user = await User.findById(userId);
    //console.log(user, address);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.addresses.push(address);

    await user.save();

    res.status(200).json({ message: "Address created Successfully" });
  } catch (error) {
    res.status(500).json({ message:"Make Sure You Have Entered All the Required Fields " });
    console.error(error)
  }
});

app.get("/addresses/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    //console.log(user)
    const addresses = user.addresses;
    res.status(200).json({ addresses });
  } catch (error) {
    res.status(500).json({ message: "Error retrieveing the addresses" });
  }
});

app.post("/orders", async (req, res) => {
  try {
    const { userId, cartItems, totalPrice, shippingAddress, paymentMethod } =
      req.body;
    

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const Products = cartItems.map((item) => ({
      title:item?.title,
      quantity: item?.quantity,
      price: item?.price,
      image: item?.image,
    }));

    const order = new Order({
      user: userId,
      products: Products,
      totalPrice: totalPrice,
      shippingAddress: shippingAddress,
      paymentMethod: paymentMethod,
    });

    await order.save();
    res.status(200).json({ message: "Order created successfully" });

  } catch (error) {
    res.status(500).json({ message: "Error creating order" });
    console.log("Error creating order", error);
  }
});

app.get("/orders/:userId",async(req,res) => {
  try{
    const userId = req.params.userId;

    const orders = await Order.find({user:userId}).populate("user");

    if(!orders || orders.length === 0){
      return res.status(404).json({message:"No orders found for this user"})
    }

    res.status(200).json({ orders });
  } catch(error){
    res.status(500).json({ message: "Error"});
  }
})

app.get("/profile/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving the user profile" });
  }
});

app.post("/forgot-password", async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.resetPasswordOTP = otp;
    user.resetPasswordExpires = Date.now() + 5 * 60 * 1000; 

    await user.save();
    await sendForgotPasswordOTPEmail(email, otp);

    res.status(200).json({ message: "OTP sent to email" });
  } catch (error) {
    res.status(500).json({ message: "Failed to send OTP", error });
  }
});

app.post("/reset-password", async (req, res) => {
  const { email, otp, newPassword } = req.body;

  try {
    const user = await User.findOne({ email });
    //console.log(user); 

    if (
      !user ||
      user.resetPasswordOTP !== otp ||
      !user.resetPasswordExpires ||
      user.resetPasswordExpires < Date.now()
    ) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    const isValidPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/.test(newPassword);
    if (!isValidPassword) {
      return res.status(400).json({
        message:
          "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
      });
    }

    user.password = newPassword;
    user.resetPasswordOTP = null;
    user.resetPasswordExpires = null;

    await user.save();

    res.status(200).json({ message: "Password reset successfully!" });
  } catch (error) {
    console.error("Error resetting password:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

app.delete("/addresses/:userId/:addressId", async (req, res) => {
  const { userId, addressId } = req.params;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.addresses = user.addresses.filter(
      (address) => address._id.toString() !== addressId
    );

    await user.save();

    res.status(200).json({ message: "Address deleted successfully" });
  } catch (error) {
    console.error("Error deleting address:", error);
    res.status(500).json({ error: "Failed to delete address" });
  }
});


app.post("/user/:userId/wishlist", async (req, res) => {
  const { userId } = req.params;
  const { name, id,description, price, color,image } = req.body;
  try {
    const user = await User.findById(userId);
    const newProduct = {
      name,
      id,
      description,
      price,
      color,
      image,
    };

    console.log(newProduct);
    user.wishlist.push(newProduct);
    await user.save();

    res.status(201).json({ message: "Product added to wishlist", wishlist: user.wishlist });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.get("/user/:userId/wishlist", async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);
    res.status(200).json(user.wishlist); 
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.delete('/user/:userId/wishlist/:productId', async (req, res) => {
  const { userId, productId } = req.params;
  console.log(userId, productId);

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const originalLength = user.wishlist.length;


    user.wishlist = user.wishlist.filter(item => item.id !== productId);

    if (user.wishlist.length === originalLength) {
      return res.status(404).json({ message: 'Product not found in wishlist' });
    }

    await user.save();
    res.status(200).json({ message: 'Product removed from wishlist' });
  } catch (error) {
    console.error('Error removing product from wishlist:', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
});


app.put('/addresses/:addressId', async (req, res) => {
  const { addressId } = req.params;
  const update = req.body;
  console.log(update);

  try {
   
    const user = await User.findOne({ "addresses._id": addressId });

    if (!user) {
      return res.status(404).json({ message: "Address not found" });
    }

    // Find the specific address and update its fields
    const address = user.addresses.id(addressId);
    if (!address) {
      return res.status(404).json({ message: "Address not found in user document" });
    }

    // Update only the fields that were provided
    Object.keys(update).forEach((key) => {
      if (key in address) {
        address[key] = update[key];
      }
    });

    // Save the updated user document
    await user.save();

    res.status(200).json({
      message: "Address updated successfully",
      address,
    });
  } catch (error) {
    console.error("Error updating address:", error);
    res.status(500).json({ message: "Server error" });
  }
});
