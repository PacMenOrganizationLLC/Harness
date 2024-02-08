import React, { FC, useState } from "react";

const ImageUploader: FC<{
  setConvertedSrc: (i?: FormData) => void;
}> = ({ setConvertedSrc }) => {
  const [imageSrc, setImageSrc] = useState<string>("");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("image", file);
    setConvertedSrc(formData);
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result;
      if (typeof result === "string") {
        setImageSrc(result);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div>
      Image:
      <input className="form-control mt-2" type="file" accept="image/*" onChange={handleImageChange} />
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
