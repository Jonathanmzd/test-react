import currencyLocales from './currencyLocales.json';

export function formatCurrency(
  value: number, 
  currency: string = 'USD'
): string {
  // Get the locale from the JSON file or default to 'en-US'
  const locale = currencyLocales[currency as keyof typeof currencyLocales] || 'en-US';

  try {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  } catch (error) {
    console.error(`Invalid currency code or locale: ${currency}`, error);
    return ''; // Return an empty string if the currency code or locale is invalid
  }
}