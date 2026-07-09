import { getItems, getItem } from "../data/repo.js";

export const FILEPATH = "./data/products.json";

const productFilter = {
  inStock: (products) => products.filter((product) => product.stock > 0),

  maxPrice: (products, max) =>
    products.filter((product) => product.price <= max),

  search: (products, term) =>
    products.filter((product) => product.name.toLowerCase().trim().includes(term.toLowerCase().trim())),
};

export async function getProducts(
  inStock = false,
  maxPrice = null,
  search = null,
) {
  let productsResult = await getItems(FILEPATH);

  if (inStock === true) {
    productsResult = productFilter.inStock(productsResult);
  }
  if (maxPrice !== null & maxPrice !== undefined) {
    productsResult = productFilter.maxPrice(productsResult, maxPrice);
  }
  if (search && String(search).trim() !== '') {
    productsResult = productFilter.search(productsResult, search);
  }
  return productsResult;
}
