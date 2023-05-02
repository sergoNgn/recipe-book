import { Validations, Validator } from "../types";
import { useEffect, useState } from "react";

export const useValidation = (value: string, validations: Validator[]) => {
  const [empty, setEmpty] = useState({
    isError: true,
    text: "",
  });
  const [maxLength, setMaxLength] = useState({
    isError: false,
    text: "",
  });

  useEffect(() => {
    validations.forEach((v) => {
      switch (v.validation) {
        case Validations.isEmpty:
          value.length
            ? setEmpty({ isError: false, text: "" })
            : setEmpty({ isError: true, text: v.errorText });
          break;
        case Validations.maxLength:
          value.length > v.value
            ? setMaxLength({
                isError: true,
                text: v.errorText,
              })
            : setMaxLength({ isError: false, text: "" });
          break;
      }
    });
  }, [value]);

  return {
    isError: empty.isError || maxLength.isError,
    errorText: maxLength.text || empty.text,
  };
};
