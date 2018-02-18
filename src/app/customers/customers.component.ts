import { Component, OnInit } from '@angular/core';
import {Http, Response,Headers} from '@angular/http';
import{AppRoutingModule} from '../app-routing.module';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/toPromise';
import { MenubarComponent } from '../menubar/menubar.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {

  constructor(private router:Router,private route:ActivatedRoute,private http:Http) {}
    id:number;
    value: Date;
    status2 = false;
    status = true;

    
    data:Object = {};
    products = [];
    productObj:Object = {};
    exist = false;



    private headers = new Headers({'content-type':'application/json'})
    
    AddCust = function(){
     this.status = false;
    };
    AddCust2 = function(){
      this.status = true;
     };

    
    addNewProduct = function(customer){
    this.productObj = {
      'name': customer.name,
      'phone': customer.phone,
      'location': customer.location,
      'ordernum': customer.ordernum,
      'balance': customer.balance,

    }
    this.http.post('http://localhost:5700/customers', this.productObj).subscribe((res:Response)=>{
    this.isAdded = true;  
    console.log(res);
    })
  }


  
    customers= [];
  
  fetchData = function(){
    this.http.get("http://localhost:5700/customers").subscribe(
      (res:Response)=>{this.customers = res.json();}
      
    )}
  
  
    deleteCustomer = function(id){
      if(confirm("are you sure")){
    
        const url =`${"http://localhost:5700/customers"}/${id}`
        return this.http.delete(url,{headers:this.headers}).toPromise()
        .then(()=>{
          this.fetchData();
        })
      };
   }
    
   UpdateCustomer = function(customer){
     
   this.productObj = {
     'name': customer.name,
     'phone': customer.phone,
     'location': customer.location,
     'ordernum': customer.ordernum,
     'balance': customer.balance,

   }
   this.status2 = true;
   const url =`${"http://localhost:5700/customers"}/${this.id}`;
   this.http.put(url, JSON.stringify(this.productObj), {headers: this.headers})
   .toPromise()
   .then(()=>{
     this.router.navigate(['/customers']);
   })
  }

  ngOnInit() {
    
    this.route.params.subscribe(params =>{
      this.id = +params['id'];
    });
    
    this.http.get("http://localhost:5700/customers").subscribe(
        (res:Response)=>{this.products = res.json();
        for(var i =0; i< this.products.length;i++){
        if(parseInt(this.products[i].id )=== this.id){
          this.exist = true;
           this.data = this.products[i];
           break;
          }
          else{
            this.exist = false;
          }
        }
        } 
      )
    
      }
  }


