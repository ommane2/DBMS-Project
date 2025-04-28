const Admin = require('../models/Admin');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");


exports.loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    res.status(200).json({ message: "Successfully Login!!", token });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

