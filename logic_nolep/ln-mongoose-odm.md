# Logic Nolep (mongoose ODM)

kerjakan simple project dari source ini atau kalian boleh mengerjakan fancy-todo tetapi menggunakan mongoose.

https://www.geeksforgeeks.org/node-js-crud-operations-using-mongoose-and-mongodb-atlas/


***Fancy Todo ODM***

Jika kalian ingin membuat fancy todo odm, jangan lupa ganti struktur kalian seperti ini: 

Fancy Todo ODM
Jika kalian ingin membuat fancy todo odm, jangan lupa ganti struktur kalian seperti ini: 

![image](https://github.com/user-attachments/assets/14f89613-a0b8-443f-8a7d-ea9291eea2ae)

setelah itu install library "dotenv" dan pasang di index.js agar kalian bisa akses file ENV di code kalian.

`index.js` (koneksi menggunakan mongoose)

```js
require('dotenv').config()
const app = require('./app');
const mongoose = require('mongoose')


let server;
let port = 3000

mongoose.connect(process.env.DATABASE_URL, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB')
  server = app.listen(port, () => {
    console.log(`Listening to port ${port}`);
  });
});


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
