import express from "express";
import Order from "../models/orderModel.js";
import User from "../models/userModel.js";
import Product from "../models/productModel.js";
import isAuth from "../middleware/isAuth.js";

const assistantRoutes = express.Router();

assistantRoutes.post("/chat", isAuth, async (req, res) => {
  try {
    const { message } = req.body;
    const userId = req.userId;

    let reply = "I’m not sure about that. Can you clarify?";
    let structuredProducts = [];

    const msg = message.toLowerCase();

    // Filter products by price or rating
    if (/product|item|catalog/i.test(msg)) {
      let filter = {};
      const priceMatch = msg.match(/below\s*₹?(\d+)/);
      const ratingMatch = msg.match(/(\d)-star/);

      if (priceMatch) filter.price = { $lte: Number(priceMatch[1]) };
      if (ratingMatch) filter.rating = { $gte: Number(ratingMatch[1]) };

      const products = await Product.find(filter).limit(10);

      if (products.length > 0) {
        structuredProducts = products.map(p => ({
          id: p._id,
          name: p.name,
          price: p.price,
          image: p.image1,
          rating: p.rating || 0,
          stock: p.stock || 0
        }));
      } else {
        reply = "No products match your criteria 😔.";
      }

    } else if (/cart|basket/i.test(msg)) {
      const user = await User.findById(userId);
      if (user?.cartData && Object.keys(user.cartData).length > 0) {
        structuredProducts = Object.entries(user.cartData).flatMap(([pid, sizes]) =>
          Object.entries(sizes).map(([size, qty]) => ({
            id: pid,
            name: `Product ${pid} (Size ${size})`,
            qty,
            price: qty * 100 // optional: fetch real product price
          }))
        );
      } else {
        reply = "Your cart is empty 🛒.";
      }

    } else if (/order|status/i.test(msg)) {
      const orders = await Order.find({ userId }).limit(5);
      if (orders.length > 0) {
        structuredProducts = orders.map(o => ({
          id: o._id,
          name: `Order ${o._id}`,
          price: o.amount,
          status: o.status
        }));
      } else {
        reply = "You have no recent orders.";
      }
    }

    return res.json({ reply, products: structuredProducts });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Assistant error" });
  }
});

export default assistantRoutes;
