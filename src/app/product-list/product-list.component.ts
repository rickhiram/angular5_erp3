import { Component, OnInit, ViewChild } from '@angular/core';
import {ProductsService} from '../services/products.service';
import {Observable} from 'rxjs/Observable';
import {DataSource} from '@angular/cdk/collections';
import {Products} from '../models/products.model';
import {MatPaginator,MatSort, MatTableDataSource} from '@angular/material';
import {PageEvent} from '@angular/material';
import {Http,Response,Headers} from '@angular/http';
import { NgForm } from '@angular/forms';
import {WorkorderService} from '../services/workorder.service';
import {FormulationService} from '../services/formulation.service';
import { Formular } from 'app/models/formulation.model';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  private headers = new Headers({'content-type':'application/json'})
  constructor(private http:Http, private workorder: WorkorderService, private formulation:FormulationService ) { }
 
    displayedColumns= ['name' ,'prodnum','weight','price','edit']
 
    dataSource = new MatTableDataSource<Products[]>();
  
    
  
    @ViewChild(MatPaginator) paginator: MatPaginator;
  
    @ViewChild(MatSort) sort: MatSort;
  
    /**
     * Set the paginator after the view init since this component will
     * be able to query its view for the initialized paginator.
     */
    ngAfterViewInit() {
      this.dataSource.paginator = this.paginator;
    }

    length = 100;
    pageSize = 10;
    pageSizeOptions = [5, 10, 25, 100];
  productz:string;
     pageEvent: PageEvent;
     formular1;
     formular12 = "discovery4";
  
      setPageSizeOptions(setPageSizeOptionsInput: string) {
        this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
      }

      formulararray = [];
      subject = [];
 ngOnInit() {


  this.workorder.castproduct.subscribe((val)=>{

   
      this.subject.push(val[1].phone);
    
    console.log("val is",val);
 
  });



   var x = this.workorder.getProducts();
   x.snapshotChanges().subscribe(item => {
     this.dataSource.data = [];
     item.forEach(element => {
       var y = element.payload.toJSON();
       y["$key"] = element.key;
       this.dataSource.data.push(y as Products[]);
      
     });
     this.dataSource.paginator = this.paginator;
   this.dataSource.sort = this.sort;
   });
console.log(this.dataSource);

   this.resetForm();
// get and push products into an array

var x = this.formulation.getData();
x.snapshotChanges().subscribe(item => {
  this.formulararray = [];
  item.forEach(element => {
    var y = element.payload.toJSON();
    y["$key"] = element.key;
    this.formulararray.push(y as Formular[]);

  })}  );




 }
 
 onEdit(emp: Products) {
   this.workorder.selectedProduct = Object.assign({}, emp);
 }

 onDelete(key: string) {
   if (confirm('Are you sure to delete this record ?') == true) {
     this.workorder.deleteEmployee(key);
     //this.tostr.warning("Deleted Successfully", "Employee register");
   }
 }




 //for input/edit/delete form
 onSubmit(employeeForm: NgForm) {
  console.log(this.formular1)
   if (employeeForm.value.$key == null)
     this.workorder.insertProducts(employeeForm.value);
    
   else
     this.workorder.updateProduct(employeeForm.value);
   this.resetForm(employeeForm);
   console.log(this.productz);
   
 }
 
 resetForm(employeeForm?: NgForm) {
   if (employeeForm != null)
     employeeForm.reset();
   this.workorder.selectedProduct = {
     $key: null,
    name:'',
    prodnum: 0,
    weight: 0,
    price:0,
    formular:'',

   }
 }


}