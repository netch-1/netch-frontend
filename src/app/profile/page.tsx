'use client';

import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/dashboard-layout';
import ProtectedRoute from '@/auth/components/ProtectedRoute';
import { Upload, User, Building, GraduationCap, Mail, FileText, Briefcase } from 'lucide-react';

// Typing animation component (copied from other pages)
function TypingAnimation({ text, speed = 100 }: { text: string; speed?: number }) {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayText(text.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, speed);

      return () => clearTimeout(timer);
    } else {
      setIsTypingComplete(true);
    }
  }, [currentIndex, text, speed]);

  return (
    <span className={`text-purple-400 transition-opacity duration-1000 ${isTypingComplete ? 'opacity-100' : 'opacity-70'}`}>
      {displayText}
    </span>
  );
}

export default function ProfilePage() {
  const [activeSection, setActiveSection] = useState(0);
  const [formData, setFormData] = useState({
    // Basic Info
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    location: '',
    
    // College & Organizations
    college: '',
    graduationYear: '',
    organizations: '',
    
    // Email Signature
    emailSignature: '',
    
    // Companies Interested In
    companiesInterested: '',
    
    // Roles Interested In
    rolesInterested: '',
    
    // Resume
    resume: null as File | null,
  });

  const sections = [
    {
      title: 'Basic Information',
      icon: User,
      description: 'Tell us about yourself'
    },
    {
      title: 'Education & Organizations',
      icon: GraduationCap,
      description: 'Your academic background'
    },
    {
      title: 'Email Signature',
      icon: Mail,
      description: 'Your professional signature'
    },
    {
      title: 'Career Interests',
      icon: Building,
      description: 'Companies and roles you\'re interested in'
    },
    {
      title: 'Resume',
      icon: FileText,
      description: 'Upload your resume'
    }
  ];

  const handleInputChange = (field: string, value: string | File) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleInputChange('resume', file);
    }
  };

  const nextSection = () => {
    if (activeSection < sections.length - 1) {
      setActiveSection(activeSection + 1);
    }
  };

  const prevSection = () => {
    if (activeSection > 0) {
      setActiveSection(activeSection - 1);
    }
  };

  const renderSection = () => {
    switch (activeSection) {
      case 0:
        return (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter your first name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Last Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter your last name"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Enter your email"
              />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter your phone number"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Location <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="City, State"
                />
              </div>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                College/University <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.college}
                onChange={(e) => handleInputChange('college', e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Enter your college or university"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Graduation Year <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                value={formData.graduationYear}
                onChange={(e) => handleInputChange('graduationYear', e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="2024"
                min="1900"
                max="2030"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Organizations & Activities <span className="text-red-500">*</span>
              </label>
              <textarea
                value={formData.organizations}
                onChange={(e) => handleInputChange('organizations', e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="List any clubs, organizations, or activities you're involved in..."
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Email Signature <span className="text-red-500">*</span>
              </label>
              <textarea
                value={formData.emailSignature}
                onChange={(e) => handleInputChange('emailSignature', e.target.value)}
                rows={6}
                className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Enter your professional email signature..."
              />
              <p className="text-xs text-muted-foreground mt-2">
                This will be used when sending emails through our platform
              </p>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Companies You're Interested In <span className="text-red-500">*</span>
              </label>
              <textarea
                value={formData.companiesInterested}
                onChange={(e) => handleInputChange('companiesInterested', e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="List companies you'd like to work for or connect with..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Roles You're Interested In <span className="text-red-500">*</span>
              </label>
              <textarea
                value={formData.rolesInterested}
                onChange={(e) => handleInputChange('rolesInterested', e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="List job titles or roles you're interested in..."
              />
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Resume <span className="text-red-500">*</span>
              </label>
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-purple-300 transition-colors">
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="resume-upload"
                />
                <label htmlFor="resume-upload" className="cursor-pointer">
                  <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-foreground font-medium mb-2">
                    {formData.resume ? formData.resume.name : 'Upload your resume'}
                  </p>
                  <p className="text-muted-foreground text-sm">
                    PDF, DOC, or DOCX files accepted
                  </p>
                </label>
              </div>
              {formData.resume && (
                <div className="flex items-center space-x-2 text-sm text-green-600">
                  <FileText className="h-4 w-4" />
                  <span>{formData.resume.name} uploaded successfully</span>
                </div>
              )}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <ProtectedRoute>
      <DashboardLayout>
      <div className="max-w-4xl mx-auto py-8 space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground">Profile</h1>
          <p className="text-muted-foreground">
            <TypingAnimation text="Complete your professional profile..." speed={70} />
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-between mb-8">
          {sections.map((section, index) => {
            const Icon = section.icon;
            const isActive = index === activeSection;
            const isCompleted = index < activeSection;
            
            return (
              <div key={index} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 ${
                  isActive 
                    ? 'bg-purple-600 border-purple-600 text-white' 
                    : isCompleted 
                    ? 'bg-green-500 border-green-500 text-white'
                    : 'border-border text-muted-foreground'
                }`}>
                  <Icon className="h-5 w-5" />
                </div>
                {index < sections.length - 1 && (
                  <div className={`w-16 h-0.5 mx-4 transition-all duration-300 ${
                    isCompleted ? 'bg-green-500' : 'bg-border'
                  }`} />
                )}
              </div>
            );
          })}
        </div>

        {/* Section Content */}
        <div className="bg-card/50 rounded-xl p-8 border border-purple-100">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-foreground mb-2">
              {sections[activeSection].title}
            </h2>
            <p className="text-muted-foreground">
              {sections[activeSection].description}
            </p>
          </div>

          {renderSection()}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t border-border/50">
            <button
              onClick={prevSection}
              disabled={activeSection === 0}
              className="px-6 py-2 text-foreground hover:text-purple-600 disabled:text-muted-foreground disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>
            <button
              onClick={nextSection}
              disabled={activeSection === sections.length - 1}
              className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {activeSection === sections.length - 1 ? 'Save Profile' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
    </ProtectedRoute>
  );
} 