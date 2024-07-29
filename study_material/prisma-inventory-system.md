# Inventory System Prisma

Selanjutnya kita akan membuat schema prisma pada project inventory system, jangan lupa untuk mengganti `DATABASE_URL` yang di `.env`.

`schema.prisma`
```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

model User {
  id              String       @id @default(uuid())
  name            String
  email           String?      @unique
  password        String    
  role            String       @default("user")
  createdAt       DateTime     @default(now())
  updatedAt       DateTime     @updatedAt
  isEmailVerified Boolean      @default(false)
  tokens          Token[]
  products        Product[]
  orders          Order[]
}

model Token {
  id          String    @id @default(uuid())
  token       String    @db.VarChar(400)
  userId      String    
  User        User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  type        String
  expires     DateTime
  blacklisted Boolean   @default(false)
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
}

model Product {
  id            String       @id @default(uuid())
  name          String
  description   String
  price         Float
  quantityInStock Int
  categoryId    String
  category      Category     @relation(fields: [categoryId], references: [id])
  userId        String
  user          User         @relation(fields: [userId], references: [id])
  orderItems    OrderItem[]
  createdAt       DateTime     @default(now())
  updatedAt       DateTime     @updatedAt
}

model Category {
  id        String    @id @default(uuid())
  name      String
  products  Product[]
  createdAt       DateTime     @default(now())
  updatedAt       DateTime     @updatedAt
}

model Order {
  id          String     @id @default(uuid())
  date        DateTime
  totalPrice  Float
  customerName String
  customerEmail String
  userId      String
  user        User       @relation(fields: [userId], references: [id])
  orderItems  OrderItem[]
  createdAt       DateTime     @default(now())
  updatedAt       DateTime     @updatedAt
}

model OrderItem {
  id         String    @id @default(uuid())
  orderId    String
  order      Order     @relation(fields: [orderId], references: [id])
  productId  String
  product    Product   @relation(fields: [productId], references: [id])
  quantity   Int
  unitPrice  Float
  createdAt       DateTime     @default(now())
  updatedAt       DateTime     @updatedAt
}
```

1. **generator client { ... }**: Ini mendefinisikan generator untuk menghasilkan Prisma Client dalam bahasa JavaScript. Prisma Client adalah antarmuka untuk berinteraksi dengan database Kalian.

2. **datasource db { ... }**: Mendefinisikan sumber data atau database yang akan digunakan dalam proyek Kalian. Dalam kasus ini, database menggunakan penyedia MySQL dan mengambil URL database dari variabel lingkungan (DATABASE_URL).

3. **Model User**: Ini adalah model yang mewakili entitas pengguna dalam database. Ini memiliki bidang seperti id, name, email, password, role, dan sebagainya. Relasi yang terkait dengan model User termasuk tokens, products, dan orders.

4. **Model Token**: Ini adalah model yang mewakili token pengguna, yang dapat digunakan untuk autentikasi. Ini memiliki bidang seperti id, token, userId, type, dan sebagainya. Ini juga memiliki relasi dengan model User.

5. **Model Product**: Ini adalah model yang mewakili produk dalam database. Ini memiliki bidang seperti id, name, description, price, quantityInStock, dan lain-lain. Ini juga memiliki relasi dengan model User, Category, dan OrderItem.

6. **Model Category**: Ini adalah model yang mewakili kategori produk. Ini memiliki bidang seperti id, name, dan memiliki relasi dengan model Product.

7. **Model Order**: Ini adalah model yang mewakili pesanan dalam database. Ini memiliki bidang seperti id, date, totalPrice, customerName, customerEmail, dan lain-lain. Ini juga memiliki relasi dengan model User dan OrderItem.

8. **Model OrderItem**: Ini adalah model yang mewakili item dalam pesanan. Ini memiliki bidang seperti id, orderId, productId, quantity, dan unitPrice. Ini memiliki relasi dengan model Order dan Product.

***Jalankan Command Prisma seperti biasa***
```
npx prisma db push

npx prisma generate
```

kita memakai client yang sama seperti sebelumnya

`prisma/client.js`
``` js
const {PrismaClient} = require("@prisma/client");

const prisma = new PrismaClient();

module.exports = prisma
```

## ***Inventory System Checkpoint***

di step ini kalian sudah set up prisma, sekarang kita bisa menjalankan server kita dengan `npm run dev`.  jangan lupa untuk menghapus route sebelumnya jika kalian copas dari fancy-todo agar appnya tidak error. kita masih menggunakan `app.js` dan `index.js` yang sama.

```js
const express = require('express');
const router = require('./routes');

const app = express();

// aktifin parsing json
app.use(express.json());

// aktifin urlencoded
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('hello world');
});

// app.use(router)

module.exports = app;
```

disini router kita comment, karena kita belum mulai untuk develop API. 

# Gambar