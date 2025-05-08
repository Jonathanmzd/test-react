export const validateFields = (
   limitPeriod: string,
   limitType: string,
   limitValue: number | '',
   limitValueType: string
 ): { [key: string]: string } => {
   const errors: { [key: string]: string } = {};
   if (!limitPeriod) errors.limitPeriod = 'Required';
   if (!limitType) errors.limitType = 'Required';
   if (limitValue === '' || limitValue <= 0)
     errors.limitValue = 'Must be a positive number';
   if (!limitValueType) errors.limitValueType = 'Required';
   return errors;
 };