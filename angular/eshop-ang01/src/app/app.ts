import { Component, signal, computed, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { CurrencyPipe } from '@angular/common'
import { RouterOutlet } from '@angular/router';
import { CartItem } from './cart-item';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CurrencyPipe],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('eshop-ang01');
  
  //equivalentes ao useState
  baseApiUrl: string = 'http://localhost:3001';
  isLoading = signal(false);
  error = signal<string | null>(null);
  cartItems = signal<CartItem[]>([]);
  shipping = signal(0);
  tax = signal(0);
  cartId: number = 1;

  //equivalentes ao useMemo (calculados automaticamente)
  readonly subtotal = computed(() =>
    this.cartItems().reduce((accum, current) => accum + (current.quantity * current.unitPrice), 0)
  );
  
  readonly total = computed(() => this.subtotal() + this.shipping() + this.tax());
  
  //private faz o http ser injetado e pode ser usado com this.http
  constructor(private http: HttpClient) {
	console.log('constructor');
  }
  
  //equivalente ao useEffect
  ngOnInit() {
	this.isLoading.set(true);
	
	this.http.get(`${this.baseApiUrl}/cart/${this.cartId}`).subscribe({
		next: (json: any) => {
			this.isLoading.set(false);
			this.cartItems.set(json.cartItems);
			this.shipping.set(json.shipping);
			this.tax.set(json.tax);
			this.error.set(null);
		},
		error: (err: any) => {
			this.error.set(err.statusText);
			this.isLoading.set(false);
		}
	});

  }
  
  updateItem(item: CartItem, quantity: number) {
		this.http.post(`${this.baseApiUrl}/cart/${this.cartId}/items/${item.itemId}`, { quantity })
		.subscribe({
			next: (json: any) => {
				console.log(JSON.stringify(json.item));
				this.cartItems.update(items => items.map(i => i.itemId === json.item.itemId ? json.item : i));
				this.tax.set(json.tax);
				this.error.set(null);
			},
			error: (err: any) => { this.error.set(err.statusText); }
			})
	}
}
