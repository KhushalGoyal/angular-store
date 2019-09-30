// NGRX
import { createFeatureSelector } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter, Update } from '@ngrx/entity';
// Actions
import { UserActions, UserActionTypes } from '../_action/user.action';
// Models
import { UserModel } from '../_models/user.model';
import { QueryParamsModel } from '../_base/crud';

export interface UsersState extends EntityState<UserModel> {
    listLoading: boolean;
    actionsloading: boolean;
    totalCount: number;
    lastCreatedUserId: number;
    lastQuery: QueryParamsModel;
    showInitWaitingMessage: boolean;
}

export const adapter: EntityAdapter<UserModel> = createEntityAdapter<UserModel>();

export const initialUsersState: UsersState = adapter.getInitialState({
    userForEdit: null,
    listLoading: false,
    actionsloading: false,
    totalCount: 0,
    lastCreatedUserId: undefined,
    lastQuery: new QueryParamsModel({}),
    showInitWaitingMessage: true
});

export function usersReducer(state = initialUsersState, action: UserActions): UsersState {
    switch  (action.type) {
        case UserActionTypes.UsersPageToggleLoading: {
            return {
                ...state, listLoading: action.payload.isLoading, lastCreatedUserId: undefined
            };
        }
        case UserActionTypes.UserActionToggleLoading: {
            return {
                ...state, actionsloading: action.payload.isLoading
            };
        }
        case UserActionTypes.UserOnServerCreated: return {
            ...state
        };
        case UserActionTypes.UserCreated: return adapter.addOne(action.payload.user, {
            ...state, lastCreatedUserId: action.payload.user.id
        });
        case UserActionTypes.UserUpdated: return adapter.updateOne(action.payload.partialUser, state);
        case UserActionTypes.UsersStatusUpdated: {
            const _partialUsers: Update<UserModel>[] = [];
            // tslint:disable-next-line:prefer-const
            for (let i = 0; i < action.payload.users.length; i++) {
                _partialUsers.push({
				    id: action.payload.users[i].id,
				    changes: {
                        status: action.payload.status
                    }
			    });
            }
            return adapter.updateMany(_partialUsers, state);
        }
        case UserActionTypes.OneUserDeleted: return adapter.removeOne(action.payload.id, state);
        case UserActionTypes.ManyUsersDeleted: return adapter.removeMany(action.payload.ids, state);
        case UserActionTypes.UsersPageCancelled: {
            return {
                ...state, listLoading: false, lastQuery: new QueryParamsModel({})
            };
        }
        case UserActionTypes.UsersPageLoaded: {
            return adapter.addMany(action.payload.users, {
                ...initialUsersState,
                totalCount: action.payload.totalCount,
                listLoading: false,
                lastQuery: action.payload.page,
                showInitWaitingMessage: false
            });
        }
        default: return state;
    }
}

export const getUserState = createFeatureSelector<UserModel>('users');

export const {
    selectAll,
    selectEntities,
    selectIds,
    selectTotal
} = adapter.getSelectors();
