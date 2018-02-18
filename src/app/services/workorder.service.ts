import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Workorder} from '../models/workorder.model';
import {Sales} from '../models/sales.model';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database'
import { Products } from 'app/models/products.model';

@Injectable()
export class WorkorderService {
  workorder2: Observable<any[]>;
  salesorder2: Observable<any[]>;
  Products2: Observable<any[]>;
  WorkorderList: AngularFireList<any>;
  ProductList: AngularFireList<any>;
  salesorderList: AngularFireList<any>;
  selectedWorkorder: Workorder = new Workorder();
  selectedProduct: Products = new Products();
 // selectedInvoice: Workorder = new Workorder();
  //private serviceUrl = ' http://localhost:6100/workorder';
  constructor(private firebase :AngularFireDatabase) {this.WorkorderList = firebase.list('Workorder')
  this.workorder2 = this.WorkorderList.valueChanges(); this.salesorderList = firebase.list('sales')
  this.salesorder2 = this.salesorderList.valueChanges();this.ProductList = firebase.list('products')
  this.Products2 = this.ProductList.valueChanges();}
  

isAdded = false;
  getWorkorders(){
    this.WorkorderList = this.firebase.list('Workorder');

    return this.WorkorderList;
  }

  getSales(){
    this.salesorderList = this.firebase.list('sales');

    return this.salesorderList;
  }

  getProducts(){
    this.ProductList = this.firebase.list('products');

    return this.ProductList;
  }

  
    insertWorkorder(wrk:Workorder){

      this.WorkorderList.push({
        //date: wrk.date,
        
       // product:  wrk.product,
        weight:  wrk.weight,
        //quantity:  wrk.quantity,
  
        
  
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
          quantity:  sales.quantity,
          


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
              $key:product.$key,
              prodnum: product.prodnum,
              weight: product.weight,
              price: product.price,
              
            });
        }
       
        deleteEmployee($key : string){
          this.ProductList.remove($key);
        }
       
      }
