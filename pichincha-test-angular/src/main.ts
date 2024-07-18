import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { provideRouter, RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { AppComponent } from './app/app.component';
import { ProductListComponent } from './app/product-list/product-list.component';

const routes: Routes = [
  { path: '', component: ProductListComponent }
];

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(RouterModule.forRoot(routes), FormsModule, NgxPaginationModule),
    provideRouter(routes),
  ],
}).catch(err => console.error(err));
