import { Component, OnInit } from '@angular/core';
import {Http, Response,Headers} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { MenubarComponent } from '../menubar/menubar.component';

@Component({
  selector: 'app-materials',
  templateUrl: './materials.component.html',
  styleUrls: ['./materials.component.scss']
})
export class MaterialsComponent implements OnInit {

  constructor(private http:Http) { }

  confirmationMsg:string ="New Product Added";
  isAdded:boolean = false;
  
  id:number;
  value: Date;
  private headers = new Headers({'content-type':'application/json'})

  materials= [];

fetchData = function(){
  this.http.get("http://localhost:5600/materials").subscribe(
    (res:Response)=>{this.materials = res.json();}
    
  )}


  deleteItem = function(id){
    if(confirm("are you sure")){
  
      const url =`${"http://localhost:5600/materials"}/${id}`
      return this.http.delete(url,{headers:this.headers}).toPromise()
      .then(()=>{
        this.fetchData();
      })
    };
}
  ngOnInit() {
    this.fetchData();
  }

}
