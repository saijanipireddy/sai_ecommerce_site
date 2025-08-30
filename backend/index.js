import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/authRoutes.js';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import oredrRoutes from './routes/orderRoutes.js';
import assistantRoutes from './routes/assistantRoutes.js';



dotenv.config();
console.log("Cloudinary Vars:", process.env.CLOUDINARY_NAME, process.env.CLOUDINARY_API_KEY);

let port = process.env.PORT || 6000;

let app = express();


app.use(cookieParser());
app.use(cors({
    origin: ["https://sai-ecommerce-site-frontend.onrender.com","https://sai-ecommerce-site-admin.onrender.com"],
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE"
}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/api/auth",authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/product",productRoutes)
app.use("/api/cart", cartRoutes)
app.use("/api/order", oredrRoutes)
app.use("/assistant", assistantRoutes);


app.get("/",(req,res)=>{
    res.send("HELLO CHANDU");
})

app.listen(port,()=>{
    console.log("Server Running Successfully", port);
    connectDB()
})
