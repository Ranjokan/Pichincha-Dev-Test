import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product-list.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { ProductInterface } from '../../interfaces/product.interface';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ProductListComponent } from './product-list.component';


describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let productService: ProductService;
  let router: Router;
  let productServiceStub: any;
  let routerStub: any;


  const productsListMock: ProductInterface[] = [
    {
      id: 'trj-crd-2',
      name: 'Tarjetas de Credito',
      description: 'Tarjeta de consumo bajo la modalidad de credito',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/800px-Visa_Inc._logo.svg.png',
      date_release: new Date,
      date_revision: new Date,
    },
    {
      id: 'trj-crd-3',
      name: 'Tarjetas de Credito bancaria',
      description: 'Tarjeta de consumo bajo la modalidad de credito',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/800px-Visa_Inc._logo.svg.png',
      date_release: new Date,
      date_revision: new Date,
    }
  ];

  beforeEach(async () => {
    productServiceStub = {
      getData: jest.fn(() => Observable<any>),
      addProduct: jest.fn(() => Observable<any>),
    };

    routerStub = {
      navigate: jest.fn(),
    };
    
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule, HttpClientModule, ProductListComponent],
      declarations: [ProductListComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: ProductService, useValue: productServiceStub },
        { provide: Router, useValue: routerStub },
        {
          provide: HttpClient, useValue: {
            post: jest.fn(),
            put: jest.fn(),
          }
        },
      ],
    });
    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    productService = TestBed.get(ProductService);
    router = TestBed.get(Router);
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should filter the products by search text', () => {
    component.searchText = 'Product 1';
    component.filterProducts();
    expect(component.productsFilter.length).toBe(1);
  });

  it('should toggle the dropdown menu on click', () => {
    component.toggleDropdown(0);
    expect(component.isDropdownOpen).toBeTruthy();
  });

  it('should navigate to the add product page on click', () => {
    component.addProduct();
    expect(routerStub.navigate).toHaveBeenCalledWith(['/newProduct']);
  });

  it('should navigate to the edit product page on click', () => {
    const product = productsListMock[0]
    component.editProduct(product);
    expect(routerStub.navigate).toHaveBeenCalledWith(['/newProduct'], { queryParams: product });
  });

  it('should open the modal on click', () => {
    const product = productsListMock[0]
    component.openModal(product);
    expect(component.modalActive).toBeTruthy();
  });

});