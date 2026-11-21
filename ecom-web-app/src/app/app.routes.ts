import { Routes } from '@angular/router';
import { Products } from './products/products';
import { Customers } from './customers/customers';
import { Bills } from './bills/bills';
import { BillDetails } from './bill-details/bill-details';

export const routes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  { path: 'products', component: Products },
  { path: 'customers', component: Customers },
  { path: 'bills', component: Bills },
  { path: 'bills/customer/:customerId', component: Bills },
  { path: 'bill-details/:id', component: BillDetails }
];
