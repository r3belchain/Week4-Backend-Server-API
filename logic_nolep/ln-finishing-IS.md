***Logic Nolep Finishing IS***
- selesaikan semua CRUD dari project IS

- gunakan system quantity stock (setiap order dibuat, quantity di product akan berkurang sesuai data orderItem)

- tambahkan api search product by category (input text search wajib memakai req.query)

- semua getAll API wajib menggunakan pagination. input page dan size bisa kalian setting di req.query

https://www.prisma.io/docs/concepts/components/prisma-client/pagination#-cons-of-offset-pagination

- authorization, authorization disini berfungsi untuk otoritas user role pada API:

-> user : user hanya bisa akses API auth, product, category

-> admin : bisa akses semua API, termasuk CRUD User.

buatlah authorization middleware versi kalian sendiri 
