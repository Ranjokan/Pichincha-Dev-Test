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

  changeQuantity() {
    this.productsFilter = this.productsList.slice(0, this.productsQuantity);
  }
  //Funcion para ir a la pagina de agregar producto
  addProduct() {
    this.router.navigateByUrl('/addProduct');
  }
  //Filtramos los productos
  filterProducts() {
    this.productsFilter = this.productsList.filter(product => {
      return (product.name.toLowerCase().includes(this.searchText.toLowerCase()) || product.description.includes(this.searchText.toLowerCase()));
    });
    if(this.searchText.length == 0) this.changeQuantity()
  }
  //Funcion para desplegar dropdown de editar y eliminar
  toggleDropdown(indicator: any) {
    this.isDropdownOpen = !this.isDropdownOpen;
    this.index = indicator;
  }
  //Funcion para redigir a la vista de editar producto
  editProduct(product: ProductInterface) {
    const queryParams:  ProductInterface  = product;
    this.router.navigate(['addProduct'], { queryParams });
  }
  //Abrir modal
  openModal(product: ProductInterface) {
    this.selectedProduct = product;
    this.modalActive = true;
  }
  //Funcion para llamar el servicio de eliminar producto
  /*deleteProduct(id: string) {
    try {
      this.productService.deleteProducts(id).subscribe(() => {
        this.getData();
      });
    } catch (error) {
      console.log('mensaje de error', error);
    }
  }
  //Confirmar eliminar el producto de modal
  manageClose(isDelete: boolean) {
    if (isDelete) this.deleteProduct(this.selectedProduct!.id);
    this.modalActive = false;
  }*/
  //Funcion para obtener la data del servicio obtener productos
  getData() {
    this.productService.getProducts().subscribe((products: any) => {
      this.productsList = products.data;
      this.productsFilter = this.productsList;
      this.changeQuantity();
    });
  }
}