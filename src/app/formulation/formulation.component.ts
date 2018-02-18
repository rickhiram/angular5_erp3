import { Component, OnInit,ViewChild } from '@angular/core';
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
console.log(this.dataSource);

    this.resetForm();
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




  //for input/edit/delete form
  onSubmit(employeeForm: NgForm) {
    if (employeeForm.value.$key == null)
      this.formular.insertEmployee(employeeForm.value);
    else
      this.formular.updateEmployee(employeeForm.value);
    this.resetForm(employeeForm);
    this.tostr.success('Submitted Succcessfully', 'Employee Register');
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

    }
  }
 

}