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

  const tabs = [
    { id: 'account', name: 'Account', icon: User },
    { id: 'billing', name: 'Billing', icon: CreditCard },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'privacy', name: 'Privacy & Security', icon: Shield },
    { id: 'appearance', name: 'Appearance', icon: Palette },
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
                <div className="space-y-5">
                  <h2 className="text-xl font-semibold text-foreground">Billing & Subscription</h2>
                  
                  <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-lg p-4 border border-purple-200 dark:border-purple-800">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">Pro Plan</h3>
                        <p className="text-muted-foreground">$29/month</p>
                      </div>
                      <span className="px-3 py-1 bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300 rounded-full text-sm font-medium">
                        Active
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                      Next billing date: March 15, 2024
                    </p>
                    <div className="flex space-x-3">
                      <button className="px-3 py-1.5 text-sm bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors">
                        Manage
                      </button>
                      <button className="px-3 py-1.5 text-sm border border-border text-foreground rounded-md hover:bg-muted/50 transition-colors">
                        Download
                      </button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-base font-semibold text-foreground">Payment Methods</h3>
                    <div className="border border-border rounded-lg p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <CreditCard className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <p className="font-medium text-foreground">•••• •••• •••• 4242</p>
                            <p className="text-sm text-muted-foreground">Expires 12/25</p>
                          </div>
                        </div>
                        <button className="text-purple-600 hover:text-purple-700 transition-colors">
                          Edit
                        </button>
                      </div>
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
                  
                  <div className="space-y-3">
                    <div className="p-3 border border-border rounded-lg">
                      <h3 className="font-medium text-foreground text-sm mb-1">Change Password</h3>
                      <p className="text-xs text-muted-foreground mb-2">Update your password to keep your account secure</p>
                      <button className="px-3 py-1.5 text-sm bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors">
                        Change Password
                      </button>
                    </div>

                    <div className="p-3 border border-border rounded-lg">
                      <h3 className="font-medium text-foreground text-sm mb-1">Two-Factor Authentication</h3>
                      <p className="text-xs text-muted-foreground mb-2">Add an extra layer of security to your account</p>
                      <button className="px-3 py-1.5 text-sm border border-border text-foreground rounded-md hover:bg-muted/50 transition-colors">
                        Enable 2FA
                      </button>
                    </div>

                    <div className="p-3 border border-red-200 dark:border-red-800 rounded-lg bg-red-50 dark:bg-red-900/10">
                      <h3 className="font-medium text-foreground text-sm mb-1">Delete Account</h3>
                      <p className="text-xs text-muted-foreground mb-2">Permanently delete your account and all associated data</p>
                      <button className="px-3 py-1.5 text-sm bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors">
                        Delete Account
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'appearance' && (
                <div className="space-y-5">
                  <h2 className="text-xl font-semibold text-foreground">Appearance</h2>
                  
                  <div className="space-y-3">
                    <div className="p-3 border border-border rounded-lg">
                      <h3 className="font-medium text-foreground text-sm mb-1">Theme</h3>
                      <p className="text-xs text-muted-foreground mb-2">Choose your preferred theme</p>
                      <div className="flex space-x-3">
                        <button className="px-3 py-1.5 text-sm bg-purple-600 text-white rounded-md">
                          Light
                        </button>
                        <button className="px-3 py-1.5 text-sm border border-border text-foreground rounded-md hover:bg-muted/50 transition-colors">
                          Dark
                        </button>
                        <button className="px-3 py-1.5 text-sm border border-border text-foreground rounded-md hover:bg-muted/50 transition-colors">
                          Auto
                        </button>
                      </div>
                    </div>

                    <div className="p-3 border border-border rounded-lg">
                      <h3 className="font-medium text-foreground text-sm mb-1">Language</h3>
                      <p className="text-xs text-muted-foreground mb-2">Select your preferred language</p>
                      <select className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-transparent text-sm">
                        <option value="en">English</option>
                        <option value="es">Spanish</option>
                        <option value="fr">French</option>
                        <option value="de">German</option>
                      </select>
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