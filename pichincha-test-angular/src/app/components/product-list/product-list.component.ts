import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product-list.service';
import { ProductInterface } from '../../interfaces/product.interface';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [DatePipe, ProductService, HttpClient]
})

export class ProductListComponent implements OnInit {
  productsList: ProductInterface[] = [];
  productsFilter: ProductInterface[] = [];
  productsQuantity: number = 5;
  quantityOptions = [5, 10, 15, 20];
  searchText: string = '';
  modalActive: boolean = false;
  isDropdownOpen: boolean = false;
  index!: number;
  selectedProduct: ProductInterface | undefined;

  constructor(
    private readonly productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.productService.getProducts().subscribe((products: any) => {
      this.productsList = products.data;
      this.productsFilter = this.productsList;
      this.changeQuantity();
    });
  }
  
  changeQuantity() {
    this.productsFilter = this.productsList.slice(0, this.productsQuantity);
  }
  
  addProduct() {
    this.router.navigate(['/newProduct']);
  }

  filterProducts() {
    this.productsFilter = this.productsList.filter(product => {
      return (product.name.toLowerCase().includes(this.searchText.toLowerCase()) || product.description.includes(this.searchText.toLowerCase()));
    });
    if(this.searchText.length == 0) this.changeQuantity()
  }

  toggleDropdown(indicator: any) {
    this.isDropdownOpen = !this.isDropdownOpen;
    this.index = indicator;
  }

  editProduct(product: ProductInterface) {
    const queryParams:  ProductInterface  = product;
    this.router.navigate(['/newProduct'], { queryParams });
  }

  openModal(product: ProductInterface) {
    this.selectedProduct = product;
    this.modalActive = true;
  }
  
}