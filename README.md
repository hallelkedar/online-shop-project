# Shoes Shop Server
## Express server for online shop

### === App Info ===

- Products
- Customers
- Orders
- CheckOut - with Shoping cart 


### === DB model ===

- Product
```
id - Product unique id 
name - Product name
price - Product price
stock - Product stock quantity
```
- Customer
```
customerId - Customer unique id 
balance - Current money balance
cart - Items array in cart
createdAt - Signing customer date
```

- Order
```
id - Order unique id 
customerId - customerId of the customer who made the order
items - Order items
total - Order total amount
createdAt - Order creating date
```

### === API routes ===

```
METHOD | URLroute                | DESC
——————————————————————————————————————————————————
GET    | /                       | Opening short msg
GET    | /health                 | Health server check
GET    | /products               | Products list (with filter)
GET    | /cart                   | Shows [customerID] cart
POST   | /cart/items             | Add item to [customerID] items cart 
DELETE | /cart/items/:productId  | Delete item from [customerID] items cart
GET    | /account/balance        | Shows [customerID] balance
POST   | /orders/checkout        | Make checkout and create new order
GET    | /orders                 | Shows [customerID] orders history
```

### === Run with ===
Install dependencies:
```
npm install
```

Start server:
```
npm start
```