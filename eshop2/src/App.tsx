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
	const [cartId, setCartId] = useState<number>(1);
	const [cartItems, setCartItems] = useState<CartItem[]>([]);
	const [shipping, setShipping] = useState<number>(0);
	const [tax, setTax] = useState<number>(0);
	const [error, setError] = useState<string | null>(null);
	// useMemo é para derived state: o subtotal é calculado a pt de cartItems, que está no state,
	// logo subtotal é derived state!
	const subtotal = useMemo(() =>
		cartItems.reduce((sum, current) => sum + current.quantity * current.unitPrice, 0)
		, [cartItems]);
	// useMemo é para derived state: total é calculado a pt de cartItems, shipping e de tax, que estão no state,
	// logo total é derived state!
	const total = useMemo(() => subtotal + shipping + tax
		, [subtotal, shipping, tax]);

	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true);
			const result = await fetch(`http://localhost:3001/cart/${cartId}`);
			if (!result.ok) {
				setIsLoading(false);
				setError(result.statusText);
				return;
			}
				
			const json = await result.json();
			setCartItems(json.cartItems);
			setShipping(json.shipping);
			setTax(json.tax);
			setIsLoading(false);
			setError(null);
		}
		fetchData();
	}, [cartId]); // só roda useEffect de novo quando cartId mudar
	
	const updateItem = ((item: CartItem, quantity: number) => {
		const fetchData = async () => {
			const postResult = await fetch(`http://localhost:3001/cart/${cartId}/items/${item.itemId}`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ quantity: quantity })
			})
			
			if (!postResult.ok) {
				setError(postResult.statusText);
				return;
			}
				
			const postJson = await postResult.json();
			
			setCartItems(prev => {
				const next = prev.map((current) => current.itemId === item.itemId ? postJson.item : current);
				return next;
			});
			
			setTax(postJson.tax);
			
			setError(null);
		}
		fetchData();
	
	});
	
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log('clicked: Proceed to checkout!');
	};

  return (
  <div className="container">
    <h1>Shopping Cart</h1>
	
	{isLoading && <div>Loading...</div>}
    
	<form onSubmit={handleSubmit}>
    <div className="cart-grid">
      <div className="cart-items">
	  {
		cartItems.map((item) => 
        (<div className="item" key={item.itemId}>
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
        </div>)
		)
	  }
		
      </div>

      <div className="cart-summary">
        <div className="summary-row">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
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
	{error && <div className="error">{error}</div>}
  </div>
  )
}

export default App
