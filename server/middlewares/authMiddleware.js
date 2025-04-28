export const protectAdmin = (req, res, next) => {
    // Dummy authentication for now
    const token = req.headers.authorization;
    if (token === "admin-token") {
      next();
    } else {
      res.status(401).json({ message: "Not authorized" });
    }
  };
  