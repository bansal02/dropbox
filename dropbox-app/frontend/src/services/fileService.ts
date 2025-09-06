import axios from 'axios';

const API_URL = 'http://localhost:8080/api/files';

export interface FileInfo {
  id: number;
  originalFilename: string;
  fileType: string;
  fileSize: number;
  uploadTime: string;
}

export interface UploadResponse {
  id: number;
  originalFilename: string;
  fileType: string;
  fileSize: number;
  uploadTime: string;
  message: string;
}

export const uploadFile = async (file: File): Promise<UploadResponse> => {
  const formData = new FormData();
  formData.append('file', file);
  const response = await axios.post(`${API_URL}/upload`, formData);
  return response.data;
};

export const getAllFiles = async (): Promise<FileInfo[]> => {
  const response = await axios.get(`${API_URL}/list`);
  return response.data;
};

export const downloadFile = async (fileId: number, filename: string): Promise<void> => {
  const response = await axios.get(`${API_URL}/download/${fileId}`, { responseType: 'blob' });
  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(url);
};

export const getFileContent = async (fileId: number): Promise<string> => {
  const response = await axios.get(`${API_URL}/view/${fileId}`, { responseType: 'text' });
  return response.data;
};

export const getFileBlob = async (fileId: number): Promise<string> => {
  const response = await axios.get(`${API_URL}/view/${fileId}`, { responseType: 'blob' });
  return window.URL.createObjectURL(new Blob([response.data]));
};

export const getFileInfo = async (fileId: number): Promise<FileInfo> => {
  const response = await axios.get(`${API_URL}/metadata/${fileId}`);
  return response.data;
};
