// NGRX
import { createFeatureSelector, createSelector } from '@ngrx/store';
// Lodash
import { each } from 'lodash';
// State
import { UsersState } from '../_reducers/user.reducer';
import { UserModel } from '../_models/user.model';

export const selectUsersState = createFeatureSelector<UsersState>('users');

export const selectUserById = (userId: number) => createSelector(
    selectUsersState,
    usersState => usersState.entities[userId]
);

export const selectUsersPageLoading = createSelector(
    selectUsersState,
    usersState => usersState.listLoading
);

export const selectUsersActionLoading = createSelector(
    selectUsersState,
    usersState => usersState.actionsloading
);

export const selectLastCreatedUserId = createSelector(
    selectUsersState,
    usersState => usersState.lastCreatedUserId
);

export const selectUsersShowInitWaitingMessage = createSelector(
    selectUsersState,
    usersState => usersState.showInitWaitingMessage
);

export const selectUsersInStore = createSelector(
    selectUsersState,
    usersState => {
        const items: UserModel[] = [];
        each(usersState.entities, element => {
            items.push(element);
        });
        const result: UserModel[] = items;
        return result
    }
);
