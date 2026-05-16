import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3000;

app.use(cors());

app.use(express.json());

const cartData = {
	cartItems: [
		{
			itemId: 1,
			name : 'Wireless Bluetooth Headphones',
			imageUrl : '/src/assets/product001.png',
			unitPrice : 59.99,
			quantity : 2
		},{
			itemId: 2,
			name : 'USB-C Charging Cable (6ft)',
			imageUrl : '/src/assets/product002.png',
			unitPrice : 12.99,
			quantity : 1
		},{
			itemId: 3,
			name : 'Laptop Stand - Aluminum',
			imageUrl : '/src/assets/product003.png',
			unitPrice : 34.99,
			quantity : 1
		}
	],
	shipping: 7.99,
	tax: 16.80
}

app.get('/cart', (req, res) => {
  res.send(JSON.stringify(cartData));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});