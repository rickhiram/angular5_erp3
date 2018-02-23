import { Component, OnInit,ViewChild} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {DataSource} from '@angular/cdk/collections';
import {UserService} from '../services/user.service';
import {Workorder} from '../models/workorder.model';
import {WorkorderService} from '../services/workorder.service';
import 'rxjs/add/operator/map';
import {MatPaginator,MatSort, MatTableDataSource} from '@angular/material';
import {PageEvent} from '@angular/material';




@Component({
  selector: 'app-workorder',
  templateUrl: './workorder.component.html',
  styleUrls: ['./workorder.component.scss']
})
export class WorkorderComponent implements OnInit {
  //dataSource = new workorderDataSource(this.workorderService);
  displayedColumns= ['date','product','weight','quantity','total','key'];
  dataSource = new MatTableDataSource<Workorder[]>();
  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild(MatSort) sort: MatSort;
  constructor(private userService:UserService, private workorderService : WorkorderService) { }
  
  total = 0;
  
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
productObj2;
  selectRow(row){
    //this.weight = row.weight*100;
    


    this.productObj2 = {
      "product":row.product,
      "date":row.date,
    "weight":row.weight,
    "quantity":row.quantity,
     "total":this.total,
    "$key":row.$key


  // add row to workorder then delete 
  }
  this.workorderService. updateworkorder(this.productObj2);
 // this.workorderService.insertAllInvoice(this.productObj2);
this.total = row.weight * row.quantity
  console.log(row.$key);
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

}

export class workorderDataSource extends DataSource<any>{
  constructor(private workorderService:WorkorderService){super();}

  connect():Observable<Workorder[]>{

    return this.workorderService.workorder2
  }
  disconnect(){}
  

}
