import { EventEmitter, Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
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

  addProduct(data: any) {
    return this.http
      .post<any>(`${this.apiUrl}/bp/products`, data)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 400) {
      return throwError(() => new Error('Duplicate identifier found in the database'));
    } else {
      return throwError(() => new Error('An unexpected error occurred'));
    }
  }

  editProducts(data: any) {
    return this.http
      .put<any>(`${this.apiUrl}/bp/products`, data, {
        headers: {
          authorId: '2',
        },
      })
      .pipe(
        catchError((error) => {
          return error;
        })
      );
  }

}