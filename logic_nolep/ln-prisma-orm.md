# Logic Nolep (Prisma ORM)

Buat lah project bakend menggunakan express js + prisma dan mysql untuk database nya, kalian boleh buat API versi kalian sendiri asal memenuhi kriteria ini :

- terdiri 2 table atau lebih
- wajib menggunakan relasi prisma (one to many atau yang lain)

atau kalian boleh ikutin dari project simple yang gua buat.

![image](https://github.com/user-attachments/assets/2f373a45-f4e7-403b-88b9-25aae6081834)


**Relation Effect**
- User mempunyai banyak Todo ( One To Many )
- Jika data User di delete maka semua data todo yang relasi ke user tersebut akan hilang juga. (ini disebut cascading, bisa explore di prisma)

## Project Set up
dari week4 kita harus mulai belajar standarisasi code, jadi penamaan dan struktur code kalian wajib seperti ini.

***NOTE:***
Service ini pengganti folder Model di project sebelumnya, karena schema model prisma itu berbeda dia ada di folder Prisma  dengan filname schema.prisma
jadi file service ini khusus untuk code code mengolah data dengan prisma. (tidak boleh panggil prisma di controller)

![image](https://github.com/user-attachments/assets/002e6866-365a-467f-a35e-64f28beadc29)

## Install Module
Seperti biasa, sebelum implementasi di project kita perlu install modul modul yang di perlukan.
```
npm install express nodemon mysql prisma 
@prisma/client
```

disini ada beberapa module yang kita butuhkan:
- nodemon : library untuk debugging saat development, jadi ketika kalian save code kalian tidak perlu menjalankan server lagi
- mysql : package database mysql, sementara tidak dibutuhkan tapi akan lebih baik diinstall untuk jaga jaga.
- prisma : library prisma
- @prisma/client : Instance prisma agar bisa dipakai di seluruh project


***Set Up Prisma***
kalian perlu buat .env terlebih dahulu untuk set up URL database.
URL database boleh pakai db sebelumnya, atau buat db baru di railway.

`.env`
```
DATABASE_URL="mysql://root:VE2vR87YwrTrhIzAzh7X@containers-us-west-154.railway.app:6803/railway"
```

Next , buat schema pertama kalian di schema.prisma. ini challange kalian 
Setelah schema sudah dibuat jalankan command ini, untuk push schema kalian ke database.
```
npx prisma db push
```

setelah ini table table kalian sudah kebuat di database, sekarang kita buat instance prisma nya :
```
npx prisma generate
```

setelah generate instance, maka kalian perlu buat file client.js di dalam folder prisma, ini fungsinya instance untuk query ke prisma (sama seperti db instance sqlite)

`prisma/client.js`
```js
const {PrismaClient} = require("@prisma/client");

const prisma = new PrismaClient();

module.exports = prisma
```

***app.js dan index.js***

kita harus memisahkan antara server API dan code running buat jalanin server.
app.js -> ini code untuk membuat instance server API kalian
index.js -> code untuk menjalankan instance server kalian (jadi command package.json wajib ngarah ke index)

`app.js`
```js
const express = require("express");
// const router = require("./routes")

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello world");
});

module.exports = app;
```

`index.js`
```js
const app = require('./app');
const prisma = require('../prisma/client');

let server;
let port = 3000

if(prisma){
  console.log('Connected to Database');
  server = app.listen(port, () => {
    console.log(`Listening to port ${port}`);
  });
}

const exitHandler = () => {
  if (server) {
    server.close(() => {
      console.log('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  console.log(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  console.log('SIGTERM received');
  if (server) {
    server.close();
  }
});
```

Resource belajar untuk memahami Process Signal Event:
https://www.geeksforgeeks.org/node-js-process-signal-events/


jika dijalankan, maka set up project kalian akan seperti ini :
```
npm run dev
```

![image](https://github.com/user-attachments/assets/0f86a8ca-fe49-4cd9-8837-69295fccce8f)
