import { Component, OnInit,ViewChild } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {DataSource} from '@angular/cdk/collections';
import { Formular } from 'app/models/formulation.model';
import { FormulationService } from '../services/formulation.service';
import {MatPaginator,MatSort, MatTableDataSource} from '@angular/material';
import {PageEvent} from '@angular/material';

@Component({
  selector: 'app-bill-mat',
  templateUrl: './bill-mat.component.html',
  styleUrls: ['./bill-mat.component.scss']
})
export class BillMatComponent implements OnInit {

  constructor(private formular: FormulationService,) { }
  displayedColumns= ['product' ,'maizeGerm','wheatBran','WheatPollard','ricePolish','fishMeal','sunflowerMeal','omena','ochonga','maizeMeal','chenga','tweight']
  dataSource = new MatTableDataSource<Formular[]>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;




  ngOnInit() {

    var x = this.formular.getbillData();
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
  }

}
