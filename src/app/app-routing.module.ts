import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Component } from '@angular/core/src/metadata/directives';
import { HomeComponent } from 'app/home/home.component';
import { ProductsComponent } from 'app/products/products.component';
import { UpdateComponent } from 'app/update/update.component';
import { MenubarComponent } from 'app/menubar/menubar.component';
import{MaterialsComponent} from 'app/materials/materials.component';
import{CustomersComponent} from 'app/customers/customers.component';
import{CustomersupdateComponent} from 'app/customersupdate/customersupdate.component';
import{TableComponent} from 'app/table/table.component';
import {ProductListComponent}from './product-list/product-list.component';
import {SalesordersComponent} from './salesorders/salesorders.component';
import{SalesinvoiceComponent} from './salesinvoice/salesinvoice.component';
import{WorkorderComponent} from './workorder/workorder.component';
import{InvoicelistComponent} from './invoicelist/invoicelist.component';
import {FormulationComponent}from './formulation/formulation.component';


const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'products',component:ProductsComponent},
  {path:'update/:id',component:UpdateComponent},
  {path:'menubar/:id',component:MenubarComponent},
  {path:'menubar',component:MenubarComponent},
  {path:'materials',component:MaterialsComponent},
  {path:'customers',component:CustomersComponent},
  {path:'customersupdate',component:CustomersupdateComponent},
  {path:'table',component:TableComponent},
  {path:'productlist',component:ProductListComponent},
  {path:'orders',component:SalesordersComponent},
  {path:'invoice',component:SalesinvoiceComponent},
  {path:'workorder',component:WorkorderComponent},
  {path:'invoices',component:InvoicelistComponent},
  {path:'formulation',component:FormulationComponent},

  
  {
    path: '',
    children: []
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
