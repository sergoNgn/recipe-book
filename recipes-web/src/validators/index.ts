import { Validations, Validator } from "../types";

export const notEmpty = (): Validator => {
  return { validation: Validations.isEmpty, errorText: "field can't be empty" };
};

export const maxLength = (length: number): Validator => {
  return {
    validation: Validations.maxLength,
    value: length,
    errorText: `The length must be ${length} characters or fewer`,
  };
};
