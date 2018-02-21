import { Component, OnInit,ViewChild } from '@angular/core';
import {WorkorderService} from '../services/workorder.service';
import {MatPaginator,MatSort, MatTableDataSource} from '@angular/material';
import {PageEvent} from '@angular/material';

import {Observable} from 'rxjs/Observable';
import {DataSource} from '@angular/cdk/collections';
import {Http,Response,Headers} from '@angular/http';
import {User} from '../models/user.model';
import { Invoice } from '../models/invoice.model';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  dataSource = new MatTableDataSource<Invoice[]>();
displayedColumns= ['name','phone','location','balance','custid']

@ViewChild(MatPaginator) paginator: MatPaginator;

@ViewChild(MatSort) sort: MatSort;

/**
 * Set the paginator after the view init since this component will
 * be able to query its view for the initialized paginator.
 */
ngAfterViewInit() {
  this.dataSource.paginator = this.paginator;
}


  constructor(private workorderService:WorkorderService, private http: Http) { }

  length = 100;
  pageSize = 10;
  pageSizeOptions = [5, 10, 25, 100];

   pageEvent: PageEvent;

    setPageSizeOptions(setPageSizeOptionsInput: string) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }

  ngOnInit() {

    var x = this.workorderService.getinvoice();
    x.snapshotChanges().subscribe(item => {
      this.dataSource.data = [];
      item.forEach(element => {
        var y = element.payload.toJSON();
        y["$key"] = element.key;
        this.dataSource.data.push(y as Invoice[]);
       
      });
      this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    });
console.log(this.dataSource);
  }

}
export class UserDataSource extends DataSource<any>{
  constructor(private workorderService:WorkorderService){super();}

  connect():Observable<User[]>{
    return this.workorderService.invoice2;
  }
  disconnect(){}
  
}
