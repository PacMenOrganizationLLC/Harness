import React, { FC, useState } from "react";
import ReactMarkdown from "react-markdown";
import { TextInputControl } from "./forms/TextInput";

interface Props {
  control: TextInputControl;
  label: string;
}

export const MarkdownUpload: FC<Props> = ({ control, label }) => {
  const computedLabel = label?.toLowerCase().replace(" ", "");
  const [markdownContent, setMarkdownContent] = useState<string | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result;
        if (typeof content === "string") {
          setMarkdownContent(content);
          control.setValue(content);
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div>
      <label htmlFor={computedLabel} className="col-form-label">
        {label}:
      </label>
      <input
        type="file"
        accept=".md,.txt"
        onChange={handleFileUpload}
        className="form-control"
      />
      {markdownContent && <ReactMarkdown>{markdownContent}</ReactMarkdown>}
    </div>
  );
};
