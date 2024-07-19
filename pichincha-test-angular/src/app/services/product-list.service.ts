import { EventEmitter, Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ProductInterface } from '../interfaces/product.interface';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = environment.API_URL;
  
  
  constructor(private http: HttpClient) { }

  getProducts(): Observable<ProductInterface[]> {
    return this.http.get<ProductInterface[]>(`${this.apiUrl}/bp/products`);
  }

}