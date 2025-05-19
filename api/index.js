import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import crypto from "crypto";
import dotenv, { decrypt } from "dotenv";
import bcrypt from "bcryptjs";
import User from "../api/models/userModel.js";
import Order from "../api/models/order.js";
import admin from "./firebase.js";
import cron from 'node-cron';
import { OAuth2Client } from "google-auth-library";


dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(cors());

const client = new OAuth2Client("534135288686-c39dv0vl3tfiv6mrpi876ebtadtdsr5c.apps.googleusercontent.com")


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

const IP = "192.168.0.134";

const PORT = 3000;

app.listen(PORT, IP, () => {
  console.log(`Server is running at http://${IP}:${PORT}`);
});


app.post("/google-login", async (req, res) => {
  const { idToken } = req.body;
  console.log("id token",idToken)

  try {
    const ticket = await client.verifyIdToken({
      idToken,
      audience: "534135288686-c39dv0vl3tfiv6mrpi876ebtadtdsr5c.apps.googleusercontent.com",
    });

    const payload = ticket.getPayload(); 
    const { email, name, picture } = payload;

    let user = await User.findOne({ email });

    if (!user) {
      
      user = new User({
        name,
        email,
        verified: true,
        authType: "google", 
      });
      await user.save();
      console.log("User Created and Saved");
    }
    
    const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: "7d" });

    res.status(200).json({ token, user });

  } catch (error) {
    console.error("Google login error:", error);
    res.status(401).json({ message: "Google login failed" });
  }
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

    const hashedPassword = await bcrypt.hash(password,10);


    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
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

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    if (!user.verified) {
      return res.status(403).json({
        message: "Account not verified. Please check your email for the verification link.",
      });
    }

    const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: "7d" });

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
    const addresses = user.addresses;
    res.status(200).json({ addresses });
  } catch (error) {
    res.status(500).json({ message: "Error retrieveing the addresses" });
  }
});

const scheduleOneTimeNotification = async (user, delayInMinutes) => {
  const delayInMilliseconds = delayInMinutes * 60 * 1000;  

  setTimeout(async () => {
    try {
      const message = {
        token: user.fcmToken,
        notification: {
          title: "Order Placed",
          body: "Your order will be processed shortly.",
        },
        data: {
          url:  `amazon://orders/${user._id}`,  
        },
      };
      console.log('Sending scheduled notification...');
      const response = await admin.messaging().send(message);

      console.log('Scheduled notification sent successfully',response);
    } catch (error) {
      console.error("Error sending scheduled notification:", error);
    }
  }, delayInMilliseconds);
};
app.post("/orders", async (req, res) => {
  try {
    const { userId, cartItems, totalPrice, shippingAddress, paymentMethod } = req.body;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const order = new Order({
      user: userId,
      products: cartItems,
      totalPrice: totalPrice,
      shippingAddress: shippingAddress,
      paymentMethod: paymentMethod,
    });
    await order.save();

    await scheduleOneTimeNotification(user, 1);

    return res.status(200).json({ message: "Order placed and notification scheduled." });
  } catch (error) {
    console.error("Error placing order or scheduling notification:", error);
    return res.status(500).json({ message: "Internal server error" });
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
  console.log("UserId", userId)
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
    await user.save()
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
  try {
    const user = await User.findOne({ "addresses._id": addressId });

    if (!user) {
      return res.status(404).json({ message: "Address not found" });
    }
    const address = user.addresses.id(addressId);
    if (!address) {
      return res.status(404).json({ message: "Address not found in user document" });
    }
    Object.keys(update).forEach((key) => {
      if (key in address) {
        address[key] = update[key];
      }
    });
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


app.post('/user/:userId/fcmtoken', async (req, res) => {
  try {
    const { token } = req.body;
    const userId = req.params.userId;

    if (!userId || !token) {
      return res.status(400).json({ message: 'userId and token are required' });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { fcmToken: token },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    console.log("Token Saved");
    return res.status(200).json({ message: 'FCM token updated successfully', user });
  } catch (error) {
    console.error('Error updating FCM token:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});
