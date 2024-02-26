import React, { FC, useState } from "react";
import ReactMarkdown from "react-markdown";

const MarkdownUpload: FC = () => {
  const [markdownContent, setMarkdownContent] = useState<string | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result;
        if (typeof content === "string") {
          setMarkdownContent(content);
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
        style={{ marginBottom: "10px" }}
      />
      {markdownContent && <ReactMarkdown>{markdownContent}</ReactMarkdown>}
    </div>
  );
};

export default MarkdownUpload;
