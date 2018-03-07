import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Workorder} from '../models/workorder.model';
import {Customers} from '../models/customers.model';
import {Sales} from '../models/sales.model';
import {Invoice} from '../models/invoice.model';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database'
import { Products } from 'app/models/products.model';
import { Materials } from 'app/models/materials.model';

@Injectable()
export class WorkorderService {
  workorder2: Observable<any[]>;
  salesorder2: Observable<any[]>;
  Products2: Observable<any[]>;
  invoice2: Observable<any[]>;
  invoice3: Observable<any[]>;
  customers2: Observable<any[]>;
  materials2: Observable<any[]>;

  WorkorderList: AngularFireList<any>;
  ProductList: AngularFireList<any>;
  salesorderList: AngularFireList<any>;
  InvoiceList: AngularFireList<any>;
  AllInvoiceList: AngularFireList<any>;
  CustomersList: AngularFireList<any>;
  MaterialsList: AngularFireList<any>;

  selectedWorkorder: Workorder = new Workorder();
  selectedProduct: Products = new Products();
  selectedCustomer: Customers = new Customers();

  selectedinvoice3: Invoice = new Invoice();
  selectedMaterial: Materials = new Materials();
 // selectedInvoice: Workorder = new Workorder();
  //private serviceUrl = ' http://localhost:6100/workorder';
  constructor(private firebase :AngularFireDatabase) {this.WorkorderList = firebase.list('Workorder')
  this.workorder2 = this.WorkorderList.valueChanges(); this.salesorderList = firebase.list('sales')
  this.salesorder2 = this.salesorderList.valueChanges();this.ProductList = firebase.list('products')
  this.Products2 = this.ProductList.valueChanges();this.InvoiceList = firebase.list('invoices')
  this.invoice2 = this.InvoiceList.valueChanges(); this.CustomersList = firebase.list('customers')
  this.customers2 = this.CustomersList.valueChanges();this.AllInvoiceList = firebase.list('allinvoices')
  this.invoice3 = this.AllInvoiceList.valueChanges();this.MaterialsList = firebase.list('materials')
  this.materials2 = this.MaterialsList.valueChanges();}
  

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

  getMaterials(){
    this.MaterialsList = this.firebase.list('materials');

    return this.MaterialsList;
  }

  getinvoice(){
    this.InvoiceList = this.firebase.list('invoices');

    return this.InvoiceList;
  }

  getallinvoice(){
    this.AllInvoiceList = this.firebase.list('allinvoices');

    return this.AllInvoiceList;
  }

  
    insertWorkorder(wrk:any){

      this.WorkorderList.push({
        date: wrk.date,
        
        product:  wrk.product,
        weight:  wrk.weight,
        quantity:  wrk.quantity,
        total:wrk.total
  
        
  
      });
    }

    insertMaterials(wrk:Materials){

      this.MaterialsList.push({
        prodnum: wrk.prodnum,
        name:  wrk.name,
        stock:  wrk.stock,
        price:  wrk.price,
  
        
  
      });
    }
      insertAllInvoice(wrk){

        this.AllInvoiceList.push({
          date: wrk.date,
          name:wrk.name,
          product:  wrk.product,
          weight:  wrk.weight,
          quantity:wrk.quantity,
          price: wrk.price,
          key:wrk.custid,
          cost:wrk.cost,
          
    
          
    
        });
      }


      insertProducts(prdct:Products){
       

        this.ProductList.push({
         
         
          name: prdct.name,
          weight: prdct.weight,
          price: prdct.price,
          prodnum: prdct.prodnum,
          formular: prdct.formular,
  

        });
      
      
        }

        insertcustomers(cust:Customers){
       

          this.CustomersList.push({
           
           
            name: cust.name,
            location: cust.location,
            phone:cust.phone,
           balance: cust.balance,
           orderval:cust.orderval
    
  
          });
        
        
          }

      insertSalesorder(sales:Sales){

        this.salesorderList.push({
          date: sales.date,
          product:sales.product,
          weight:sales.weight,
          custid:sales.custid,
          prodnum:sales.prodnum,
          name:sales.name,
          price:sales.price,
          quantity:sales.quantity,
          


    
        });
      
      
        }
// #######################UPDATE#############################


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

        updateallinv(cust:Sales){
          this.AllInvoiceList.update(cust.$key,
            {

         // product: cust.prodnum;
          weight: cust.weight,
          quantity:cust.quantity,
          date: cust.date,
          name: cust.name,
          price: cust.price,
          cost: cust.cost,
         } ); }

        updateworkorder(product : Workorder){
          this.WorkorderList.update(product.$key,
            {
              name: product.weight,
             // $key:product.$key,  **********this isnt important
              prodnum: product.quantity,
              weight: product.weight,
              total: product.total,
              
            });
        }
       

        updatematerials(product : Materials){
          this.MaterialsList.update(product.$key,
            {
              name: product.name,
             // $key:product.$key, this isnt important
              prodnum: product.prodnum,
              stock: product.stock,
              price: product.price,
              
            });
        }


        updatecustomers(customers){
          this.CustomersList.update(customers.$key,
            {
              name: customers.name,
             // $key:product.$key, this isnt important
              location:customers.location,
              //custid: customers.custid,
              balance: customers.balance,
              phone: customers.phone,
              orderval: customers.orderval,
              
            });
        }

      updatecustomere(cust){
        this.CustomersList.update(cust.custid,
          {
    
        orderval: cust.cost
      });
    }

        deleteEmployee($key : string){
          this.ProductList.remove($key);
        }
       
        deletematerial($key : string){
          this.MaterialsList.remove($key);
        }

        delInvoice($key : string){
          this.salesorderList.remove($key);
        }
       
      }
