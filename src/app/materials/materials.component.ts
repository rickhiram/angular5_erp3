import { Component, OnInit, ViewChild } from '@angular/core';
import {Http, Response,Headers} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { MenubarComponent } from '../menubar/menubar.component';
import {WorkorderService} from '../services/workorder.service';
import{Materials} from '../models/materials.model';
import { NgForm } from '@angular/forms';
import {MatPaginator,MatSort, MatTableDataSource} from '@angular/material';
import {PageEvent} from '@angular/material';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-materials',
  templateUrl: './materials.component.html',
  styleUrls: ['./materials.component.scss']
})
export class MaterialsComponent implements OnInit {

  constructor(private http:Http, private workorder:WorkorderService) { }

  displayedColumns= ['name' ,'prodnum','stock','price','edit']
 
  dataSource = new MatTableDataSource<Materials[]>();

  

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

 var x = this.workorder.getMaterials();
 x.snapshotChanges().subscribe(item => {
   this.dataSource.data = [];
   item.forEach(element => {
     var y = element.payload.toJSON();
     y["$key"] = element.key;
     this.dataSource.data.push(y as Materials[]);
    
   });
   this.dataSource.paginator = this.paginator;
 this.dataSource.sort = this.sort;
 });
console.log(this.dataSource);

 this.resetForm();
}

onEdit(emp: Materials) {
 this.workorder.selectedMaterial = Object.assign({}, emp);
}

onDelete(key: string) {
 if (confirm('Are you sure to delete this record ?') == true) {
   this.workorder.deletematerial(key);
   //this.tostr.warning("Deleted Successfully", "Employee register");
 }
}




//for input/edit/delete form
onSubmit(employeeForm: NgForm) {
 if (employeeForm.value.$key == null)
   this.workorder.insertMaterials(employeeForm.value);
 else
   this.workorder.updatematerials(employeeForm.value);
 this.resetForm(employeeForm);
 
}
resetForm(employeeForm?: NgForm) {
 if (employeeForm != null)
   employeeForm.reset();
 this.workorder.selectedMaterial = {
   $key: null,
  name:'',
  prodnum: 0,
  stock: 0,
  price:0

 }
}


}
