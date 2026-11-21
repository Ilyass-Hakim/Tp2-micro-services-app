import { Component, OnInit, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DecimalPipe } from '@angular/common';

@Component({
  imports: [DecimalPipe],
  selector: 'app-products',
  styleUrl: './products.css',
  templateUrl: './products.html',
})
export class Products implements OnInit {
  products = signal<any[]>([]);
  errorMessage = signal<string>('');

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any>('http://localhost:8888/inventory-service/api/products').subscribe({
      next: data => this.products.set(data._embedded.products),
      error: err => this.errorMessage.set(err.message)
    });
  }
}
