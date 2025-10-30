'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/auth/hooks/useAuth';
import { supabase } from '@/auth/utils/supabase';
import { X, ChevronDown } from 'lucide-react';

interface ProfileData {
  fullName: string;
  email: string;
  college: string;
  graduationYear: string;
  location: string;
  phone: string;
  organizations: string;
  emailSignature: string;
  companiesInterested: string;
  rolesInterested: string;
  whoAreYou: string;
}

export default function OnboardingPage() {
  const { user, refreshProfile } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<ProfileData>({
    fullName: user?.user_metadata?.full_name || '',
    email: user?.email || '',
    college: '',
    graduationYear: '',
    location: '',
    phone: '',
    organizations: '',
    emailSignature: '',
    companiesInterested: '',
    rolesInterested: '',
    whoAreYou: ''
  });

  const whoAreYouOptions = [
    'Student',
    'Recent Graduate',
    'Professional',
    'Career Changer',
    'Entrepreneur',
    'Other'
  ];

  useEffect(() => {
    if (!user) {
      router.push('/auth');
    }
  }, [user, router]);

  const handleInputChange = (field: keyof ProfileData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      console.log('Saving profile for user:', user.id);
      console.log('Form data:', formData);
      
      const { data, error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          full_name: formData.fullName,
          email: formData.email,
          college: formData.college,
          graduation_year: formData.graduationYear ? parseInt(formData.graduationYear) : null,
          location: formData.location,
          phone: formData.phone,
          organizations: formData.organizations,
          email_signature: formData.emailSignature,
          companies_interested: formData.companiesInterested,
          roles_interested: formData.rolesInterested,
          profile_completed: true
        })
        .select();

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }
      
      console.log('Profile saved successfully:', data);
      
      // Refresh the profile in auth context
      await refreshProfile();
      
      router.push('/dashboard');
    } catch (error) {
      console.error('Error saving profile:', error);
      alert('Error saving profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => {
    if (step < 3) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const isStepValid = () => {
    switch (step) {
      case 1:
        return formData.fullName && formData.email && formData.whoAreYou;
      case 2:
        return formData.college && formData.graduationYear && formData.location;
      case 3:
        return formData.emailSignature && formData.companiesInterested && formData.rolesInterested;
      default:
        return false;
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => handleInputChange('fullName', e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Who Are You?
              </label>
              <div className="relative">
                <select
                  value={formData.whoAreYou}
                  onChange={(e) => handleInputChange('whoAreYou', e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200 appearance-none cursor-pointer"
                >
                  <option value="" className="bg-gray-800">Select an option</option>
                  {whoAreYouOptions.map((option) => (
                    <option key={option} value={option} className="bg-gray-800">
                      {option}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 h-5 w-5 pointer-events-none" />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                College/University
              </label>
              <input
                type="text"
                value={formData.college}
                onChange={(e) => handleInputChange('college', e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200"
                placeholder="Enter your college or university"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Graduation Year
              </label>
              <input
                type="number"
                value={formData.graduationYear}
                onChange={(e) => handleInputChange('graduationYear', e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200"
                placeholder="2024"
                min="1950"
                max="2030"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Location
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200"
                placeholder="City, State"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Phone Number (Optional)
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200"
                placeholder="Enter your phone number"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Organizations & Activities (Optional)
              </label>
              <textarea
                value={formData.organizations}
                onChange={(e) => handleInputChange('organizations', e.target.value)}
                rows={3}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200 resize-none"
                placeholder="List any clubs, organizations, or activities..."
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Email Signature
              </label>
              <textarea
                value={formData.emailSignature}
                onChange={(e) => handleInputChange('emailSignature', e.target.value)}
                rows={4}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200 resize-none"
                placeholder="Enter your professional email signature..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Companies You're Interested In
              </label>
              <textarea
                value={formData.companiesInterested}
                onChange={(e) => handleInputChange('companiesInterested', e.target.value)}
                rows={3}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200 resize-none"
                placeholder="List companies you'd like to work for..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Roles You're Interested In
              </label>
              <textarea
                value={formData.rolesInterested}
                onChange={(e) => handleInputChange('rolesInterested', e.target.value)}
                rows={3}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200 resize-none"
                placeholder="List job titles or roles you're interested in..."
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800 flex items-center justify-center py-12 px-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-indigo-400 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-violet-400 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center">
              <img
                src="/logo.png"
                alt="Netch Logo"
                className="w-8 h-8 rounded"
              />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Complete Your Profile</h1>
          <p className="text-white/60 text-sm">Help us get to know you better</p>
        </div>

        {/* Progress indicator */}
        <div className="flex items-center justify-center mb-8 space-x-2">
          {[1, 2, 3].map((num) => (
            <div
              key={num}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                num === step
                  ? 'bg-purple-400'
                  : num < step
                  ? 'bg-purple-600'
                  : 'bg-white/20'
              }`}
            />
          ))}
        </div>

        {/* Form */}
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 shadow-2xl">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-white mb-1">
              {step === 1 && 'Basic Information'}
              {step === 2 && 'Education & Background'}
              {step === 3 && 'Professional Interests'}
            </h2>
            <p className="text-white/60 text-sm">
              Step {step} of 3
            </p>
          </div>

          {renderStep()}

          {/* Navigation */}
          <div className="flex justify-between mt-8">
            <button
              onClick={prevStep}
              disabled={step === 1}
              className="px-6 py-2.5 text-white/70 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors duration-200"
            >
              Back
            </button>
            
            {step < 3 ? (
              <button
                onClick={nextStep}
                disabled={!isStepValid()}
                className="px-6 py-2.5 bg-purple-600 text-white rounded-xl font-medium hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={!isStepValid() || loading}
                className="px-6 py-2.5 bg-purple-600 text-white rounded-xl font-medium hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                {loading ? 'Completing...' : 'Complete Profile'}
              </button>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}