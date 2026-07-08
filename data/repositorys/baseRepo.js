import fs from 'fs';

async function getItems(FILEPATH) {
    const items = await fs.readFile(FILEPATH)
    return JSON.parse(items)
}

// Not working on customers repo (customerId)
async function getItem(FILEPATH, itemId) {
    const items = await getItems(FILEPATH)
    const item = items.find(item => item.id)

    if (!item) return false
    return item
}

async function createItem(data) {
    const items = await getItems(FILEPATH)
    const newList = [...items]
    newList.push({...data})
    if (items.length === newList.length) return false
    return true
}

// Not working on customers repo (customerId)
async function updateItem(id, data) {
    const items = await getItems(FILEPATH)
    const item = items.find(item => item.id)
    if (!item) return false

    Object.assign(item, data)
    return true

}

// Not working on customers repo (customerId)
async function deleteItem(id, data) {
    const items = await getItems(FILEPATH)
    const filteredItems = items.filter(item => item.id !== id)
    
    if (items.length === filteredItems) return false

    return true

}