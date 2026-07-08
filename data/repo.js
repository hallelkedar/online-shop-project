import fs from "fs";

export async function getItems(filepath) {
  const items = await fs.readFile(filepath);
  return JSON.parse(items);
}

export async function saveToDB(filepath, items) {
  await fs.writeFile(filepath, JSON.stringify(items, null, 2));
}

export async function getItem(filepath, id, customers = false) {
  const items = await getItems(filepath);
  if (customers) {
    const item = items.find((item) => item.customerId);
  } else {
    const item = items.find((item) => item.id);
  }
  if (!item) return false;
  return item;
}

export async function createItem(filepath, data) {
  const items = await getItems(filepath);
  const newList = [...items];
  newList.push({ ...data });
  if (items.length === newList.length) return false;
  await saveToDB(filepath);
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

  await saveToDB(filepath);
  return true;
}

export async function deleteItem(filepath, id, data, customers = false) {
  const items = await getItems(filepath);
  if (customers) {
    const filteredItems = items.filter((item) => item.customerId !== id);
  } else {
    const filteredItems = items.filter((item) => item.id !== id);
  }
  

  if (items.length === filteredItems) return false;

  await saveToDB(filepath);
  return true;
}
