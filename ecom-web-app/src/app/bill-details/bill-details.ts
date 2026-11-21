import { Component, OnInit, computed, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { DatePipe, DecimalPipe } from '@angular/common';

@Component({
  imports: [DatePipe, DecimalPipe],
  selector: 'app-bill-details',
  styleUrl: './bill-details.css',
  templateUrl: './bill-details.html',
})
export class BillDetails implements OnInit {
  bill = signal<any>(null);
  errorMessage = signal<string>('');
  total = computed(() => {
    const b = this.bill();
    if (!b) return 0;
    return b.productItems.reduce((sum: number, pi: any) => sum + pi.quantity * pi.unitPrice, 0);
  });

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.http.get<any>('http://localhost:8888/billing-service/bills/' + id).subscribe({
      next: data => this.bill.set(data),
      error: err => this.errorMessage.set(err.message)
    });
  }
}
