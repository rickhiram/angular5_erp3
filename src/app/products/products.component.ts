import { Component, OnInit } from '@angular/core';
import {Http,Response,Headers} from '@angular/http';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
   selected12 ;
  constructor(private http: Http) { }
 confirmationMsg:string ="New Product Added";
 isAdded:boolean = false;

  productObj: Object = {}; 
addNewProduct = function(product){
this.productObj = {
  'name': product.name,
  'weight': this.selected12,
  'price': product.price,
  'prodnum': product.prodnum
}
this.http.post('http://localhost:5500/products', this.productObj).subscribe((res:Response)=>{
this.isAdded = true;  
console.log(res);
})
}
  ngOnInit() {
  }

}
