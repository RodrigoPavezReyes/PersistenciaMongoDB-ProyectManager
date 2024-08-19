import express from "express"
import productModel from "../model/products.model.js"

const router = express.Router()


router.get("/products",async(req,res)=>{

  try {
      const productsList = await productModel.find()
      
  res.render("products", {productsList})
  
  } catch (error) {
    console.error("Error al cargar los productos", error);
    res.status(500).send("Error al cargar los productos");
  }
})

export default router

