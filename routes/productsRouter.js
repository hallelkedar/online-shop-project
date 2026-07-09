import express from "express";
import { getProducts } from "../service/productsService.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { inStock, maxPrice, search } = req.query;
    
    const parsedInStock = inStock === "true"

    const parsedMaxPrice = maxPrice && !isNaN(maxPrice) ? Number(maxPrice) : null
    
    const products = await getProducts(parsedInStock, parsedMaxPrice, search);
    
    res.json({ success: true, data: products });
  
} catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
});

export default router;
