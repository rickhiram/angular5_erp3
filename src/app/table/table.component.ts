import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user.service';
import {Observable} from 'rxjs/Observable';
import {DataSource} from '@angular/cdk/collections';
import {Http,Response,Headers} from '@angular/http';
import {User} from '../models/user.model';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
dataSource = new UserDataSource(this.userService);
displayedColumns= ['name','phone','location','balance','orders','custid']
  constructor(private userService:UserService, private http: Http) { }

  ngOnInit() {
  }

}
export class UserDataSource extends DataSource<any>{
  constructor(private userService:UserService){super();}

  connect():Observable<User[]>{
    return this.userService.getUser();
  }
  disconnect(){}
  
}
