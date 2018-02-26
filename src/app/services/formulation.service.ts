import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Formular} from '../models/formulation.model';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Injectable()
export class FormulationService {

  invoice2: Observable<any[]>;
  billmat: Observable<any[]>;
  formularList: AngularFireList<any>;
  billMatList: AngularFireList<any>;
  selectedFormular: Formular = new Formular();

  constructor(private firebase :AngularFireDatabase) { this.formularList = firebase.list('formular');
  this.invoice2 = this.formularList.valueChanges();this.billMatList = firebase.list('billmat');
  this.billmat = this.billMatList.valueChanges();}

  getData(){
    this.formularList = this.firebase.list('formular');

    return this.formularList;
  }

  getbillData(){
    this.formularList = this.firebase.list('billmat');

    return this.billMatList;
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
      tweight:formular.tweight
      

    });
  }
 
  insertbillmat(formular)
  {
    this.billMatList.push({
      maizeGerm: formular.mgerm,
      product: formular.prod,
    //prodnum: formular.prodnum,  
      WheatPollard: formular.wpoll,
      wheatBran: formular.wbran,
      ricePolish: formular.rpolish,
      fishMeal: formular.fmeal,
      sunflowerMeal: formular.sflower,
      omena: formular.omena,
      ochonga:formular.ochonga,
      maizeMeal: formular.mmeal,
      chenga: formular. chenga,
      //tweight:formular.tweight
      

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
        tweight:formular.tweight


     

        
      });
  }
 
  updateWeight(formular : Formular){
    this.formularList.update(formular.$key,
      {
        tweight: formular.tweight
       
      });
    }

  deleteEmployee($key : string){
    this.formularList.remove($key);
  }
 
}
