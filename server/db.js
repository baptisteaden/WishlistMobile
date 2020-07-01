const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('wishlist.db', (err) => {
  if (err) {
    throw err;
  }
  console.log("Connected to database 'wishlist.db'");
});

module.exports = db;
