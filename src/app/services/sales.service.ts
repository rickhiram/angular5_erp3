import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Sales} from '../models/sales.model';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Invoice } from 'app/models/invoice.model';
import {Http,Response,Headers} from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class SalesService {
 private serviceUrl = 'http://localhost:5800/salesorders';
 private invoiceUrl = 'http://localhost:5900/invoice';
 
 invoice2: Observable<any[]>;
formularList: AngularFireList<any>;

  constructor(private http:HttpClient) { }

  // headers = new Headers({'content-type':'application/json'})

  getSales(): Observable<Sales[]>{
    return this.http.get<Sales[]>(this.serviceUrl)

    
  }
  getInvoice(): Observable<Invoice[]>{
    return this.http.get<Invoice[]>(this.invoiceUrl)
  }
  delInvoice(sales :Sales ){
  const url =`${"http://localhost:5800/salesorders"}/${sales.$key}`
  return this.http.delete(url).toPromise()
  .then(()=>{
   // this.fetchData();
  
  })
  }
}
