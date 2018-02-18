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
  displayedColumns= ['date','product','weight','quantity'];
  dataSource = new MatTableDataSource<Workorder[]>();
  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild(MatSort) sort: MatSort;
  constructor(private userService:UserService, private workorderService : WorkorderService) { }
  
  productObj:any;
  UpdateProduct(data){
    this.productObj = {
      "product":data.product,
      "weight":data.weight,
      "quantity":data.quantity,
      "date":data.date
    }
  //post method
  this.workorderService.insertWorkorder(this.productObj);
  
  };

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
