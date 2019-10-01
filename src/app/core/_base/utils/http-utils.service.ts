import { Injectable } from '@angular/core';
import { HttpParams, HttpHeaders } from '@angular/common/http';

@Injectable()
export class HttpUtilsService{
    /**
	 * Prepare query http params
	 * @param queryParams: QueryParamsModel
	 */
	getFindHTTPParams(queryParams): HttpParams {
		const params = new HttpParams()
			.set('lastNamefilter', queryParams.filter)
			.set('sortOrder', queryParams.sortOrder)
			.set('sortField', queryParams.sortField)
			.set('pageNumber', queryParams.pageNumber.toString())
			.set('pageSize', queryParams.pageSize.toString());

		return params;
	}

	/**
	 * get standard content-type
	 */
	getHTTPHeaders(): HttpHeaders {
		const result = new HttpHeaders();
		result.set('Content-Type', 'application/json');
		return result;
	}
}