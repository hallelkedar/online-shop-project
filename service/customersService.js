import { custom } from "zod";
import { getItem, updateItem } from "../data/repo.js";
import { FILEPATH as productsPATH} from "./productsService.js";

export const customersPATH = "./data/customers.json";

export async function getCustomerCart(id) {
  const customer = await getItem(customersPATH, id);
  if (!customer) return false;
  return customer.cart;
}

export async function addItemToCart(data) {
  const { productId, customerId, quantity } = data;

  const cart = await getCustomerCart(customerId);
  if (!cart) return { success: false, data: "not found" };
  
  const product = await getItem(productsPATH, productId);
  if (!product) return { success: false, data: "not found" };
  
  if (product.stock < quantity) return { success: false, data: "stock out" };

  cart.push({ customerId, quantity });
  await updateItem(customersPATH, customerId, { cart });
  return { success: true, data: cart };
}

export async function getAccountBalance(customerId) {
    const customer = await getItem(customersPATH, customerId)
    if (!customer) return false
    return customer.balance
}   