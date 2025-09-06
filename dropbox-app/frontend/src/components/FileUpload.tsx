import React, { useState } from 'react';
import { uploadFile } from '../services/fileService';
import './FileUpload.css';

interface Props {
  onUpload: () => void;
}

function FileUpload({ onUpload }: Props) {
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');

  const allowedTypes = ['text/plain', 'image/jpeg', 'image/png', 'image/jpg', 'application/json'];

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!allowedTypes.includes(file.type)) {
      setMessage('File type not supported');
      return;
    }

    if (file.size > 50 * 1024 * 1024) {
      setMessage('File too large (max 50MB)');
      return;
    }

    try {
      setUploading(true);
      setMessage('');
      await uploadFile(file);
      setMessage('File uploaded successfully!');
      onUpload();
      e.target.value = '';
    } catch (error) {
      setMessage('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="file-upload">
      <div className="upload-area">
        <input
          type="file"
          accept=".txt,.jpg,.jpeg,.png,.json"
          onChange={handleFileChange}
          disabled={uploading}
        />
        <p>Choose a file to upload</p>
        <small>Supported: TXT, JPG, PNG, JSON (max 50MB)</small>
      </div>
      
      {uploading && <p>Uploading...</p>}
      {message && <p className={message.includes('success') ? 'success' : 'error'}>{message}</p>}
    </div>
  );
}

export default FileUpload;
