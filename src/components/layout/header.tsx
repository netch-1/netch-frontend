'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Menu, 
  X, 
  Bell, 
  User, 
  Settings, 
  ChevronDown
} from 'lucide-react';

interface HeaderProps {
  className?: string;
}

export default function Header({ className = '' }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const getDisplayName = () => {
    return 'User';
  };

  return (
    <header className={`bg-background/80 backdrop-blur-sm border-b border-border/50 sticky top-0 z-50 ${className}`}>
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12">
          {/* Logo - Left edge */}
          <div className="flex items-center">
            <Link href="/dashboard" className="flex items-center space-x-1.5">
              <img
                src="/logo.png"
                alt="Logo"
                className="w-6 h-6 rounded object-cover"
              />
              <span className="text-base font-semibold text-foreground">Netch.ai</span>
            </Link>
          </div>

          {/* Right side - Notifications, User, Mobile menu - Right edge */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            
            {/* Notifications */}
            <div className="relative">
              <button 
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className="p-1.5 text-foreground hover:text-primary bg-muted/50 hover:bg-muted rounded-md transition-colors relative"
              >
                <Bell className="h-4 w-4" />
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></div>
              </button>

              {/* Notifications Dropdown */}
              {isNotificationsOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-[9999]" 
                    onClick={() => setIsNotificationsOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-80 bg-card border border-border/50 rounded-xl shadow-xl z-[10000] transform transition-all duration-300 ease-out animate-in slide-in-from-top-2">
                    <div className="p-4 border-b border-border/30">
                      <h3 className="text-sm font-semibold text-foreground">Notifications</h3>
                    </div>
                    <div className="max-h-64 overflow-y-auto">
                      <div className="p-4 border-b border-border/20 hover:bg-muted/20 transition-all duration-200 ease-out cursor-pointer group">
                        <div className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-foreground group-hover:text-purple-600 transition-colors duration-200">Placeholder</p>
                            <p className="text-xs text-muted-foreground mt-1">Just now</p>
                          </div>
                        </div>
                      </div>
                      <div className="p-4 border-b border-border/20 hover:bg-muted/20 transition-all duration-200 ease-out cursor-pointer group">
                        <div className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-foreground group-hover:text-purple-600 transition-colors duration-200">Placeholder</p>
                            <p className="text-xs text-muted-foreground mt-1">2 minutes ago</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 border-t border-border/30">
                      <button className="w-full text-xs text-purple-600 hover:text-purple-700 font-medium transition-colors duration-200 hover:bg-purple-50 dark:hover:bg-purple-900/10 rounded-md py-2">
                        View all notifications
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center space-x-2 p-1.5 text-foreground hover:text-primary bg-muted/50 hover:bg-muted rounded-md transition-colors"
              >
                <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center">
                  <User className="h-3 w-3 text-primary" />
                </div>
                <span className="hidden sm:block text-sm font-medium">
                  {getDisplayName()}
                </span>
                <ChevronDown className="h-3 w-3" />
              </button>

              {/* User Dropdown */}
              {isUserMenuOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-[9999]" 
                    onClick={() => setIsUserMenuOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-48 bg-card border border-border/50 rounded-lg shadow-lg z-[10000]">
                    <div className="p-3 border-b border-border/50">
                      <p className="text-sm font-medium text-foreground">{getDisplayName()}</p>
                      <p className="text-xs text-muted-foreground truncate">user@example.com</p>
                    </div>
                    <div className="p-1">
                      <Link
                        href="/settings"
                        className="flex items-center space-x-2 w-full px-3 py-2 text-sm text-foreground hover:text-primary hover:bg-muted/50 rounded-md transition-colors"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <Settings className="h-4 w-4" />
                        <span>Settings</span>
                      </Link>
                      <Link
                        href="/profile"
                        className="flex items-center space-x-2 w-full px-3 py-2 text-sm text-foreground hover:text-primary hover:bg-muted/50 rounded-md transition-colors"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <User className="h-4 w-4" />
                        <span>Profile</span>
                      </Link>
                      <button
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center space-x-2 w-full px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-md transition-colors"
                      >
                        <span>Close</span>
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-1.5 text-foreground hover:text-primary bg-muted/50 hover:bg-muted rounded-md transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="h-4 w-4" />
              ) : (
                <Menu className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-border/50 py-3">
            <nav className="space-y-1">
              <Link
                href="/dashboard"
                className="block px-3 py-2 text-sm text-foreground hover:text-primary hover:bg-muted/50 rounded-md transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Link
                href="/recommended"
                className="block px-3 py-2 text-sm text-foreground hover:text-primary hover:bg-muted/50 rounded-md transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Analytics
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
} 