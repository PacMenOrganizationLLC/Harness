import React, { FC, useState } from "react";

export interface TextInputControl {
  value: string;
  setValue: (i: string) => void;
}

export const useTextInput = (
  initialValue: string,
): TextInputControl => {
  const [value, setValue] = useState(initialValue);
  return { value, setValue };
};

interface Props {
  label?: string;
  control: TextInputControl;
  labelClassName?: string;
  inputClassName?: string;
  placeholder?: string;
  isTextArea?: boolean;
  isEditing?: boolean;
  rows?: number;
}

export const TextInput: FC<Props> = ({
  label,
  control,
  labelClassName = "col-2",
  inputClassName = "col-md",
  placeholder = "",
  isTextArea = false,
  isEditing = true,
  rows = 3,
}) => {
  const computedLabel = label?.toLowerCase().replace(" ", "");
  const labelClasses = `${labelClassName} my-auto`;
  const inputClasses = `${inputClassName} my-auto`;

  if (isEditing) return (
    <div className="form-group row">
      {label && (
        <div className={labelClasses}>
          <label htmlFor={computedLabel} className="col-form-label">
            {label}:
          </label>
        </div>
      )}
      <div className={inputClasses}>
        {isTextArea ? (
          <textarea
            name={computedLabel}
            id={computedLabel}
            rows={rows}
            value={control.value}
            className="form-control"
            onChange={(e) => control.setValue(e.target.value)}
            placeholder={placeholder}
          />
        ) : (
          <input
            type="text"
            name={computedLabel}
            id={computedLabel}
            value={control.value}
            className="form-control"
            onChange={(e) => control.setValue(e.target.value)}
            placeholder={placeholder}
          />
        )}
      </div>
    </div>
  );

  return (
    <div>Not editing</div>
  )
};
