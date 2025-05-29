import { z } from 'zod';

// Define validation schema using Zod
const limitSchema = z.object({
  limitPeriod: z.string().min(1, 'Limit period is required'),
  limitType: z.string().min(1, 'Limit type is required'),
  limitValue: z.number().positive('Limit value must be a positive number'),
  limitValueType: z.string().min(1, 'Limit value type is required'),
});

type ValidationErrors = { [key: string]: string };

/**
 * Validates form fields for adding a new limit
 * @param limitPeriod - The period for the limit (daily, weekly, monthly)
 * @param limitType - The type of limit (bet, deposit)
 * @param limitValue - The numeric value of the limit
 * @param limitValueType - The type of value (percent, amount)
 * @returns Object containing validation errors, if any
 */
export const validateFields = (
  limitPeriod: string,
  limitType: string,
  limitValue: number | '',
  limitValueType: string
): ValidationErrors => {
  const errors: ValidationErrors = {};

  try {
    limitSchema.parse({
      limitPeriod,
      limitType,
      limitValue: typeof limitValue === 'number' ? limitValue : 0,
      limitValueType,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      error.errors.forEach((err) => {
        if (err.path[0]) {
          errors[err.path[0] as string] = err.message;
        }
      });
    }
  }

  return errors;
};