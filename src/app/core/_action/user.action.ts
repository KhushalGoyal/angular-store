// NGRX
import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
// CRUD
import { QueryParamsModel } from '../_base/crud';
// Models
import { UserModel } from '../_models/user.model';


export enum UserActionTypes {
    UserOnServerCreated = '[Edit User Dialog] User On Server Created',
    UserCreated = '[Edit User Dialog] User Created',
    UserUpdated = '[Edit User Dialog] User Updated',
    UsersStatusUpdated = '[User List Page] Users Status Updated',
    OneUserDeleted = '[Users List Page] One User Deleted',
    ManyUsersDeleted = '[Users List Page] Many User Deleted',
    UsersPageRequested = '[Users List Page] Users Page Requested',
    UsersPageLoaded = '[Users API] Users Page Loaded',
    UsersPageCancelled = '[Users API] Users Page Cancelled',
    UsersPageToggleLoading = '[Users] Users Page Toggle Loading',
    UserActionToggleLoading = '[Users] Users Action Toggle Loading'
}

export class UserOnServerCreated implements Action {
    readonly type = UserActionTypes.UserOnServerCreated;
    constructor(public payload: { user: UserModel }) { }
}

export class UserCreated implements Action {
    readonly type = UserActionTypes.UserCreated;
    constructor(public payload: { user: UserModel }) { }
}

export class UserUpdated implements Action {
    readonly type = UserActionTypes.UserUpdated;
    constructor(public payload: {
        partialUser: Update<UserModel>, // For State update
        user: UserModel // For Server update (through service)
    }) { }
}

export class UsersStatusUpdated implements Action {
    readonly type = UserActionTypes.UsersStatusUpdated;
    constructor(public payload: {
        users: UserModel[],
        status: number
    }) { }
}

export class OneUserDeleted implements Action {
    readonly type = UserActionTypes.OneUserDeleted;
    constructor(public payload: { id: number }) {}
}

export class ManyUsersDeleted implements Action {
    readonly type = UserActionTypes.ManyUsersDeleted;
    constructor(public payload: { ids: number[] }) {}
}

export class UsersPageRequested implements Action {
    readonly type = UserActionTypes.UsersPageRequested;
    constructor(public payload: { page: QueryParamsModel }) { }
}

export class UsersPageLoaded implements Action {
    readonly type = UserActionTypes.UsersPageLoaded;
    constructor(public payload: { users: UserModel[], totalCount: number, page: QueryParamsModel }) { }
}

export class UsersPageCancelled implements Action {
    readonly type = UserActionTypes.UsersPageCancelled;
}

export class UsersPageToggleLoading implements Action {
    readonly type = UserActionTypes.UsersPageToggleLoading;
    constructor(public payload: { isLoading: boolean }) { }
}

export class UserActionToggleLoading implements Action {
    readonly type = UserActionTypes.UserActionToggleLoading;
    constructor(public payload: { isLoading: boolean }) { }
}

export type UserActions = UserOnServerCreated
| UserCreated
| UserUpdated
| UsersStatusUpdated
| OneUserDeleted
| ManyUsersDeleted
| UsersPageRequested
| UsersPageLoaded
| UsersPageCancelled
| UsersPageToggleLoading
| UserActionToggleLoading;
