import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DataService } from '../services/data/data.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root',
})
export class ApiDataService {
    readonly defaultOptions: any = {
        hideErrorMethod: false,
        hideFullSpinner: false,
        hideJwt: false,
        responseType: 'json'
    };
    constructor(
        private http: HttpClient,
        private data: DataService
    ) {

    }

    getData(path: any, options?: any): Observable<any> {
        let headers = new HttpHeaders();
        if (options && options.hideJwt) {
            headers = headers.set('Spinner', options.hideFullSpinner ? '' : 'true');
        } else {
            headers = headers.set('Authorization', `Bearer ${this.data.token}`);
            headers = headers.set('Spinner', options && options.hideFullSpinner ? '' : 'true');
        }
        return this.http.get(path, { headers });
    }

    postData(path: any, body: any, options?: any): Observable<any> {
        let headers = new HttpHeaders();
        if (options && options.hideJwt) {
            headers = headers.set('Spinner', options.hideFullSpinner ? '' : 'true');
        } else {
            headers = headers.set('Authorization', `Bearer ${this.data.token}`);
            headers = headers.set('Spinner', options && options.hideFullSpinner ? '' : 'true');
        }
        const responseType = options?.responseType ?? 'json';
        let observe: any;
        if (responseType === 'blob') {
            observe = 'response';
        }
        return this.http.post(path, body, { headers, observe, responseType });
    }

    setOptions(options: any) {
        for (const opPath of Object.keys(this.defaultOptions)) {
            options[opPath] === undefined
                ? (options[opPath] = this.defaultOptions[opPath])
                : '';
        }
        return options;
    }

}
