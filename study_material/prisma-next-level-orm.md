# Prisma (next level ORM)

Prisma adalah sebuah alat (tool) yang digunakan dalam pengembangan aplikasi web untuk mengelola basis data dan melakukan operasi database dengan lebih mudah dan aman. Prisma membantu pengembang dalam membangun aplikasi dengan menggunakan bahasa pemrograman JavaScript dan TypeScript.

Berikut beberapa fitur utama dan konsep yang terkait dengan Prisma:

1. **ORM (Object-Relational Mapping)**: Prisma adalah ORM yang memungkinkan pengembang untuk berinteraksi dengan basis data relasional seperti PostgreSQL, MySQL, SQLite, dan SQL Server menggunakan kode JavaScript atau TypeScript. Ini menghilangkan kebutuhan untuk menulis kueri SQL secara manual.

2. **Pengelolaan Skema Database**: Prisma memungkinkan pengembang untuk mendefinisikan struktur database dengan menggunakan sintaks yang mudah dipahami. Struktur ini disebut "Prisma Schema" dan digunakan untuk menghasilkan skema basis data secara otomatis.

3. **Migrations**: Prisma menyediakan alat untuk mengelola dan menerapkan perubahan struktur basis data dengan aman melalui proses yang disebut "migrasi". Ini memungkinkan perubahan skema tanpa kehilangan data yang ada.

4. **Query yang Tipe Aman**: Prisma menggunakan tipe statis (static typing) dari TypeScript untuk memastikan kueri ke basis data memiliki tipe data yang benar. Ini membantu menghindari banyak kesalahan yang sering terjadi dalam pengembangan basis data.

5. **Query yang Mudah Digunakan**: Prisma menyediakan API yang intuitif dan mudah digunakan untuk melakukan berbagai operasi database seperti penambahan, pembacaan, pembaruan, dan penghapusan data.

6. **Pengelolaan Koneksi Database**: Prisma mengelola koneksi ke basis data dengan baik, termasuk fitur seperti pooling koneksi untuk meningkatkan efisiensi.

7. **Keamanan**: Prisma menyertakan keamanan bawaan seperti penanganan SQL injection yang aman.

Prisma memungkinkan pengembang untuk fokus pada logika bisnis aplikasi mereka daripada menghabiskan banyak waktu untuk menulis kueri database yang rumit. Ini memudahkan pengembangan aplikasi web yang skala besar dan kompleks dengan meminimalkan kompleksitas operasi database. Prisma juga berintegrasi dengan berbagai framework dan teknologi populer dalam ekosistem JavaScript, membuatnya menjadi pilihan yang kuat untuk pengembangan aplikasi modern.

***Explore : https://www.prisma.io/***

## Introduction Prisma
Pakai URL database yang sudah kita buat di part cloud database (railway) sebelumnya.


**Langkah 1: Instalasi Prisma**

Pertama-tama, pastikan kalian telah membuat proyek Node.js dan menginstal Prisma sebagai dependensi:
```
npm install prisma mysql --save
```

**Langkah 2: Inisialisasi Proyek Prisma**

Setelah menginstal Prisma, kalian perlu menginisialisasi proyek Prisma. Jalankan perintah berikut dari terminal:
```
npx prisma init
```
Proses inisialisasi akan memandu kalian dalam konfigurasi awal.

**Langkah 3: Buat Berkas .env**

Berkas `.env` (Environment Variables) adalah cara yang aman untuk menyimpan informasi sensitif seperti koneksi basis data, kunci API, atau konfigurasi lainnya yang tidak ingin kalian simpan dalam kode sumber proyek. Ini memungkinkan kalian untuk dengan mudah mengelola konfigurasi berdasarkan lingkungan aplikasi (misalnya, pengembangan, uji, produksi).

Contoh berkas `.env` untuk koneksi basis data MySQL:

```
DATABASE_URL="mysql://username:password@localhost:3306/nama_database"
```

Di sinilah kalian akan menyimpan URL koneksi basis data MySQL kalian. Pastikan untuk menggantikan `username`, `password`, `localhost`, `3306`, dan `nama_database` sesuai dengan konfigurasi basis data MySQL kalian.

**Langkah 4: Buat Model dan Skema Prisma**

Selanjutnya, Anda dapat mendefinisikan model basis data dan skema Prisma Anda dalam file schema.prisma. Berikut contoh sederhana:


```prisma
// schema.prisma
generator client {
  provider = "prisma-client-js"
  output   = "./generated/client"
}

datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

model User {
  id    Int      @id @default(autoincrement())
  name  String
  email String   @unique
}
```

**Langkah 5: Migrate Basis Data**

Setelah mendefinisikan skema Prisma, kalian perlu menjalankan migrasi untuk membuat tabel pengguna dalam basis data:
```
npx prisma db push
```

**Langkah 6: Gunakan Prisma di Kode Node.js**

Sekarang kalian dapat menggunakan Prisma untuk berinteraksi dengan basis data MySQL dari kode Node.js. Berikut contoh penggunaan Prisma dalam aplikasi Node.js:

```js
// app.js
const { PrismaClient } = require('./generated/client');
const prisma = new PrismaClient();

async function main() {
  const newUser = await prisma.user.create({
    data: {
      name: "John Doe",
      email: "john@example.com"
    }
  });

  console.log("User created:", newUser);

  const users = await prisma.user.findMany();
  console.log("All users:", users);
}

main()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  });
  ```

**Langkah 7: Menjalankan Aplikasi Anda**

Akhirnya, jalankan aplikasi kalian:
```
node app.js
```

Ini adalah contoh penggunaan Prisma.js dengan database MySQL dan Node.js. Prisma.js memudahkan kalian untuk berinteraksi dengan basis data MySQL menggunakan JavaScript atau TypeScript. Menggunakan berkas .env membantu menjaga informasi sensitif seperti koneksi basis data tetap aman dan terpisah dari kode sumber aplikasi. 
