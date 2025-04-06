// --- components/CloudinaryUpload.jsx ---
import React, { useState } from 'react';

const CloudinaryUpload = ({ onUpload }) => {
  const [loading, setLoading] = useState(false);

  const handleUpload = () => {
    setLoading(true);
    const cloudName = 'your_cloud_name'; // Replace with your Cloudinary cloud name
    const uploadPreset = 'your_upload_preset'; // Replace with your upload preset

    const myWidget = window.cloudinary.createUploadWidget(
      {
        cloudName,
        uploadPreset,
        sources: ['local', 'url', 'camera'], // Allow local files, URLs, and camera uploads
      },
      (error, result) => {
        if (!error && result && result.event === 'success') {
          setLoading(false);
          onUpload(result.info.secure_url); // Pass the uploaded file URL to the parent component
        }
      }
    );

    myWidget.open();
  };

  return (
    <button
      onClick={handleUpload}
      disabled={loading}
      className="bg-green-600 text-white py-2 px-4 rounded"
    >
      {loading ? 'Uploading...' : 'Upload Image/Video'}
    </button>
  );
};

export default CloudinaryUpload;