'use client';

import { useState } from 'react';
import { Calendar, Clock, MapPin, Users, Video, Phone } from 'lucide-react';

interface UpcomingMeetingsProps {
  className?: string;
}

interface Meeting {
  id: number;
  title: string;
  date: string;
  time: string;
  duration: string;
  type: 'video' | 'phone' | 'in-person';
  location: string;
  attendees: number;
  status: 'confirmed' | 'pending' | 'cancelled';
}

export default function UpcomingMeetings({ className = '' }: UpcomingMeetingsProps) {
  const [meetings] = useState<Meeting[]>([
    {
      id: 1,
      title: 'Network Security Review',
      date: '2024-01-15',
      time: '10:00 AM',
      duration: '1 hour',
      type: 'video',
      location: 'Zoom Meeting',
      attendees: 5,
      status: 'confirmed'
    },
    {
      id: 2,
      title: 'Infrastructure Planning',
      date: '2024-01-16',
      time: '2:00 PM',
      duration: '2 hours',
      type: 'in-person',
      location: 'Conference Room A',
      attendees: 8,
      status: 'confirmed'
    },
    {
      id: 3,
      title: 'Team Standup',
      date: '2024-01-17',
      time: '9:00 AM',
      duration: '30 minutes',
      type: 'phone',
      location: 'Conference Call',
      attendees: 12,
      status: 'pending'
    }
  ]);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <Video className="h-4 w-4 text-blue-500" />;
      case 'phone':
        return <Phone className="h-4 w-4 text-green-500" />;
      case 'in-person':
        return <MapPin className="h-4 w-4 text-purple-500" />;
      default:
        return <Calendar className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'cancelled':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">Upcoming Meetings</h2>
        <button className="text-sm text-primary hover:text-primary/80 transition-colors">
          View All
        </button>
      </div>

      <div className="space-y-4">
        {meetings.map((meeting) => (
          <div
            key={meeting.id}
            className="p-4 rounded-lg border border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card/70 transition-all duration-200"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-2">
                {getTypeIcon(meeting.type)}
                <h3 className="text-sm font-medium text-foreground">
                  {meeting.title}
                </h3>
              </div>
              <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(meeting.status)}`}>
                {meeting.status}
              </span>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <Calendar className="h-3 w-3" />
                <span>{formatDate(meeting.date)}</span>
                <Clock className="h-3 w-3 ml-2" />
                <span>{meeting.time} ({meeting.duration})</span>
              </div>
              
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <MapPin className="h-3 w-3" />
                <span>{meeting.location}</span>
                <Users className="h-3 w-3 ml-2" />
                <span>{meeting.attendees} attendees</span>
              </div>
            </div>
            
            <div className="flex space-x-2 mt-3">
              <button className="px-3 py-1.5 text-xs bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
                Join Meeting
              </button>
              <button className="px-3 py-1.5 text-xs bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/90 transition-colors">
                Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 