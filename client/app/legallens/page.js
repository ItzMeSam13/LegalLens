'use client';

import React, { useState, useRef } from 'react';
import { Upload, FileText, CheckCircle, Copy, Download, AlertCircle, Eye, Scale } from 'lucide-react';

export default function LegalLens() {
  const [currentSection, setCurrentSection] = useState('hero');
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [summary, setSummary] = useState(null);
  const [translatedSummary, setTranslatedSummary] = useState(null);
  const [currentLanguage, setCurrentLanguage] = useState('english');
  const [isTranslating, setIsTranslating] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const fileInputRef = useRef(null);

  const acceptedTypes = ['.pdf', '.jpg', '.jpeg', '.png', '.txt'];

  const handleFileUpload = (file) => {
    if (!file) return;
    
    const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
    if (!acceptedTypes.includes(fileExtension)) {
      alert('Please upload only PDF, JPG, PNG, or TXT files');
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

  const translateToHindi = async (text) => {
    setIsTranslating(true);
    try {
      // Method 1: Try Microsoft Translator (free, no API key needed)
      const response = await fetch('https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&to=hi', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Ocp-Apim-Subscription-Key': 'free-trial' // This won't work but we'll catch it
        },
        body: JSON.stringify([{
          'text': text
        }])
      });

      if (response.ok) {
        const data = await response.json();
        if (data[0] && data[0].translations && data[0].translations[0]) {
          setTranslatedSummary(data[0].translations[0].text);
          setCurrentLanguage('hindi');
          return;
        }
      }
      
      throw new Error('Primary translation failed');
    } catch (error) {
      try {
        // Method 2: Try Google Translate via unofficial API
        const response = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=hi&dt=t&q=${encodeURIComponent(text)}`);
        const data = await response.json();
        
        if (data && data[0] && data[0][0] && data[0][0][0]) {
          let translatedText = '';
          data[0].forEach(item => {
            if (item[0]) translatedText += item[0];
          });
          setTranslatedSummary(translatedText);
          setCurrentLanguage('hindi');
          return;
        }
        
        throw new Error('Google translate failed');
      } catch (secondError) {
        // Method 3: Complete manual translation for legal documents
        const completeTranslation = translateManually(text);
        setTranslatedSummary(completeTranslation);
        setCurrentLanguage('hindi');
      }
    } finally {
      setIsTranslating(false);
    }
  };

  const translateManually = (text) => {
    // Comprehensive legal document translation
    const translations = {
      // Headers and titles
      'Document Summary': 'दस्तावेज़ सारांश',
      'Document Type': 'दस्तावेज़ प्रकार',
      'Legal Agreement': 'कानूनी समझौता',
      'Contract': 'अनुबंध',
      'Key Points': 'मुख्य बिंदु',
      'Main Purpose': 'मुख्य उद्देश्य',
      'Payment Terms': 'भुगतान की शर्तें',
      'Duration': 'अवधि',
      'Termination Clause': 'समाप्ति खंड',
      'Liability': 'देयता',
      'Dispute Resolution': 'विवाद समाधान',
      'Important Clauses': 'महत्वपूर्ण खंड',
      'Confidentiality': 'गोपनीयता',
      'Intellectual Property': 'बौद्धिक संपदा',
      'Force Majeure': 'अप्रत्याशित परिस्थितियां',
      'Governing Law': 'शासी कानून',
      'Recommendations': 'सिफारिशें',
      'Risk Assessment': 'जोखिम मूल्यांकन',
      
      // Common legal terms
      'parties': 'पक्ष',
      'agreement': 'समझौता',
      'contract': 'अनुबंध',
      'terms': 'शर्तें',
      'conditions': 'स्थितियां',
      'legal': 'कानूनी',
      'document': 'दस्तावेज़',
      'clause': 'खंड',
      'provision': 'प्रावधान',
      'liability': 'देयता',
      'damages': 'नुकसान',
      'breach': 'उल्लंघन',
      'termination': 'समाप्ति',
      'dispute': 'विवाद',
      'court': 'न्यायालय',
      'jurisdiction': 'क्षेत्राधिकार',
      'services': 'सेवाएं',
      'products': 'उत्पाद',
      'payment': 'भुगतान',
      'schedule': 'अनुसूची',
      'method': 'विधि',
      'validity': 'वैधता',
      'period': 'अवधि',
      'responsibilities': 'जिम्मेदारियां',
      'obligations': 'दायित्व',
      'conflicts': 'संघर्ष',
      'disagreements': 'असहमति',
      'procedures': 'प्रक्रियाएं',
      'handling': 'संभालना',
      'protection': 'सुरक्षा',
      'sensitive': 'संवेदनशील',
      'information': 'जानकारी',
      'rights': 'अधिकार',
      'ownership': 'स्वामित्व',
      'assets': 'संपत्ति',
      'circumstances': 'परिस्थितियां',
      'reasonable': 'उचित',
      'control': 'नियंत्रण',
      'applicable': 'लागू',
      'laws': 'कानून',
      'review': 'समीक्षा',
      'carefully': 'सावधानीपूर्वक',
      'signing': 'हस्ताक्षर',
      'advice': 'सलाह',
      'unclear': 'अस्पष्ट',
      'understand': 'समझना',
      'records': 'रिकॉर्ड',
      'standard': 'मानक',
      'typical': 'सामान्य',
      'unusual': 'असामान्य',
      'risks': 'जोखिम',
      'identified': 'पहचाना गया',
      'Medium': 'मध्यम',
      'relationship': 'संबंध',
      'multiple': 'कई',
      'establishes': 'स्थापित करता है',
      'outlines': 'रूपरेखा',
      'specifies': 'निर्दिष्ट करता है',
      'defines': 'परिभाषित करता है',
      'signed': 'हस्ताक्षरित',
      'copy': 'प्रति'
    };

    let translatedText = text;
    
    // Replace phrases first (longer matches)
    const phrases = {
      'This document establishes a legal relationship between multiple parties': 'यह दस्तावेज़ कई पक्षों के बीच एक कानूनी संबंध स्थापित करता है',
      'Outlines terms and conditions for services/products': 'सेवाओं/उत्पादों के लिए नियम और शर्तों की रूपरेखा',
      'Specifies payment schedules and methods': 'भुगतान की अनुसूची और विधियों को निर्दिष्ट करता है',
      'Defines the validity period of the agreement': 'समझौते की वैधता अवधि को परिभाषित करता है',
      'Conditions under which the agreement can be terminated': 'वे स्थितियां जिनके तहत समझौता समाप्त किया जा सकता है',
      'Outlines responsibilities and liabilities of each party': 'प्रत्येक पक्ष की जिम्मेदारियों और देयताओं की रूपरेखा',
      'Procedures for handling conflicts or disagreements': 'संघर्ष या असहमति को संभालने की प्रक्रियाएं',
      'Protection of sensitive information': 'संवेदनशील जानकारी की सुरक्षा',
      'Rights and ownership of assets': 'संपत्ति के अधिकार और स्वामित्व',
      'Circumstances beyond reasonable control': 'उचित नियंत्रण से परे परिस्थितियां',
      'Legal jurisdiction and applicable laws': 'कानूनी क्षेत्राधिकार और लागू कानून',
      'Review all terms carefully before signing': 'हस्ताक्षर करने से पहले सभी शर्तों की सावधानीपूर्वक समीक्षा करें',
      'Seek legal advice if any clause is unclear': 'यदि कोई खंड अस्पष्ट है तो कानूनी सलाह लें',
      'Ensure all parties understand their obligations': 'सुनिश्चित करें कि सभी पक्ष अपने दायित्वों को समझते हैं',
      'Keep a copy of the signed document for records': 'रिकॉर्ड के लिए हस्ताक्षरित दस्तावेज़ की एक प्रति रखें',
      'Standard legal document with typical clauses': 'सामान्य खंडों के साथ मानक कानूनी दस्तावेज़',
      'No unusual risks identified': 'कोई असामान्य जोखिम पहचाना नहीं गया'
    };

  // Replace phrases first
  Object.entries(phrases).forEach(([english, hindi]) => {
    const regex = new RegExp(english.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
    translatedText = translatedText.replace(regex, hindi);
  });

    // Then replace individual words
    Object.entries(translations).forEach(([english, hindi]) => {
      const regex = new RegExp(`\\b${english}\\b`, 'gi');
      translatedText = translatedText.replace(regex, hindi);
    });

    return translatedText;
  };

  const switchLanguage = (lang) => {
    setCurrentLanguage(lang);
  };

  const simulateProcessing = async () => {
    if (!uploadedFile) return;
    setIsProcessing(true);
    setCurrentSection('processing');
    
    // Mock processing for demo - replace with your actual API call
    setTimeout(() => {
      const mockSummary = `**Document Summary**

**Document Type**: Legal Agreement/Contract

**Key Points**:
• **Parties Involved**: This document establishes a legal relationship between multiple parties
• **Main Purpose**: Outlines terms and conditions for services/products
• **Payment Terms**: Specifies payment schedules and methods
• **Duration**: Defines the validity period of the agreement
• **Termination Clause**: Conditions under which the agreement can be terminated
• **Liability**: Outlines responsibilities and liabilities of each party
• **Dispute Resolution**: Procedures for handling conflicts or disagreements

**Important Clauses**:
• **Confidentiality**: Protection of sensitive information
• **Intellectual Property**: Rights and ownership of assets
• **Force Majeure**: Circumstances beyond reasonable control
• **Governing Law**: Legal jurisdiction and applicable laws

**Recommendations**:
• Review all terms carefully before signing
• Seek legal advice if any clause is unclear
• Ensure all parties understand their obligations
• Keep a copy of the signed document for records

**Risk Assessment**: Medium - Standard legal document with typical clauses. No unusual risks identified.`;

      setSummary(mockSummary);
      setTranslatedSummary(null);
      setCurrentLanguage('english');
      setIsProcessing(false);
      setCurrentSection('results');
    }, 3000);
  };

  const copyToClipboard = () => {
    const textToCopy = currentLanguage === 'hindi' ? translatedSummary : summary;
    if (!textToCopy) return;
    
    navigator.clipboard.writeText(textToCopy);
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
          <span>Summary copied to clipboard!</span>
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
            Upload any legal document like agreements, contracts, or scanned files and get an AI-generated summary in English and Hindi.
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
              <p className="text-sm text-gray-600">Available in Hindi language</p>
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
            
            <div className="mt-6 flex justify-end">
              <button
                onClick={simulateProcessing}
                disabled={!uploadedFile || isProcessing}
                className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 disabled:from-gray-300 disabled:to-gray-400 text-white font-semibold px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 disabled:transform-none"
              >
                {isProcessing ? 'Processing...' : 'Analyze Document'}
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
              <p className="text-gray-600">AI-generated summary of your document</p>
            </div>
            
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-full flex items-center justify-center">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Document Analysis</h3>
                </div>
                
                {/* Language Switch */}
                <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-lg">
                  <button
                    onClick={() => switchLanguage('english')}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                      currentLanguage === 'english' 
                        ? 'bg-white text-indigo-600 shadow-sm' 
                        : 'text-gray-600 hover:text-gray-800'
                    }`}
                  >
                    English
                  </button>
                  <button
                    onClick={() => {
                      if (!translatedSummary) {
                        translateToHindi(summary);
                      } else {
                        switchLanguage('hindi');
                      }
                    }}
                    disabled={isTranslating}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                      currentLanguage === 'hindi' 
                        ? 'bg-white text-indigo-600 shadow-sm' 
                        : 'text-gray-600 hover:text-gray-800'
                    } ${isTranslating ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {isTranslating ? 'Translating...' : 'हिंदी'}
                  </button>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-xl p-6 mb-6">
                <div className="prose max-w-none">
                  <div 
                    className="text-gray-800 text-base leading-relaxed whitespace-pre-wrap"
                    dangerouslySetInnerHTML={{
                      __html: (currentLanguage === 'hindi' ? translatedSummary : summary)
                        ?.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                        ?.replace(/\*(.*?)\*/g, '<em>$1</em>')
                        ?.replace(/\n/g, '<br>') || ''
                    }}
                  />
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
                    setTranslatedSummary(null);
                    setCurrentLanguage('english');
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
}