import { FC, useState } from "react";


export interface SelectInputControl<T> {
  value: string | number;
  setValue: (i: string | number) => void;
  options: T[];
  getValueField: (t: T) => string | number;
  getDisplayField: (t: T) => string;
};

export const useSelectInput = (
  initialValue: string | number,
  options: any[],
  getValueField: (t: any) => string | number,
  getDisplayField: (t: any) => string,
): SelectInputControl<any> => {
  const [value, setValue] = useState<string | number>(initialValue);
  const handleChange = (selectedValue: string | number) => {
    setValue(selectedValue);
  };
  return { value, setValue: handleChange, options, getValueField, getDisplayField };
};

interface Props<T> {
  label?: string;
  control: SelectInputControl<T>;
  labelClassName?: string;
  inputClassName?: string;
}

export const SelectInput: FC<Props<any>> = ({
  label,
  control,
  labelClassName = "col-2",
  inputClassName,
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
        <select
          name={computedLabel}
          id={computedLabel}
          value={control.value}
          className="form-select"
          onChange={(e) => control.setValue(e.target.value)}
        >
          <option value="" disabled></option>
          {control.options.map((option, index) => (
            <option key={index} value={control.getValueField(option)}>
              {control.getDisplayField(option)}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};