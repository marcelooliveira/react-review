import Database from 'better-sqlite3';
import path from 'path';

const DB_PATH = path.join(__dirname, '..', 'eshop.db');

const db = new Database(DB_PATH);

db.exec(`
  CREATE TABLE IF NOT EXISTS cart (
    cart_id   INTEGER PRIMARY KEY AUTOINCREMENT,
    shipping  REAL    NOT NULL,
    tax       REAL    NOT NULL
  );

  CREATE TABLE IF NOT EXISTS cart_items (
    item_id    INTEGER PRIMARY KEY,
    cart_id    INTEGER NOT NULL,
    name       TEXT    NOT NULL,
    image_url  TEXT    NOT NULL,
    unit_price REAL    NOT NULL,
    quantity   INTEGER NOT NULL,
    FOREIGN KEY (cart_id) REFERENCES cart(cart_id)
  );
`);

// Seed initial data only when the cart table is empty
const cartCount = (db.prepare('SELECT COUNT(*) as count FROM cart').get() as { count: number }).count;

if (cartCount === 0) {
  const insertCart = db.prepare(
    'INSERT INTO cart (shipping, tax) VALUES (?, ?)'
  );
  const insertItem = db.prepare(
    'INSERT INTO cart_items (item_id, cart_id, name, image_url, unit_price, quantity) VALUES (?, ?, ?, ?, ?, ?)'
  );

  const seedCart = db.transaction(() => {
    const { lastInsertRowid } = insertCart.run(7.99, 16.80);
    const cartId = Number(lastInsertRowid);

    insertItem.run(1, cartId, 'Wireless Bluetooth Headphones', '/src/assets/product001.png', 59.99, 2);
    insertItem.run(2, cartId, 'USB-C Charging Cable (6ft)',    '/src/assets/product002.png', 12.99, 1);
    insertItem.run(3, cartId, 'Laptop Stand - Aluminum',       '/src/assets/product003.png', 34.99, 1);
  });

  seedCart();
}

export default db;
