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
import { Console } from '@angular/core/src/console';



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
    
    this.prodbyID = this.prod2filter.filter(
      prod => prod.$key === this.product33);
    // subtract sales from inventory 

    
//filter the productsarray with $key and extract ?


    if(this.selected12 == 70){
      this.prodval = this.prodbyID["0"].big70
      this.tweight = product.quantity * this.selected12
    this.newweight = this.prodval - this.tweight
    
    this.Obj70={
      '$key': this.product33,
      'weight': this.newweight,
      'medium20':this.newweight,
      'small10':this.newweight,
      'big70':this.newweight
    }


      this.workorder.update70(this.Obj70)
      console.log('prod n key', this.Obj70)
    }
    
    if(this.selected12 == 20){
      this.prodval = this.prodbyID["0"].medium20
      this.tweight = product.quantity * this.selected12
    this.newweight = this.prodval - this.tweight
    
    this.Obj70={
      '$key': this.product33,
      'weight': this.newweight,
      'medium20':this.newweight,
      'small10':this.newweight,
      'big70':this.newweight
    }
      this.workorder.update20(this.Obj70)
      console.log('prod n key', this.Obj70)
    }

    if(this.selected12 == 10){
      this.prodval = this.prodbyID["0"].small10
      this.tweight = product.quantity * this.selected12
    this.newweight = this.prodval - this.tweight
    
    this.Obj70={
      '$key': this.product33,
      'weight': this.newweight,
      'medium20':this.newweight,
      'small10':this.newweight,
      'big70':this.newweight
    }
      this.workorder.update10(this.Obj70)
      console.log('prod n key', this.Obj70)
    }
  
    
      
    console.log(this.prodval)
      //let cookieData = '{"key":"value"}'

      console.log("this is prdt key",this.product33);
      console.log( this.custbyID["0"].name ) //ELLEGANT SOLUTION!!!
     
      console.log('prodval',this.prodval)




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
  prod2filter = [];
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

// fetch products from product list via workorder service@@@@@
      var x = this.workorder.getProducts();
      x.snapshotChanges().subscribe(item => {
        
         this.dataSource.data = [];
        item.forEach(element => {
          var y = element.payload.toJSON();
          y["$key"] = element.key;
          this.prod2filter.push(y as Products[])
          //this.dataSource.data.push(y as Products[]);
          
         
        });
        this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      });
      
  }
  
}


  
  export class SalesDataSource extends DataSource<any>{
    constructor(private salesService:SalesService,private workorder:WorkorderService){super();}
  
    connect():Observable<Sales[]>{
      return this.workorder.salesorder2;
    }
    disconnect(){}

}
