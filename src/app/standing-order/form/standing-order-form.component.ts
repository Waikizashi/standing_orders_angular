import { Component } from '@angular/core';
import { ConstantSymbolTableDialogComponent } from 'src/app/shared/dialogs/constant-symbols/constant-symbol-table-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StandingOrderService } from '../services/standing-order.service';
import { StandingOrderDetailDto } from '../model/standing-order-detail-dto';
import { IntervalFormData } from 'src/app/shared/types/interval-form-data';
import { filter, switchMap, tap } from 'rxjs';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';

@Component({
  selector: 'app-standing-order-form',
  templateUrl: './standing-order-form.component.html',
  styleUrls: ['./standing-order-form.component.scss']
})

export class StandingOrderFormComponent {

  protected standingOrderForm;
  protected isNotShowMode: boolean = false;
  protected tomorow: Date = new Date();
  private standingOrderId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private standingOrderService: StandingOrderService,
    private authenticationService: AuthenticationService,
    public dialog: MatDialog) {
    this.standingOrderForm = this.createFormGroup()
    const today = new Date();
    this.tomorow.setDate(today.getDate() + 1)
  }

  ngOnInit(): void {
    this.standingOrderId = Number(this.route.snapshot.paramMap.get('id'));
    const edit: boolean = this.route.snapshot.data['edit'];
    this.isNotShowMode = edit;
    if (this.standingOrderId) {
      this.fillForm(this.standingOrderId);
      this.toggleReadOnly(!edit);
    } else {
      this.toggleReadOnly(false);
    }
  }


  toggleReadOnly(isReadOnly: boolean): void {
    if (isReadOnly) {
      this.standingOrderForm.disable();
    } else {
      this.standingOrderForm.enable();
    }
  }

  openConstantSymbolDialog() {
    const dialogRef = this.dialog.open(ConstantSymbolTableDialogComponent, {
      width: '600px'
    });

    dialogRef.afterClosed().pipe(tap(result => {
      this.standingOrderForm.patchValue({
        constantSymbol: result
      })
    })).subscribe();
  }

  onSubmit() {
    if (this.standingOrderForm.valid) {
      this.authenticationService.getToken().pipe(
        filter(token => !!token),
        switchMap(token => {
          if (this.standingOrderId) {
            return this.standingOrderService.updateStandingOrderById(
              this.toDto(this.standingOrderForm, this.standingOrderId),
              token
            )
          } else {
            return this.standingOrderService.createStandingOrderById(
              this.toDto(this.standingOrderForm, this.standingOrderId),
              token
            )
          }
        })
      ).subscribe();
    } else {
      this.standingOrderForm.markAllAsTouched();
    }
  }

  private fillForm(id: number): void {
    this.standingOrderService.getStandingOrderById(id).pipe(tap((data: StandingOrderDetailDto) => {
      this.standingOrderForm.patchValue({
        name: data.name,
        amount: data.amount,
        accountNumber: data.accountNumber,
        variableSymbol: data.variableSymbol,
        specificSymbol: data.specificSymbol,
        constantSymbol: data.constantSymbol,
        note: data.note,
        interval: { intervalId: data.intervalId, intervalSpecification: data.intervalSpecification },
        validFrom: data.validFrom,
      });
    }
    )).subscribe()
  }
  private toDto(standingOrderForm: FormGroup, standingOrderId?: number | null): StandingOrderDetailDto {
    const { interval, ...restOfFormValues } = standingOrderForm.getRawValue()
    return { standingOrderId, ...interval, ...restOfFormValues };
  }
  private createFormGroup() {
    return this.fb.group({
      name: ['', Validators.required],
      amount: [0, [Validators.required, Validators.min(1)]],
      accountNumber: ['', [Validators.required, Validators.pattern(/^[A-Za-z]{2}[0-9]{22}$/)]],
      variableSymbol: ['', Validators.required],
      specificSymbol: ['', Validators.required],
      constantSymbol: ['', Validators.required],
      note: [''],
      interval: [{ intervalId: null, intervalSpecification: 0 } as IntervalFormData,],
      validFrom: ['', Validators.required]
    })
  }
}
