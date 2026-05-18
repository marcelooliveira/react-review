import { useState, useEffect, useMemo } from 'react'
import './App.css'

interface CartItem {
	itemId:    number,
	name:      string,
	imageUrl:  string,
	unitPrice: number,
	quantity:  number,
}

function App() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [shipping, setShipping] = useState<number>(0);
  const [tax, setTax] = useState<number>(0);
  const subTotal = useMemo(() => cartItems.reduce((accum: number, item: CartItem) => accum + item.quantity * item.unitPrice, 0), [cartItems]);
  const total = useMemo(() => subTotal + shipping + tax, [subTotal, shipping, tax]);
  
  useEffect(() => {
	setError(null);
	const fetchData = async () => {
		setIsLoading(true);
		const response = await fetch(`http://localhost:3001/cart/1`);
		if (!response.ok) {
			setIsLoading(false);
			setError(response.statusText);
			return;
		}
			
		const json = await response.json();
		setCartItems(json.cartItems);
		setShipping(json.shipping);
		setTax(json.tax);
		setIsLoading(false);
	}
	
	fetchData();
  }, [])
  
  const updateItem = async (item: CartItem, quantity: number) => {
	setError(null);
	const updateResponse = await fetch(`http://localhost:3001/cart/1/items/${item.itemId}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({quantity})
	})
	
	if (!updateResponse.ok) {
		setError(updateResponse.statusText);
		return;
	}
	
	const json = await updateResponse.json();
	setCartItems(prev => {
		const next = prev.map((i) => i.itemId === json.item.itemId ? json.item : i);
		return next;
	});
	setTax(json.tax);
	
  }
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
	alert("handleSubmit");
  }

  return (
<div className="container">
    <h1>Shopping Cart</h1>
    
	{isLoading && <div>LOADING...</div>}
	<form onSubmit={handleSubmit}>
    <div className="cart-grid">
      <div className="cart-items">

		{cartItems.map((item) =>
        <div className="item" key={item.itemId}>
          <div className="item-image"><img src={item.imageUrl}/></div>
          <div className="item-details">
            <div className="item-name">{item.name}</div>
            <div className="item-price">${item.unitPrice.toFixed(2)}</div>
            <div className="item-quantity">
              <button type="button" className="quantity-btn" onClick={() => updateItem(item, item.quantity - 1)}>-</button>
              <span className="quantity-display">{item.quantity}</span>
              <button type="button" className="quantity-btn" onClick={() => updateItem(item, item.quantity + 1)}>+</button>
              <button type="button" className="remove-btn" onClick={() => updateItem(item, 0)}>Remove</button>
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
          <span>${total.toFixed(2)}</span>
        </div>
        <button type="submit" className="checkout-btn">Proceed to Checkout</button>
        <a href="#" className="continue-shopping">Continue Shopping</a>
      </div>
    </div>
	</form>
	{error && <div>{error}</div>}
  </div>    
  )
}

export default App
