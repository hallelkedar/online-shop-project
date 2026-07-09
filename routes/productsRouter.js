import express from "express";
import { getProducts } from "../service/productsService.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { inStock, maxPrice, search } = req.query;
    const products = await getProducts(inStock, maxPrice, search);
    res.json({ success: true, data: products });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Iternal server error" });
  }
});

export default router;
