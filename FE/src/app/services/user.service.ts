import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { throwError as observableThrowError, Observable } from 'rxjs/index';

@Injectable({
    providedIn: 'root'
})

export class UserService {

    constructor(private httpClient: HttpClient) { }

    registerUser(jsonData) {
        return this.httpClient.post('/api/auth/register',
            jsonData).pipe(map((val: any) => this.extractData(val)),
                catchError(err => this.handleError(err)));
    }

    login(jsonData) {
        return this.httpClient.post('/api/auth/login',
            jsonData).pipe(map((val: any) => this.extractData(val)),
                catchError(err => this.handleError(err)));
    }

    getAllUsers(jsonData) {
        const token = sessionStorage.getItem('accessToken')
        let headers = new HttpHeaders();
        headers = headers.set('Content-Type', 'application/json');
        headers = headers.append('x-access-token', token);
        return this.httpClient.post('/api/user/all', jsonData, {headers: headers})
            .pipe(map((val: any) => this.extractData(val)),
                catchError(err => this.handleError(err)));
    }

    upateUser(jsonnData) {
        const token = sessionStorage.getItem('accessToken')
        let headers = new HttpHeaders();
        headers = headers.set('Content-Type', 'application/json');
        headers = headers.append('x-access-token', token);
        return this.httpClient.post('/api/user/update', jsonnData, {headers: headers})
            .pipe(map((val: any) => this.extractData(val)),
                catchError(err => this.handleError(err)));
    }

    deleteUser(jsonnData) {
        const token = sessionStorage.getItem('accessToken')
        let headers = new HttpHeaders();
        headers = headers.set('Content-Type', 'application/json');
        headers = headers.append('x-access-token', token);
        return this.httpClient.post('/api/user/delete', jsonnData, {headers: headers})
            .pipe(map((val: any) => this.extractData(val)),
                catchError(err => this.handleError(err)));
    }


    private extractData(res: Response) {
        const body = res;
        return body || [];
    }

    public handleError(error: Response | any) {
        console.log(error)
        return observableThrowError(error);
    }
}

// {headers: new HttpHeaders({'Content-Type': 'application/json'})},