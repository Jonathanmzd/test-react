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

export const useAddLimitForm = (): UseAddLimitForm => {
  const dispatch = useDispatch<AppDispatch>();
  const [limitPeriod, setLimitPeriod] = useState('');
  const [limitType, setLimitType] = useState('');
  const [limitValue, setLimitValue] = useState<number | ''>('');
  const [limitValueType, setLimitValueType] = useState('');
  const [status, setStatus] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validateFields(limitPeriod, limitType, limitValue, limitValueType);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const newLimit: ExtendedLimit = {
      id: generateUniqueId(),
      limitPeriod,
      limitType,
      limitValue: typeof limitValue === 'number' ? limitValue : 0,
      limitValueType,
      status: status ? 'true' : 'false',
      created: formatDate(new Date()),
      formattedLimitValue: formatCurrency(
        typeof limitValue === 'number' ? limitValue : 0,
        'en-US'
      ),
    };

    dispatch(
      usersApi.util.updateQueryData('getLimits', undefined, (draft) => {
        draft.limits.push(newLimit);
      })
    );

    // Reset form fields
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