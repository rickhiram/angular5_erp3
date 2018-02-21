import { Component, OnInit,ViewChild } from '@angular/core';
import {SalesService} from '../services/sales.service';
import {WorkorderService} from '../services/workorder.service';
import {Observable} from 'rxjs/Observable';
import {DataSource} from '@angular/cdk/collections';
import {Sales} from '../models/sales.model';
import {Workorder} from '../models/workorder.model';
import {Http,Response,Headers} from '@angular/http';
import {Products} from '../models/products.model';
import {MatPaginator,MatSort, MatTableDataSource} from '@angular/material';
import {PageEvent} from '@angular/material';


@Component({
  selector: 'app-salesorders',
  templateUrl: './salesorders.component.html',
  styleUrls: ['./salesorders.component.scss']
})
export class SalesordersComponent implements OnInit {
  checked = true;
  //dataSource = new SalesDataSource(this.workorder);
  date =Date();
  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild(MatSort) sort: MatSort;

  dataSource = new MatTableDataSource<Sales[]>();
  displayedColumns= ['id','name','product','weight','price','quantity','date','status']

    constructor(private salesService:SalesService, private http: Http,private workorder: WorkorderService) { }
   
   
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

weight:any;
products:any;
quantity:any;

picker:string;
productObj2;
   product:number;
   prodname;
   status;
    selected12: any;
    productObj: Object = {};
    
    
    addNewProduct = function(product){
    this.productObj = {
      'name': product.name,
      'product':this.product,
      'weight': this.selected12,
      'price': product.price,
     // '$key': product.$key,
      'quantity':product.quantity,
      'date':this.date,
      'prodnum':this.product,
      //'status':this.status
    }


    
    /*
    this.http.post('http://localhost:5800/salesorders', this.productObj).subscribe((res:Response)=>{
    this.isAdded = true;  
    console.log(res);
    })
    
*/

this.date = product.date;
console.log(product.date);
this.workorder.insertSalesorder(this.productObj); 

  }    

    // select a row from the table in component.html onclick.
    
    
    selectRow(row){
      //this.weight = row.weight*100;
      console.log(this.product);


      this.productObj2 = {
        "product":row.product,
      "weight":row.weight,
      "quantity":row.quantity,
      "date":row.date,
      "id":row.id

    // add row to workorder then delete 
    }
    this.workorder.insertWorkorder(this.productObj2);

    console.log(row.date);
    this.workorder.delInvoice(row.$key);
  }
  ngOnInit() {
   


    var x = this. workorder.getSales();
    x.snapshotChanges().subscribe(item => {
      this.dataSource.data = [];
      item.forEach(element => {
        var y = element.payload.toJSON();
        y["$key"] = element.key;
        this.dataSource.data.push(y as Sales[]);
       
      });
      this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    });
console.log(this.dataSource);

  }
  
  }
  export class SalesDataSource extends DataSource<any>{
    constructor(private salesService:SalesService,private workorder:WorkorderService){super();}
  
    connect():Observable<Sales[]>{
      return this.workorder.salesorder2;
    }
    disconnect(){}

}
