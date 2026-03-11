import { useState } from "react";
import axios from "axios";

export default function UploadSection({ 
  onUploadSuccess, 
  onReset 
}) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) return alert("Please select a file");

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      await axios.post("http://localhost:8000/upload-pdf", formData);

      onUploadSuccess(file.name);   // 🔥 notify parent
    } catch (error) {
      console.error(error);
      alert("Upload failed ❌");
    } finally {
      setLoading(false);
    }
  };


return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        gap: "12px"
      }}
    >
      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
        style={{
          padding: "10px",
          borderRadius: "8px",
          border: "1px solid #d1d5db",
          color:"white"
        }}
      />
  
      <button
        onClick={handleUpload}
        disabled={loading}
        style={{
          backgroundColor: "#4f46e5",
          color: "black",
          border: "none",
          padding: "10px 20px",
          borderRadius: "8px",
          cursor: "pointer",
          fontWeight: 500
        }}
      >
        {loading ? "Uploading..." : "Upload PDF"}
      </button>
    </div>
  );
}