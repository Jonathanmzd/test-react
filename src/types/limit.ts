export type LimitPeriod = 'daily' | 'weekly' | 'monthly';
export type LimitType = 'bet' | 'deposit';
export type LimitValueType = 'percent' | 'amount';

export interface Limit {
  id: string;
  limitPeriod: LimitPeriod;
  limitType: LimitType;
  limitValue: number;
  limitValueType: LimitValueType;
  status: boolean;
  created: string;
}

export interface ExtendedLimit extends Limit {
  formattedLimitValue: string;
}

// Interfaz para las props de UserLimitsPage
export interface UserLimitsPageProps {
  currency: string;
}