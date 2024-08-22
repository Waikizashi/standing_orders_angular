import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StandingOrdersListComponent } from './standing-orders-list.component';

describe('StandingOrdersListComponent', () => {
  let component: StandingOrdersListComponent;
  let fixture: ComponentFixture<StandingOrdersListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StandingOrdersListComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(StandingOrdersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
