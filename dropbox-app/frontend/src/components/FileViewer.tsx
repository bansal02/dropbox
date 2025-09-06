import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getFileInfo, getFileContent, getFileBlob, downloadFile, FileInfo } from '../services/fileService';
import './FileViewer.css';

function FileViewer() {
  const { fileId } = useParams<{ fileId: string }>();
  const [file, setFile] = useState<FileInfo | null>(null);
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (fileId) {
      loadFile(parseInt(fileId));
    }
  }, [fileId]);

  const loadFile = async (id: number) => {
    try {
      const fileInfo = await getFileInfo(id);
      setFile(fileInfo);

      if (fileInfo.fileType.startsWith('image/')) {
        const url = await getFileBlob(id);
        setImageUrl(url);
      } else if (fileInfo.fileType === 'text/plain' || fileInfo.fileType === 'application/json') {
        const text = await getFileContent(id);
        setContent(text);
      }
    } catch (error) {
      console.error('Failed to load file', error);
    }
    setLoading(false);
  };

  const handleDownload = async () => {
    if (file) {
      await downloadFile(file.id, file.originalFilename);
    }
  };

  const formatJson = (text: string) => {
    try {
      return JSON.stringify(JSON.parse(text), null, 2);
    } catch {
      return text;
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (!file) return <div>File not found</div>;

  return (
    <div className="file-viewer">
      <div className="container">
        <div className="file-header">
          <h2>{file.originalFilename}</h2>
          <div className="actions">
            <button onClick={handleDownload} className="btn">Download</button>
            <Link to="/" className="btn">Back</Link>
          </div>
        </div>

        <div className="file-content">
          {file.fileType.startsWith('image/') && (
            <img src={imageUrl} alt={file.originalFilename} className="file-image" />
          )}

          {file.fileType === 'text/plain' && (
            <pre className="text-content">{content}</pre>
          )}

          {file.fileType === 'application/json' && (
            <pre className="json-content">{formatJson(content)}</pre>
          )}
        </div>
      </div>
    </div>
  );
}

export default FileViewer;
