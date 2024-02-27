import { useState } from 'react';

export interface NumericInputControl {
  value: number;
  setValue: (i: number) => void;
}

export const useNumericInput = (
  initialValue: number,
  min?: number,
  max?: number,
): NumericInputControl => {
  const [value, setValue] = useState(initialValue);

  const setBoundedValue = (newValue: number) => {
    const boundedValue = typeof max === 'number' ? Math.min(newValue, max) : newValue;
    const finalValue = typeof min === 'number' ? Math.max(boundedValue, min) : boundedValue;
    setValue(finalValue);
  };

  return { value, setValue: setBoundedValue };
};

interface NumericProps {
  label?: string;
  control: NumericInputControl;
  min?: number;
  max?: number;
  labelClassName?: string;
  inputClassName?: string;
  placeholder?: string;
}

export const NumericInput: React.FC<NumericProps> = ({
  label,
  control,
  min,
  max,
  labelClassName = "col-2",
  inputClassName = "col-md",
  placeholder = "",
}) => {
  const computedLabel = label?.toLowerCase().replace(" ", "");
  const labelClasses = `${labelClassName} my-auto`;
  const inputClasses = `${inputClassName} my-auto`;

  return (
    <div className="form-group row">
      {label && (
        <div className={labelClasses}>
          <label htmlFor={computedLabel} className="col-form-label">
            {label}:
          </label>
        </div>
      )}
      <div className={inputClasses}>
        <input
          type="number"
          name={computedLabel}
          id={computedLabel}
          value={control.value}
          className="form-control"
          onChange={(e) => control.setValue(parseFloat(e.target.value))}
          placeholder={placeholder}
          min={min}
          max={max}
        />
      </div>
    </div>
  );
};

