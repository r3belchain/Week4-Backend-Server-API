# 🧾 Inventory System Project - API Documentation

Welcome to the API documentation for the **IS (Inventory System)** project!

This backend system is built with **Node.js**, **Express**, **Prisma**, and **MySQL**. It handles inventory and order management, with features like user authentication, pagination, filtering, and more.

---

## 📌 Features

- ✅ JWT-based Authentication
- 👤 User CRUD
- 📦 Product Management (per User)
- 📃 Order Management (per User)
- 🔎 Pagination, Filtering, and Search
- 🧰 Global Error Handling
- 🧪 Joi-based Validation
- 🔒 Auth Middleware

---

## 🚀 Getting Started

1. **Clone** the repository
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Set up environment variables** in `.env`:
   ```env
   DATABASE_URL="mysql://user:password@localhost:3306/db_name"
   JWT_SECRET="your_jwt_secret"
   ```
4. **Run migrations**:
   ```bash
   npx prisma migrate dev
   ```
5. **Start server**:
   ```bash
   npm run dev
   ```

---

## 📦 API Endpoints

### 🧑‍💼 User Endpoints

#### `GET /api/users`

Fetch all users with pagination.

- **Query Parameters**:

  - `page`: (optional, default: 1)
  - `limit`: (optional, default: 10)

- ✅ Success `200 OK`

```json
{
  "status": 200,
  "message": "Get Users Success",
  "data": [...],
  "pagination": {
    "total": 100,
    "page": 1,
    "totalPages": 10
  }
}
```

#### `GET /api/users/:userId`

Get a single user by ID.

- ❌ Error `404 Not Found`:

```json
{
  "status": 404,
  "message": "User Not Found"
}
```

#### `POST /api/users/email`

Get user by email.

- **Body**:

```json
{
  "email": "user@example.com"
}
```

#### `PUT /api/users/:userId`

Update user data.

- **Body**:

```json
{
  "name": "New Name"
}
```

#### `DELETE /api/users/:userId`

Delete a user by ID.

---

🛍 Products

🆕 POST /products

Create product.

Body:

{
"name": "Product name",
"description": "...",
"price": 100,
"category": "electronics"
}

📄 GET /products

Get list of products (with pagination & filters).

Query Parameters (optional):

page

limit

search

category

Response:

{
"status": 200,
"message": "Get Products Success",
"data": [...],
"pagination": {...}
}

🔍 GET /products/:productId

Get product by ID.

✏️ PATCH /products/:productId

Update product.

❌ DELETE /products/:productId

Delete product.

🔍 GET /products/search?category=clothing

Get products filtered by category.

````

---

### 🧾 Order Endpoints

#### `GET /api/users/:userId/orders`

Get orders linked to a user.

- ❌ Error `404 Not Found`:

```json
{
  "status": 404,
  "message": "No orders found for this user"
}
````

---

### 🔐 Authentication

#### `POST /api/auth/register`

Register a new user.

- **Body**:

```json
{
  "name": "User",
  "email": "user@example.com",
  "password": "securepassword"
}
```

#### `POST /api/auth/login`

Login and receive a JWT.

- **Body**:

```json
{
  "email": "user@example.com",
  "password": "securepassword"
}
```

- ✅ Response:

```json
{
  "status": 200,
  "message": "Login Success",
  "token": "<jwt_token>"
}
```

---

## ✅ Validation

Validation is handled using Joi. If a request fails validation, a 400 error is returned.

### Example (Validation Error Response):

```json
{
  "status": 400,
  "message": "Validation Error",
  "errors": {
    "email": "Email is required"
  }
}
```

---

## 🧱 Middleware

| Name             | Description                        |
| ---------------- | ---------------------------------- |
| `authMiddleware` | Validates JWT and sets `req.user`  |
| `errorHandler`   | Catches all thrown errors globally |
| `validate`       | Runs Joi validation for requests   |

---

## ❌ Error Handling

Custom error handler returns standardized JSON errors.

### Example Error:

```json
{
  "status": 404,
  "message": "User Not Found"
}
```

---

## 🧬 Prisma Models

### User

```prisma
model User {
  id        String   @id @default(cuid())
  name      String?
  email     String   @unique
  password  String
  role      String   @default("user")
  products  Product[]
  orders    Order[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

### Product

```prisma
model Product {
  id        String   @id @default(cuid())
  name      String
  category  String
  stock     Int
  price     Float
  userId    String
  user      User     @relation(fields: [userId], references: [id])
}
```

### Order

```prisma
model Order {
  id        String   @id @default(cuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id])
  products  Json
  total     Float
  createdAt DateTime @default(now())
}
```

---

## 🔍 Filtering, Pagination & Search

Use query parameters for filtering, pagination, and search:

```http
GET /api/users?page=1&limit=10
GET /api/products?category=food&search=milk
```

---

## 📚 Format

All API responses follow the same format:

```json
{
  "status": 200,
  "message": "Your Message",
  "data": { ... }
}
```

---

## 🧑‍💻 Author

Made with ❤️ by r3bel
