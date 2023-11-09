import React, { useEffect, useState } from "react";
import { Input } from "reactstrap";

const numOnlyRegex = /^[0-9\b]+$/;

const parseFloat = (float: number) => {
  const floatString = float.toFixed(2).toString();
  if (floatString.indexOf(".") !== -1) {
    return Number(floatString.slice(0, floatString.indexOf(".") + 2 + 1));
  } else {
    const additionalString = ".00";
    return Number(floatString.concat(additionalString));
  }
};

const DollarInput = ({
  setCurrentValue,
  currentValue,
  placeholder,
}: {
  setCurrentValue: (value: number) => void;
  currentValue: number;
  placeholder?: string;
}) => {
  const [value, setValue] = useState("");

  useEffect(() => {
    setValue(
      new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(parseFloat(currentValue))
    );
  }, [currentValue]);

  const onChangeInputValue = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const newChar = event.key;
    const isNewCharNum = numOnlyRegex.test(newChar);
    // Only proceed if newChar is a number or 'Backspace'
    if (isNewCharNum) {
      const newDigit = Number(newChar);
      let newValue;

      if (currentValue === 0) {
        newValue = parseFloat(newDigit / 100);
      } else {
        newValue = parseFloat(currentValue * 10 + parseFloat(newDigit / 100));
      }

      setCurrentValue(parseFloat(newValue));
    } else if (newChar === "Backspace") {
      if (currentValue > 0) {
        const currentValueString = currentValue.toString();
        let valueMinusDigitAndPeriod;
        if (currentValueString.indexOf(".") !== -1) {
          valueMinusDigitAndPeriod = currentValueString
            .split("")
            .slice(0, currentValueString.length - 1)
            .filter((char) => char !== ".");
          valueMinusDigitAndPeriod.splice(-2, 0, ".");
        } else {
          valueMinusDigitAndPeriod = currentValueString
            .split("")
            .slice(0, currentValueString.length - 1);
        }

        const updatedValue = Number(valueMinusDigitAndPeriod.join(""));
        setCurrentValue(updatedValue);
      }
    }
  };
  return (
    <Input
      value={value}
      placeholder={placeholder}
      onKeyDown={onChangeInputValue}
    />
  );
};

export default DollarInput;
