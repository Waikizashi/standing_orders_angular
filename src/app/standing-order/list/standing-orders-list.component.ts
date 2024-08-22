import { Component, OnInit } from '@angular/core';
import { StandingOrderService } from '../services/standing-order.service';
import { StandingOrderBrowseDto } from '../model/standing-order-browse-dto';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subject, filter, switchMap, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'app-standing-orders-list',
  templateUrl: './standing-orders-list.component.html',
  styleUrls: ['./standing-orders-list.component.scss']
})

export class StandingOrdersListComponent implements OnInit {
  standingOrders: StandingOrderBrowseDto[] = [];
  loadBar: boolean = true;

  private refreshAfterSuccessfulAction$ = new Subject<boolean>();
  private onDestroy = new Subject<void>();

  constructor(
    private standingOrderService: StandingOrderService,
    private authenticationService: AuthenticationService,
    private router: Router,
    public dialog: MatDialog,) { }

  get refresh(): Observable<boolean> {
    return this.refreshAfterSuccessfulAction$.asObservable();
  }

  ngOnInit(): void {
    this.refresh.pipe(
      takeUntil(this.onDestroy),
      switchMap(() => this.loadStandingOrders())
    ).subscribe();
    this.loadStandingOrders().subscribe();
  }

  ngOnDestroy() {
    this.onDestroy.next();
    this.onDestroy.complete();
  }


  loadStandingOrders(): Observable<StandingOrderBrowseDto[]> {
    this.loadBar = true;
    return this.standingOrderService.getStandingOrders().pipe(
      tap((data: StandingOrderBrowseDto[]) => {
        this.standingOrders = data;
        this.loadBar = false;
      })
    )
  }

  getTotalAmount(): number {
    return this.standingOrders.reduce((total, order) => total + order.amount, 0);
  }

  onEdit(id: number): void {
    this.router.navigate(['/standing-order', id, 'edit']);
  }
  onDelete(id: number): void {
    this.authenticationService.getToken().pipe(
      filter(token => !!token),
      switchMap(token =>
        this.standingOrderService.deleteStandingOrderById(id, token as string)
      ),
      tap(() => this.refreshAfterSuccessfulAction$.next(true))
    ).subscribe();

  }

  onView(id: number): void {
    this.router.navigate(['/standing-order', id, 'view']);
  }
}
