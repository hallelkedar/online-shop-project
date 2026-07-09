import { getItem, getItems, updateQuantity } from "../data/repo.js";
import { customersPATH as customersPath } from "./customersService.js";
import { FILEPATH as productPath } from "./productsService.js";

const FILEPATH = "orders.json";

export async function getOrders(customerId = null) {
  const orders = getItems(FILEPATH);
  if (customerId) {
    return orders.filter((order) => order.customerId === customerId);
  }
  return orders;
}

export async function makeOrder(customerId) {
  
    const customer = getItem(customersPath, customerId);
  if (!customer) return { success: false, message: "not found" };

  const products = getItems(productPath);

  const cart = customer.cart.filter(
    (item) =>
      products.find((product) => {
        product.id === item.productId;
      }).stock > 0,
  );
  const total = cart.reduce((total, item) => total + products.find(product => {
    product.id === item.productId
  }).price)

  if (cart.length === 0) {
    return { success: false, message: "All products are out of stock" }
  } 

  if (total > customer.balace) {
    return { success: false, message: "Not enough money on balance customer" }
  }

  const updated = await updateQuantity(cart)
  if (updated) return { success: true, data: cart }
}
