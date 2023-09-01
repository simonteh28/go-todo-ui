import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, catchError, map, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ServerError } from '../interfaces/server-error';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}

  private getHeader() {
    let header = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return header;
  }

  get(path: string): Observable<any> {
    return this.http
      .get(`${environment.api_url}${path}`, {
        headers: this.getHeader(),
        observe: 'response',
      })
      .pipe(
        catchError((val) => {
          return this.handleError(val);
        })
      );
  }

  post(path: string, body: object = {}): Observable<any> {
    return this.http
      .post(`${environment.api_url}${path}`, body, {
        headers: this.getHeader(),
      })
      .pipe(
        map((res) => {
          return this.displaySuccess(res);
        }),
        catchError((val) => {
          return this.handleError(val);
        })
      );
  }

  patch(path: string, body: object = {}): Observable<any> {
    return this.http
      .patch(`${environment.api_url}${path}`, body, {
        headers: this.getHeader(),
      })
      .pipe(
        map((res) => {
          return this.displaySuccess(res);
        }),
        catchError((val) => {
          return this.handleError(val);
        })
      );
  }

  delete(path: string): Observable<any> {
    return this.http
      .delete(`${environment.api_url}${path}`, { headers: this.getHeader() })
      .pipe(
        map((res) => {
          return this.displaySuccess(res);
        }),
        catchError((val) => {
          return this.handleError(val);
        })
      );
  }

  handleError(response: any) {
    let error: ServerError = {
      errorcode: response.code,
      mesage: response.message,
      details: response.details,
    };
    this.displayError(error);
    return of(error);
  }

  displayError(error: ServerError) {
    this.snackBar.open(
      'Error ' + error.errorcode + ': ' + error.mesage,
      'CLOSE',
      { duration: 1500, verticalPosition: 'top' }
    );
  }

  displaySuccess(message: any) {
    this.snackBar.open(message, 'DISMISS', {
      duration: 1500,
      verticalPosition: 'top',
    });
  }
}
