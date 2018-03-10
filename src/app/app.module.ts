import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSelectModule} from '@angular/material/select';
import{BillMatComponent} from './bill-mat/bill-mat.component';
import { LocationStrategy, HashLocationStrategy} from '@angular/common';

import {MatInputModule} from '@angular/material/input';
import {CommonModule} from '@angular/common';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { UpdateComponent } from './update/update.component';
import { MenubarComponent } from './menubar/menubar.component';
import { MaterialsComponent } from './materials/materials.component';
import {MenubarModule} from 'primeng/menubar';
import {MenuItem} from 'primeng/api';
import {CalendarModule} from 'primeng/calendar';
import{CustomersComponent} from './customers/customers.component';
import{CustomersupdateComponent} from './customersupdate/customersupdate.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTableModule} from '@angular/material/table';
import{TableComponent} from './table/table.component';
import {UserService} from './services/user.service';
import {ProductListComponent}from './product-list/product-list.component';
import { ProductsService } from 'app/services/products.service';
import {MatCardModule} from '@angular/material/card';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {SalesordersComponent} from './salesorders/salesorders.component';
import { SalesService } from 'app/services/sales.service';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material';
import {SalesinvoiceComponent} from './salesinvoice/salesinvoice.component';
import { InvoiceServiceService} from './services/invoice-service.service';
import {WorkorderComponent} from './workorder/workorder.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { environment } from '../environments/environment';
import { ToastrModule } from 'ngx-toastr';
import {InvoicelistComponent} from './invoicelist/invoicelist.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import { WorkorderService } from 'app/services/workorder.service';
import {FormulationComponent}from './formulation/formulation.component';
import {FormulationService} from './services/formulation.service';
import { DatePipe } from '@angular/common'
import {AllInvoicesComponent}from './all-invoices/all-invoices.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSortModule} from '@angular/material/sort';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductsComponent,
    UpdateComponent,
    MenubarComponent,
    MaterialsComponent,
    CustomersComponent,
    CustomersupdateComponent,
    TableComponent,
    SalesordersComponent,
    ProductListComponent,
    SalesinvoiceComponent,
    WorkorderComponent,
    InvoicelistComponent,
    FormulationComponent,
    AllInvoicesComponent,
    BillMatComponent
   
  

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    CommonModule,
    MenubarModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    HttpClientModule,
    MatCardModule,
    FlexLayoutModule,
    MatMenuModule,
    MatSortModule,
    MatIconModule,
    MatButtonModule,
    MatNativeDateModule,
    MatDatepickerModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    ToastrModule.forRoot(),
    MatPaginatorModule,
    MatToolbarModule,
    MatSidenavModule

   
    

  ],
  providers: [UserService,ProductsService,SalesService, 
    InvoiceServiceService, WorkorderService, FormulationService,DatePipe,{ provide: LocationStrategy, 
      useClass: HashLocationStrategy }],
  bootstrap: [AppComponent]
})
export class AppModule { }
