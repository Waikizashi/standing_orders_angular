export interface StandingOrderBrowseDto {
  standingOrderId: number;
  amount: number;
  name?: string;
  accountNumber?: string;
  interval?: string;
  nextRealizationDate: string;
}
