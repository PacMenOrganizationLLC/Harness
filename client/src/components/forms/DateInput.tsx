import React, { FC, useState } from "react";

export interface DateInputControl {
  value: Date;
  setValue: (date: Date) => void;
}

export const useDateInput = (
  initialValue: Date,
): DateInputControl => {
  const [value, setValue] = useState<Date>(initialValue);
  return { value, setValue };
};

interface Props {
  label?: string;
  control: DateInputControl;
  labelClassName?: string;
  inputClassName?: string;
  placeholder?: string;
}

export const DateInput: FC<Props> = ({
  label,
  control,
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
          type="date"
          name={computedLabel}
          id={computedLabel}
          value={control.value.toISOString().split('T')[0]}
          className="form-control"
          onChange={(e) => control.setValue(new Date(e.target.value))}
          placeholder={placeholder}
        />
      </div>
    </div>
  );
};
