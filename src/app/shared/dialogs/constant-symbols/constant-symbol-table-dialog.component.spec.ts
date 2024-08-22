import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConstantSymbolTableDialogComponent } from './constant-symbol-table-dialog.component';

describe('StringCodeTableDialogComponent', () => {
  let component: ConstantSymbolTableDialogComponent;
  let fixture: ComponentFixture<ConstantSymbolTableDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConstantSymbolTableDialogComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ConstantSymbolTableDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
