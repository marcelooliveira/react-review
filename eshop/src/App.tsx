import { useState, useEffect } from 'React'
import './App.css'

function App() {

	const [cartItems, setCartItems] = useState([]);

	const [subTotal, setSubTotal] = useState(0);
	
	const [shipping, setShipping] = useState(0);
	
	const [tax, setTax] = useState(.1);
	
	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch('http://localhost:3000/cart')
			if (!response.ok) {
				throw new Error(response.statusText);
				return;
			}
				
			const cartDataDb = await response.json();
			
			setCartItems(cartDataDb.cartItems);
			
			const subTotalDb = cartDataDb.cartItems.reduce((sum, current) => sum + current.quantity * current.unitPrice, 
			0);

			setSubTotal(subTotalDb);
			
			setShipping(cartDataDb.shipping);
		
			setTax(cartDataDb.tax);
		}
		
		fetchData();
	}, []);

  return (
  <div className="container">
    <h1>Shopping Cart</h1>
    
    <div className="cart-grid">
      <div className="cart-items">
	  
		{cartItems.map(i =>
			<div key={i.itemId} className="item">
			  <div className="item-image"><img src={i.imageUrl}/></div>
			  <div className="item-details">
				<div className="item-name">{i.name}</div>
				<div className="item-price">${i.unitPrice * i.quantity}</div>
				<div className="item-quantity">
				  <button className="quantity-btn">-</button>
				  <span className="quantity-display">{i.quantity}</span>
				  <button className="quantity-btn">+</button>
				  <button className="remove-btn">Remove</button>
				</div>
			  </div>
			</div>
		)}
	  

      </div>

      <div className="cart-summary">
        <div className="summary-row">
          <span>Subtotal</span>
          <span>${subTotal.toFixed(2)}</span>
        </div>
        <div className="summary-row">
          <span>Shipping</span>
          <span>${shipping.toFixed(2)}</span>
        </div>
        <div className="summary-row">
          <span>Tax</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        <div className="summary-row total">
          <span>Total</span>
          <span>${(subTotal + shipping + tax).toFixed(2)}</span>
        </div>
        <button className="checkout-btn">Proceed to Checkout</button>
        <a href="#" className="continue-shopping">Continue Shopping</a>
      </div>
    </div>
  </div>  
  );
}

export default App
