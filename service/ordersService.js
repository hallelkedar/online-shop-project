import { id } from "zod/locales";
import { createItem, getItem, getItems, updateQuantity } from "../data/repo.js";
import { customersPATH as customersPath } from "./customersService.js";
import { FILEPATH as productPath } from "./productsService.js";

const FILEPATH = "./data/orders.json";

export async function getOrders(customerId = null) {
  const orders = await getItems(FILEPATH);
  if (customerId) {
    return orders.filter((order) => order.customerId === customerId);
  }
  return orders;
}

export async function makeOrder(customerId) {
  
  const customer = await getItem(customersPath, customerId);
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
  const orders = await getItems(FILEPATH)

  if (updated) {
    await createItem(FILEPATH, {
        id: Math.max(0, orders.map(order => order.id)) + 1,
        customerId,
        items: cart,
        total,
        createAt: new Date()
    })
    return true
  }
}
