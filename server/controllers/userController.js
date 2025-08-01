const User = require("../models/User");
const bcrypt = require("bcryptjs");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
// const sendEmail = require("../config/sendEmail");


const register = async(req, res)=>{
    try{
        console.log("Incoming Data:", req.body);
        const {name, email, password, phonenumber, role } = req.body;

        const UserExist = await User.findOne({email});
        if(UserExist){
            return res.status(400).json({msg: "Email Already Exists...!"});
        }
        const newUser = await User.create({
            name,
            email,
            password,
            phonenumber,
            role
        });
        console.log("User Created Successfully...!");

        return res.status(201).json({
            msg: "User Regsitered Successfully..!",
            userId: newUser._id.toString()
        });
        
    }
    catch(error){
        if(error.name === "ValidationError"){
            return res.status(400).json({msg:error.message});
        }
        return res.status(500).json({msg : "Internal Server Error"});
    }
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if email exists
    const userExist = await User.findOne({ email });
    if (!userExist) {
      return res.status(400).json({ msg: "Email not found" });
    }

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, userExist.password);
    if (!isPasswordValid) {
      return res.status(401).json({ msg: "Incorrect password" });
    }

    // Generate JWT token
    const token = await userExist.generateToken();

    return res.status(200).json({
      msg: "Login Successfully..!",
      user: userExist.name,
      token,
      userId: userExist._id.toString()
    });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({
      msg: "Internal Server Error..!",
      error: error.message
    });
  }
};


const getCurrentUser = async (req, res)=>{
   try {
    const id = req.params.id;
    const response = await User.findOne({ _id: id });
    return res.status(200).json({ msg: response });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const checkusertoken = async (req, res) => {
  try {
    const userData = req.user;
    console.log(userData);
    return res.status(200).json({
  userData: {
    userId: userData._id,
    name: userData.name,
    email: userData.email,
    bio: userData.bio,
    avatar: userData.avatar ,
    createdAt: userData.createdAt,
  },
});

  } catch (error) {
    console.log(`Error from the user Route ${error}`);
  }
};
const updateUserProfile  = async (req, res) => {
  try {
    const userId = req.params.id;
    const { name, email, bio} = req.body;

    // Find User 
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ msg: "User not found" }); 

    // Update fields
    if (name) user.name = name;
    if (email) user.email = email;
    if (bio !== undefined) user.bio = bio;

    // Handle avatar (optional image)
    if (req.file) {
      const oldPath = user.avatar  && path.join(__dirname, '..', user.avatar );
      if (oldPath && fs.existsSync(oldPath)) {
        fs.unlinkSync(oldPath); // delete old image
      }

      user.avatar = req.file.path.replace(/\\/g, "/"); // ✅ convert \ to /

    }
    await user.save();

    res.status(200).json({
      msg: "Profile updated successfully",
      user,
    });
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ msg: "Internal Server Error", error: error.message });
  }
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ msg: "User not found" });
  }

  const token = crypto.randomBytes(32).toString("hex");
  const expiry = Date.now() + 1000 * 60 * 10; // 10 minutes

  user.resetToken = token;
  user.resetTokenExpiry = expiry;
  await user.save();

  const resetLink = `http://localhost:5173/reset-password/${token}`;

  const html = `
    <h3>Reset Your Password</h3>
    <p>Click the link below to reset your password. This link expires in 10 minutes:</p>
    <a href="${resetLink}">${resetLink}</a>
  `;

  await sendEmail(user.email, "Password Reset", html);

  res.status(200).json({ msg: "Reset link sent to your email" });
};

const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  const user = await User.findOne({
    resetToken: token,
    resetTokenExpiry: { $gt: Date.now() }
  });

  if (!user) {
    return res.status(400).json({ msg: "Invalid or expired token" });
  }

  user.password = password;
  user.resetToken = undefined;
  user.resetTokenExpiry = undefined;
  await user.save();

  res.status(200).json({ msg: "Password reset successful" });
};

module.exports = { register, login, getCurrentUser, checkusertoken , updateUserProfile, 
  forgotPassword, resetPassword
};