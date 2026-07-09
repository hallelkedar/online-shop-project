import express from "express";
import { getOrders, makeOrder } from "../service/ordersService.js";
import { check } from "zod";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { customerId } = req.query;
    const orders = await getOrders(customerId);
    res.json({ success: true, data: orders });
  } catch {
    res.status(500).json({ success: false, message: "Iternal server error" });
  }
});

router.post("/checkout", async (req, res) => {
  try {
    const { customerId } = req.body;
    if (!customerId) {
      return res
        .status(400)
        .json({ success: false, message: "customerId is require field" });
    }
    const result = await makeOrder(customerId);
    if (!result.success) {
      return res.status(400).json(result);
    }
    return res.json(result);
  } catch {
    res.status(500).json({ success: false, message: "Iternal server error" });
  }
});

export default router;
