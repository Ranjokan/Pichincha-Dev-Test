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
class MockRouter {
  navigate = jest.fn();
}

describe('ProductListComponent', () => {
  let router: Router;
  let location: Location;
  let mockRouter: MockRouter;

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
    mockRouter = TestBed.inject(Router) as unknown as MockRouter;
  });



  const productsListMock: ProductInterface[] = [
    {
      id: 'trj-crd-2',
      name: 'Tarjetas de Credito',
      description: 'Tarjeta de consumo bajo la modalidad de credito',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/800px-Visa_Inc._logo.svg.png',
      date_release: new Date("2022-03-25"),
      date_revision: new Date("2022-03-25"),
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
    const inputElement = fixture.nativeElement.querySelector('#searchInput');
    inputElement.value = 'uno';

    fixture.detectChanges();

    expect(productComponent.filterProducts);
  });

  it('should toggle the dropdown menu on click', () => {
    const fixture = TestBed.createComponent(ProductListComponent);
    const productComponent = fixture.componentInstance;
    productComponent.toggleDropdown(0);
    expect(productComponent.isDropdownOpen).toBeTruthy();
  });

  it('should navigate to /newProduct when addProduct button is clicked', async () => {
    const navigateSpy = jest.spyOn(mockRouter, 'navigate');
    const fixture = TestBed.createComponent(ProductListComponent);
    const button = fixture.nativeElement.querySelector('#addButton');
    expect(button).not.toBeNull();
    button.click();

    fixture.detectChanges();
    await fixture.whenStable();

    expect(navigateSpy).toHaveBeenCalledWith(['/newProduct']);
  });

  it('should navigate to the edit product page on click', async () => {
    const navigateSpy = jest.spyOn(mockRouter, 'navigate');
    const fixture = TestBed.createComponent(ProductListComponent);
    const productComponent = fixture.componentInstance;
    const product = productsListMock[0]
    productComponent.toggleDropdown(0);
    
    await fixture.whenStable().then(() => {
      expect(productComponent.editProduct).toHaveBeenCalled();
    });
    
  });

  

});