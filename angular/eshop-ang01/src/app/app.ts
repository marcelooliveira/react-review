import { Component, signal, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { CurrencyPipe } from '@angular/common'
import { RouterOutlet } from '@angular/router';
import { CartItem } from './cart-item';
import { firstValueFrom, pipe, map } from 'rxjs'

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CurrencyPipe],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('eshop-ang01');
  
  //equivalentes ao setState
  baseApiUrl: string = 'http://localhost:3001';
  isLoading: boolean = false;
  error: string | null = null;
  cartItems: CartItem[] = [];
  shipping: number = 0;
  tax: number = 0;
  cartId: number = 1;

  //equivalentes ao setMemo (calculados automaticamente)
  get subtotal() {
	return this.cartItems.reduce((accum: number, current: CartItem) => accum + (current.quantity * current.unitPrice), 0);
  }
  
  get total() {
	return this.subtotal + this.shipping + this.tax;
  }
  
  //private faz o http ser injetado e pode ser usado com this.http
  constructor(private http: HttpClient) {
	console.log('constructor');
  }
  
  //equivalente ao useEffect
  ngOnInit() {
	this.isLoading = true;
	
	this.http.get(`${this.baseApiUrl}/cart/${this.cartId}`).subscribe({
		next: (json: any) => {
			this.isLoading = false;
			this.cartItems = json.cartItems;
			this.tax = json.tax;
			this.error = null;
		},
		error: (err: any) => {
			this.error = err.statusText;
			this.isLoading = false;
		}
	});

  }
  
  updateItem(item: CartItem, quantity: number) {
		this.http.post(`${this.baseApiUrl}/cart/${this.cartId}/items/${item.itemId}`, { quantity })
		.subscribe({
			next: (json: any) => {
				console.log(JSON.stringify(json.item));
				this.cartItems = this.cartItems.map((i : CartItem) => i.itemId === json.item.itemId ? json.item : i);
				this.tax = json.tax;
				this.error = null;
			},
			error: (err: any) => { this.error = err.statusText }
			})
	}
}
