import express from "express";
import "dotenv/config";
import accountRouter from "../routes/accountRouter.js";
import cartRouter from "../routes/cartRouter.js";
import ordersRouter from "../routes/ordersRouter.js";
import productRouter from "../routes/productsRouter.js";

const PORT = process.env.PORT;

const app = express();

app.use("/account", accountRouter);
app.use("/cart", cartRouter);
app.use("/orders", ordersRouter);
app.use("/products", productRouter);

app.get("/", (req, res) => {
  res.json({ msg: "Welcome to shoes shop server api" });
});

app.get("/health", (res, req) => {
  res.json({ msg: "server is up!" });
});

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
