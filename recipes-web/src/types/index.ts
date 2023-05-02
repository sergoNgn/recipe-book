export interface Recipe {
  id?: number;
  name: string;
  shortDescription: string;
  description?: RecipeDescription;
}

export interface RecipeDescription {
  id?: number;
  data: string;
}

export interface Pageable<T> {
  content: T;
  totalElements: number;
  totalPages: number;
}

export enum Validations {
  minLength = "minLength",
  maxLength = "maxLength",
  isEmpty = "isEmpty",
}

export interface Validator {
  validation: Validations;
  errorText: string;
  value?: any;
}

export interface UseInputProps {
  value: string;
  onChange: (event: any) => any;
  onBlur: () => any;
  isDirty: boolean;
  reset: () => any;
  isError: boolean;
  errorText: string;
}

export enum Order {
  ASC = "ASC",
  DESC = "DESC",
}
