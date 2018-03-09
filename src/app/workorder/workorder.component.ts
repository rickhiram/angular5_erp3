import { Component, OnInit,ViewChild,Output} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {DataSource} from '@angular/cdk/collections';
import {UserService} from '../services/user.service';
import {Workorder} from '../models/workorder.model';
import {WorkorderService} from '../services/workorder.service';
import 'rxjs/add/operator/map';
import {MatPaginator,MatSort, MatTableDataSource} from '@angular/material';
import {PageEvent} from '@angular/material';
import { NgForm } from '@angular/forms';





@Component({
  selector: 'app-workorder',
  templateUrl: './workorder.component.html',
  styleUrls: ['./workorder.component.scss']
})
export class WorkorderComponent implements OnInit {
  //dataSource = new workorderDataSource(this.workorderService);
  displayedColumns= ['date','product','weight','quantity','total'];
  dataSource = new MatTableDataSource<Workorder[]>();
  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild(MatSort) sort: MatSort;
  constructor(private userService:UserService, private workorderService : WorkorderService) { }
  
   total = 0;
  toggle = false;
  toggle2 = true;
  productObj:any;
  UpdateProduct(data){
    this.productObj = {
      "product":data.product,
      "weight":data.weight,
      "quantity":data.quantity,
      "date":data.date,
      "total":this.total
    }
  //post method
  this.workorderService.insertWorkorder(this.productObj);
  
  };

  
  product33;
  selected12;
  prdctSelect = [
    {name:'kienyeji',weight:78, price:1290,prodnum:1001},
    {name:'layers',weight:78, price:1290,prodnum:1002},
    {name:'chick mash',weight:78, price:1290,prodnum:1003},
    {name:'growers mash',weight:78, price:1290,prodnum:1004},
    {name:'Pig Starter',weight:78, price:1290,prodnum:1005},
    {name:'Pig Finisher',weight:78, price:1290,prodnum:1006},
    {name:'Broiler Starter',weight:78, price:1290,prodnum:1007},
    {name:'Broiler Finisher',weight:78, price:1290,prodnum:1008},
    {name:'Dog Meal',weight:78, price:1290,prodnum:1009},
    {name:'Rabbit Meal',weight:78, price:1290,prodnum:1010},
    {name:'Dairy Meal',weight:78, price:1290,prodnum:1011},
    {name:'Maize Germ',weight:78, price:1290,prodnum:1012},
    {name:'Wheat Pollard',weight:78, price:1290,prodnum:1013},
    {name:'Wheat Bran',weight:78, price:1290,prodnum:1014},
    {name:'Sunflower',weight:78, price:1290,prodnum:1015}
  ];

show = false;

weight1;
quantity70;
quantity20;
quantity10;

onkey0(value){
  this.quantity70 = value ;
  console.log(this.quantity70)
}
onkey(value){
  this.quantity20 = value ;
  console.log(this.quantity20)
}
onkey1(value){
  this.quantity10 = value ;
  console.log(this.quantity10)
}
  checked(){

    this. weight1 = 70 * this.quantity70
    console.log(this.weight1)
  }

productObj2;
  selectRow(row){
    //this.weight = row.weight*100;
    


    this.productObj2 = {
      "product":row.product,
      "date":row.date,
    "weight":row.weight,
    "quantity":row.quantity,
     "total":row.weight * row.quantity,
    "$key":row.$key


  // add row to workorder then delete 
  }
  this.toggle = true;
  this.toggle2 = false;
  this.total = this.productObj2.total;
  this.workorderService. updateworkorder(this.productObj2);
  
 // this.workorderService.insertAllInvoice(this.productObj2);

  console.log(this.total);

 // this.workorderService.delInvoice(row.$key);
}

  ngOnInit() {

    var x = this.workorderService.getWorkorders();
    x.snapshotChanges().subscribe(item => {
      this.dataSource.data = [];
      item.forEach(element => {
        var y = element.payload.toJSON();
        y["$key"] = element.key;
        this.dataSource.data.push(y as Workorder[]);
       
      });
      this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    });
console.log(this.dataSource);
    
  }
  resetForm(employeeForm?: NgForm) {
    if (employeeForm != null)
      employeeForm.reset();
    this.workorderService.selectedWorkorder = {
      $key: null,
      product: '',
      weight: 0,
      quantity:0,
      date: '',
      total:0,
      
     

    }

}
}
export class workorderDataSource extends DataSource<any>{
  constructor(private workorderService:WorkorderService){super();}

  connect():Observable<Workorder[]>{

    return this.workorderService.workorder2
  }
  disconnect(){}
  

}
