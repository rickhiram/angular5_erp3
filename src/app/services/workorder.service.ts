import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Workorder} from '../models/workorder.model';
import {Customers} from '../models/customers.model';
import {Sales} from '../models/sales.model';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database'
import { Products } from 'app/models/products.model';

@Injectable()
export class WorkorderService {
  workorder2: Observable<any[]>;
  salesorder2: Observable<any[]>;
  Products2: Observable<any[]>;
  invoice2: Observable<any[]>;
  customers2: Observable<any[]>;

  WorkorderList: AngularFireList<any>;
  ProductList: AngularFireList<any>;
  salesorderList: AngularFireList<any>;
  InvoiceList: AngularFireList<any>;
  CustomersList: AngularFireList<any>;


  selectedWorkorder: Workorder = new Workorder();
  selectedProduct: Products = new Products();
 // selectedInvoice: Workorder = new Workorder();
  //private serviceUrl = ' http://localhost:6100/workorder';
  constructor(private firebase :AngularFireDatabase) {this.WorkorderList = firebase.list('Workorder')
  this.workorder2 = this.WorkorderList.valueChanges(); this.salesorderList = firebase.list('sales')
  this.salesorder2 = this.salesorderList.valueChanges();this.ProductList = firebase.list('products')
  this.Products2 = this.ProductList.valueChanges();this.InvoiceList = firebase.list('invoices')
  this.invoice2 = this.InvoiceList.valueChanges(); this.CustomersList = firebase.list('customers')
  this.customers2 = this.CustomersList.valueChanges();}
  

isAdded = false;
  getWorkorders(){
    this.WorkorderList = this.firebase.list('Workorder');

    return this.WorkorderList;
  }

  getSales(){
    this.salesorderList = this.firebase.list('sales');

    return this.salesorderList;
  }
  getcustomers(){
    this.CustomersList = this.firebase.list('customers');

    return this.CustomersList;
  }
 
  getProducts(){
    this.ProductList = this.firebase.list('products');

    return this.ProductList;
  }

  getinvoice(){
    this.InvoiceList = this.firebase.list('invoices');

    return this.InvoiceList;
  }

  
    insertWorkorder(wrk:Workorder){

      this.WorkorderList.push({
        date: wrk.date,
        
        product:  wrk.product,
        weight:  wrk.weight,
        quantity:  wrk.quantity,
  
        
  
      });
    }
      insertinvoice(wrk){

        this.InvoiceList.push({
          date: wrk.date,
          
          product:  wrk.product,
          weight:  wrk.weight,
          quantity:  wrk.quantity,
          total: wrk.total,
    
          
    
        });
      }


      insertProducts(prdct:Products){
       

        this.ProductList.push({
         
         
          name: prdct.name,
          weight: prdct.weight,
          price: prdct.price,
          prodnum: prdct.prodnum,
  

        });
      
      
        }

      insertSalesorder(sales:Sales){

        this.salesorderList.push({
          date: sales.date,
          product:sales.product,
          weight:sales.weight,
          //$key:sales.$key,
          prodnum:sales.prodnum,
          name:sales.name,
          price:sales.price,
          quantity:sales.quantity,
          


          /*quantity:  wrk.quantity,
     name: string;
    product: string;
   weight: number;
    price: number;
     id: number;
     date:Date;
     prodnum:number;
     quantity:number;
          */
    
        });
      
      
        }

        updateProduct(product : Products){
          this.ProductList.update(product.$key,
            {
              name: product.name,
             // $key:product.$key, this isnt important
              prodnum: product.prodnum,
              weight: product.weight,
              price: product.price,
              
            });
        }
       
        updatecustomers(product : Customers){
          this.ProductList.update(product.$key,
            {
              name: product.name,
             // $key:product.$key, this isnt important
              prodnum: product.prodnum,
              weight: product.prodnum,
              price: product.balance,
              
            });
        }


        deleteEmployee($key : string){
          this.ProductList.remove($key);
        }
       
        delInvoice($key : string){
          this.salesorderList.remove($key);
        }
       
      }
