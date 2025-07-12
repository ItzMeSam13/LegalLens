'use client';

import React, { useState, useRef } from 'react';
import { Upload, FileText, CheckCircle, Copy, Download, AlertCircle, Eye, Scale } from 'lucide-react';

const LegalLens = () => {
  const [currentSection, setCurrentSection] = useState('hero');
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [summary, setSummary] = useState(null);
  const [language, setLanguage] = useState('hindi');
  const [showToast, setShowToast] = useState(false);
  const fileInputRef = useRef(null);

  const acceptedTypes = ['.pdf', '.jpg', '.jpeg', '.png', '.txt'];

  const handleFileUpload = (file) => {
    if (!file) return;
    
    const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
    if (!acceptedTypes.includes(fileExtension)) {
      alert('कृपया केवल PDF, JPG, PNG, या TXT फाइल अपलोड करें');
      return;
    }

    setUploadedFile(file);
    setCurrentSection('upload');
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    handleFileUpload(file);
  };

  const simulateProcessing = async () => {
    if (!uploadedFile) return;
    setIsProcessing(true);
    setCurrentSection('processing');
    
    const formData = new FormData();
    formData.append('file', uploadedFile);
    
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';
      const response = await fetch(`${baseUrl}/file/upload`, {
        method: 'POST',
        headers: {
          // Don't set Content-Type for FormData, let browser set it
        },
        body: formData,
        mode: 'cors', // Enable CORS
        credentials: 'omit', // Don't send cookies
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setSummary(data.summary);
      setIsProcessing(false);
      setCurrentSection('results');
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Failed to upload and summarize the file. Please try again.");
      setIsProcessing(false);
      setCurrentSection('upload');
    }
  };

  const copyToClipboard = () => {
    if (!summary) return;
    
    navigator.clipboard.writeText(summary);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const scrollToSection = (section) => {
    setCurrentSection(section);
    document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50">
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center gap-2 animate-pulse">
          <CheckCircle size={20} />
          <span>सारांश कॉपी हो गया!</span>
        </div>
      )}

      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full blur opacity-30 animate-pulse"></div>
              <div className="relative bg-white p-6 rounded-full shadow-xl">
                <Scale className="w-16 h-16 text-indigo-600" />
              </div>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
            LegalLens
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-4 font-medium">
            Understand any legal document easily.
          </p>
          
          <p className="text-lg text-gray-500 mb-12 max-w-2xl mx-auto leading-relaxed">
            Upload any legal document like agreements, contracts, or scanned files and get an AI-generated summary translated to Hindi.
          </p>
          
          <button
            onClick={() => scrollToSection('upload')}
            className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 text-lg"
          >
            Upload Document
          </button>
          
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="bg-white/70 backdrop-blur-sm p-6 rounded-xl shadow-lg">
              <FileText className="w-8 h-8 text-indigo-600 mb-3 mx-auto" />
              <h3 className="font-semibold text-gray-900 mb-2">Multiple Formats</h3>
              <p className="text-sm text-gray-600">PDF, Images, Text files</p>
            </div>
            <div className="bg-white/70 backdrop-blur-sm p-6 rounded-xl shadow-lg">
              <Eye className="w-8 h-8 text-indigo-600 mb-3 mx-auto" />
              <h3 className="font-semibold text-gray-900 mb-2">AI Analysis</h3>
              <p className="text-sm text-gray-600">Smart document understanding</p>
            </div>
            <div className="bg-white/70 backdrop-blur-sm p-6 rounded-xl shadow-lg">
              <span className="text-2xl mb-3 block">हिं</span>
              <h3 className="font-semibold text-gray-900 mb-2">Hindi Translation</h3>
              <p className="text-sm text-gray-600">Clear, accessible language</p>
            </div>
          </div>
        </div>
      </section>

      {/* Upload Section */}
      <section id="upload" className="min-h-screen flex items-center justify-center px-4 py-20">
        <div className="max-w-2xl mx-auto w-full">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Upload Your Document</h2>
            <p className="text-gray-600">Drag and drop or browse to upload your legal document</p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              className="border-2 border-dashed border-indigo-300 rounded-xl p-12 text-center hover:border-indigo-400 transition-colors cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="w-16 h-16 text-indigo-400 mx-auto mb-4" />
              <p className="text-lg font-medium text-gray-700 mb-2">
                Drag & Drop or Click to Browse
              </p>
              <p className="text-sm text-gray-500 mb-4">
                Supported formats: PDF, JPG, PNG, TXT
              </p>
              <p className="text-xs text-gray-400">
                Maximum file size: 10MB
              </p>
            </div>
            
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.jpg,.jpeg,.png,.txt"
              onChange={(e) => handleFileUpload(e.target.files[0])}
              className="hidden"
            />
            
            {uploadedFile && (
              <div className="mt-6 p-4 bg-indigo-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-indigo-600" />
                  <span className="font-medium text-gray-900">{uploadedFile.name}</span>
                  <span className="text-sm text-gray-500">
                    ({(uploadedFile.size / 1024 / 1024).toFixed(2)} MB)
                  </span>
                </div>
              </div>
            )}
            
            <div className="mt-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <label className="text-sm font-medium text-gray-700">Summary Language:</label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="hindi">हिंदी (Hindi)</option>
                  <option value="english">English</option>
                </select>
              </div>
              
              <button
                onClick={simulateProcessing}
                disabled={!uploadedFile || isProcessing}
                className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 disabled:from-gray-300 disabled:to-gray-400 text-white font-semibold px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 disabled:transform-none"
              >
                {isProcessing ? 'Processing...' : 'Summarize & Translate'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Processing Section */}
      {isProcessing && (
        <section id="processing" className="min-h-screen flex items-center justify-center px-4">
          <div className="text-center">
            <div className="relative mb-8">
              <div className="w-24 h-24 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <FileText className="w-8 h-8 text-indigo-600" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Analyzing your document with LegalLens AI...
            </h2>
            <p className="text-gray-600">
              This may take a few moments. Please wait while we process your document.
            </p>
            <div className="mt-8 w-64 bg-gray-200 rounded-full h-2 mx-auto">
              <div className="bg-gradient-to-r from-indigo-600 to-blue-600 h-2 rounded-full animate-pulse" style={{width: '75%'}}></div>
            </div>
          </div>
        </section>
      )}

      {/* Results Section */}
      {summary && (
        <section id="results" className="min-h-screen flex items-center justify-center px-4 py-20">
          <div className="max-w-4xl mx-auto w-full">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Document Summary</h2>
              <p className="text-gray-600">AI-generated summary</p>
            </div>
            
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-full flex items-center justify-center">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Document Analysis</h3>
              </div>
              
              <div className="bg-gray-50 rounded-xl p-6 mb-6">
                <div className="prose max-w-none">
                  <pre className="whitespace-pre-wrap text-gray-800 text-base leading-relaxed font-sans">
                    {summary}
                  </pre>
                </div>
              </div>
              
              <div className="flex gap-4 justify-center">
                <button
                  onClick={copyToClipboard}
                  className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                >
                  <Copy size={20} />
                  Copy Summary
                </button>
                
                <button 
                  onClick={() => {
                    setUploadedFile(null);
                    setSummary(null);
                    setCurrentSection('upload');
                  }}
                  className="flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white font-semibold px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                >
                  <Upload size={20} />
                  Upload Another
                </button>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default LegalLens;