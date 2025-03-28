# Inventory System Testing
Sekarang kita akan buat backend testing di project inventory system. Testing yang akan kita buat disini adalah Integration Testing. Integration testing akan mengacu ke feature API API yang sudah kita buat, mulai dari flow input request sampai bisnis logic nya akan kita testing melalui integration API.

Integration Testing IS
Integration Testing yang akan dicontohkan disini adalah Auth API.
jadi kita akan fokus testing ke API Register & Login.

untuk melakukan integration testing ada beberapa hal yang perlu kita set up :

- **Mock Database** : kita butuh mock database untuk melakukan testing, karena integration testing ini kita akan melakukan http request ke dalam app.js kita, jadi kita butuh database buat integrasi dari flow API . Testing menggunakan database asli sangat tidak dianjurkan, karena data dummy nya akan menggangu history dari data asli dan juga kalau ada error akan pengaruh ke data yang asli juga.

- **Jest Config** : Configurasi untuk library jest agar memakai mock database yang sudah kita buat. setelah itu kita membuat command testing di package.json.

- **Dummy Data** : kita butuh dummy data untuk melakukan testing, jadi data ini bisa kita reusable sesuai test case yang kita buat.

- **Mock Http** : selain kita mocking database, kita juga akan mocking http. ini fungsinya kita akan buat proses testing kita seolah olah melakukan http request tapi aslinya hanyalah mocking (atau bisa disebut http palsu). Disini kita menggunakan library supertest untuk melakukan mocking http request.

- **Test Case** : setelah configurasi testing sudah di setup, saatnya membuat Test Case untuk API yang mau di testing. sebisa mungkin kalian menulis test case yang sangat deskriptif. jadi penggunaan expectnya sesuai dengan kebutuh test case masing masing. sebisa mungkin kalian membuat test case yang mengcover kondisi dari API tersebut (dari success case maupun error case).

## Mock Database
Pertama tama , kita perlu refactor struktur folder prisma kita dulu. ubah file client.js di folder prisma menjadi index.js (fungsinya untuk specify prisma client di folder prisma).

NOTE: jangan lupa update di service - service kalian yang memanggil file client.js sebelumnya. (ubah menjadi require ke arah prisma)

setelah itu, buatlah folder mocks di dalam folder prisma, didalam folder mocks buat file index.js. (index.js ini lah yang akan kita buat mock prisma client didalamnya).

jadi struktur folder kalian seperti ini :

