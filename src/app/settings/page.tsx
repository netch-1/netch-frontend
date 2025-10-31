'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/layout/dashboard-layout';
import ProtectedRoute from '@/auth/components/ProtectedRoute';
import TypingAnimation from '@/components/typing-animation';
import { 
  User, 
  CreditCard, 
  Bell, 
  Shield, 
  Palette, 
  Download,
  Trash2,
  Edit,
  Save,
  X
} from 'lucide-react';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('account');
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordForm(prev => ({ ...prev, [name]: value }));
    setPasswordError('');
    setPasswordSuccess('');
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError('');
    setPasswordSuccess('');

    if (!passwordForm.currentPassword || !passwordForm.newPassword || !passwordForm.confirmPassword) {
      setPasswordError('All fields are required');
      return;
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordError('New passwords do not match');
      return;
    }

    if (passwordForm.newPassword.length < 8) {
      setPasswordError('New password must be at least 8 characters long');
      return;
    }

    try {
      // Here you would typically call your password change API
      // For now, we'll simulate success
      setPasswordSuccess('Password changed successfully!');
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setIsChangingPassword(false);
    } catch (error) {
      setPasswordError('Failed to change password. Please try again.');
    }
  };

  const tabs = [
    { id: 'account', name: 'Account', icon: User },
    { id: 'billing', name: 'Billing', icon: CreditCard },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'privacy', name: 'Privacy & Security', icon: Shield },
  ];

  return (
    <ProtectedRoute>
      <DashboardLayout>
      <div className="max-w-5xl mx-auto py-6 space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground">
            <TypingAnimation text="Manage your account and preferences..." speed={30} />
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-6">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <nav className="space-y-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-2.5 text-left rounded-md transition-all duration-200 text-sm ${
                      isActive
                        ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted/30'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="font-medium">{tab.name}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Content Area */}
          <div className="lg:col-span-4">
            <div className="bg-card/20 backdrop-blur-sm rounded-xl p-6 border border-border/30 shadow-sm">
              {activeTab === 'account' && (
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-foreground">Account Settings</h2>
                    <button
                      onClick={() => setIsEditingProfile(!isEditingProfile)}
                      className="flex items-center space-x-2 px-3 py-1.5 text-xs bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-md hover:from-purple-700 hover:to-blue-700 transition-all duration-200 shadow-sm"
                    >
                      {isEditingProfile ? <X className="h-3 w-3" /> : <Edit className="h-3 w-3" />}
                      <span>{isEditingProfile ? 'Cancel' : 'Edit'}</span>
                    </button>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        disabled={!isEditingProfile}
                        className="w-full px-3 py-2 border border-border/50 rounded-lg bg-background/50 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 disabled:opacity-50 text-sm transition-all duration-200"
                        placeholder="Enter your first name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        disabled={!isEditingProfile}
                        className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:opacity-50"
                        placeholder="Enter your last name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        disabled={!isEditingProfile}
                        className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:opacity-50"
                        placeholder="Enter your email"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Phone
                      </label>
                      <input
                        type="tel"
                        disabled={!isEditingProfile}
                        className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:opacity-50"
                        placeholder="Enter your phone number"
                      />
                    </div>
                  </div>

                  {isEditingProfile && (
                    <div className="flex justify-end space-x-3 pt-3 border-t border-border/30">
                      <button
                        onClick={() => setIsEditingProfile(false)}
                        className="px-3 py-1.5 text-sm text-foreground hover:text-purple-600 transition-colors"
                      >
                        Cancel
                      </button>
                      <button className="px-3 py-1.5 text-sm bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-md hover:from-purple-700 hover:to-blue-700 transition-all duration-200 shadow-sm">
                        Save
                      </button>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'billing' && (
                <div className="space-y-6">
                  <div className="text-center space-y-3">
                    <h2 className="text-3xl font-bold text-foreground">Choose Your Plan</h2>
                    <p className="text-muted-foreground text-lg">Select the perfect plan for your networking needs</p>
                  </div>

                  <div className="grid md:grid-cols-3 gap-6">
                    {/* Free Tier */}
                    <div className="bg-card/50 border border-border rounded-xl p-6 space-y-4 hover:shadow-lg transition-all duration-200">
                      <div className="text-center space-y-2">
                        <h3 className="text-xl font-semibold text-foreground">Free</h3>
                        <div className="space-y-1">
                          <p className="text-3xl font-bold text-foreground">$0</p>
                          <p className="text-sm text-muted-foreground">per month</p>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="text-center py-2">
                          <p className="text-lg font-medium text-foreground">10 connections</p>
                          <p className="text-sm text-muted-foreground">per week</p>
                        </div>
                        
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-center space-x-2">
                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                            <span className="text-muted-foreground">Basic networking features</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                            <span className="text-muted-foreground">Profile creation</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                            <span className="text-muted-foreground">Limited messaging</span>
                          </li>
                        </ul>
                      </div>
                      
                      <button className="w-full py-2.5 px-4 border border-border text-foreground rounded-lg hover:bg-muted/50 transition-all duration-200 font-medium">
                        Current Plan
                      </button>
                    </div>

                    {/* Pro Tier */}
                    <div className="bg-card/50 border border-border rounded-xl p-6 space-y-4 hover:shadow-lg transition-all duration-200">
                      <div className="text-center space-y-2">
                        <h3 className="text-xl font-semibold text-foreground">Pro</h3>
                        <div className="space-y-1">
                          <p className="text-3xl font-bold text-foreground">$9.99</p>
                          <p className="text-sm text-muted-foreground">per month</p>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="text-center py-2">
                          <p className="text-lg font-medium text-foreground">25 connections</p>
                          <p className="text-sm text-muted-foreground">per week</p>
                        </div>
                        
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-center space-x-2">
                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                            <span className="text-muted-foreground">All free features</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                            <span className="text-muted-foreground">Advanced search filters</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                            <span className="text-muted-foreground">Priority support</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                            <span className="text-muted-foreground">Enhanced profile visibility</span>
                          </li>
                        </ul>
                      </div>
                      
                      <button className="w-full py-2.5 px-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200 font-medium shadow-md">
                        Upgrade to Pro
                      </button>
                    </div>

                    {/* Premium Tier - Highlighted */}
                    <div className="bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-200/20 dark:to-blue-200/20 border-2 border-purple-300 dark:border-purple-400 rounded-xl p-6 space-y-4 hover:shadow-xl transition-all duration-200 relative overflow-hidden">
                      <div className="absolute top-0 right-0 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-3 py-1 text-xs font-medium rounded-bl-lg">
                        MOST POPULAR
                      </div>
                      
                      <div className="text-center space-y-2">
                        <h3 className="text-xl font-semibold text-foreground">Premium</h3>
                        <div className="space-y-1">
                          <p className="text-3xl font-bold text-transparent bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text">$19.99</p>
                          <p className="text-sm text-muted-foreground">per month</p>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="text-center py-2">
                          <p className="text-lg font-medium text-transparent bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text">Unlimited connections</p>
                          <p className="text-sm text-muted-foreground">per week</p>
                        </div>
                        
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-center space-x-2">
                            <div className="w-1.5 h-1.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"></div>
                            <span className="text-muted-foreground">All Pro features</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <div className="w-1.5 h-1.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"></div>
                            <span className="text-muted-foreground">AI-powered matching</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <div className="w-1.5 h-1.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"></div>
                            <span className="text-muted-foreground">Exclusive networking events</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <div className="w-1.5 h-1.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"></div>
                            <span className="text-muted-foreground">Personal relationship manager</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <div className="w-1.5 h-1.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"></div>
                            <span className="text-muted-foreground">Advanced analytics</span>
                          </li>
                        </ul>
                      </div>
                      
                      <button className="w-full py-2.5 px-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200 font-medium shadow-lg">
                        Get Premium
                      </button>
                    </div>
                  </div>

                  <div className="bg-muted/20 rounded-lg p-4 border border-border/50">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-foreground">Need help choosing?</h3>
                        <p className="text-sm text-muted-foreground">Contact our team for personalized recommendations</p>
                      </div>
                      <button className="px-4 py-2 text-sm border border-border text-foreground rounded-md hover:bg-muted/50 transition-colors">
                        Contact Sales
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'notifications' && (
                <div className="space-y-5">
                  <h2 className="text-xl font-semibold text-foreground">Notification Preferences</h2>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                      <div>
                        <h3 className="font-medium text-foreground text-sm">Email Notifications</h3>
                        <p className="text-xs text-muted-foreground">Receive updates about new connections and opportunities</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                      <div>
                        <h3 className="font-medium text-foreground text-sm">Push Notifications</h3>
                        <p className="text-xs text-muted-foreground">Get instant alerts for new messages and matches</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                      <div>
                        <h3 className="font-medium text-foreground text-sm">Weekly Digest</h3>
                        <p className="text-xs text-muted-foreground">Receive a summary of your networking activity</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'privacy' && (
                <div className="space-y-5">
                  <h2 className="text-xl font-semibold text-foreground">Privacy & Security</h2>
                  
                  <div className="space-y-4">
                    <div className="p-4 border border-border rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h3 className="font-medium text-foreground text-sm mb-1">Change Password</h3>
                          <p className="text-xs text-muted-foreground">Update your password to keep your account secure</p>
                        </div>
                        <button 
                          onClick={() => setIsChangingPassword(!isChangingPassword)}
                          className="px-3 py-1.5 text-sm bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
                        >
                          {isChangingPassword ? 'Cancel' : 'Change Password'}
                        </button>
                      </div>

                      {isChangingPassword && (
                        <form onSubmit={handlePasswordSubmit} className="space-y-3 mt-4 pt-4 border-t border-border/50">
                          <div>
                            <label className="block text-xs font-medium text-foreground mb-1">Current Password</label>
                            <input
                              type="password"
                              name="currentPassword"
                              value={passwordForm.currentPassword}
                              onChange={handlePasswordChange}
                              className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 text-sm"
                              placeholder="Enter current password"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-foreground mb-1">New Password</label>
                            <input
                              type="password"
                              name="newPassword"
                              value={passwordForm.newPassword}
                              onChange={handlePasswordChange}
                              className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 text-sm"
                              placeholder="Enter new password"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-foreground mb-1">Confirm New Password</label>
                            <input
                              type="password"
                              name="confirmPassword"
                              value={passwordForm.confirmPassword}
                              onChange={handlePasswordChange}
                              className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 text-sm"
                              placeholder="Confirm new password"
                            />
                          </div>

                          {passwordError && (
                            <div className="text-red-600 text-xs mt-2">{passwordError}</div>
                          )}

                          {passwordSuccess && (
                            <div className="text-green-600 text-xs mt-2">{passwordSuccess}</div>
                          )}

                          <div className="flex space-x-3 pt-2">
                            <button
                              type="button"
                              onClick={() => {
                                setIsChangingPassword(false);
                                setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
                                setPasswordError('');
                                setPasswordSuccess('');
                              }}
                              className="px-3 py-1.5 text-xs text-foreground hover:text-purple-600 transition-colors"
                            >
                              Cancel
                            </button>
                            <button
                              type="submit"
                              className="px-3 py-1.5 text-xs bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
                            >
                              Update Password
                            </button>
                          </div>
                        </form>
                      )}
                    </div>

                    <div className="p-4 border border-red-200 dark:border-red-800 rounded-lg bg-red-50 dark:bg-red-900/10">
                      <h3 className="font-medium text-foreground text-sm mb-1">Delete Account</h3>
                      <p className="text-xs text-muted-foreground mb-3">Permanently delete your account and all associated data</p>
                      <button className="px-3 py-1.5 text-sm bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors">
                        Delete Account
                      </button>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
    </ProtectedRoute>
  );
} 