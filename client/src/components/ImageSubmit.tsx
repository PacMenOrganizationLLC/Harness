import React, { FC, useState } from "react";

const ImageUploader: FC<{
  setConvertedSrc: (i?: string) => void;
}> = ({ setConvertedSrc }) => {
  const [imageSrc, setImageSrc] = useState<string>("");
  //   const [convertedSrc, setConvertedSrc] = useState<string>("");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result;
      if (typeof result === "string") {
        setImageSrc(result);
        convertImageToBase64(result);
      }
    };
    reader.readAsDataURL(file);
  };

  const convertImageToBase64 = (imageSrc: string) => {
    // Strip the data URL prefix
    const base64Image = imageSrc.split("base64,")[1];
    setConvertedSrc(base64Image);
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      {imageSrc && (
        <div>
          <img
            src={imageSrc}
            alt="Selected Choice"
            style={{ maxWidth: "100%", maxHeight: "200px" }}
          />
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
