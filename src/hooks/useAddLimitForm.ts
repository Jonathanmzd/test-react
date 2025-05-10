import { useState } from 'react';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../app/store';
import { usersApi } from '../features/users/usersApi';
import { formatCurrency } from '../utils/formatCurrency';
import { formatDate } from '../utils/formatDate';
import type { ExtendedLimit } from '../types/limit';
import { generateUniqueId } from '../utils/generateUniqueId';
import { validateFields } from '../utils/validateFields';

type UseAddLimitForm = {
  limitPeriod: string;
  setLimitPeriod: React.Dispatch<React.SetStateAction<string>>;
  limitType: string;
  setLimitType: React.Dispatch<React.SetStateAction<string>>;
  limitValue: number | '';
  setLimitValue: React.Dispatch<React.SetStateAction<number | ''>>;
  limitValueType: string;
  setLimitValueType: React.Dispatch<React.SetStateAction<string>>;
  status: boolean;
  setStatus: React.Dispatch<React.SetStateAction<boolean>>;
  errors: { [key: string]: string };
  handleSubmit: (e: React.FormEvent) => void;
};

// Custom hook to manage the Add Limit form
export const useAddLimitForm = (): UseAddLimitForm => {
  const dispatch = useDispatch<AppDispatch>();

  // State variables for form fields
  const [limitPeriod, setLimitPeriod] = useState('');
  const [limitType, setLimitType] = useState('');
  const [limitValue, setLimitValue] = useState<number | ''>('');
  const [limitValueType, setLimitValueType] = useState('');
  const [status, setStatus] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Function to handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form fields
    const newErrors = validateFields(limitPeriod, limitType, limitValue, limitValueType);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors); // Set validation errors
      return;
    }

    // Create a new limit object
    const newLimit: ExtendedLimit = {
      id: generateUniqueId(), // Generate a unique ID for the limit
      limitPeriod,
      limitType,
      limitValue: typeof limitValue === 'number' ? limitValue : 0, // Default value to 0 if invalid
      limitValueType,
      status: status ? 'true' : 'false', // Convert boolean status to string
      created: formatDate(new Date()), // Format the current date
      formattedLimitValue: formatCurrency(
        typeof limitValue === 'number' ? limitValue : 0,
        'en-US'
      ), // Format the limit value as currency
    };

    // Update the limits data in the Redux store
    dispatch(
      usersApi.util.updateQueryData('getLimits', undefined, (draft) => {
        draft.limits.push(newLimit); // Add the new limit to the existing list
      })
    );

    // Reset form fields after submission
    setLimitPeriod('');
    setLimitType('');
    setLimitValue('');
    setLimitValueType('');
    setStatus(false);
    setErrors({});
  };

  return {
    limitPeriod,
    setLimitPeriod,
    limitType,
    setLimitType,
    limitValue,
    setLimitValue,
    limitValueType,
    setLimitValueType,
    status,
    setStatus,
    errors,
    handleSubmit,
  };
};