import React, { FC, useState } from "react";
import ReactMarkdown from "react-markdown";
import { TextInputControl } from "./forms/TextInput";

interface Props {
  control: TextInputControl;
}

export const MarkdownUpload: FC<Props> = ({ control }) => {
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
