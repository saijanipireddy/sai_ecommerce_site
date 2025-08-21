import jwt from "jsonwebtoken";

const adminAuth = (req, res, next) => {
  try {
    console.log("Cookies received:", req.cookies);

    const { token } = req.cookies;
    if (!token) {
      return res.status(401).json({ message: "No token, admin not authorized" });
    }

    const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);

    if (verifiedToken.email !== process.env.ADMIN_EMAIL) {
      return res.status(403).json({ message: "Access denied: Not admin" });
    }

    req.adminEmail = verifiedToken.email; 
    next();
  } catch (error) {
    console.error("Admin authentication error:", error.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

export default adminAuth;
