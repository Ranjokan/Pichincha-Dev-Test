import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewProductComponent } from './new-product.component';
import { ProductService } from '../../services/product-list.service';
import { Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Location } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';

@Component({ template: '' })
class MockNewProductComponent { }

describe('NewProductComponent', () => {
  let productService: ProductService;
  let router: Router;
  let location: Location;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, NewProductComponent,
        RouterTestingModule.withRoutes([
          { path: 'newProduct', component: MockNewProductComponent }
        ]),
      ],
    }).compileComponents();

    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
    router.initialNavigation();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(NewProductComponent);
    const productComponent = fixture.componentInstance;
    expect(productComponent).toBeTruthy();
  });
});
