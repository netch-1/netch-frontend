'use client';

import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/dashboard-layout';
import ProtectedRoute from '@/auth/components/ProtectedRoute';
import { Upload, User, Building, GraduationCap, Mail, FileText, Briefcase } from 'lucide-react';
import { supabase } from '@/auth/utils/supabase';

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
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
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

  // Load profile data on component mount
  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      
      if (authError || !user) {
        setError('Please log in to view your profile');
        setLoading(false);
        return;
      }

      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error loading profile:', error);
      } else if (profile) {
        // Split full_name into firstName and lastName
        const nameParts = (profile.full_name || '').split(' ');
        const firstName = nameParts[0] || '';
        const lastName = nameParts.slice(1).join(' ') || '';

        setFormData({
          firstName,
          lastName,
          email: profile.email || user.email || '',
          phone: profile.phone || '',
          location: profile.location || '',
          college: profile.college || '',
          graduationYear: profile.graduation_year?.toString() || '',
          organizations: profile.organizations || '',
          emailSignature: profile.email_signature || '',
          companiesInterested: profile.companies_interested || '',
          rolesInterested: profile.roles_interested || '',
          resume: null, // File uploads handled separately
        });
      } else {
        // New profile, set defaults
        setFormData(prev => ({
          ...prev,
          email: user.email || ''
        }));
      }
    } catch (error) {
      console.error('Unexpected error:', error);
      setError('Failed to load profile data');
    } finally {
      setLoading(false);
    }
  };

  const saveProfile = async () => {
    setSaving(true);
    setError('');
    setSuccess('');

    try {
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      
      if (authError || !user) {
        setError('Please log in to save your profile');
        return;
      }

      // Validate required fields
      const requiredFields = {
        firstName: 'First Name',
        lastName: 'Last Name', 
        email: 'Email',
        location: 'Location',
        college: 'College/University',
        graduationYear: 'Graduation Year',
        organizations: 'Organizations',
        emailSignature: 'Email Signature',
        companiesInterested: 'Companies Interested',
        rolesInterested: 'Roles Interested'
      };

      for (const [field, label] of Object.entries(requiredFields)) {
        if (!formData[field as keyof typeof formData]?.toString().trim()) {
          setError(`${label} is required`);
          return;
        }
      }

      if (!formData.resume) {
        setError('Resume is required');
        return;
      }

      const fullName = `${formData.firstName.trim()} ${formData.lastName.trim()}`;
      
      const profileUpdate = {
        id: user.id,
        full_name: fullName,
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        location: formData.location.trim(),
        college: formData.college.trim(),
        graduation_year: parseInt(formData.graduationYear) || null,
        organizations: formData.organizations.trim(),
        email_signature: formData.emailSignature.trim(),
        companies_interested: formData.companiesInterested.trim(),
        roles_interested: formData.rolesInterested.trim(),
        profile_completed: true,
        updated_at: new Date().toISOString()
      };

      const { data, error } = await supabase
        .from('profiles')
        .upsert(profileUpdate, { 
          onConflict: 'id',
          ignoreDuplicates: false 
        })
        .select();

      if (error) {
        console.error('Supabase error:', error);
        setError(`Failed to save profile: ${error.message}`);
      } else {
        setSuccess('Profile saved successfully!');
        // Optionally redirect to dashboard or another page
        setTimeout(() => {
          window.location.href = '/dashboard';
        }, 2000);
      }
    } catch (error) {
      console.error('Unexpected error:', error);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setSaving(false);
    }
  };

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
    } else {
      // On the last section, save the profile
      saveProfile();
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

          {loading ? (
            <div className="text-center py-8">
              <div className="text-muted-foreground">Loading profile...</div>
            </div>
          ) : (
            <>
              {renderSection()}
              
              {/* Error and Success Messages */}
              {(error || success) && (
                <div className="mt-6">
                  {error && (
                    <div className="text-red-600 text-sm bg-red-50 dark:bg-red-900/20 p-3 rounded-md border border-red-200 dark:border-red-800">
                      {error}
                    </div>
                  )}
                  {success && (
                    <div className="text-green-600 text-sm bg-green-50 dark:bg-green-900/20 p-3 rounded-md border border-green-200 dark:border-green-800">
                      {success}
                    </div>
                  )}
                </div>
              )}
            </>
          )}

          {/* Navigation Buttons */}
          {!loading && (
            <div className="flex justify-between mt-8 pt-6 border-t border-border/50">
              <button
                onClick={prevSection}
                disabled={activeSection === 0 || saving}
                className="px-6 py-2 text-foreground hover:text-purple-600 disabled:text-muted-foreground disabled:cursor-not-allowed transition-colors"
              >
                Previous
              </button>
              <button
                onClick={nextSection}
                disabled={saving}
                className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {saving ? 'Saving...' : (activeSection === sections.length - 1 ? 'Save Profile' : 'Next')}
              </button>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
    </ProtectedRoute>
  );
} 