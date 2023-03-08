
![Suits](/readme-ss-localhost_3001_product-category_4.png)
![Product](/readme-ss-localhost_3001_product_31.png)
![Product](/readme-ss-localhost_3001_.png)
## Useage

1. Install all required npm packages:
```
npm i
```

2. Fill out the database and port parameters in .env.example - use your own parameters:
```
DB_NAME=
DB_PASSWORD=
DB_USER=
# The default port for MySQL is 3306, so you should use that unless you have explicitly configured your MySQL server to use a different port.
PORT=
```

3. Rename .env.example to .env

4. cd to db/ 

5. Log into mysql in terminal:
```
mysql -u root -p
```



6. Create database (automatically drops first if already exists):
```
source schema.sql
```
7. cd back to the project root

8. Start server:
```
node server.js
```
or, if you are using a start script defined in your package.json, for example, in the case of using nodemon:
```
npm run start
```

9. Seed the database:
```
npm run seed
```

10. Use Workbench to test out queries and study the database structure and contents.

11. To reset/restore the database to its original state, just shut down your server and repeat from Step 1.