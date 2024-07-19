import { Routes } from '@angular/router';

import { ProductListComponent } from './components/product-list/product-list.component';

export const routes: Routes = [
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  { path: 'products', component: ProductListComponent },
  { path: '**', redirectTo: '/products' } // Wildcard route for a 404 page
];