import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Formular} from '../models/formulation.model';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Injectable()
export class FormulationService {

  invoice2: Observable<any[]>;
  formularList: AngularFireList<any>;
  selectedFormular: Formular = new Formular();

  constructor(private firebase :AngularFireDatabase) { this.formularList = firebase.list('formular');
  this.invoice2 = this.formularList.valueChanges();}

  getdata(){
    this.formularList = this.firebase.list('formular');

    return this.formularList;
  }
 
  insertEmployee(formular : Formular)
  {
    this.formularList.push({
      maizeGerm: formular.maizeGerm,
      product: formular.product,
    prodnum: formular.prodnum,  
      WheatPollard: formular.WheatPollard,
      wheatBran: formular.wheatBran,
      ricePolish: formular.ricePolish,
      fishMeal: formular.fishMeal,
      sunflowerMeal: formular.sunflowerMeal,
      omena: formular.omena,
      ochonga:formular.ochonga,
      maizeMeal: formular.maizeMeal,
      chenga: formular. chenga,
      

    });
  }
 
  updateEmployee(formular : Formular){
    this.formularList.update(formular.$key,
      {
        maizeGerm: formular.maizeGerm,
        product: formular.product,
        prodnum: formular.prodnum,
        WheatPollard: formular.WheatPollard,
        wheatBran: formular.wheatBran,
        ricePolish: formular.ricePolish,
        fishMeal: formular.fishMeal,
        sunflowerMeal: formular.sunflowerMeal,
        omena: formular.omena,
        ochonga:formular.ochonga,
        maizeMeal: formular.maizeMeal,
        chenga: formular. chenga,


     

        
      });
  }
 
  deleteEmployee($key : string){
    this.formularList.remove($key);
  }
 
}
