import express from 'express';
import cors from 'cors';
import db from './database';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get('/cart/:cartId', (req, res) => {
  const cartId = req.params.cartId;

  const cart = db.prepare(`SELECT * FROM cart WHERE cart_id = ${cartId}`).get() as
    { cart_id: number; shipping: number; tax: number } | undefined;

  if (!cart) {
    res.status(404).json({ error: 'Cart not found' });
    return;
  }

  const items = db.prepare('SELECT * FROM cart_items WHERE cart_id = ?').all(cart.cart_id) as
    { item_id: number; cart_id: number; name: string; image_url: string; unit_price: number; quantity: number }[];

  res.json({
    cartItems: items.map(i => ({
      itemId:    i.item_id,
      name:      i.name,
      imageUrl:  i.image_url,
      unitPrice: i.unit_price,
      quantity:  i.quantity,
    })),
    shipping: cart.shipping,
    tax:      cart.tax,
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});