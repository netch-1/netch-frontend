'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import LogoutButton from '@/auth/components/LogoutButton';
import { 
  LayoutDashboard, 
  BarChart3, 
  Settings,
  User,
  ListChecks,
  CheckCircle,
  Calendar,
  LogOut
} from 'lucide-react';

interface SidebarProps {
  className?: string;
}

export default function Sidebar({ className = '' }: SidebarProps) {
  const pathname = usePathname();
  const [isHovered, setIsHovered] = useState(false);

  const navigation = [
    {
      name: 'Home',
      href: '/dashboard',
      icon: LayoutDashboard,
      description: 'Overview and metrics'
    },
    {
      name: 'Recommended',
      href: '/recommended',
      icon: BarChart3,
      description: 'Personalized suggestions'
    },
    {
      name: 'In-Progress',
      href: '/in-progress',
      icon: ListChecks,
      description: 'Connections in progress'
    },
    {
      name: 'Completed',
      href: '/completed',
      icon: CheckCircle,
      description: 'Completed connections'
    },
    {
      name: 'Calendar',
      href: '/calendar',
      icon: Calendar,
      description: 'Upcoming meetings'
    },
    {
      name: 'Profile',
      href: '/profile',
      icon: User,
      description: 'Your profile'
    }
  ];

  const isActive = (href: string) => {
    return pathname === href;
  };

  return (
    <aside 
      className={`bg-background/50 backdrop-blur-sm border-r border-border/50 transition-all duration-300 group ${className}`}
      style={{ width: isHovered ? '240px' : '48px' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex flex-col h-full">
        {/* Navigation */}
        <nav className="flex-1 p-2 space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`group/item flex items-center gap-3 px-2 py-2 rounded-md transition-all duration-200 relative ${
                  isActive(item.href)
                    ? 'bg-primary/10 text-primary border border-primary/20'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
              >
                <Icon className={`h-3.5 w-3.5 flex-shrink-0 ${
                  isActive(item.href) ? 'text-primary' : 'text-muted-foreground group-hover/item:text-foreground'
                }`} />
                <div className={`flex-1 min-w-0 transition-all duration-300 ${
                  isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2 pointer-events-none'
                }`}>
                  <p className="text-sm font-medium truncate">{item.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{item.description}</p>
                </div>
                
                {/* Tooltip for collapsed state */}
                {!isHovered && (
                  <div className="absolute left-full ml-2 px-2 py-1 bg-background border border-border/50 rounded-md text-xs text-foreground opacity-0 group-hover/item:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50 shadow-lg">
                    {item.name}
                  </div>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Settings and Logout links at bottom */}
        <div className="p-2 border-t border-border/50 space-y-1">
          <Link
            href="/settings"
            className={`group/item flex items-center gap-3 px-2 py-2 rounded-md transition-all duration-200 relative ${
              isActive('/settings')
                ? 'bg-primary/10 text-primary border border-primary/20'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
            }`}
          >
            <Settings className={`h-3.5 w-3.5 flex-shrink-0 ${
              isActive('/settings') ? 'text-primary' : 'text-muted-foreground group-hover/item:text-foreground'
            }`} />
            <div className={`flex-1 min-w-0 transition-all duration-300 ${
              isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2 pointer-events-none'
            }`}>
              <p className="text-sm font-medium truncate">Settings</p>
              <p className="text-xs text-muted-foreground truncate">Account & preferences</p>
            </div>
            
            {/* Tooltip for collapsed state */}
            {!isHovered && (
              <div className="absolute left-full ml-2 px-2 py-1 bg-background border border-border/50 rounded-md text-xs text-foreground opacity-0 group-hover/item:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50 shadow-lg">
                Settings
              </div>
            )}
          </Link>
          
          <LogoutButton className="group/item flex items-center gap-3 px-2 py-2 rounded-md transition-all duration-200 relative text-muted-foreground hover:text-red-600 hover:bg-red-50 w-full text-left">
            <LogOut className="h-3.5 w-3.5 flex-shrink-0" />
            <div className={`flex-1 min-w-0 transition-all duration-300 ${
              isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2 pointer-events-none'
            }`}>
              <p className="text-sm font-medium truncate">Sign Out</p>
              <p className="text-xs text-muted-foreground truncate">Log out of your account</p>
            </div>
            
            {/* Tooltip for collapsed state */}
            {!isHovered && (
              <div className="absolute left-full ml-2 px-2 py-1 bg-background border border-border/50 rounded-md text-xs text-foreground opacity-0 group-hover/item:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50 shadow-lg">
                Sign Out
              </div>
            )}
          </LogoutButton>
        </div>
      </div>
    </aside>
  );
} 