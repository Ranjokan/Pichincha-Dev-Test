import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewProductComponent } from './new-product.component';
import { ProductService } from '../../services/product-list.service';
import { Router } from '@angular/router';

describe('NewProductComponent', () => {
  let component: NewProductComponent;
  let fixture: ComponentFixture<NewProductComponent>;
  let productService: ProductService;
  let router: Router;
  let productServiceStub: any;
  let routerStub: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewProductComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
