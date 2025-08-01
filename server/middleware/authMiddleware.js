const jwt = require("jsonwebtoken");
const User = require("../models/User");

const verifyToken = async (req, res, next)=>{
    const webtoken = req.header("Authorization");
    console.log("Token from middleware", webtoken);
    if(!webtoken){
        return res.status(401).json({msg:"Unauthorized, token not found..!"});
    }
    const token = webtoken.replace("Bearer","").trim();
    try{
        const isVerified = jwt.verify(token, process.env.JWT_SECRET_KEY);
        console.log("Email from token:", isVerified.email);
        const userData = await User.findOne({email: isVerified.email}).select("-password");
        if (!userData) {
            return res.status(401).json({ msg: "User not found. Invalid token." });
        }

        req.user = userData;
        req.token = token;
        req.userId = userData._id;
        console.log(userData);
        next();
    }
    catch(error){
        return res.status(401).json({msg: "Unauthorized, Invalid Token..!"})
    }
} 
module.exports = verifyToken;