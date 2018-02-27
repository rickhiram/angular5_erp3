import { Component, OnInit,ViewChild } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { InvoiceServiceService } from '../services/invoice-service.service';
import { Invoice } from '../models/invoice.model';
import { ToastrService } from 'ngx-toastr';
//import {DataSource} from '@angular/cdk/collections';
import {MatPaginator,MatSort, MatTableDataSource} from '@angular/material';
import {PageEvent} from '@angular/material';
import { WorkorderService } from '../services/workorder.service';
import { Customers } from 'app/models/customers.model';



@Component({
  selector: 'app-invoicelist',
  templateUrl: './invoicelist.component.html',
  styleUrls: ['./invoicelist.component.scss']
})
export class InvoicelistComponent implements OnInit {
  
 
  
  displayedColumns= ['name' ,'phone','ordernum','balance','edit']
  
  dataSource = new MatTableDataSource<Customers[]>();

  

  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild(MatSort) sort: MatSort;

  /**
   * Set the paginator after the view init since this component will
   * be able to query its view for the initialized paginator.
   */
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  
  constructor(private InvoiceService: InvoiceServiceService,private workorder:WorkorderService, private tostr: ToastrService) { }

  length = 100;
  pageSize = 10;
  pageSizeOptions = [5, 10, 25, 100];

   pageEvent: PageEvent;

    setPageSizeOptions(setPageSizeOptionsInput: string) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
//select a customer by name from table row,

productObj2;
    selectRow(row){
     
        this.productObj2 = {
        "product":row.product,
      "weight":row.weight,
      "quantity":row.quantity,
      "date":row.date,
      "name":row.name,
      "price":row.price

    // add row to workorder then delete 
    }
  }
  ngOnInit() {
   


    var x = this.workorder.getcustomers();
    x.snapshotChanges().subscribe(item => {
      this.dataSource.data = [];
      item.forEach(element => {
        var y = element.payload.toJSON();
        y["$key"] = element.key;
        this.dataSource.data.push(y as Customers[]);
       
      });
      this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    });
console.log(this.dataSource);

  }
 
  onEdit(emp) {
    this.workorder.selectedCustomer = Object.assign({}, emp);
  }
 
  onDelete(key: string) {
    if (confirm('Are you sure to delete this record ?') == true) {
      this.InvoiceService.deleteEmployee(key);
      this.tostr.warning("Deleted Successfully", "Employee register");
    }
  }
}


  export class ProductsDataSource {
    constructor(private invoiceService:InvoiceServiceService){}
  
    connect():Observable<Invoice[]>{
      return this.invoiceService.invoice2;
    }
    disconnect(){}
 
  
  }