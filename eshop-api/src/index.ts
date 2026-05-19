import express from 'express';
import cors from 'cors';
import db from './database';

const app = express();
const PORT = 3001;
const TAX_RATE = 0.1;

app.use(cors());''
app.use(express.json());

app.get('/cart/:cartId', (req, res) => {
  const cartId = req.params.cartId;

  const cart = db.prepare('SELECT * FROM cart WHERE cart_id = ?').get(cartId) as
    { cart_id: number; shipping: number; tax: number } | undefined;

  if (!cart) {
    res.status(404).json({ error: 'Cart not found' });
    return;
  }

  const items = db.prepare('SELECT * FROM cart_items WHERE cart_id = ?').all(cart.cart_id) as
    { item_id: number; cart_id: number; name: string; image_url: string; unit_price: number; quantity: number }[];

  const subtotal = items.reduce((sum, i) => sum + i.unit_price * i.quantity, 0);
  const tax = parseFloat((subtotal * TAX_RATE).toFixed(2));

  res.json({
    cartItems: items.map(i => ({
      itemId:    i.item_id,
      name:      i.name,
      imageUrl:  i.image_url,
      unitPrice: i.unit_price,
      quantity:  i.quantity,
    })),
    shipping: cart.shipping,
    tax
  });
});

app.post('/cart/:cartId/items/:itemId', (req, res) => {
  const { cartId, itemId } = req.params;
  const { quantity } = req.body as { quantity?: number };

  if (quantity === undefined || !Number.isInteger(quantity) || quantity < 0) {
    res.status(400).json({ error: 'quantity must be a non-negative integer' });
    return;
  }

  const cartExists = db.prepare('SELECT cart_id FROM cart WHERE cart_id = ?').get(cartId);
  if (!cartExists) {
    res.status(404).json({ error: 'Cart not found' });
    return;
  }

  const result = db
    .prepare('UPDATE cart_items SET quantity = ? WHERE item_id = ? AND cart_id = ?')
    .run(quantity, itemId, cartId);

  if (result.changes === 0) {
    res.status(404).json({ error: 'Item not found in cart' });
    return;
  }

  const updated = db
    .prepare('SELECT * FROM cart_items WHERE item_id = ? AND cart_id = ?')
    .get(itemId, cartId) as
    { item_id: number; cart_id: number; name: string; image_url: string; unit_price: number; quantity: number };

  const allItems = db.prepare('SELECT unit_price, quantity FROM cart_items WHERE cart_id = ?').all(cartId) as
    { unit_price: number; quantity: number }[];
  const subtotal = allItems.reduce((sum, i) => sum + i.unit_price * i.quantity, 0);
  const newTax = parseFloat((subtotal * TAX_RATE).toFixed(2));
  db.prepare('UPDATE cart SET tax = ? WHERE cart_id = ?').run(newTax, cartId);

  res.json({
	item: {
		itemId:    updated.item_id,
		name:      updated.name,
		imageUrl:  updated.image_url,
		unitPrice: updated.unit_price,
		quantity:  updated.quantity,
	  },
	tax: newTax
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});