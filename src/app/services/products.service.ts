import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Products} from '../models/products.model';

@Injectable()
export class ProductsService {
  private serviceUrl = ' http://localhost:5500/products';
  constructor(private http:HttpClient) { }

  getProducts(): Observable<Products[]>{
    return this.http.get<Products[]>(this.serviceUrl)
}
}