import { Component, OnInit } from '@angular/core';
import {Http,Response,Headers} from '@angular/http';
import{AppRoutingModule} from '../app-routing.module';
import 'rxjs/add/operator/toPromise';
import { ActivatedRoute } from '@angular/router';

import { Router } from '@angular/router';

@Component({
  selector: 'app-customersupdate',
  templateUrl: './customersupdate.component.html',
  styleUrls: ['./customersupdate.component.scss']
})
export class CustomersupdateComponent implements OnInit {

  id:number;
  data:Object = {};
  products = [];
  productObj:Object = {};
  exist = false;
  private headers = new Headers({'content-type':'application/json'})
  constructor(private router:Router,private route:ActivatedRoute,private http:Http) { }

  UpdateProduct(customer){
    this.productObj = {
      "name":customer.name,
      "phone":customer.phone,
      "location":customer.location,
      "order":customer.order,
      "balance":customer.balance
    };
    const url =`${"http://localhost:5500/materials"}/${this.id}`;
    this.http.put(url, JSON.stringify(this.productObj), {headers: this.headers})
    .toPromise()
    .then(()=>{
      this.router.navigate(['/']);
    })


  }

  ngOnInit() {
    this.route.params.subscribe(params =>{
      this.id = +params['id'];
    });
    
    this.http.get("http://localhost:5500/materials").subscribe(
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

