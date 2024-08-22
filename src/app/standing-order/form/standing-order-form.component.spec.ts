import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StandingOrderFormComponent } from './standing-order-form.component';

describe('StandingOrderCreateComponent', () => {
  let component: StandingOrderFormComponent;
  let fixture: ComponentFixture<StandingOrderFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StandingOrderFormComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(StandingOrderFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
