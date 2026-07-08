import fs from "fs";

export async function getItems(FILEPATH) {
  const items = await fs.readFile(FILEPATH);
  return JSON.parse(items);
}

export async function saveToDB(FILEPATH, items) {
  await fs.writeFile(FILEPATH, JSON.stringify(items, null, 2));
}

export async function getItem(FILEPATH, id, customers = false) {
  const items = await getItems(FILEPATH);
  if (customers) {
    const item = items.find((item) => item.customerId);
  } else {
    const item = items.find((item) => item.id);
  }
  if (!item) return false;
  return item;
}

export async function createItem(FILEPATH, data) {
  const items = await getItems(FILEPATH);
  const newList = [...items];
  newList.push({ ...data });
  if (items.length === newList.length) return false;
  await saveToDB(FILEPATH);
  return true;
}

export async function updateItem(FILEPATH, id, data, customers = false) {
  const items = await getItems(FILEPATH);
  if (customers) {
    const item = items.find((item) => item.customerId);
  } else {
    const item = items.find((item) => item.id);
  }
  if (!item) return false;

  Object.assign(item, data);

  await saveToDB(FILEPATH);
  return true;
}

export async function deleteItem(FILEPATH, id, data, customers = false) {
  const items = await getItems(FILEPATH);
  if (customers) {
    const filteredItems = items.filter((item) => item.customerId !== id);
  } else {
    const filteredItems = items.filter((item) => item.id !== id);
  }
  

  if (items.length === filteredItems) return false;

  await saveToDB(FILEPATH);
  return true;
}
