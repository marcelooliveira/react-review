import { Component, signal, OnInit, computed } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterOutlet } from '@angular/router';
import { CartItem } from './cart-item'

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CurrencyPipe],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit{
  protected readonly title = signal('eshop-ang02');
  
  readonly cartId:number = 1;
  readonly baseApiUrl: string = 'http://localhost:3001';
  cartItems = signal<CartItem[]>([]);  
  shipping = signal(0);
  tax = signal(0);
  isLoading = signal<boolean>(false);
  error = signal<string | null>(null);
  
  readonly subtotal = computed(() => this.cartItems().reduce((sum: number, i: CartItem) => sum + i.quantity * i.unitPrice, 0) );
  readonly total = computed(() => this.subtotal() + this.shipping() + this.tax());
  
  constructor(private http: HttpClient) { }
  
  ngOnInit() {
	this.isLoading.set(true);
	this.error.set(null);
	this.http.get(`${this.baseApiUrl}/cart/${this.cartId}`).subscribe({
		next: (json: any) => {
			this.cartItems.set(json.cartItems);
			this.shipping.set(json.shipping);
			this.tax.set(json.tax);
			this.error.set(null);
			this.isLoading.set(false);
		},
		error: (err: any) => {
			this.error.set(err.statusText);
			this.isLoading.set(false);
		}
	});
  }
  
  updateItem(item: CartItem, quantity: number) {
	this.http.post(`${this.baseApiUrl}/cart/${this.cartId}/items/${item.itemId}`, { quantity }).subscribe({
		next: (json: any) => {
			this.cartItems.set(this.cartItems().map((i: CartItem) => i.itemId === json.item.itemId ? json.item : i));
			this.tax.set(json.tax);
			this.error.set(null);
		},
		error: (err: any) => {
			this.error.set(err.statusText);
		}
	});
	
  }
  
  onSubmit(event: Event) {
	event.preventDefault();
	alert('onSubmit');
  }
}
