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

@Component({
  selector: 'app-salesinvoice',
  templateUrl: './salesinvoice.component.html',
  styleUrls: ['./salesinvoice.component.scss']
})
export class SalesinvoiceComponent implements OnInit {
  custid:number;
  private headers = new Headers({'content-type':'application/json'})
   constructor(private router:Router,private salesService:SalesService, private route:ActivatedRoute,
     private http:Http, private invoiceService: InvoiceServiceService, private tostr: ToastrService ) { }
  


  ngOnInit() {
    this.resetForm();
  }
  onSubmit(employeeForm: NgForm) {
    if (employeeForm.value.$key == null)
      this.invoiceService.insertEmployee(employeeForm.value);
    else
      this.invoiceService.updateEmployee(employeeForm.value);
    this.resetForm(employeeForm);
    this.tostr.success('Submitted Succcessfully', 'Employee Register');
  }
  resetForm(employeeForm?: NgForm) {
    if (employeeForm != null)
      employeeForm.reset();
    this.invoiceService.selectedInvoice = {
      $key: null,
      name: '',
      total: 0,
      prodnum:0,
      quantity:0,

    }
  }
 

}

   