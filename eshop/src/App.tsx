import { useState } from 'React'
import './App.css'

function App() {

	const cartItemsDb = [
		{
			name : 'Wireless Bluetooth Headphones',
			imageUrl : '/src/assets/product001.png',
			unitPrice : 59.99,
			quantity : 2
		},{
			name : 'USB-C Charging Cable (6ft)',
			imageUrl : '/src/assets/product002.png',
			unitPrice : 12.99,
			quantity : 1
		},{
			name : 'Laptop Stand - Aluminum',
			imageUrl : '/src/assets/product003.png',
			unitPrice : 34.99,
			quantity : 1
		},
	]
	
	const [cartItems, setCartItems] = useState(cartItemsDb);

	const subTotalDb = cartItemsDb.reduce((sum, current) => sum + current.quantity * current.unitPrice, 
	0);

	const [subTotal, setSubTotal] = useState(subTotalDb);
	
	const [shipping, setShipping] = useState(7.99);
	
	const taxRate = .1;
	
	const [tax, setTax] = useState(subTotalDb * taxRate);

  return (
  <div class="container">
    <h1>Shopping Cart</h1>
    
    <div class="cart-grid">
      <div class="cart-items">
	  
		{cartItems.map(i =>
			<div class="item">
			  <div class="item-image"><img src={i.imageUrl}/></div>
			  <div class="item-details">
				<div class="item-name">{i.name}</div>
				<div class="item-price">${i.unitPrice * i.quantity}</div>
				<div class="item-quantity">
				  <button class="quantity-btn">-</button>
				  <span class="quantity-display">{i.quantity}</span>
				  <button class="quantity-btn">+</button>
				  <button class="remove-btn">Remove</button>
				</div>
			  </div>
			</div>
		)}
	  

      </div>

      <div class="cart-summary">
        <div class="summary-row">
          <span>Subtotal</span>
          <span>${subTotal.toFixed(2)}</span>
        </div>
        <div class="summary-row">
          <span>Shipping</span>
          <span>${shipping.toFixed(2)}</span>
        </div>
        <div class="summary-row">
          <span>Tax</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        <div class="summary-row total">
          <span>Total</span>
          <span>${(subTotal + shipping + tax).toFixed(2)}</span>
        </div>
        <button class="checkout-btn">Proceed to Checkout</button>
        <a href="#" class="continue-shopping">Continue Shopping</a>
      </div>
    </div>
  </div>  
  );
}

export default App
