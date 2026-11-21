import { Component, OnInit, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  imports: [DatePipe],
  selector: 'app-bills',
  styleUrl: './bills.css',
  templateUrl: './bills.html',
})
export class Bills implements OnInit {
  bills = signal<any[]>([]);
  customerId = signal<string | null>(null);
  errorMessage = signal<string>('');

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.customerId.set(this.route.snapshot.paramMap.get('customerId'));
    this.http.get<any>('http://localhost:8888/billing-service/api/bills').subscribe({
      next: data => {
        let bills: any[] = data._embedded.bills;
        // l'id de la facture n'est pas expose par Spring Data REST : on le lit dans le lien "self"
        bills.forEach(b => b.id = b._links.self.href.split('/').pop());
        if (this.customerId()) {
          bills = bills.filter(b => b.customerId == this.customerId());
        }
        this.bills.set(bills);
      },
      error: err => this.errorMessage.set(err.message)
    });
  }

  getBillDetails(bill: any) {
    this.router.navigateByUrl('/bill-details/' + bill.id);
  }
}
