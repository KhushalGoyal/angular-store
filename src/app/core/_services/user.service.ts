// Angular
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// RxJS
import { Observable } from 'rxjs';

// Models
import { UserModel } from '../_models/user.model';
import { HttpUtilsService } from '../_base/utils/http-utils.service';
import { QueryParamsModel } from '../_base/models/http-param.model';

const API_CUSTOMERS_URL = 'https://jsonplaceholder.typicode.com';

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
	findUsers(queryParams: QueryParamsModel): Observable<any> {
		// Note: Add headers if needed (tokens/bearer)
		const httpHeaders = this.httpUtils.getHTTPHeaders();
		const httpParams = this.httpUtils.getFindHTTPParams(queryParams);

		const url = API_CUSTOMERS_URL + '/users';
		return this.http.get<any>(url);
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
		return this.http.put<any>(url, body, { headers: httpHeaders} );
	}
}
