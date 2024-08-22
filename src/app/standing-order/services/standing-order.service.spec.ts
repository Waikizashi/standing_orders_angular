import { TestBed } from '@angular/core/testing';
import { StandingOrderService } from './standing-order.service';

describe('StandingOrderService', () => {
  let service: StandingOrderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StandingOrderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
