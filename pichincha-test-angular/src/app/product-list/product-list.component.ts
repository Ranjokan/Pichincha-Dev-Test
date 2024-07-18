import { Component } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Product {
  logo: string;
  name: string;
  description: string;
  releaseDate: Date;
  refactorDate: Date;
}

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [DatePipe]
})
export class ProductListComponent {
  products: Product[] = [
    { logo: 'assets/logo1.png', name: 'Product 1', description: 'Description 1', releaseDate: new Date('2021-01-01'), refactorDate: new Date('2022-01-01') },
    { logo: 'assets/logo2.png', name: 'Product 2', description: 'Description 2', releaseDate: new Date('2021-02-01'), refactorDate: new Date('2022-02-01') },
    // Add more products here
  ];

  searchTerm: string = '';
  itemsPerPage: number = 5;
  itemsPerPageOptions: number[] = [5, 10, 20];

  constructor(private datePipe: DatePipe) {}

  get filteredProducts() {
    return this.products.filter(product => 
      product.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  formatDate(date: Date): string {
    return this.datePipe.transform(date, 'dd/MM/yyyy') || '';
  }

  addNewProduct() {
    // Your logic to add a new product
    alert('Add a new product functionality');
  }
}
