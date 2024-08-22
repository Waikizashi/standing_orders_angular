import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { Authorization } from '../models/authorization';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AuthDataService {
  private apiUrl = '/api/grid-card';
  constructor(private http: HttpClient,
    public dialog: MatDialog,
    private snackBar: MatSnackBar) { }

  init(): Observable<number> {
    return this.http.get<number>(this.apiUrl + '/init', { headers: this.getDefaultHeaders() }).pipe(
      catchError(error => {
        this.openSnackBar(error.statusText, 'Close');
        throw error
      })
    );
  }
  validate(auth: Authorization): Observable<string> {
    return this.http.post<string>(this.apiUrl + '/validate', auth, { headers: this.getDefaultHeaders() })
  }

  private openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action);
  }
  private getDefaultHeaders(headers?: { [key: string]: string }): HttpHeaders {
    let httpHeaders = new HttpHeaders({
      'Accept': 'application/json'
    });
    for (let key in headers) {
      httpHeaders = httpHeaders.set(key, headers[key]);
    }
    return httpHeaders;
  }
}
