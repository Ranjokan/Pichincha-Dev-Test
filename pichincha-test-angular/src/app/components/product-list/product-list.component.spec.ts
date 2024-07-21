import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { ProductInterface } from '../../interfaces/product.interface';
import { ProductListComponent } from './product-list.component';
import { Location } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';

@Component({ template: '' })
class MockAddProductComponent { }

describe('ProductListComponent', () => {
  let router: Router;
  let location: Location;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ProductListComponent,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          { path: 'newProduct', component: MockAddProductComponent }
        ]),
      ],
    }).compileComponents();

    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
    router.initialNavigation();
  });



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




  it('should create', () => {
    const fixture = TestBed.createComponent(ProductListComponent);
    const productComponent = fixture.componentInstance;
    expect(productComponent).toBeTruthy();
  });

  it('should filter the products by search text', () => {
    const fixture = TestBed.createComponent(ProductListComponent);
    const productComponent = fixture.componentInstance;
    jest.spyOn(productComponent,'filterProducts');
    const inputElement = fixture.nativeElement.querySelector('input');
    inputElement.value = 'uno';
    inputElement.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    expect(productComponent.filterProducts).toBe('uno');
  });

  it('should toggle the dropdown menu on click', () => {
    const fixture = TestBed.createComponent(ProductListComponent);
    const productComponent = fixture.componentInstance;
    productComponent.toggleDropdown(0);
    expect(productComponent.isDropdownOpen).toBeTruthy();
  });

  it('should navigate to /newProduct when addProduct button is clicked', async () => {
    jest.spyOn(router, 'navigate');
    const fixture = TestBed.createComponent(ProductListComponent);
    const button = fixture.nativeElement.querySelector('#addButton');
    expect(button).not.toBeNull();
    button.click();

    fixture.detectChanges();
    await fixture.whenStable();

    expect(router.navigateByUrl).toHaveBeenCalledWith('/newProduct');
    expect(location.path()).toBe('/newProduct');
  });

  /*it('should navigate to the edit product page on click', () => {
    const fixture = TestBed.createComponent(ProductListComponent);
    const productComponent = fixture.componentInstance;
    const product = productsListMock[0]
    productComponent.editProduct(product);
    expect(routerStub.navigate).toHaveBeenCalledWith(['/newProduct'], { queryParams: product });
  });*/

  it('should open the modal on click', () => {
    const fixture = TestBed.createComponent(ProductListComponent);
    const productComponent = fixture.componentInstance;
    const product = productsListMock[0]
    productComponent.openModal(product);
    expect(productComponent.modalActive).toBeTruthy();
  });

});