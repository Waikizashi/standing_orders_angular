import { Component } from '@angular/core';
import { AuthDataService } from '../../services/auth-data.service';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Authorization } from '../../models/authorization';
import { Observable, Subject, catchError, takeUntil, tap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  protected loadSpinner: boolean = false;
  protected pin = new FormControl('', [Validators.required, Validators.pattern(/^[0-9]{4,}$/)]);
  protected coords: { row: string, col: string } = { row: '', col: '' };

  private auth: Authorization = { pin: 0, coordinate: 0 };
  private onDestroy = new Subject<void>();

  constructor(
    private authDataService: AuthDataService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<AuthComponent>,) { }

  ngOnInit() {
    this.getAuthParams().subscribe();
    this.pin.valueChanges.pipe(takeUntil(this.onDestroy), tap((value) => {
      this.auth.pin = parseInt(value ? value : '');
    })).subscribe()
  }

  ngOnDestroy() {
    this.onDestroy.next();
    this.onDestroy.complete();
  }

  getAuthParams(): Observable<number> {
    this.loadSpinner = true;
    return this.authDataService.init().pipe(
      takeUntil(this.onDestroy),
      tap((value) => {
        this.auth.coordinate = value;
        const coordsString = value.toString();
        this.coords.row = coordsString[0];
        this.coords.col = coordsString[1];
        this.loadSpinner = false;
      }));
  }

  isPinCorrect() {
    this.authDataService.validate(this.auth).pipe(
      tap((response) => { this.onSuccess(response) }),
      catchError((error) => {
        if (error.status === 400) {
          this.openSnackBar(error.error, 'close');
          return this.getAuthParams()
        } else {
          throw error
        }
      }),
      takeUntil(this.onDestroy),
    ).subscribe();
  }

  onSuccess(token: string): void {
    this.dialogRef.close(token);
  }

  onCancel(): void {
    this.dialogRef.close(null);
  }

  onSubmit() {
    if (this.pin.valid) {
      this.isPinCorrect();
    }
  }

  private openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action);
  }
}
