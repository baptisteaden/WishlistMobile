import sqlite3 from 'sqlite3';

sqlite3.verbose();

const db = new sqlite3.Database('./wishlist.db', (err) => {
  if (err) {
    throw err;
  }
  console.log("Connected to database 'wishlist.db'");
});

export default db;
