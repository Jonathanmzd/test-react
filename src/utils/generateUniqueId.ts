/**
 * Options for ID generation
 */
interface IdGeneratorOptions {
  prefix?: string;
  length?: number;
  useTimestamp?: boolean;
}

/**
 * Generates a cryptographically secure random string
 * @param length - Length of the random string
 * @returns Random string
 */
const generateRandomString = (length: number): string => {
  const array = new Uint8Array(length);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
};

/**
 * Generates a unique identifier with configurable options
 * @param options - Configuration options for ID generation
 * @returns Unique identifier string
 */
export const generateUniqueId = (options: IdGeneratorOptions = {}): string => {
  const {
    prefix = '',
    length = 16,
    useTimestamp = true,
  } = options;

  try {
    const timestamp = useTimestamp ? Date.now().toString(36) : '';
    const randomPart = generateRandomString(Math.ceil(length / 2));
    const id = `${timestamp}${randomPart}`.slice(0, length);
    
    return prefix ? `${prefix}-${id}` : id;
  } catch (error) {
    console.error(`Error generating unique ID: ${error}`);
    return `${prefix}${Date.now()}-${Math.random().toString(36).slice(2)}`;
  }
};

/**
 * Validates if a string is a valid unique ID
 * @param id - ID string to validate
 * @param expectedPrefix - Optional prefix to validate against
 * @returns boolean indicating if the ID is valid
 */
export const isValidUniqueId = (id: string, expectedPrefix?: string): boolean => {
  if (!id) return false;
  
  if (expectedPrefix) {
    return id.startsWith(`${expectedPrefix}-`);
  }
  
  // Check if the ID matches the expected format (alphanumeric with optional prefix)
  return /^([a-zA-Z0-9]+-)?[a-zA-Z0-9]+$/.test(id);
};