![image](https://github.com/user-attachments/assets/0b70b5e8-a98a-4572-83cf-9ee0f621ea65)

Di folder index.js, kita akan membuat code seperti ini:
`mocks/index.js`
```js
const { PrismaClient } = require('@prisma/client')
const { execSync } = require('child_process')
const { join } = require('path')

const generateDatabaseURL = () => {
  if (!process.env.TEST_DB_URL) {
    throw new Error('please provide a database url');
  }
  let url = process.env.TEST_DB_URL

  return url
};


const prismaBinary = join(__dirname, '..', '..', 'node_modules', '.bin', 'prisma');

let url = generateDatabaseURL()

process.env.DB_URL = url;

const prisma = new PrismaClient({
  datasources: { db: { url } },
});

beforeAll(async () => {
  execSync(`${prismaBinary} db push`, {
    env: {
      ...process.env,
      DATABASE_URL: url
    },
  });
});

beforeEach(async () => {
  await prisma.user.deleteMany()
  await prisma.token.deleteMany()
});

afterAll(async () => {
    await prisma.$disconnect();
});

module.exports = prisma;
```

Disini kalian sebenernya membuat prisma client seperti biasa, bedanya kalian perlu membuat mocking database dari instance database URL kalian yang asli. 

Bisa kalian liat `generateDatabaseURL` fungsi ini untuk mengganti Url database kita.
dari :
`TEST_DB_URL="postgresql://postgres:xqPBkyNAtatEPbBgEbmNWsYuvwOevXTw@autorack.proxy.rlwy.net:45560/railway?connect_timeout=300"`

di pindah kan ke 

`DB_URL="postgresql://postgres:xqPBkyNAtatEPbBgEbmNWsYuvwOevXTw@autorack.proxy.rlwy.net:45560/railway?connect_timeout=300"`

ya sebenarnya kalian hanya mengganti url database aja, dari env TEST_DB_URL kemudian move ke env DB_URL. Agar database kita memakai env test database.

Nah dari database baru ini, Integration Testing akan memakainya untuk eksekusi test case API. Tetapi kita perlu push schema terlebih dahulu sebelum testing dimulai, karena database baru ini sudah pasti kosong isinya.

```js
beforeAll(async () => {
  execSync(`${prismaBinary} db push`, {
    env: {
      ...process.env,
      DATABASE_URL: url
    },
  });
});
```

Di code ini , prismaBinary sama saja seperti `npx prisma`. disini kita trigger `db push` untuk push schema ke databaseTesting.

Karena pada dasarnya Mocking Database ini sekali pakai, jadi setiap selesai testing sudah pasti kita akan delete lagi database nya (agar ruang lingkup testing nya bersih). 

Makanya di beforeEach Setiap Test Suites kalian selesai, disitu ada code delete many dari setiap schema. (di contoh hanya user dan token, untuk logic nolep selanjutnya kalian wajib delete many semua schema). Jadi setiap Test Suites/Case selesai data kalian bersih kembali.

Setelah Test Case selesai semua maka afterAll akan menjalankan tugasnya, untuk DROP Database mock kita.

## Jest Config
Setelah Mock Set Up selesai, kita lanjut untuk configurasi library jest agar memaki mock database dalam environtment testing.
buatlah file mocks.js dan jest.config.js di root folder kalian. (sejajar src, prisma)

`mocks.js`
```js
jest.mock('./prisma/index');
jest.setTimeout(30000);
```

mocks.js ini penyambung antara config jest ke mock database.

`jest.config.js`
```js
module.exports = {
  testEnvironment: 'node',
  testEnvironmentOptions: {
    NODE_ENV: 'test',
  },
  restoreMocks: true,
  coveragePathIgnorePatterns: ['node_modules', 'src/config', 'src/app.js', 'tests'],
  coverageReporters: ['text', 'lcov', 'clover', 'html'],
  setupFilesAfterEnv: ['./mocks.js'],
};
```

config umum pada jest library, kita set NODE_ENV menjadi 'test' agar app kalian tau kondisi environment yang lagi jalan. coveragePathIgnorePatterns ini berfungsi untuk ignore folder yang akan di test coverage nya. nah yang paling penting setupFilesAfterEnv, berfungsi untuk mengarahkan mocking prisma client kita untuk menggunakan Mock Database.

Update .gitignore agar tidak push hasil coverage dari test (karena ini lumayan berat).
`.gitignore`
```
node_modules
coverage
```

Setelah itu tambahkan command ini pada scripts yang ada di pakcage.json
```json
"scripts": {
  "start": "pm2 start ecosystem.config.json --no-daemon",
  "dev": "cross-env NODE_ENV=development nodemon src/index.js",
  "lint": "eslint .",
  "lint:fix": "eslint . --fix",
  "prettier": "prettier --check **/*.js",
  "prettier:fix": "prettier --write **/*.js",
  "prepare": "husky install",
  "test": "jest -i --colors --verbose --detectOpenHandles",
  "test:watch": "jest -i --watchAll",
  "coverage": "jest -i --coverage",
  "coverage:coveralls": "jest -i --coverage --coverageReporters=text-lcov | coveralls"
},
```

Bedanya test dan coverage adalah command test hanya menjalankan file yang menggunakan prefix .test, sedangkan coverage itu menguji semua kualitas code kalian mulai dari awal sampe akhir (end 2 end). 


## Dummy Data
Sekarang kita perlu buat dummy data sebelum membuat Test Case pada Auth API.
buatlah folder tests di root project kalian , dan buat 2 folder didalamnya yaitu fixtures dan integration.

![image](https://github.com/user-attachments/assets/2a842016-3f90-404e-903a-9dbf0895b96d)

Didalam fixtures, buatlah 2 file. user.fixture.js dan `token.fixture.js`

`user.fixture.js`
```js
const bcrypt = require('bcryptjs');
const {faker} = require('faker');
const prisma = require('../../prisma')
const { v4 } = require('uuid')

const password = 'password1';
const salt = bcrypt.genSaltSync(8);
const hashedPassword = bcrypt.hashSync(password, salt);

const userOne = {
  id: v4(),
  name: faker.name.findName(),
  email: faker.internet.email().toLowerCase(),
  password,
  role: 'user',
  isEmailVerified: false,
};

const userTwo = {
  id: v4(),
  name: faker.name.findName(),
  email: faker.internet.email().toLowerCase(),
  password,
  role: 'user',
  isEmailVerified: false,
};

const admin = {
  id: v4(),
  name: faker.name.findName(),
  email: faker.internet.email().toLowerCase(),
  password,
  role: 'admin',
  isEmailVerified: false,
};

const insertUsers = async (users) => {
  users = users.map((user) => ({ ...user, password: hashedPassword }))
  await prisma.user.createMany({
    data: users,
    skipDuplicates: true
  })
};

module.exports = {
  userOne,
  userTwo,
  admin,
  insertUsers,
};
```

Disini kita menggunakan library faker.js untuk set up dummy data. bagi yang belum tau, faker js adalah library node js untuk mencari random value (dummy) data buat kebutuhan development. selain kita buat dummy data, kita membuat function `insertUsers` untuk add user data dalam kebutuhan testing API. (karena kita butuh data user yang sudah ada di db dalam kondisi tertentu).

token.fixture.js
```js
const moment = require('moment');
const config = require('../../src/config/config');
const { tokenTypes } = require('../../src/config/tokens');
const tokenService = require('../../src/services/token.service');
const { userOne, admin } = require('./user.fixture');

const accessTokenExpires = moment().add(config.jwt.accessExpirationMinutes, 'minutes');
const userOneAccessToken = tokenService.generateToken(userOne.id, accessTokenExpires, tokenTypes.ACCESS);
const adminAccessToken = tokenService.generateToken(admin.id, accessTokenExpires, tokenTypes.ACCESS);

module.exports = {
  userOneAccessToken,
  adminAccessToken,
};
```

Selain membuat dummy data, kita perlu dummy token juga karena di dalam Auth API ada proses authentikasi. jadi perlu testing service token.

## Http Mock + Test Case
Set Up Testing kalian sudah selesai, sekarang saatnya kita melakukan penulisan test case untuk Auth API.

Disini gua berikan kalian contoh Test Case pada Auth API, Terdiri dari 2 Test Describe dan 14 Test Case :

Auth routes
```
POST /v1/auth/register
-> should return 201 and successfully register user if request data is ok 
-> should return 400 error if email is invalid 
-> should return 400 error if email is already used 
-> should return 400 error if password length is less than 8 characters 
-> should return 400 error if password does not contain both letters and numbers 
POST /v1/auth/login
-> should return 200 and login user if email and password match 
-> should return 401 error if password is wrong 
Auth middleware
-> should call next with no errors if access token is valid 
-> should call next with unauthorized error if access token is not found in header 
-> should call next with unauthorized error if access token is not a valid jwt token 
-> should call next with unauthorized error if the token is not an access token 
-> should call next with unauthorized error if access token is generated with an invalid secret 
-> should call next with unauthorized error if access token is expired 
-> should call next with unauthorized error if user is not found 
```

NOTE: Sebisa mungkin Test Case dibuat dalam bahasa inggris (karena programming itu kadang lebih mudah dipahami jika menggunakan english). ini bakal jadi habbit sampai kalian kerja nanti untuk membuat testing yang sangat deskriptif dan detail. 

buatlah file `auth.test.js` di dalam folder integration.

# File

Berikut penjelasan singkat untuk setiap bagian dari kode tersebut:

1. Import Library: Kode pertama mengimpor berbagai pustaka yang diperlukan untuk pengujian dan middleware otentikasi, seperti supertest untuk melakukan pengujian HTTP, faker untuk menghasilkan data palsu, httpStatus untuk kode status HTTP, dan lain-lain.

2. Import Modul dan Konfigurasi: Kode juga mengimpor modul-modul yang diperlukan untuk aplikasi, seperti app, prisma, auth, ApiError, config, tokenService, dan tokenTypes. Ini adalah bagian dari aplikasi Kalian yang perlu diuji.

3. Deskripsi Pengujian "Auth routes": Ini adalah blok yang menggambarkan serangkaian pengujian yang berkaitan dengan rute otentikasi dalam aplikasi Kalian. Ini meliputi rute pendaftaran (/v1/auth/register) dan rute masuk (/v1/auth/login).

4. beforeEach(): Ini adalah fungsi yang dipanggil sebelum setiap pengujian dalam deskripsi pengujian "Auth routes". Fungsi ini digunakan untuk mengatur kondisi awal atau persiapan yang diperlukan sebelum setiap pengujian berjalan.

5. Test Cases: Setiap blok test adalah sebuah kasus uji (test case) yang menguji berbagai aspek rute-rute otentikasi. Ini termasuk pengujian pendaftaran pengguna baru, pengujian masuk pengguna yang ada, dan beberapa pengujian yang menangani kasus kesalahan (misalnya, email tidak valid atau kata sandi yang salah).

6. Deskripsi Pengujian "Auth middleware": Ini adalah blok yang menggambarkan serangkaian pengujian yang berkaitan dengan middleware otentikasi yang digunakan dalam aplikasi Kalian. Middleware ini digunakan untuk melindungi rute-rute yang memerlukan otentikasi.

7. Test Cases Auth Middleware: Setiap blok test dalam deskripsi pengujian "Auth middleware" menguji berbagai aspek middleware otentikasi. Ini mencakup pengujian ketika token akses adalah valid, ketika token tidak ditemukan dalam header permintaan, ketika token tidak valid, ketika token adalah token refresh (bukan token akses), ketika token dibuat dengan kunci rahasia yang salah, ketika token sudah kedaluwarsa, dan ketika pengguna tidak ditemukan.

Integration Testing ini sudah mencakup Prisma untuk interaksi dengan database, supertest untuk pengujian HTTP, dan JWT (JSON Web Token) untuk mengelola otentikasi. 

## Hasil Testing
Jalankan command npm run test untuk menjalankan test case integration.
NOTE: disini memang aga lumayan lama, karena kita memakai set up mocking http + database. (beda dengan testing yang hanya set up local atau tanpa mocking http + database) 

![image](https://github.com/user-attachments/assets/6e546f3c-4be4-434c-ad61-98ccf6aaa860)

jalankan command npm run coverage untuk mengcover semua quality code + test case. 

![image](https://github.com/user-attachments/assets/a78aeca7-6a65-491e-96e1-073a343683ac)

disini keliatan code quality gua jelek banget wkwk, karena category service banyak function dan line yang ga kepake (ini bertujuan buat ngajar aja kemarin).
