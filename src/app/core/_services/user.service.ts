// Angular
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// RxJS
import { Observable } from 'rxjs';
// CRUD
import { HttpUtilsService, QueryParamsModel, QueryResultsModel } from '../_base/crud';
// Models
import { UserModel } from '../_models/user.model';

const API_CUSTOMERS_URL = 'https://jsonplaceholder.typicode.com/users';

@Injectable()
export class UsersService {
	constructor(private http: HttpClient, private httpUtils: HttpUtilsService) { }

	// CREATE =>  POST: add a new user to the server
	createUser(user: UserModel): Observable<UserModel> {
		// Note: Add headers if needed (tokens/bearer)
		const httpHeaders = this.httpUtils.getHTTPHeaders();
		return this.http.post<UserModel>(API_CUSTOMERS_URL, user, { headers: httpHeaders});
	}

	// READ
	getAllUsers(): Observable<UserModel[]> {
		return this.http.get<UserModel[]>(API_CUSTOMERS_URL);
	}

	getUserById(userId: number): Observable<UserModel> {
		return this.http.get<UserModel>(API_CUSTOMERS_URL + `/${userId}`);
	}

	// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
	// items => filtered/sorted result
	// Server should return filtered/sorted result
	findUsers(queryParams: QueryParamsModel): Observable<QueryResultsModel> {
		// Note: Add headers if needed (tokens/bearer)
		const httpHeaders = this.httpUtils.getHTTPHeaders();
		const httpParams = this.httpUtils.getFindHTTPParams(queryParams);

		const url = API_CUSTOMERS_URL + '/find';
		return this.http.get<QueryResultsModel>(url, {
			headers: httpHeaders,
			params:  httpParams
		});
	}

	// UPDATE => PUT: update the user on the server
	updateUser(user: UserModel): Observable<any> {
		const httpHeader = this.httpUtils.getHTTPHeaders();
		return this.http.put(API_CUSTOMERS_URL, user, { headers: httpHeader });
	}

	// UPDATE Status
	updateStatusForUser(users: UserModel[], status: number): Observable<any> {
		const httpHeaders = this.httpUtils.getHTTPHeaders();
		const body = {
			usersForUpdate: users,
			newStatus: status
		};
		const url = API_CUSTOMERS_URL + '/updateStatus';
		return this.http.put(url, body, { headers: httpHeaders });
	}

	// DELETE => delete the user from the server
	deleteUser(userId: number): Observable<UserModel> {
		const url = `${API_CUSTOMERS_URL}/${userId}`;
		return this.http.delete<UserModel>(url);
	}

	deleteUsers(ids: number[] = []): Observable<any> {
		const url = API_CUSTOMERS_URL + '/deleteUsers';
		const httpHeaders = this.httpUtils.getHTTPHeaders();
		const body = { userIdsForDelete: ids };
		return this.http.put<QueryResultsModel>(url, body, { headers: httpHeaders} );
	}
}
