import { Component, OnInit } from '@angular/core';
import {Http,Response,Headers} from '@angular/http';
import{AppRoutingModule} from '../app-routing.module';
import 'rxjs/add/operator/toPromise';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import {SalesService} from '../services/sales.service';
import {Observable} from 'rxjs/Observable';
import {DataSource} from '@angular/cdk/collections';
import { Invoice } from 'app/models/invoice.model';
import { InvoiceServiceService } from '../services/invoice-service.service';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { WorkorderService } from 'app/services/workorder.service';

@Component({
  selector: 'app-salesinvoice',
  templateUrl: './salesinvoice.component.html',
  styleUrls: ['./salesinvoice.component.scss']
})
export class SalesinvoiceComponent implements OnInit {
  custid:number;
  private headers = new Headers({'content-type':'application/json'})
   constructor(private router:Router,private salesService:SalesService, private route:ActivatedRoute,
     private http:Http, private workorder: WorkorderService, private tostr: ToastrService ) { }
  


  ngOnInit() {
    this.resetForm();
  }
  onSubmit(employeeForm: NgForm) {


    if (employeeForm.value.$key == null)
      this.workorder.insertcustomers(employeeForm.value);
    else
      this.workorder.updatecustomers(employeeForm.value);
      console.log(employeeForm.value)
    this.resetForm(employeeForm);
    this.tostr.success('Submitted Succcessfully', 'Employee Register');
  }
  resetForm(employeeForm?: NgForm) {
    if (employeeForm != null)
      employeeForm.reset();
    this.workorder.selectedCustomer = {
      $key: null,
      name: '',
      phone: 0,
      orderNum:0,
      balance:0,
      location:'',
      custid:0,

    }
  }
 //**********************read and manipulate invoices here************ */


 // 'key':this.$keys,
 name
 phone
 balance
 location
 orderNum
 tweight= 1234567;
 key;
    
 addBalance = function(employeeForm)
 {
   this.name= employeeForm.value.name;
   this.prodnum=employeeForm.value.phone;
   this.total=employeeForm.value.balance;
   this.total=employeeForm.value.location;

   this.quantity=employeeForm.value.orderNum;
   this.key=employeeForm.value.$key;
  
   
   this.billObj = {
   //'tweight': this.tweight,
   '$key':this.key,
   'name':this.name,
'phone':this.phone,
'balance':this.balance + this.tweight,
'location':this.location,
'orderNum':this.orderNum,

   
 }
 this.workorder.updatecustomers(this.billObj);
 console.log(this.billObj) 
 console.log(this.key)
 console.log("this is awes!",this.tweight2)  

 }

}

   