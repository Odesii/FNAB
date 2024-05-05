require('dotenv').config();
console.log(process.env.DB_USER, process.env.DB_PASSWORD); // This should log 'postgres' and '123'
