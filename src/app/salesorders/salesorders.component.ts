import { Component, OnInit,ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common'
import {SalesService} from '../services/sales.service';
import {WorkorderService} from '../services/workorder.service';
import {Observable} from 'rxjs/Observable';
import {DataSource} from '@angular/cdk/collections';
import {Sales} from '../models/sales.model';
import {Customers} from '../models/customers.model';
import {Workorder} from '../models/workorder.model';
import {Http,Response,Headers} from '@angular/http';
import {Products} from '../models/products.model';
import {MatPaginator,MatSort, MatTableDataSource} from '@angular/material';
import {PageEvent} from '@angular/material';
import { Router } from '@angular/router';



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
  displayedColumns= ['name','product','price','quantity','date']

    constructor(private router:Router ,private salesService:SalesService,public datepipe: DatePipe, private http: Http,private workorder: WorkorderService) { }
   
   
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

//get customer id from table component an store here
selectedcustomer;


//picker:string;
productObj2;
   product33:number;
   customerz:string;
   keyz:Object = {};
   prodname;
   status;
    selected12: any;
    productObj: Object = {};
    
    custname
    addNewProduct = function(product){
      this.custbyID = this.custarray.filter(
        cust => cust.$key === this.customerz);
      this.custname = this.custbyID["0"].name
    this.productObj = {
      'name':  this.custname,
      'product':this.product33,
      'weight': this.selected12,
      'price': product.price,
      'custid': this.customerz,
      'quantity':product.quantity,
      'date':this.date,
      //'id':product.custid,
      'prodnum':this.product33,
      //'status':this.status
    }
    
    //filter the array with $key and extract name
  
      
      //let cookieData = '{"key":"value"}'


      console.log( this.custbyID["0"].name ) //ELLEGANT SOLUTION!!!
     
      console.log(this.custname)




    let latest_date =this.datepipe.transform(product.date, 'yyyy-MM-dd');
    this.date= product.date;
    console.log(this.customerz)
    /*
    this.http.post('http://localhost:5800/salesorders', this.productObj).subscribe((res:Response)=>{
    this.isAdded = true;  
    console.log(res);
    })
    
*/

//this.date = product.date;
console.log(this.date);
this.workorder.insertSalesorder(this.productObj); 

  }    

    // select a row from the table in component.html onclick.
    cost = 0;
    total =  0;
    selectRow(row){
      //this.weight = row.weight*100;
      


      this.productObj2 = {
        "product":row.product,
      "weight":row.weight,
      "quantity":row.quantity,
      "date":row.date,
      "name":row.name,
      "price":row.price,
      "custid":row.custid,
      "total":this.total,
      "cost":this.cost

    // add row to workorder then delete 
    }
    //this.workorder.insertWorkorder(this.productObj2);
    //**workorder to be filled by user */
    this.workorder.insertAllInvoice(this.productObj2);

    console.log(row.date);
    this.workorder.delInvoice(row.$key);
    this.router.navigate(['/allinvoices']);
  }
  custbyID
  custarray = [];
  ngOnInit() {
   //the 
  
//************************************* */
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


    var x = this. workorder.getcustomers();
    x.snapshotChanges().subscribe(item => {
      this.custarray = [];
      item.forEach(element => {
        var y = element.payload.toJSON();
        y["$key"] = element.key;
        this.custarray.push(y as Customers[]);

      })}  );

      
  }
  
}


  
  export class SalesDataSource extends DataSource<any>{
    constructor(private salesService:SalesService,private workorder:WorkorderService){super();}
  
    connect():Observable<Sales[]>{
      return this.workorder.salesorder2;
    }
    disconnect(){}

}
