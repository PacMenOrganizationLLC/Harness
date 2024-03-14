import React, { FC, useState } from "react";
import { TextInput, TextInputControl } from "./forms/TextInput";
import ReactMarkdown from "react-markdown";

interface Props {
  control: TextInputControl;
  label: string;
}

export const MarkdownUpload: FC<Props> = ({ control, label }) => {
  const [isPreview, setIsPreview] = useState(false);
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
  const handleCheckboxChange = () => {
    setIsPreview(!isPreview);
  };

  return (
    <div>
      <div className="form-check form-switch">
        <input
          className="form-check-input"
          type="checkbox"
          role="switch"
          id="flexSwitchCheckDefault"
          checked={isPreview}
          onChange={handleCheckboxChange}
        />
        <label className="form-check-label" htmlFor="flexSwitchCheckDefault">
          Text Entry / Markdown Preview
        </label>
      </div>
      {!isPreview ? (
        <>
          <br />
          <TextInput
            control={control}
            label={label}
            labelClassName="col-12"
            isTextArea={true}
            rows={12}
          />
        </>
      ) : (
        <div>
          <br />
          <ReactMarkdown>{control.value}</ReactMarkdown>
        </div>
      )}
      <label htmlFor="fileInput" className="form-label">
        .md/.txt
      </label>
      <input
        type="file"
        accept=".md,.txt"
        id="fileInput"
        onChange={handleFileUpload}
        className="form-control my-2"
        title="Upload a Markdown (.md) or Text (.txt) file"
      />
    </div>
  );
};
