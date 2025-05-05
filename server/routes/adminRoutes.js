const express = require("express");
const {
  loginAdmin,
  registerAdmin,
  getCurrentUser,
} = require("../controllers/adminController.js");
const router = express.Router();
const authMiddleware =  require ('../middlewares/authMiddleware.js');

router.post("/login", loginAdmin);
router.post("/register", registerAdmin);
router.get("/current-user",authMiddleware, getCurrentUser);

module.exports = router;
