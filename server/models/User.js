const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email format"]
    },
    phonenumber: {
      type: String,
      required: true,
      match: [/^\d{10,15}$/, "Invalid phone number"]
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      match: [
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character"
      ]
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    avatar: {
      type: String,
      default: null // Store image URL here
    },
    resetToken: {
      type: String,
      default: null
    },
    resetTokenExpiry: {
      type: Date,
      default: null
    }
  },
  { timestamps: true }
);

//use hash algorithm with rounds for password security purpose
userSchema.pre("save", async function (next) {
  const user = this;

  if (!user.isModified("password")) {
    return next();
  }
  try {
    const saltpass = await bcrypt.genSalt(10);
    const hashpassword = await bcrypt.hash(user.password, saltpass);
    user.password = hashpassword;
    next();
  } catch (error) {
    console.error("Password hash error",error);
    next(error);
  }
});

// Password Comparison 
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};


//Tokenisation for authorization and authentication after registration
userSchema.methods.generateToken = async function () {
  try {
    const token = jwt.sign(
      {
        userId: this._id.toString(),
        email: this.email,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "3d" }
    );
    return token;
  } catch (error) {
    console.error("Error generating token:", error);
    throw new Error("Token generation failed."); // Throw an error to be handled in the controller
  }
};

const User = new mongoose.model("User", userSchema);
module.exports = User;