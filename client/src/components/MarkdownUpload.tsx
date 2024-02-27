import React, { FC } from "react";
import { TextInput, TextInputControl } from "./forms/TextInput";

interface Props {
  control: TextInputControl;
  label: string;
}

export const MarkdownUpload: FC<Props> = ({ control, label }) => {

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result;
        if (typeof content === "string") {
          control.setValue(content);
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div>
      <TextInput
        control={control}
        label={label}
        labelClassName="col-12"
        isTextArea={true}
        rows={12}
      />
      <input
        type="file"
        accept=".md,.txt"
        onChange={handleFileUpload}
        className="form-control"
      />
    </div>
  );
};
