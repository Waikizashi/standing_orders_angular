import { Component } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormBuilder, FormGroupDirective, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator, Validators } from '@angular/forms';
import { CodeTableService } from '../services/code-table.service';
import { Int32CodeTable } from '../models/int32-code-table';
import { IntervalFormData } from '../types/interval-form-data';
import { Subject, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'app-periodicity',
  templateUrl: './periodicity.component.html',
  styleUrls: ['./periodicity.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: PeriodicityComponent,
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: PeriodicityComponent
    }
  ]
})
export class PeriodicityComponent implements ControlValueAccessor, Validator {

  private destroy = new Subject<void>();

  protected intervalForm;
  protected intervals: Int32CodeTable[] = [];
  protected readonly dayNumbers = Array.from({ length: 31 }, (_, i) => (i + 1).toString());
  protected readonly dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  protected days: string[] = [];


  public onChange: (value: IntervalFormData) => void = () => { };
  public onTouched: () => void = () => { };

  constructor(private codeTableService: CodeTableService,
    private fb: FormBuilder,
    private formGroupDirective: FormGroupDirective) {
    this.intervalForm = this.createFormGroup();
  }
  validate(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    const { intervalId, intervalSpecification } = value;
    if (!intervalId) {
      return { invalid: true };
    }
    if (
      (intervalId === 1 && intervalSpecification === 0) ||
      ((intervalId === 2 || intervalId === 3) &&
        (intervalSpecification))) {
      return null;
    }
    return { invalid: true };
  }

  writeValue(value: IntervalFormData): void {
    this.setDays();
    this.fillForm(value);

  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.intervalForm.disable();
      return;
    }
    const { intervalId, intervalSpecification } = this.intervalForm.controls;

    intervalId.enable();

    if (!intervalId.value &&
      intervalId.value !== 1) {
      intervalSpecification.enable();
    }
  }

  ngOnInit(): void {
    this.formGroupDirective.ngSubmit.subscribe(() => {
      this.intervalForm.markAllAsTouched();
    });
    this.codeTableService.getIntervals().subscribe((data) => {
      this.intervals.push(...data);
    });

    this.intervalForm.controls.intervalId.valueChanges
      .pipe(
        takeUntil(this.destroy),
        tap((intervalId) => {
          this.intervalSpecificationSetState(intervalId);
          this.setDays();
          this.onChange({
            intervalId,
            intervalSpecification: this.intervalForm.controls.intervalSpecification.value
          });
          this.onTouched();
        }))
      .subscribe();

    this.intervalForm.controls.intervalSpecification.valueChanges
      .pipe(
        takeUntil(this.destroy),
        tap((intervalSpecification) => {
          this.onChange({
            intervalId: this.intervalForm.controls.intervalId.value,
            intervalSpecification
          });
          this.onTouched();
        }))
      .subscribe();

  }

  protected ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  private createFormGroup() {
    return this.fb.group({
      intervalId: this.fb.control<number | null | undefined>(null, { validators: [Validators.required] }),
      intervalSpecification: [{ value: 0, disabled: true }, Validators.required]
    })
  }

  private intervalSpecificationSetState(intervalId: number | null | undefined): void {
    const { intervalSpecification } = this.intervalForm.controls;
    if (this.intervalForm.enabled) {
      if (intervalId === 0 || intervalId === 1 || intervalId === null || intervalId === undefined) {
        intervalSpecification.disable();
        intervalSpecification.setValue(0);
      } else {
        intervalSpecification.enable();
        intervalSpecification.markAsTouched();
        intervalSpecification.setValue(null);
      }
    }
  }

  private setDays(): void {
    if (this.intervalForm.controls.intervalId.value === 1) {
      this.days = [];
    }
    else if (this.intervalForm.controls.intervalId.value === 2) {
      this.days = this.dayNames;
    } else if (this.intervalForm.controls.intervalId.value === 3) {
      this.days = this.dayNumbers;
    }
  }

  private fillForm(value: IntervalFormData): void {
    this.intervalForm.patchValue({
      intervalId: value.intervalId,
      intervalSpecification: value.intervalSpecification
    });
  }

}
