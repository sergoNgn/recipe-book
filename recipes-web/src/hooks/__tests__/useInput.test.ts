import { act, renderHook } from "@testing-library/react";
import { useInput } from "../useInput";
import { Validations } from "../../types";

describe("useInput hook", () => {
  it("change state to a valid value", async () => {
    const { result } = renderHook(() =>
      useInput("", [
        { validation: Validations.isEmpty, errorText: "can't be empty" },
      ])
    );

    expect(result.current.value).toBe("");
    expect(result.current.errorText).toBeFalsy();

    act(() => {
      result.current.onChange({ target: { value: "new value" } });
    });

    expect(result.current.value).toBe("new value");
    expect(result.current.errorText).toBeFalsy();
  });

  it("change state to empty value", async () => {
    const { result } = renderHook(() =>
      useInput("", [
        { validation: Validations.isEmpty, errorText: "can't be empty" },
      ])
    );

    expect(result.current.value).toBe("");
    expect(result.current.errorText).toBeFalsy();

    act(() => {
      result.current.onBlur();
    });

    expect(result.current.value).toBe("");
    expect(result.current.isDirty).toBeTruthy();
    expect(result.current.errorText).toBe("can't be empty");
  });

  it("change state to an invalid value", async () => {
    const { result } = renderHook(() =>
      useInput("", [
        {
          validation: Validations.maxLength,
          value: 5,
          errorText: "value is too long, should be less than 5",
        },
      ])
    );

    expect(result.current.value).toBe("");
    expect(result.current.errorText).toBeFalsy();

    act(() => {
      result.current.onChange({ target: { value: "123456" } });
      result.current.onBlur();
    });

    expect(result.current.value).toBe("123456");
    expect(result.current.isDirty).toBeTruthy();
    expect(result.current.isError).toBeTruthy();
    expect(result.current.errorText).toBe(
      "value is too long, should be less than 5"
    );
  });

  it("resets value", async () => {
    const { result } = renderHook(() =>
      useInput("", [
        { validation: Validations.isEmpty, errorText: "can't be empty" },
      ])
    );

    expect(result.current.value).toBe("");
    expect(result.current.errorText).toBeFalsy();

    act(() => {
      result.current.onChange({ target: { value: "123" } });
      result.current.onBlur();
    });

    expect(result.current.value).toBe("123");
    expect(result.current.isDirty).toBeTruthy();

    act(() => {
      result.current.reset();
    });

    expect(result.current.value).toBe("");
    expect(result.current.isDirty).toBeFalsy();
    expect(result.current.errorText).toBeFalsy();
  });
});
