import jwt from "jsonwebtoken";

export const genToken = async (userId) => {
  try {
    return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
  } catch (error) {
    console.log("Token error:", error.message);
  }
};

export const genToken1 = async (email) => {
  try {
    
    return jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "7d" });
  } catch (error) {
    console.log("Token error:", error.message);
  }
};
