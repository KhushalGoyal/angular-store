import { Component, OnInit } from '@angular/core';
import { UserModel, UsersPageRequested } from '../core';
import { Store } from '@ngrx/store';
import { State } from '../core/reducers';
import { skip, distinctUntilChanged, take, delay } from 'rxjs/operators';
import { of } from 'rxjs';
import { SelectionModel } from '@angular/cdk/collections';
import { QueryParamsModel } from '../core/_base/models/http-param.model';

@Component({
  selector: 'app-userscomponent',
  templateUrl: './userscomponent.component.html',
  styleUrls: ['./userscomponent.component.css']
})
export class UserscomponentComponent implements OnInit {
  dataSource : any;
  selection = new SelectionModel<UserModel>(true, []);
  filterStatus: string = '';
	filterType: string = '';


  constructor(
    private store : Store<State>,
  ) { }

  ngOnInit() {
    // First load
		of(undefined).pipe(take(1), delay(1000)).subscribe(() => { // Remove this line, just loading imitation
			this.loadUsersList();
		}); // Remove this line, just loading imitation
		this.store.select('users').subscribe(result => {
			console.log(result)
		})
  }


  loadUsersList(){
    this.selection.clear();
		const queryParams = new QueryParamsModel(
			this.filterConfiguration(),
			'asc',
			'',
			0,
			10
		);
		// Call request from server
		this.store.dispatch(new UsersPageRequested({ page: queryParams }));
		this.selection.clear();
  }

  /**
	 * Returns object for filter
	 */
	filterConfiguration(): any {
		const filter: any = {};
		const searchText: string = '';

		if (this.filterStatus && this.filterStatus.length > 0) {
			filter.status = +this.filterStatus;
		}

		if (this.filterType && this.filterType.length > 0) {
			filter.type = +this.filterType;
		}

		filter.name = searchText;
		if (!searchText) {
			return filter;
		}

		filter.username = searchText;
		filter.email = searchText;
		filter.website = searchText;
		filter.company = searchText;    
    return filter;
	}
}
