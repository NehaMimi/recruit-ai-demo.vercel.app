'use client';

import React, { useState } from 'react';
import {
  Upload,
  FileText,
  Users,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  XCircle,
  Mail,
  Calendar,
} from 'lucide-react';

export default function RecruitAI() {
import React, { useState } from 'react';
import { Upload, FileText, Users, TrendingUp, CheckCircle, AlertCircle, XCircle, Mail, Calendar } from 'lucide-react';

export default function RecruitAI() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [uploadedJD, setUploadedJD] = useState(null);
  const [uploadedResumes, setUploadedResumes] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingProgress, setProcessingProgress] = useState(0);
  const [candidates, setCandidates] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');

  // Simulated candidate data (will come from AI backend)
  const mockCandidates = [
    {
      id: 1,
      name: 'Rahul Verma',
      email: 'rahul.verma@email.com',
      phone: '+91-98765-43210',
      score: 92,
      experience: '5 years',
      education: 'IIT Delhi',
      location: 'Bangalore',
      currentRole: 'Senior Developer @ Zomato',
      skills: ['React', 'Node.js', 'Redux', 'MongoDB'],
      strengths: 'React expertise, team lead experience, startup background',
      gaps: 'Limited TypeScript (mentioned in JD)',
      recommendation: 'STRONG MATCH - Schedule Interview',
      status: 'recommended'
    },
    {
      id: 2,
      name: 'Priya Singh',
      email: 'priya.singh@email.com',
      phone: '+91-98765-43211',
      score: 78,
      experience: '3 years',
      education: 'NIT Trichy',
      location: 'Remote',
      currentRole: 'Full Stack Developer @ Paytm',
      skills: ['Python', 'Django', 'React', 'PostgreSQL'],
      strengths: 'Full-stack skills, startup experience, quick learner',
      gaps: '2 years in React (JD asks for 3+)',
      recommendation: 'MAYBE - Review work samples',
      status: 'maybe'
    },
    {
      id: 3,
      name: 'Amit Kumar',
      email: 'amit.k@email.com',
      phone: '+91-98765-43212',
      score: 45,
      experience: '1 year',
      education: 'Tier-3 College',
      location: 'Jaipur',
      currentRole: 'Junior Developer @ Local Startup',
      skills: ['HTML', 'CSS', 'JavaScript'],
      strengths: 'Eager to learn, good communication',
      gaps: 'Limited JavaScript, no React experience',
      recommendation: 'REJECT - Not enough experience',
      status: 'rejected'
    }
  ];

  const handleJDUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedJD(file);
    }
  };

  const handleResumeUpload = (e) => {
    const files = Array.from(e.target.files);
    setUploadedResumes(files);
  };

  const startAnalysis = () => {
    if (!uploadedJD || uploadedResumes.length === 0) {
      alert('Please upload both Job Description and Resumes');
      return;
    }

    setIsProcessing(true);
    setProcessingProgress(0);
    setActiveTab('processing');

    // Simulate processing
    const interval = setInterval(() => {
      setProcessingProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsProcessing(false);
          setCandidates(mockCandidates);
          setActiveTab('results');
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'recommended': return 'border-green-500 bg-green-50';
      case 'maybe': return 'border-amber-500 bg-amber-50';
      case 'rejected': return 'border-red-500 bg-red-50';
      default: return 'border-gray-300';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'recommended': return <CheckCircle className="text-green-600" />;
      case 'maybe': return <AlertCircle className="text-amber-600" />;
      case 'rejected': return <XCircle className="text-red-600" />;
      default: return null;
    }
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-amber-600';
    return 'text-red-600';
  };

  const filteredCandidates = filterStatus === 'all' 
    ? candidates 
    : candidates.filter(c => c.status === filterStatus);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Users className="text-indigo-600 h-8 w-8" />
            <h1 className="text-2xl font-bold text-gray-900">Recruit-AI</h1>
          </div>
          <div className="flex items-center space-x-4">
            <button className="text-gray-600 hover:text-gray-900">Help</button>
            <div className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium">
              Sarah
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Dashboard View */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, Sarah!</h2>
              <p className="text-gray-600">Let AI help you find the best candidates faster</p>
            </div>

            {/* Upload Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">New Screening</h3>
              
              <div className="space-y-4">
                {/* JD Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    📄 Upload Job Description
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-indigo-500 transition-colors">
                    <input
                      type="file"
                      accept=".pdf,.txt,.doc,.docx"
                      onChange={handleJDUpload}
                      className="hidden"
                      id="jd-upload"
                    />
                    <label htmlFor="jd-upload" className="cursor-pointer">
                      <FileText className="mx-auto h-12 w-12 text-gray-400 mb-2" />
                      <p className="text-sm text-gray-600">
                        {uploadedJD ? `✅ ${uploadedJD.name}` : 'Click to upload or drag PDF/Text'}
                      </p>
                    </label>
                  </div>
                </div>

                {/* Resume Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    📁 Upload Resumes (Bulk)
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-indigo-500 transition-colors">
                    <input
                      type="file"
                      accept=".pdf"
                      multiple
                      onChange={handleResumeUpload}
                      className="hidden"
                      id="resume-upload"
                    />
                    <label htmlFor="resume-upload" className="cursor-pointer">
                      <Upload className="mx-auto h-12 w-12 text-gray-400 mb-2" />
                      <p className="text-sm text-gray-600">
                        {uploadedResumes.length > 0 
                          ? `✅ ${uploadedResumes.length} resumes selected` 
                          : 'Drag multiple PDFs here or click to browse'}
                      </p>
                    </label>
                  </div>
                </div>

                {/* Start Button */}
                <button
                  onClick={startAnalysis}
                  disabled={!uploadedJD || uploadedResumes.length === 0}
                  className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
                >
                  <TrendingUp className="h-5 w-5" />
                  <span>Start Analysis</span>
                </button>
              </div>
            </div>

            {/* Recent Screenings */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Recent Screenings</h3>
              <div className="space-y-3">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow cursor-pointer">
                  <h4 className="font-semibold text-gray-900">Frontend Developer</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    47 candidates analyzed • 8 recommended • 12 maybe
                  </p>
                  <p className="text-xs text-gray-500 mt-2">Nov 28, 2025</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Processing View */}
        {activeTab === 'processing' && (
          <div className="max-w-2xl mx-auto text-center py-16">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12">
              <div className="animate-pulse mb-6">
                <Users className="h-16 w-16 text-indigo-600 mx-auto" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                🤖 AI Agent is Analyzing Candidates
              </h2>
              
              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
                <div 
                  className="bg-indigo-600 h-4 rounded-full transition-all duration-300"
                  style={{ width: `${processingProgress}%` }}
                ></div>
              </div>
              
              <p className="text-gray-600 mb-2">
                {uploadedResumes.length > 0 && 
                  `${Math.floor((processingProgress / 100) * uploadedResumes.length)}/${uploadedResumes.length} resumes processed`
                }
              </p>
              
              <div className="text-left bg-gray-50 rounded-lg p-4 mt-6 space-y-2">
                <p className="text-sm text-gray-700">✅ Extracted text from PDFs</p>
                <p className="text-sm text-gray-700">✅ Compared to Job Description</p>
                <p className="text-sm text-gray-700">
                  {processingProgress < 100 ? '⏳ Generating scores and recommendations...' : '✅ Analysis complete!'}
                </p>
              </div>
              
              <p className="text-sm text-gray-500 mt-4">
                Estimated time: {Math.ceil((100 - processingProgress) / 10)} seconds remaining
              </p>
            </div>
          </div>
        )}

        {/* Results View */}
        {activeTab === 'results' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">
                Frontend Developer Screening
              </h2>
              <button 
                onClick={() => {
                  setActiveTab('dashboard');
                  setCandidates([]);
                  setUploadedJD(null);
                  setUploadedResumes([]);
                }}
                className="text-indigo-600 hover:text-indigo-800"
              >
                ← Back to Dashboard
              </button>
            </div>

            {/* Filters */}
            <div className="flex space-x-2">
              <button
                onClick={() => setFilterStatus('all')}
                className={`px-4 py-2 rounded-lg font-medium ${filterStatus === 'all' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700 border border-gray-300'}`}
              >
                All: {candidates.length}
              </button>
              <button
                onClick={() => setFilterStatus('recommended')}
                className={`px-4 py-2 rounded-lg font-medium ${filterStatus === 'recommended' ? 'bg-green-600 text-white' : 'bg-white text-gray-700 border border-gray-300'}`}
              >
                Recommended: {candidates.filter(c => c.status === 'recommended').length}
              </button>
              <button
                onClick={() => setFilterStatus('maybe')}
                className={`px-4 py-2 rounded-lg font-medium ${filterStatus === 'maybe' ? 'bg-amber-600 text-white' : 'bg-white text-gray-700 border border-gray-300'}`}
              >
                Maybe: {candidates.filter(c => c.status === 'maybe').length}
              </button>
              <button
                onClick={() => setFilterStatus('rejected')}
                className={`px-4 py-2 rounded-lg font-medium ${filterStatus === 'rejected' ? 'bg-red-600 text-white' : 'bg-white text-gray-700 border border-gray-300'}`}
              >
                Rejected: {candidates.filter(c => c.status === 'rejected').length}
              </button>
            </div>

            {/* Candidate Cards */}
            <div className="space-y-4">
              {filteredCandidates.map((candidate) => (
                <div
                  key={candidate.id}
                  className={`bg-white rounded-lg border-l-4 ${getStatusColor(candidate.status)} p-6 shadow-sm hover:shadow-md transition-shadow`}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center space-x-3">
                      {getStatusIcon(candidate.status)}
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">{candidate.name}</h3>
                        <p className="text-sm text-gray-600">
                          {candidate.experience} • {candidate.education} • {candidate.location}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-3xl font-bold ${getScoreColor(candidate.score)}`}>
                        {candidate.score}
                        <span className="text-lg text-gray-400">/100</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <p className="text-sm">
                      <span className="font-medium text-gray-700">📊 Strengths:</span>{' '}
                      <span className="text-gray-600">{candidate.strengths}</span>
                    </p>
                    {candidate.gaps && (
                      <p className="text-sm">
                        <span className="font-medium text-gray-700">⚠️ Gaps:</span>{' '}
                        <span className="text-gray-600">{candidate.gaps}</span>
                      </p>
                    )}
                  </div>

                  <div className="bg-gray-50 rounded-lg p-3 mb-4">
                    <p className="text-sm font-medium text-gray-700">
                      AI Recommendation: <span className="text-gray-900">{candidate.recommendation}</span>
                    </p>
                  </div>

                  <div className="flex space-x-3">
                    <button
                      onClick={() => setSelectedCandidate(candidate)}
                      className="flex-1 bg-indigo-600 text-white py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
                    >
                      📄 View Details
                    </button>
                    {candidate.status === 'recommended' && (
                      <button className="flex-1 bg-green-600 text-white py-2 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center justify-center space-x-1">
                        <Mail className="h-4 w-4" />
                        <span>Schedule Interview</span>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>

      {/* Candidate Detail Modal */}
      {selectedCandidate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">
                {selectedCandidate.name} - Detailed Analysis
              </h2>
              <button
                onClick={() => setSelectedCandidate(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Contact Info */}
              <div className="flex items-start space-x-4">
                <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center">
                  <Users className="h-10 w-10 text-indigo-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{selectedCandidate.name}</h3>
                  <p className="text-sm text-gray-600">{selectedCandidate.email}</p>
                  <p className="text-sm text-gray-600">{selectedCandidate.phone}</p>
                  <p className="text-sm text-gray-700 mt-1">{selectedCandidate.currentRole}</p>
                </div>
              </div>

              {/* Overall Score */}
              <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-gray-900">Overall Score:</span>
                  <span className={`text-3xl font-bold ${getScoreColor(selectedCandidate.score)}`}>
                    {selectedCandidate.score}/100
                  </span>
                </div>
                <p className="text-sm text-gray-700 mt-2">{selectedCandidate.recommendation}</p>
              </div>

              {/* Score Breakdown */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Scoring Breakdown:</h4>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-700">✅ Technical Skills</span>
                      <span className="font-medium">95/100</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{width: '95%'}}></div>
                    </div>
                    <p className="text-xs text-gray-600 mt-1">{selectedCandidate.skills.join(', ')}</p>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-700">✅ Experience Match</span>
                      <span className="font-medium">90/100</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{width: '90%'}}></div>
                    </div>
                    <p className="text-xs text-gray-600 mt-1">{selectedCandidate.experience}</p>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-700">⚠️ Education</span>
                      <span className="font-medium">85/100</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-amber-500 h-2 rounded-full" style={{width: '85%'}}></div>
                    </div>
                    <p className="text-xs text-gray-600 mt-1">{selectedCandidate.education}</p>
                  </div>
                </div>
              </div>

              {/* Key Highlights */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Key Highlights:</h4>
                <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                  <li>Strong technical background in required stack</li>
                  <li>Proven team leadership experience</li>
                  <li>Current role at well-known company</li>
                </ul>
              </div>

              {/* Actions */}
              <div className="flex space-x-3 pt-4 border-t border-gray-200">
                <button className="flex-1 bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors">
                  📄 Download Resume
                </button>
                <button className="flex-1 bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center justify-center space-x-2">
                  <Mail className="h-5 w-5" />
                  <span>Schedule Interview</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
}


