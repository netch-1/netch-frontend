'use client';

import { useState } from 'react';
import { User, MessageCircle, Plus, Star, MapPin, Briefcase } from 'lucide-react';

interface RecommendedProfilesProps {
  className?: string;
}

interface Profile {
  id: number;
  name: string;
  title: string;
  company: string;
  location: string;
  avatar: string;
  rating: number;
  skills: string[];
  mutualConnections: number;
}

export default function RecommendedProfiles({ className = '' }: RecommendedProfilesProps) {
  const [profiles, setProfiles] = useState<Profile[]>([
    {
      id: 1,
      name: 'Sarah Johnson',
      title: 'Senior Network Engineer',
      company: 'TechCorp',
      location: 'San Francisco, CA',
      avatar: '/api/placeholder/40/40',
      rating: 4.8,
      skills: ['Network Security', 'Cisco', 'AWS'],
      mutualConnections: 3
    },
    {
      id: 2,
      name: 'Michael Chen',
      title: 'Network Architect',
      company: 'DataFlow Systems',
      location: 'New York, NY',
      avatar: '/api/placeholder/40/40',
      rating: 4.9,
      skills: ['SDN', 'Kubernetes', 'Python'],
      mutualConnections: 5
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      title: 'Network Operations Manager',
      company: 'CloudNet',
      location: 'Austin, TX',
      avatar: '/api/placeholder/40/40',
      rating: 4.7,
      skills: ['Network Monitoring', 'Ansible', 'Docker'],
      mutualConnections: 2
    }
  ]);

  const [loading, setLoading] = useState(false);

  const handleConnect = async (profileId: number) => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setProfiles(prev => 
      prev.map(profile => 
        profile.id === profileId 
          ? { ...profile, mutualConnections: profile.mutualConnections + 1 }
          : profile
      )
    );
    setLoading(false);
  };

  const handleMessage = (profileId: number) => {
    console.log('Opening message thread for profile:', profileId);
  };

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">Recommended Profiles</h2>
        <button className="text-sm text-primary hover:text-primary/80 transition-colors">
          View All
        </button>
      </div>

      <div className="space-y-4">
        {profiles.map((profile) => (
          <div
            key={profile.id}
            className="p-4 rounded-lg border border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card/70 transition-all duration-200"
          >
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                <User className="h-5 w-5 text-primary" />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <h3 className="text-sm font-medium text-foreground truncate">
                    {profile.name}
                  </h3>
                  <div className="flex items-center space-x-1">
                    <Star className="h-3 w-3 text-yellow-500 fill-current" />
                    <span className="text-xs text-muted-foreground">{profile.rating}</span>
                  </div>
                </div>
                
                <p className="text-xs text-muted-foreground mb-1 flex items-center space-x-1">
                  <Briefcase className="h-3 w-3" />
                  <span>{profile.title}</span>
                </p>
                
                <p className="text-xs text-muted-foreground mb-2 flex items-center space-x-1">
                  <MapPin className="h-3 w-3" />
                  <span>{profile.company} • {profile.location}</span>
                </p>
                
                <div className="flex flex-wrap gap-1 mb-3">
                  {profile.skills.slice(0, 3).map((skill, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 text-xs bg-muted/50 text-muted-foreground rounded-md"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
                
                <p className="text-xs text-muted-foreground mb-3">
                  {profile.mutualConnections} mutual connections
                </p>
                
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleConnect(profile.id)}
                    disabled={loading}
                    className="flex items-center space-x-1 px-3 py-1.5 text-xs bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50"
                  >
                    <Plus className="h-3 w-3" />
                    <span>Connect</span>
                  </button>
                  
                  <button
                    onClick={() => handleMessage(profile.id)}
                    className="flex items-center space-x-1 px-3 py-1.5 text-xs bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/90 transition-colors"
                  >
                    <MessageCircle className="h-3 w-3" />
                    <span>Message</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 