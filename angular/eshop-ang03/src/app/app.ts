import { Component, signal, OnInit, computed } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { CartItem } from './cart-item';
import {form, FormField, required, email, submit} from '@angular/forms/signals';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CurrencyPipe ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('eshop-ang03'); 
  
  readonly cartId: number = 1;
  readonly baseApiUrl: string = 'http://localhost:3001';
  
  cartItems = signal<CartItem[]>([]); 
  shipping = signal(0);
  tax = signal(0);  
  subtotal = computed(() => this.cartItems().reduce((sum, i) => sum + (i.quantity * i.unitPrice), 0 ));
  total = computed(() => this.subtotal() + this.shipping() + this.tax());
  
  isLoading = signal<boolean>(false);
  error = signal<string | null>(null);
  
  constructor(private http: HttpClient){
  
  }
  
  ngOnInit() {
	this.isLoading.set(true);
	this.http.get(`${this.baseApiUrl}/cart/${this.cartId}`).subscribe({
		next: (response: any) => {
			this.cartItems.set(response.cartItems);
			this.shipping.set(response.shipping);
			this.tax.set(response.tax);
			
			this.isLoading.set(false);
			this.error.set(null);
		},
		error: (err: any) => {
			this.error.set(err.statusText);
			this.isLoading.set(false);
		}
	});
  }
  
  updateItem(item: CartItem, quantity: number) {
	console.log('updateItem');
	this.http.post(`${this.baseApiUrl}/cart/${this.cartId}/items/${item.itemId}`, {quantity}).subscribe({
		next: (response: any) => {
			this.cartItems.set(this.cartItems().map((i: CartItem) => i.itemId === response.item.itemId ? response.item : i));
			this.tax.set(response.tax);
			this.error.set(null);
		},
		error: (err: any) => {
			this.error.set(err.statusText);
		}
	});
  }
  
  removeItem(item: CartItem) {
	console.log('removeItem');
	this.updateItem(item, 0);
  }
  
  onSubmit(event: Event) {
    event.preventDefault();
	console.log(`total: ${this.total().toFixed(2)}`);
  }
}
