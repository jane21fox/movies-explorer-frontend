import { useState, useCallback } from 'react';
import validator from 'validator';
import { EMAIL_VALIDATION_ERROR } from '../../utils/constants.js';

export function useFormWithValidation(initialValues, initialErrors) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState(initialErrors);
  const [isValid, setIsValid] = useState(false);
  const [isEqual, setIsEqual] = useState(false);

  const handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    if (name === 'email' && !validator.isEmail(value)) {
      setValues({ ...values, [name]: value });
      setErrors({ ...errors, [name]: EMAIL_VALIDATION_ERROR });
      setIsValid(false);
    }
    else {
      setValues({ ...values, [name]: value });
      setErrors({ ...errors, [name]: target.validationMessage });
      setIsValid(target.closest("form").checkValidity());
    }
    setIsEqual(JSON.stringify({ ...values, [name]: value }) === JSON.stringify(initialValues));
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return { values, handleChange, errors, isValid, isEqual, resetForm };
}