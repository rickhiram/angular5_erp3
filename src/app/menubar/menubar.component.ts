import { Component, OnInit } from '@angular/core';
import {Http,Response,Headers} from '@angular/http';
import{AppRoutingModule} from '../app-routing.module';
import 'rxjs/add/operator/toPromise';
import { ActivatedRoute } from '@angular/router';

import { Router } from '@angular/router';

@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.scss']
})
export class MenubarComponent implements OnInit {
  id:number;
  status: false;
  data:Object = {};
  products = [];
  productObj:Object = {};
  exist = false;
  private headers = new Headers({'content-type':'application/json'})
  constructor(private router:Router,private route:ActivatedRoute,private http:Http) { }


  productObj1: Object = {}; 
  addNewProduct = function(material){
 // this.status = true;
  this.productObj = {
   "name":material.name,
   "quality":material.quality,
   "weight":material.weight,
   "price":material.price
  }
  this.http.post('http://localhost:5600/materials', this.productObj).subscribe((res:Response)=>{
  this.isAdded = true;  
  console.log(res);
  })
  }
  AddMat = function(){

    this.status = true;
  };
  UpdateProduct(material){
    this.productObj = {
      "name":material.name,
      "quality":material.quality,
      "weight":material.weight,
      "price":material.price
    };
    const url =`${"http://localhost:5600/materials"}/${this.id}`;
    this.http.put(url, JSON.stringify(this.productObj), {headers: this.headers})
    .toPromise()
    .then(()=>{
      this.router.navigate(['/materials']);
    })


  }

  ngOnInit() {

 


    this.route.params.subscribe(params =>{
      this.id = +params['id'];
    });
    
    this.http.get("http://localhost:5600/materials").subscribe(
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


