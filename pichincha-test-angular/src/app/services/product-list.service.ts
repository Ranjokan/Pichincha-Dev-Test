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

  editProducts(data: any) {
    return this.http
      .put<any>(`${this.apiUrl}/bp/products/${data.id}`, data)
      .pipe(
        catchError((error) => {
          return error;
        })
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 400) {
      return throwError(() => new Error('Duplicate identifier found in the database'));
    } else {
      return throwError(() => new Error('An unexpected error occurred'));
    }
  }

  validateId(id: string): Observable<any>{
    return this.http
      .get<any>(`${this.apiUrl}/bp/products/verification/${id}`)
      .pipe(
        catchError((error) => {
          return error;
        })
      );
  }

}