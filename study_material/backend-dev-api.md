# Week4-Backend-Development-API

Hello phase 1 fighter, perjalanan belajar backend kalian sudah mencapai 50%. kalian sudah mempelajari cara backend API bekerja dan handling logic dengan database SQLite. good job buat kalian semua yang mengerjakan semua task nya 👍🏻.  kita akan lanjutkan perjalanan kita untuk menyempurnakan struktur backend API kita dengan implement middleware next level. karena struktur kalian sekarang itu masih belum ready untuk production dan masih berantakan, di week4 ini kita akan buat backend API yang scalable, clean, dan ready to production code. mulai dari refactoring cara komunikasi database kita meggunakan ORM (prisma), trus kita belajar database No SQL yaitu mongoDb sampai kita bisa menggunakan cloud database, kita juga akan membuat errorhandler untuk handling error yang rapih, membuat logging system agar setiap eksekusi code tercatat di server, kita akan mempelajari Security backend mulai dari hashing JWT, helmet untuk protect headers, dan cors untuk mencegah dispatch dari website lain. Kita juga bakal refactoring cara validasi payload dari body menggunakan joi. semua teknologi ini memakai techstack terupdate jadi week4 ini penting untuk karir backend kalian. 

dan diakhir week4 gua bakal share template backend gua yang sering gua pake buat kerja, ini template flexible dan ready dipake buat handle backend apapun, udah ada table user + token , Auth + Role System, Validation, logger, testing, sekaligus API User Management (karena semua aplikasi pasti punya user), Email Service, Server Configuration, dan feature buat dokumentasi swagger. ini khusus untuk RPN sebagai bonus kalian ngikutin materi dari gua 🙂 . gua yakin ini template bakal berguna banget buat karir backend kalian, gua bakal ngerasa seneng juga kalau banyak yang make dan bermanfaat buat kita semua.

langsung aja kita mulai materi pertama kita yaitu API Type (theory).

## API Type
Dari yang kita pelajarin sebelumnya, sebenernya itu adalah salah satu dari tipe API yaitu REST API. Api itu mempunyai banyak tipe, karena yang umum itu REST jadi kita belajar REST saja di phase 1. sementara kita harus tau dulu semua tipe API dan fungsinya untuk apa.

1. **RESTful API (API Berbasis REST)**
RESTful API adalah salah satu tipe API yang paling umum digunakan saat ini. API ini memungkinkan kalian untuk berinteraksi dengan server menggunakan HTTP requests (permintaan HTTP) seperti GET, POST, PUT, dan DELETE. RESTful API menggunakan prinsip-prinsip dasar HTTP dan beroperasi di atas konsep sumber daya (resources), yang dapat kalian akses dengan URI (Uniform Resource Identifier).

2. **SOAP API (API SOAP)**
SOAP API adalah tipe API lain yang digunakan untuk pertukaran data antara kalian dan server. API ini menggunakan protokol XML dan dapat digunakan untuk komunikasi antara aplikasi yang berbeda, bahkan jika mereka dibangun dengan teknologi yang berbeda.

3. **GraphQL API**
GraphQL adalah jenis API yang memungkinkan kalian untuk mengambil data sesuai dengan permintaan kalian. Alih-alih menerima seluruh objek seperti pada REST, kalian dapat menentukan struktur data yang diinginkan dalam permintaan kalian. Hal ini memberikan kalian lebih banyak kontrol atas data yang diterima.

4. **WebSocket API (API WebSocket)**
WebSocket API memungkinkan kalian untuk menjalani komunikasi dua arah secara real-time dengan server. Ini sangat berguna untuk aplikasi yang memerlukan pembaruan data yang cepat, seperti aplikasi perpesanan atau permainan online.

5. **JSON-RPC dan XML-RPC API**
JSON-RPC dan XML-RPC adalah protokol yang digunakan untuk memanggil fungsi atau metode di server menggunakan data JSON atau XML sebagai format permintaan. Kalian mengirim permintaan dengan parameter ke server, dan server mengembalikan hasil pemanggilan fungsi tersebut.

6. **OAuth API**
OAuth adalah protokol otentikasi yang digunakan untuk memberikan akses terbatas ke data atau sumber daya kalian kepada aplikasi pihak ketiga tanpa perlu berbagi kata sandi. Ini sering digunakan dalam aplikasi sosial media dan integrasi dengan layanan pihak ketiga.

dari semua tipe ini , yang paling penting untuk kalian pelajari itu ada 3.  Rest, GraphQL dan websocket.

ini resource untuk explore 2 API tersbut.
GraphQL : https://devsaurus.com/graphql
Websocket: https://danangarif202.medium.com/websocket-client-server-socket-io-react-js-express-js-1956690fb5fd

****note***: websocket itu realtime API, jadi pasti tektokan sama client. client disini menggunakan react, boleh kalian coba langsung atau cuma baca baca aja gpp.

https://devsaurus.com/graphql

https://danangarif202.medium.com/websocket-client-server-socket-io-react-js-express-js-1956690fb5fd