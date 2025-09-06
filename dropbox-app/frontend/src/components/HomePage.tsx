import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllFiles, downloadFile, FileInfo } from '../services/fileService';
import FileUpload from './FileUpload';
import './HomePage.css';

function HomePage() {
  const [files, setFiles] = useState<FileInfo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFiles();
  }, []);

  const loadFiles = async () => {
    try {
      const data = await getAllFiles();
      setFiles(data);
    } catch (error) {
      console.error('Failed to load files', error);
    }
    setLoading(false);
  };

  const handleDownload = async (fileId: number, filename: string) => {
    try {
      await downloadFile(fileId, filename);
    } catch (error) {
      console.error('Download failed', error);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i)) + ' ' + sizes[i];
  };

  const getFileIcon = (fileType: string) => {
    if (fileType.startsWith('image/')) return '🖼️';
    if (fileType === 'text/plain') return '📄';
    if (fileType === 'application/json') return '📋';
    return '📁';
  };

  const canView = (fileType: string) => {
    return ['text/plain', 'application/json', 'image/jpeg', 'image/png', 'image/jpg'].includes(fileType);
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="homepage">
      <div className="container">
        <h2>My Files</h2>
        <FileUpload onUpload={loadFiles} />
        
        <div className="files-grid">
          {files.map((file) => (
            <div key={file.id} className="file-card">
              <div className="file-icon">{getFileIcon(file.fileType)}</div>
              <div className="file-info">
                <h4>{file.originalFilename}</h4>
                <p>{formatFileSize(file.fileSize)}</p>
                <p>{new Date(file.uploadTime).toLocaleDateString()}</p>
              </div>
              <div className="file-actions">
                {canView(file.fileType) && (
                  <Link to={`/file/${file.id}`} className="btn view-btn">View</Link>
                )}
                <button onClick={() => handleDownload(file.id, file.originalFilename)} className="btn download-btn">
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {files.length === 0 && (
          <div className="no-files">
            <p>No files uploaded yet. Upload your first file above!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default HomePage;
