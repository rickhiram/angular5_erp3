import { Component, OnInit,ViewChild } from '@angular/core';
import{WorkorderService} from '../services/workorder.service';
import {DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs/Observable';
import {MatPaginator,MatSort, MatTableDataSource} from '@angular/material';
import {PageEvent} from '@angular/material';
import { Invoice } from 'app/models/invoice.model';
import { Router } from '@angular/router';




@Component({
  selector: 'app-all-invoices',
  templateUrl: './all-invoices.component.html',
  styleUrls: ['./all-invoices.component.scss']
})
export class AllInvoicesComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild(MatSort) sort: MatSort;

  dataSource = new MatTableDataSource<Invoice[]>();
  displayedColumns= ['name','product','quantity','weight' ,'price','cost','date']
  constructor(private workorder:WorkorderService,private router:Router) { }


  length = 100;
  pageSize = 10;
  pageSizeOptions = [5, 10, 25, 100];

   pageEvent: PageEvent;

    setPageSizeOptions(setPageSizeOptionsInput: string) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
 totalweight:number;
 totalamount:number;
 weight:number;
 quantity:number;
 price:number;

productObj2;
    selectRow(row){
     
        this.productObj2 = {
          "$key": row.$key,
        "product":row.product,
      "weight":row.weight,
      "quantity":row.quantity,
      "date":row.date,
      "name":row.name,
      "price":row.price,
     "cost":row.price * row.quantity ,
      "custid":row.custid
    // add row to workorder then delete 
    }
    
this.weight = row.weight;
this.quantity= row.quantity;
this.price =row.price;
this.totalamount = this.quantity * this.price;
this.workorder.updateallinv(this.productObj2)
this.workorder.updatecustomere(this.productObj2)
this.router.navigate(['/invoice']);
console.log(this.totalamount)

    
    //this.workorder.delInvoice(row.$key);
  }


  ngOnInit() {
    var x = this. workorder.getallinvoice();
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
  export class SalesDataSource extends DataSource<any>{
    constructor(private workorder:WorkorderService){super();}
  
    connect():Observable<Invoice[]>{
      return this.workorder.invoice3;
    }
    disconnect(){}

}
