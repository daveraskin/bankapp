import React from "react";
import CurrencyInput from "react-currency-input-field";

type Value = any;

interface DollarInputProperties {
  setValue: (value: Value) => void;
  currentValue: any;
  placeholder?: string;
  /**
   * If typeof currentValue is object, this prop
   * should be the name of the key whose value
   * will correspond to currentValue
   */
  attributeName?: string;
}

const DollarInput = ({
  setValue,
  currentValue,
  placeholder,
  attributeName,
}: DollarInputProperties) => {
  const onValueChange = (
    value: string | undefined,
    name: string | undefined
  ) => {
    if (typeof currentValue === "string") {
      setValue(value);
    } else if (typeof currentValue === "number") {
      setValue(Number(value));
    } else if (typeof currentValue === "object") {
      setValue({
        ...currentValue,
        [`${attributeName}`]: Number(value),
      });
    }
  };
  return (
    <CurrencyInput
      intlConfig={{ locale: "en-US", currency: "USD" }}
      onValueChange={onValueChange}
      decimalScale={2}
      placeholder={`${placeholder}`}
    />
  );
};

export default DollarInput;
