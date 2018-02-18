import { Component, OnInit } from '@angular/core';
import {Http, Response,Headers} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {MatTableDataSource} from '@angular/material';
import{Iproducts} from './products';
import { MenubarComponent } from '../menubar/menubar.component';
import { ProductsComponent } from 'app/products/products.component';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements Iproducts {
  products:Iproducts[]=[];
  displayedColumns = [ 'name', 'weight', 'price'];
  dataSource = new MatTableDataSource<Iproducts>(this.products);

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }





constructor(private http:Http, public name:string,public weight:number,public price:number) { }

  
  id:number;
  value: Date;
  private headers = new Headers({'content-type':'application/json'})
// adding a dropdown



fetchData = function(){
  this.http.get("http://localhost:5500/products").subscribe(
    (res:Response)=>{this.products = res.json();}
    
  )
}

deleteItem = function(id){
  if(confirm("are you sure")){

    const url =`${"http://localhost:5500/products"}/${id}`
    return this.http.delete(url,{headers:this.headers}).toPromise()
    .then(()=>{
      this.fetchData();
    })
  };
  
    
  
}

  ngOnInit() {
this.fetchData();
console.log(this.products)





  }

}
