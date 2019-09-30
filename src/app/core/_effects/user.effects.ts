import { QueryParamsModel } from '../_base/crud/models/query-models/query-params.model';
import { forkJoin } from 'rxjs';
// Angular
import { Injectable } from '@angular/core';
// RxJS
import { mergeMap, map, tap, delay } from 'rxjs/operators';
// NGRX
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
// CRUD
import { QueryResultsModel } from '../_base/crud';
// Services
import { UsersService } from '../_services/user.service';
// State
import { State } from '../reducers';
// Actions
import {
    UserActionTypes,
    UsersPageRequested,
    UsersPageLoaded,
    ManyUsersDeleted,
    OneUserDeleted,
    UserActionToggleLoading,
    UsersPageToggleLoading,
    UserUpdated,
    UsersStatusUpdated,
    UserCreated,
    UserOnServerCreated
} from '../_action/user.action';
import { of } from 'rxjs';

@Injectable()
export class UserEffects {
    showPageLoadingDistpatcher = new UsersPageToggleLoading({ isLoading: true });
    showActionLoadingDistpatcher = new UserActionToggleLoading({ isLoading: true });
    hideActionLoadingDistpatcher = new UserActionToggleLoading({ isLoading: false });
    
    @Effect()
    loadUsersPage$ = this.actions$.pipe(
        ofType<UsersPageRequested>(UserActionTypes.UsersPageRequested),
        mergeMap(( { payload } ) => {
            this.store.dispatch(this.showPageLoadingDistpatcher);
            const requestToServer = this.usersService.findUsers(payload.page);
            const lastQuery = of(payload.page);
            return forkJoin(requestToServer, lastQuery);
        }),
        map(response => {
            const result: QueryResultsModel = response[0];
            const lastQuery: QueryParamsModel = response[1];
            const pageLoadedDispatch = new UsersPageLoaded({
                users: result.items,
                totalCount: result.totalCount,
                page: lastQuery
            });
            return pageLoadedDispatch;
        })
    );

    @Effect()
    deleteUser$ = this.actions$
        .pipe(
            ofType<OneUserDeleted>(UserActionTypes.OneUserDeleted),
            mergeMap(( { payload } ) => {
                    this.store.dispatch(this.showActionLoadingDistpatcher);
                    return this.usersService.deleteUser(payload.id);
                }
            ),
            map(() => {
                return this.hideActionLoadingDistpatcher;
            }),
        );

    @Effect()
    deleteUsers$ = this.actions$
        .pipe(
            ofType<ManyUsersDeleted>(UserActionTypes.ManyUsersDeleted),
            mergeMap(( { payload } ) => {
                    this.store.dispatch(this.showActionLoadingDistpatcher);
                    return this.usersService.deleteUsers(payload.ids);
                }
            ),
            map(() => {
                return this.hideActionLoadingDistpatcher;
            }),
        );

    @Effect()
    updateUser$ = this.actions$
        .pipe(
            ofType<UserUpdated>(UserActionTypes.UserUpdated),
            mergeMap(( { payload } ) => {
                this.store.dispatch(this.showActionLoadingDistpatcher);
                return this.usersService.updateUser(payload.user);
            }),
            map(() => {
                return this.hideActionLoadingDistpatcher;
            })
        );

    @Effect()
    updateUsersStatus$ = this.actions$
        .pipe(
            ofType<UsersStatusUpdated>(UserActionTypes.UsersStatusUpdated),
            mergeMap(( { payload } ) => {
                this.store.dispatch(this.showActionLoadingDistpatcher);
                return this.usersService.updateStatusForUser(payload.users, payload.status);
            }),
            map(() => {
                return this.hideActionLoadingDistpatcher;
            })
        );

    @Effect()
    createUser$ = this.actions$
        .pipe(
            ofType<UserOnServerCreated>(UserActionTypes.UserOnServerCreated),
            mergeMap(( { payload } ) => {
                this.store.dispatch(this.showActionLoadingDistpatcher);
                return this.usersService.createUser(payload.user).pipe(
                    tap(res => {
                        this.store.dispatch(new UserCreated({ user: res }));
                    })
                );
            }),
            map(() => {
                return this.hideActionLoadingDistpatcher;
            }),
        );

    constructor(private actions$: Actions, private usersService: UsersService, private store: Store<State>) { }
}
