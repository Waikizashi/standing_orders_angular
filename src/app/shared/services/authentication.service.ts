import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { AuthComponent } from '../dialogs/auth/auth.component';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(private dialog: MatDialog) { }

  public getToken(): Observable<string | null> {
    const dialogRef = this.dialog.open(AuthComponent);

    return dialogRef.afterClosed();
  }
}
