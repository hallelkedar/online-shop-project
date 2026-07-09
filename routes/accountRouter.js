import express from "express";
import { getAccountBalance } from "../service/customersService.js";

const router = express.Router();

router.get("/balance", async (req, res) => {
  try {
    const { customerId } = req.query;
    if (!customerId)
      return res
        .status(400)
        .json({ success: false, message: "customerId is require field" });
    const balance = await getAccountBalance(customerId);
    if (!balance) {
      return res
        .status(404)
        .json({ success: false, message: "Customer not found" });
    }
    return res.json({ success: true, data: balance });
  } catch {
    return res
      .status(500)
      .json({ success: false, message: "Iternal server error" });
  }
});

export default router;
