import currencyLocales from './currencyLocales.json';

type CurrencyLocales = {
  [key: string]: string;
};

/**
 * Formats a number as currency with the appropriate locale and symbol
 * @param amount - The amount to format
 * @param currency - The ISO 4217 currency code (e.g., 'USD', 'EUR')
 * @param options - Additional Intl.NumberFormat options
 * @returns Formatted currency string
 */
export const formatCurrency = (
  amount: number,
  currency: string = 'USD',
  options: Intl.NumberFormatOptions = {}
): string => {
  try {
    const locale = (currencyLocales as CurrencyLocales)[currency] || 'en-US';
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
      ...options,
    }).format(amount);
  } catch (error) {
    console.error(`Error formatting currency: ${error}`);
    return `${amount} ${currency}`;
  }
};

/**
 * Gets the currency symbol for a given currency code
 * @param currency - The ISO 4217 currency code
 * @returns The currency symbol
 */
export const getCurrencySymbol = (currency: string = 'USD'): string => {
  try {
    const locale = (currencyLocales as CurrencyLocales)[currency] || 'en-US';
    return (0).toLocaleString(locale, {
      style: 'currency',
      currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).replace(/\d/g, '').trim();
  } catch (error) {
    console.error(`Error getting currency symbol: ${error}`);
    return currency;
  }
};