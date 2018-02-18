import { Component, OnInit } from '@angular/core';
import {Http,Response,Headers} from '@angular/http';
import{AppRoutingModule} from '../app-routing.module';
import 'rxjs/add/operator/toPromise';
import { ActivatedRoute } from '@angular/router';

import { Router } from '@angular/router';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {


id:number;
data:Object = {};
products = [];
productObj:Object = {};
exist = false;
private headers = new Headers({'content-type':'application/json'})
  

constructor(private router:Router,private route:ActivatedRoute,private http:Http) { }
  UpdateProduct(product){
this.productObj = {
  "name":product.name,
  "weight":product.weight,
  "price":product.price
};
const url =`${"http://localhost:5500/products"}/${this.id}`;
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

this.http.get("http://localhost:5500/products").subscribe(
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
