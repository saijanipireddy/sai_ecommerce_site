import uploadOnCloudinary from "../config/cloudinary.js"
import Product from "../models/productModel.js"



export const addProduct =async(req,res)=>{
    try {
        console.log("BODY:", req.body);
        console.log("FILES:", req.files);
        let {name,description,price,category,subCategory,sizes,bestSeller} = req.body
         if (!req.files || !req.files.image1 || !req.files.image1[0]) {
          return res.status(400).json({ message: "Image1 is required!" });
        }

        const image1 = req.files.image1?.[0]?.path 
        ? await uploadOnCloudinary(req.files.image1[0].path) 
        : null;

        const image2 = req.files.image2?.[0]?.path 
        ? await uploadOnCloudinary(req.files.image2[0].path) 
        : null;

        const image3 = req.files.image3?.[0]?.path 
        ? await uploadOnCloudinary(req.files.image3[0].path) 
        : null;

        const image4 = req.files.image4?.[0]?.path 
        ? await uploadOnCloudinary(req.files.image4[0].path) 
        : null;


        let parsedSizes = [];
        try {
        parsedSizes = sizes ? JSON.parse(sizes) : [];
        } catch (err) {
        return res.status(400).json({ message: "Invalid sizes format" });
        }


        let productData={
            name,
            description,
            price: Number(price),
            category,
            subCategory,
            sizes:  parsedSizes,
            bestSeller : bestSeller === "true",
            date : Date.now(),
            image1,
            image2,
            image3,
            image4
        }

       const product = await Product.create(productData);
        return res.status(201).json(product);
    } catch (error) {
        console.error("AddProduct Error:", error);
        return res.status(500).json({ message: `AddProduct Error: ${error.message}` });
    }
};

export const listProduct = async(req,res)=>{
    try {
        const product = await Product.find({})
        return res.status(200).json(product)
    } catch (error) {
        console.log("ListProduct Error")
        return res.status(500).json({message:`ListProduct Errror ${error}`})
    }
}

export const removeProduct =async (req,res)=>{
    try {
        let {id} =req.params;
        const product = await Product.findByIdAndDelete(id)
        return res.status(200).json(product)
    } catch (error) {
         console.log("RemoveProduct Error")
        return res.status(500).json({message:`RemoveProduct Errror ${error}`})
    }
}