export interface Limit {
   limitPeriod: string;
   limitType: string;
   limitValue: number;
   limitValueType: string;
   status: string;
   created: string;
 }

 export interface ExtendedLimit extends Limit {
   id: string;
   formattedLimitValue: string;
 }