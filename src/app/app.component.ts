import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

import { UserModel, UsersDataSource, UsersPageRequested, OneUserDeleted, ManyUsersDeleted, UsersStatusUpdated } from './core/';

import { State } from './core/reducers';

import { debounceTime, distinctUntilChanged, tap, skip, delay, take } from 'rxjs/operators';
import { QueryParamsModel } from './core/_base/crud';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit{
  title = 'angular-store';
  dataSource : UsersDataSource;
  results: UserModel[] = [];

  constructor(
    private store: Store<State>
  ){


  }

  ngOnInit(){
	
  }
}
