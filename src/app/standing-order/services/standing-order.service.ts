import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { StandingOrderBrowseDto } from '../model/standing-order-browse-dto';
import { StandingOrderDetailDto } from '../model/standing-order-detail-dto';
import { MatSnackBar } from '@angular/material/snack-bar';
@Injectable({
  providedIn: 'root'
})

export class StandingOrderService {
  private apiUrl = '/api/standingOrder';
  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar) { }

  getStandingOrders(): Observable<StandingOrderBrowseDto[]> {
    return this.http.get<StandingOrderBrowseDto[]>(this.apiUrl).pipe(
      catchError(error => {
        this.openSnackBar(error.statusText, 'Close');
        throw error
      })
    );
  }

  getStandingOrderById(id: number): Observable<StandingOrderDetailDto> {
    return this.http.get<StandingOrderDetailDto>(this.apiUrl + `/${id}`).pipe(
      catchError(error => {
        this.openSnackBar(error.statusText, 'Close');
        throw error
      })
    );
  }

  deleteStandingOrderById(id: number, authToken: string | null): Observable<string> {
    const headers = {
      'Authorization': `${authToken}`
    };
    return this.http.delete<string>(
      this.apiUrl + `/${id}`,
      { headers: this.getDefaultHeaders(headers) }
    ).pipe(
      catchError(error => {
        this.openSnackBar(error.statusText, 'Close');
        throw error
      })
    );
  }

  createStandingOrderById(newStandingOrder: StandingOrderDetailDto, authToken: string | null): Observable<string> {
    const headers = {
      'Authorization': `${authToken}`
    };
    return this.http.post<string>(
      this.apiUrl, newStandingOrder,
      { headers: this.getDefaultHeaders(headers) }).pipe(
        catchError(error => {
          this.openSnackBar(error.statusText, 'Close');
          throw error
        })
      );
  }

  updateStandingOrderById(standingOrder: StandingOrderDetailDto, authToken: string | null): Observable<string> {
    const headers = {
      'Authorization': `${authToken}`
    };
    return this.http.put<string>(
      this.apiUrl + `/${standingOrder.standingOrderId}`,
      standingOrder,
      { headers: this.getDefaultHeaders(headers) }).pipe(
        catchError(error => {
          this.openSnackBar(error.statusText, 'Close');
          throw error
        })
      );
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
