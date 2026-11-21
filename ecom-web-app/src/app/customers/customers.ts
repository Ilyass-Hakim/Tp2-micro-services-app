import { Component, OnInit, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  imports: [],
  selector: 'app-customers',
  styleUrl: './customers.css',
  templateUrl: './customers.html',
})
export class Customers implements OnInit {
  customers = signal<any[]>([]);
  errorMessage = signal<string>('');

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.http.get<any>('http://localhost:8888/customer-service/api/customers').subscribe({
      next: data => this.customers.set(data._embedded.customers),
      error: err => this.errorMessage.set(err.message)
    });
  }

  getBills(customer: any) {
    this.router.navigateByUrl('/bills/customer/' + customer.id);
  }
}
