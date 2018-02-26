import { Component, OnInit,ViewChild,Input } from '@angular/core';
import {Http,Response,Headers} from '@angular/http';
import{AppRoutingModule} from '../app-routing.module';
import 'rxjs/add/operator/toPromise';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import {SalesService} from '../services/sales.service';
import {Observable} from 'rxjs/Observable';
import {DataSource} from '@angular/cdk/collections';
import { Formular } from 'app/models/formulation.model';
import { FormulationService } from '../services/formulation.service';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import {MatPaginator,MatSort, MatTableDataSource} from '@angular/material';
import {PageEvent} from '@angular/material';
import{WorkorderComponent} from '../workorder/workorder.component';


@Component({
  selector: 'app-formulation',
  templateUrl: './formulation.component.html',
  styleUrls: ['./formulation.component.scss']
})
export class FormulationComponent implements OnInit {

  private headers = new Headers({'content-type':'application/json'})
   constructor(private router:Router,private salesService:SalesService, private route:ActivatedRoute,
     private http:Http, private formular: FormulationService, private tostr: ToastrService ) { }
  
     displayedColumns= ['name' ,'prodnum','quantity','total','edit']
  
     dataSource = new MatTableDataSource<Formular[]>();
   
     
   
     @ViewChild(MatPaginator) paginator: MatPaginator;
   
     @ViewChild(MatSort) sort: MatSort;
   
     /**
      * Set the paginator after the view init since this component will
      * be able to query its view for the initialized paginator.
      */
      //*************************component to component comm***************************** */
      @Input() tweight2 ; //a product's total weight. formular's multiplier
      tweight


     ngAfterViewInit() {
       this.dataSource.paginator = this.paginator;
     }

     length = 100;
     pageSize = 10;
     pageSizeOptions = [5, 10, 25, 100];
   
      pageEvent: PageEvent;
   
       setPageSizeOptions(setPageSizeOptionsInput: string) {
         this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
       }

Tweight:Formular [];

  ngOnInit() {
    
    var x = this.formular.getData();
    x.snapshotChanges().subscribe(item => {
      this.dataSource.data = [];
     
      item.forEach(element => {
        var y = element.payload.toJSON();
       
        y["$key"] = element.key;
       
        this.dataSource.data.push(y as Formular[]);
       
      });
      this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    });
    
console.log(this.dataSource.data);


    //this.resetForm();
  }
  onEdit(emp: Formular) {
    this.formular.selectedFormular = Object.assign({}, emp);
  }
 
  onDelete(key: string) {
    if (confirm('Are you sure to delete this record ?') == true) {
      this.formular.deleteEmployee(key);
      this.tostr.warning("Deleted Successfully", "Employee register");
    }
  }
//adding tweight to formular
weightObj=[];

$keys:string;
addweight = function(product){
  this.weightObj = {
    'tweight': this.tweight,
    'key':this.$keys
    
  }
  this.formular.updateWeight(this.weightObj);
}
mgerm;
wbran;
wpoll;
rpolish;
fmeal;
sflower;
omena;
ochonga;
mmeal;
chenga;
prod;
multiply:number;
billObj;

  //for input/edit/delete form
  onSubmit(employeeForm: NgForm) {
     this.Tweight = employeeForm.value
     console.log(this.Tweight); 
     console.log(this.tweight)
     
    //this.multiply= employeeForm.value.tweight
    
  
   
   
    if (employeeForm.value.$key == null)
      this.formular.insertEmployee(employeeForm.value);
    else
      this.formular.updateEmployee(employeeForm.value);
      //for (let entry in this.Tweight) {}
       // console.log(entry);
        //console.log(employeeForm.value.maizeGerm*100) 
        //billMat = function(product){
         
          
      
        
        
       // 1, "string", false
    
      
    this.resetForm(employeeForm);
    this.tostr.success('Submitted Succcessfully', 'Employee Register');
//multiply the formular array with weight
//this.Tweight: number[] = new Array(4)  




  }
  resetForm(employeeForm?: NgForm) {
    if (employeeForm != null)
      employeeForm.reset();
    this.formular.selectedFormular = {
      $key: null,
      product: '',
      prodnum: 0,
      maizeGerm:0,
      WheatPollard: 0,
      wheatBran:  0,
      ricePolish: 0,
      fishMeal: 0,
      sunflowerMeal: 0,
      omena: 0,
      ochonga:0,
      maizeMeal: 0,
      chenga: 0,
      tweight:this.tweight

    }
  }
  mulTiply = function(employeeForm)
  {
    this.mgerm= employeeForm.value.maizeGerm
    this.wbran=employeeForm.value.wheatBran
    this.wpoll=employeeForm.value.WheatPollard
    this.rpolish=employeeForm.value.ricePolish
    this.fmeal= employeeForm.value.fishMeal
    this.sflower= employeeForm.value.sunflowerMeal
    this.omena= employeeForm.value.omena
    this.ochonga= employeeForm.value.ochonga
    this.mmeal=employeeForm.value.maizeMeal
    this.chenga=employeeForm.value.chenga
    this.tweight= employeeForm.value.tweight
    this.prod= employeeForm.value.product
    
    this.billObj = {
    //'tweight': this.tweight,
   // 'key':this.$keys,
    'mgerm':this.mgerm*this.tweight,
'wbran':this.wbran*this.tweight,
'wpoll':this.wpoll*this.tweight,
'rpolish':this.rpolish*this.tweight,
'fmeal':this.fmeal*this.tweight,
'sflower':this.sflower*this.tweight,
'omena':this.omena*this.tweight,
'ochonga':this.ochonga*this.tweight,
'mmeal':this.mmeal*this.tweight,
'chenga':this.chenga*this.tweight,
'prod':this.prod,
    
  }
  this.formular.insertbillmat(this.billObj);
  console.log(this.billObj) 
  console.log(this.tweight)
  console.log("this is awes!",this.tweight2)  

  }

}