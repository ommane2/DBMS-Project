const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

const authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "Unauthorized. Token not provided" });
  }

  const jwtToken = token.replace("Bearer", "").trim();

  try {
    const isVerified = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);
    const { userID } = isVerified; // Assuming `role` is part of token payload



    const userData = await Admin
      .findById({ _id: userID })
      .select("-password");

    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }
    // console.log(userData)
    req.user = userData;
    req.token = token;
    req.userID = userData._id;
    // console.log("auth middleware passed");
    
    next();
  } catch (error) {
    console.error("Error verifying token:", error);
    return res.status(401).json({ message: "Unauthorized. Invalid Token." });
  }
};

module.exports = authMiddleware;