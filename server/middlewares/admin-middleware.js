const adminMiddleware = async (req, res, next) => {
    try {
        if (req.user.role !== "admin") {
            return res.status(403).json({ message: "Access denied. Admins only." });
        }
        next();
    } catch (error) {
        console.error("Error in adminMiddleware:", error);
        next(error)
    }
};

module.exports = adminMiddleware;