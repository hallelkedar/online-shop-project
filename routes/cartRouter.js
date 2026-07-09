import express from "express";
import addItemValidation from "../utils/cartValitation.js";
import { getCustomerCart, addItemToCart } from "../service/customersService.js";
import { deleteItemFromCart } from "../data/repo.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { customerId } = req.query;
    if (!customerId) {
      return res
        .status(400)
        .json({ success: false, message: "customerId is require." });
    }
    const cart = await getCustomerCart(customerId);
    if (!cart) {
      return res
        .status(404)
        .json({ success: false, message: "Customer not found." });
    }
    return res.json({ success: true, data: cart });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Iternal server error" });
  }
});

router.post("/items", async (req, res) => {
  try {
    const validation = addItemValidation.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({
        success: false,
        massage: validation.error.issues.message,
      });
    }
    const result = await addItemToCart(req.body);
    if (!result.success) {
      if (!result.data === "not found") {
        return res
          .status(404)
          .json({ success: false, massage: "Product or Customer not found" });
      }
      return res
        .status(400)
        .json({ success: false, massage: "Product is out of stock" });
      return res.status(201).json({ result });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Iternal server error" });
  }
});

router.delete("/items/:productId", async (req, res) => {
  try {
    const { customerId } = req.body;
    if (!customerId) {
      return res
        .status(400)
        .json({ success: false, message: "customerId is require." });
    }
    const deleted = await deleteItemFromCart(req.params.productId, customerId);
    if (!deleted) {
      return res
        .status(404)
        .json({ success: false, message: "Product or Customer not found" });
    }
    return res.json({ success: true, data: {} });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Iternal server error" });
  }
});

export default router;
