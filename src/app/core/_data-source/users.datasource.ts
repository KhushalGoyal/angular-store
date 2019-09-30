import { mergeMap, tap } from 'rxjs/operators';
// RxJS
import { delay, distinctUntilChanged, skip, filter, take, map } from 'rxjs/operators';
// NGRX
import { Store, select } from '@ngrx/store';
// CRUD
import { BaseDataSource, QueryResultsModel } from '../_base/crud';
// State
import { State } from '../reducers';
import { selectUsersInStore, selectUsersPageLoading, selectUsersShowInitWaitingMessage } from '../_selectors/user.selector';

export class UsersDataSource extends BaseDataSource {
	constructor(private store: Store<State>) {
		super();
		this.loading$ = this.store.pipe(
			select(selectUsersPageLoading),
		);

		this.isPreloadTextViewed$ = this.store.pipe(
			select(selectUsersShowInitWaitingMessage)
		);

		this.store.pipe(
			select(selectUsersInStore),
		).subscribe((response: QueryResultsModel) => {
			this.paginatorTotalSubject.next(response.totalCount);
			this.entitySubject.next(response.items);
		});
	}
}
