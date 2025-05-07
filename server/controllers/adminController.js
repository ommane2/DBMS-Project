const Admin = require("../models/Admin");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate fields
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required." });
    }

    // Find user
    const user = await Admin.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials." });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials." });
    }

    const token = await user.generateToken();

    if(token===undefined){
      return res.status(400).json({ message: "Invalid Token." });
    }

    return res
      .status(200)
      .json({
        message: "Login successfull!.",
        token,
        userId: user._id.toString(),
        userDetails: user,
      });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// --------------
// GET CURRENT USER Details
// --------------

exports.getCurrentUser = async (req, res) => {
  // console.log("get current user hit");
  try {
    const jwtToken = req.token; // Retrieve token from cookies
    const token = jwtToken.replace("Bearer", "").trim();
    // if(token){
    //     console.log("token got at current user: ",token);
    // }
    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }

    // Decode the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const { userID } = decoded;

    const userData = await Admin.findById({ _id: userID }).select("-password");

    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    // Respond with user data (excluding sensitive fields)
    res.status(200).json({
      userData,
    });
  } catch (error) {
    console.error("Error fetching current user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// *--------------------------
// User Registration Logic
// *--------------------------
exports.registerAdmin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validate fields
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Check if user already exists
    const existingUser = await Admin.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with given email or voter ID already exists." });
    }

    // Hash password
    // const hashedPassword = await bcrypt.hash(password, 10);

    // Create new voter
    await Admin.create({
      email,
      password,
    });

    // await user.save();

    return res.status(201).json({ message: "Admin registered successfully." });
  } catch (error) {
    console.error("Register Error:", error);
    next(error);
  }
};
