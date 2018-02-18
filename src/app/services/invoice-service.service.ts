import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Invoice} from '../models/invoice.model';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database'


@Injectable()
export class InvoiceServiceService {
  invoice2: Observable<any[]>;
  invoiceList: AngularFireList<any>;
  selectedInvoice: Invoice = new Invoice();

  constructor(private firebase :AngularFireDatabase) { this.invoiceList = firebase.list('invoice');
  this.invoice2 = this.invoiceList.valueChanges();}

  getData(){
    this.invoiceList = this.firebase.list('invoice');

    return this.invoiceList;
  }
 
  insertEmployee(invoice : Invoice)
  {
    this.invoiceList.push({
      name: invoice.name,
      
      prodnum: invoice.prodnum,
      total: invoice.total,
      quantity: invoice.quantity,

      

    });
  }
 
  updateEmployee(invoice : Invoice){
    this.invoiceList.update(invoice.$key,
      {
        name: invoice.name,
        
        prodnum: invoice.prodnum,
        total: invoice.total,
        quantity: invoice.quantity,
        
      });
  }
 
  deleteEmployee($key : string){
    this.invoiceList.remove($key);
  }
 
}
