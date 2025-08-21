import jwt from 'jsonwebtoken';

const isAuth = (req, res, next) => {
    try {
        const token = req.cookies.token; 
        console.log("Token from cookie:", token);

        if (!token) {
            return res.status(401).json({ message: "User does not have a token" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded payload:", decoded);

        req.userId = decoded.userId;
        next();

    } catch (error) {
        console.log("isAuth error:", error.message);
        return res.status(401).json({ message: `isAuth Error: ${error.message}` });
    }
};

export default isAuth;
