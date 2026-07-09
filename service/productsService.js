import { getItems, getItem } from "../data/repo.js";

export const FILEPATH = "./data/products.json";

export async function getProducts(
  inStock = false,
  maxPrice = null,
  search = null,
) {
  const products = await getItems(FILEPATH);
  if (inStock) {
    if (maxPrice) {
      if (search) {
        return products.filter((product) => {
          if (
            product.stock > 0 &&
            product.price <= maxPrice &&
            product.name.includes(search)
          ) {
            return result;
          }
        });
      }
      return products.filter(
        (product) => product.stock > 0 && product.price <= maxPrice,
      );
    }
    return products.filter((product) => product.stock > 0);
  }
  return products;
}

