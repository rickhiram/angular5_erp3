import { Component, OnInit,ViewChild } from '@angular/core';
import {WorkorderService} from '../services/workorder.service';
import {MatPaginator,MatSort, MatTableDataSource} from '@angular/material';
import {PageEvent} from '@angular/material';
import { Router } from '@angular/router';

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
displayedColumns= ['name','custid','phone','location','balance']

@ViewChild(MatPaginator) paginator: MatPaginator;

@ViewChild(MatSort) sort: MatSort;

/**
 * Set the paginator after the view init since this component will
 * be able to query its view for the initialized paginator.
 */
ngAfterViewInit() {
  this.dataSource.paginator = this.paginator;
}


  constructor(private workorderService:WorkorderService, private http: Http, private router:Router) { }

  length = 100;
  pageSize = 10;
  pageSizeOptions = [5, 10, 25, 100];

   pageEvent: PageEvent;

    setPageSizeOptions(setPageSizeOptionsInput: string) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }

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

    // input data from form to customerslist firebase


    addNewProduct = function(customer){
      this.productObj = {
        'name': customer.name,
        'phone':customer.phone,
        'location':customer.location,
        'balance':customer.balance,
        'custid':customer.custid

        
        //'status':this.status
      }
  
  
      
  
  
 
  this.workorderService.insertcustomers(this.productObj); 
  
    }    
    productObj2;
    selectRow(row){
      //this.weight = row.weight*100;
      


      this.productObj2 = {
        "name":row.name,
      "phone":row.phone,
      "balance":row.balance,
      "location":row.location,
      "id":row.custid

    // row data from customers table. use custid to make order******** 
    }
    //this.workorderService.insertWorkorder(this.productObj2);

    console.log(row.phone)
    this.router.navigateByUrl('/orders');
  }



  ngOnInit() {

    var x = this.workorderService.getcustomers();
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
