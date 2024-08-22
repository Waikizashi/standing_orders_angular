import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { Int32CodeTable } from '../models/int32-code-table';
import { StringCodeTable } from '../models/string-code-table';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class CodeTableService {
  private apiUrl = '/api/code-table';
  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar) { }

  getIntervals(): Observable<Int32CodeTable[]> {
    return this.http.get<Int32CodeTable[]>(this.apiUrl + '/intervals').pipe(
      catchError(error => {
        this.openSnackBar(error.statusText, 'Close');
        throw error
      })
    );
  }
  getConstantSymbols(): Observable<StringCodeTable[]> {
    return this.http.get<StringCodeTable[]>(this.apiUrl + '/constant-symbols').pipe(
      catchError(error => {
        this.openSnackBar(error.statusText, 'Close');
        throw error
      })
    );
  }

  private openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action);
  }
}
