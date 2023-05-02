import { useEffect, useState } from "react";
import { useValidation } from "./useValidation";
import { Validator } from "../types";

export const useInput = (initialValue: string, vlidations: Validator[]) => {
  const [value, setValue] = useState(initialValue);
  const [isDirty, setIsDirty] = useState(false);

  const validation = useValidation(value, vlidations);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const onChange = (event: any) => {
    setValue(event.target.value);
  };

  const onBlur = () => {
    setIsDirty(true);
  };

  const reset = () => {
    setValue("");
    setIsDirty(false);
  };

  return {
    value,
    onChange,
    onBlur,
    isDirty,
    reset,
    isError: validation.isError,
    errorText: isDirty && validation.isError && validation.errorText,
  };
};
