import fs from "fs/promises";

export async function getItems(filepath) {
  const items = await fs.readFile(filepath, "utf8");
  return JSON.parse(items);
}

export async function saveToDB(filepath, items) {
  await fs.writeFile(filepath, JSON.stringify(items, null, 2));
}

export async function getItem(filepath, id, customers = false) {
  const items = await getItems(filepath);
  let item;
  if (customers) {
    item = items.find((item) => item.customerId);
  } else {
    item = items.find((item) => item.id);
  }
  if (!item) return false;
  return item;
}

export async function createItem(filepath, data) {
  const items = await getItems(filepath);
  const newList = [...items];
  newList.push({ ...data });
  if (items.length === newList.length) return false;
  await saveToDB(filepath, items);
  return true;
}

export async function updateItem(filepath, id, data, customers = false) {
  const items = await getItems(filepath);
  if (customers) {
    const item = items.find((item) => item.customerId);
  } else {
    const item = items.find((item) => item.id);
  }
  if (!item) return false;

  Object.assign(item, data);

  await saveToDB(filepath, items);
  return true;
}

export async function deleteItemFromCart(productId, customerId) {
  const customers = await getItems("./data/customers.json");
  const customer = customers.find(
    (customer) => customer.customerId === customerId,
  );
  if (!customer) return false;

  const item = customer.cart.find((item) => item.productId === productId);
  if (!item) return false;

  const filteredCustomer = customer.cart.filter(
    (item) => item.productId !== productId,
  );

  if (customer.length === filteredCustomer.length) return false;

  await saveToDB("./data/customers.json", customers);
  return true;
}

export async function updateQuantity(cart) {
  const products = await getItems("./data/products.json");
  const modifyProduct = products.map((product) => {
    item = cart.find((item) => item.productId === product.id);
    if (item) return (product.quantity -= item.quantity);
  });
  if (products.length === modifyProduct.length) return false;

  await saveToDB("./data/products.json", products);
  return true;
}
