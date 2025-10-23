'use client';

import { useEffect, useState, useRef } from 'react';
import { UploadedFile } from '@/types/blog';

export default function AdminMediaPage() {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    try {
      const res = await fetch('/api/admin/media');
      if (res.ok) {
        const data = await res.json();
        setFiles(data);
      }
    } catch (error) {
      console.error('Failed to fetch files:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (file: File) => {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        await fetchFiles();
      } else {
        const data = await res.json();
        alert(data.error || 'Failed to upload file');
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Failed to upload file');
    } finally {
      setUploading(false);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileUpload(e.target.files[0]);
    }
  };

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url);
    alert('URL copied to clipboard!');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#E2F3F2]">
        <div className="max-w-[1400px] mx-auto p-4">
          <div className="bg-white rounded-[32px] shadow-xl border border-gray-100 overflow-hidden">
            <div className="flex items-center justify-center h-64">
              <div className="text-[#153230]/60">Loading media...</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#E2F3F2]">
      <div className="max-w-[1400px] mx-auto p-4">
        <div className="bg-white rounded-[32px] shadow-xl border border-gray-100 overflow-hidden">
          <div className="px-8 md:px-16 py-8 border-b border-gray-100">
            <h1 className="text-4xl font-bold text-[#153230]">Media Library</h1>
            <p className="text-[#153230]/60 mt-2">Upload and manage your blog images</p>
          </div>

          <div className="px-8 md:px-16 py-12">
            <div
              className={`bg-[#153230] border-2 border-dashed rounded-2xl p-12 text-center transition-colors ${
                dragActive ? 'border-[#4D7DA3] bg-[#153230]/90' : 'border-[#4D7DA3]/30'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />
              
              {uploading ? (
                <div className="text-white/80">Uploading...</div>
              ) : (
                <>
                  <div className="text-white/70 mb-4">
                    <svg
                      className="w-16 h-16 mx-auto mb-4 text-[#4D7DA3]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                    Drag and drop an image here, or
                  </div>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="px-8 py-3 bg-[#4D7DA3] hover:bg-[#4D7DA3]/90 text-white font-semibold rounded-lg transition-colors"
                  >
                    Choose File
                  </button>
                  <p className="text-sm text-white/50 mt-4">
                    PNG, JPG, WEBP, or GIF (max 5MB)
                  </p>
                </>
              )}
            </div>

            {files.length === 0 ? (
              <div className="bg-white border border-gray-200 rounded-2xl p-12 text-center mt-8">
                <p className="text-[#153230]/60">No files uploaded yet</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
                {files.map((file) => (
                  <div
                    key={file.id}
                    className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all hover:scale-[1.02]"
                  >
                    <div className="aspect-video relative bg-gray-100">
                      <img
                        src={file.blob_url}
                        alt={file.file_name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <p className="text-sm text-[#153230] font-semibold truncate mb-2">
                        {file.file_name}
                      </p>
                      <p className="text-xs text-[#153230]/50 mb-3">
                        {file.file_size ? `${(file.file_size / 1024).toFixed(1)} KB` : 'Unknown size'} • {new Date(file.uploaded_at).toLocaleDateString()}
                      </p>
                      <button
                        onClick={() => copyToClipboard(file.blob_url)}
                        className="w-full px-4 py-2 text-sm font-semibold text-[#4D7DA3] hover:text-white bg-[#4D7DA3]/10 hover:bg-[#4D7DA3] rounded-lg transition-colors"
                      >
                        Copy URL
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}