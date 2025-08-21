import User from "../models/userModel.js";


// GET CURRENT LOGGED-IN USER

export const getCurrentUser = async (req, res) => {
  try {
    const userId = req.userId;  
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized: No userId in request" });
    }

    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ user });
  } catch (error) {
    console.error("Get Current User Error:", error);
    return res.status(500).json({ message: `Get Current User Error: ${error.message}` });
  }
};


// GET ADMIN DETAILS

export const getAdmin = async (req, res) => {
  try {
    const adminEmail = req.adminEmail;
    if (!adminEmail) {
      return res.status(401).json({ message: "Unauthorized: No adminEmail in request" });
    }

    return res.status(200).json({
      email: adminEmail,
      role: "admin"
    });
  } catch (error) {
    console.error("Get Admin Error:", error);
    return res.status(500).json({ message: `Get Admin Error: ${error.message}` });
  }
};
