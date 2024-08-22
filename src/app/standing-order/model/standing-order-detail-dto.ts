export interface StandingOrderDetailDto {
  standingOrderId: number;
  amount: number;
  name?: string;
  accountNumber?: string;
  variableSymbol?: string,
  specificSymbol?: string,
  constantSymbol?: string,
  note?: string,
  intervalId: number | null;
  intervalSpecification: number;
  validFrom: string;
}
