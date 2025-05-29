/**
 * Options for date formatting
 */
interface DateFormatOptions {
  locale?: string;
  format?: Intl.DateTimeFormatOptions;
}

/**
 * Default date format options
 */
const DEFAULT_FORMAT: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
};

/**
 * Formats a date string or Date object into a localized string
 * @param date - Date string or Date object to format
 * @param options - Formatting options including locale and format specifications
 * @returns Formatted date string
 */
export const formatDate = (
  date: string | Date,
  options: DateFormatOptions = {}
): string => {
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    
    if (isNaN(dateObj.getTime())) {
      throw new Error('Invalid date');
    }

    const {
      locale = 'en-US',
      format = DEFAULT_FORMAT,
    } = options;

    return new Intl.DateTimeFormat(locale, format).format(dateObj);
  } catch (error) {
    console.error(`Error formatting date: ${error}`);
    return typeof date === 'string' ? date : date.toString();
  }
};

/**
 * Checks if a date string is valid
 * @param dateString - The date string to validate
 * @returns boolean indicating if the date is valid
 */
export const isValidDate = (dateString: string): boolean => {
  const date = new Date(dateString);
  return !isNaN(date.getTime());
};

/**
 * Gets the relative time string (e.g., "2 hours ago", "in 3 days")
 * @param date - Date to compare
 * @param baseDate - Date to compare against (defaults to now)
 * @param locale - Locale for formatting
 * @returns Relative time string
 */
export const getRelativeTimeString = (
  date: string | Date,
  baseDate: Date = new Date(),
  locale: string = 'en-US'
): string => {
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    
    if (isNaN(dateObj.getTime())) {
      throw new Error('Invalid date');
    }

    const formatter = new Intl.RelativeTimeFormat(locale, {
      numeric: 'auto',
    });

    const diffInMilliseconds = dateObj.getTime() - baseDate.getTime();
    const diffInSeconds = Math.round(diffInMilliseconds / 1000);
    const diffInMinutes = Math.round(diffInSeconds / 60);
    const diffInHours = Math.round(diffInMinutes / 60);
    const diffInDays = Math.round(diffInHours / 24);

    if (Math.abs(diffInDays) >= 1) {
      return formatter.format(diffInDays, 'day');
    }
    if (Math.abs(diffInHours) >= 1) {
      return formatter.format(diffInHours, 'hour');
    }
    if (Math.abs(diffInMinutes) >= 1) {
      return formatter.format(diffInMinutes, 'minute');
    }
    return formatter.format(diffInSeconds, 'second');
  } catch (error) {
    console.error(`Error getting relative time: ${error}`);
    return typeof date === 'string' ? date : date.toString();
  }
};