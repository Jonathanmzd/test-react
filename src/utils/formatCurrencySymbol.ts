import currencyLocales from './currencyLocales.json';

export function formatCurrencySymbol(currency: string): string {
  const locale = currencyLocales[currency as keyof typeof currencyLocales] || 'en-US'; // Default to 'en-US' if currency is not mapped

  try {
    // Use Intl.NumberFormat with the dynamically determined locale
    const parts = new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
    }).formatToParts(0);

    // Find the part with type 'currency' and return its value
    return parts.find((part) => part.type === 'currency')?.value || '';
  } catch (error) {
    console.error(`Invalid currency code or locale: ${currency}`, error);
    return ''; // Return an empty string if the currency code or locale is invalid
  }
}