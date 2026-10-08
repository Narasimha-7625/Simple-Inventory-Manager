import React, { useState } from 'react';
import JSZip from 'jszip';
import { PROJECT_FILES, ProjectFile } from '../data/projectFiles';
import { Download, FileCode, Check, Copy, Folder, FolderOpen, FileText } from 'lucide-react';

export const CodeExplorer: React.FC = () => {
  const [selectedPath, setSelectedPath] = useState<string>('src/main/java/com/inventory/controller/ProductController.java');
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const selectedFile = PROJECT_FILES.find((f) => f.path === selectedPath) || PROJECT_FILES[0];

  const handleCopy = () => {
    navigator.clipboard.writeText(selectedFile.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadZip = async () => {
    try {
      setDownloading(true);
      const zip = new JSZip();
      const rootFolder = zip.folder('simple-inventory-manager');

      PROJECT_FILES.forEach((file) => {
        rootFolder?.file(file.path, file.content);
      });

      const content = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(content);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'simple-inventory-manager-unit4.zip';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Failed to generate ZIP:', err);
    } finally {
      setDownloading(false);
    }
  };

  const categories = [
    { id: 'all', label: 'All Files' },
    { id: 'java', label: 'Java Sources' },
    { id: 'frontend', label: 'Presentation (HTML/CSS/JS)' },
    { id: 'test', label: 'JUnit Tests' },
    { id: 'config', label: 'Maven & Config' }
  ];

  const [activeFilter, setActiveFilter] = useState('all');

  const filteredFiles = PROJECT_FILES.filter((file) => {
    if (activeFilter === 'all') return true;
    return file.category === activeFilter;
  });

  return (
    <div className="space-y-6">
      {/* Action Header */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 text-xs font-semibold bg-blue-100 text-blue-800 rounded">
              Standard Maven Project
            </span>
            <h2 className="text-xl font-bold text-slate-900">Spring Boot Project Source Code</h2>
          </div>
          <p className="text-sm text-slate-600 mt-1">
            Complete Unit-IV skeleton application ready to compile, execute, or inspect.
          </p>
        </div>

        <button
          onClick={handleDownloadZip}
          disabled={downloading}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium text-sm rounded-lg transition-colors shadow-sm"
        >
          <Download className="w-4 h-4" />
          {downloading ? 'Preparing ZIP...' : 'Download Maven Project (.ZIP)'}
        </button>
      </div>

      {/* Main File Explorer Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Sidebar File Tree */}
        <div className="lg:col-span-4 bg-white rounded-xl border border-slate-200 shadow-sm p-4">
          <div className="flex gap-1 overflow-x-auto pb-2 mb-3 border-b border-slate-100 text-xs">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveFilter(cat.id)}
                className={`px-2.5 py-1 rounded-md font-medium whitespace-nowrap transition-colors ${
                  activeFilter === cat.id
                    ? 'bg-slate-900 text-white'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="space-y-1">
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-2 py-1 flex items-center gap-1.5">
              <FolderOpen className="w-3.5 h-3.5 text-amber-500" /> simple-inventory-manager/
            </div>
            {filteredFiles.map((file) => {
              const isSelected = file.path === selectedPath;
              return (
                <button
                  key={file.path}
                  onClick={() => setSelectedPath(file.path)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs font-mono flex items-center justify-between transition-colors ${
                    isSelected
                      ? 'bg-blue-50 text-blue-700 font-semibold border border-blue-200'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span className="truncate flex items-center gap-2">
                    <FileCode className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-blue-600' : 'text-slate-400'}`} />
                    <span className="truncate">{file.name}</span>
                  </span>
                  <span className="text-[10px] text-slate-400 shrink-0 capitalize">{file.language}</span>
                </button>
              );
            })}
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500">
            Click any file to view contents and annotations.
          </div>
        </div>

        {/* Code Content Viewer */}
        <div className="lg:col-span-8 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          {/* Top Info Bar */}
          <div className="bg-slate-800 text-slate-200 px-4 py-3 flex items-center justify-between border-b border-slate-700">
            <div className="min-w-0 pr-2">
              <p className="font-mono text-xs font-semibold text-white truncate">{selectedFile.path}</p>
              <p className="text-[11px] text-slate-400 truncate mt-0.5">{selectedFile.description}</p>
            </div>
            <button
              onClick={handleCopy}
              className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-white rounded text-xs transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" /> Copied
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" /> Copy Code
                </>
              )}
            </button>
          </div>

          {/* Syntax display */}
          <div className="bg-slate-900 p-4 overflow-x-auto max-h-[600px]">
            <pre className="font-mono text-xs text-slate-200 leading-relaxed">
              <code>{selectedFile.content}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
