'use client';

import { useState, useRef, useEffect } from 'react';
import DashboardLayout from '@/components/layout/dashboard-layout';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Plus } from 'lucide-react';

// Typing animation component (copied from recommended page)
function TypingAnimation({ text, speed = 70 }: { text: string; speed?: number }) {
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

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [googleCalendarUrl, setGoogleCalendarUrl] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // Sample events data
  const events = [
    {
      id: '1',
      title: 'Interview with TechCorp',
      date: new Date(2024, 1, 15),
      time: '2:30 PM',
      type: 'interview'
    },
    {
      id: '2',
      title: 'Networking Coffee',
      date: new Date(2024, 1, 18),
      time: '4:00 PM',
      type: 'coffee'
    },
    {
      id: '3',
      title: 'Mentorship Session',
      date: new Date(2024, 1, 20),
      time: '10:00 AM',
      type: 'mentorship'
    }
  ];

  // Helper to get the start of the week (Sunday)
  const getStartOfWeek = (date: Date) => {
    const d = new Date(date);
    const day = d.getDay();
    d.setDate(d.getDate() - day);
    d.setHours(0, 0, 0, 0);
    return d;
  };

  // Helper to get all days in the current week
  const getDaysInWeek = (date: Date) => {
    const start = getStartOfWeek(date);
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      return d;
    });
  };

  const days = getDaysInWeek(currentDate);

  const getMonthName = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  const getDayName = (day: number) => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return days[day];
  };

  const getEventsForDate = (date: Date) => {
    return events.filter(event => 
      event.date.toDateString() === date.toDateString()
    );
  };

  const getEventColor = (type: string) => {
    switch (type) {
      case 'interview':
        return 'bg-blue-500';
      case 'networking':
        return 'bg-green-500';
      case 'mentorship':
        return 'bg-purple-500';
      case 'coffee':
        return 'bg-orange-500';
      default:
        return 'bg-gray-500';
    }
  };

  // Week navigation
  const navigateWeek = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setDate(newDate.getDate() - 7);
      } else {
        newDate.setDate(newDate.getDate() + 7);
      }
      return newDate;
    });
  };

  // Time slots for the y-axis (9am to 5pm)
  const timeSlots = Array.from({ length: 9 }, (_, i) => {
    const hour = 9 + i;
    const ampm = hour < 12 ? 'am' : 'pm';
    const displayHour = hour % 12 === 0 ? 12 : hour % 12;
    return `${displayHour}:00${ampm}`;
  });

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Google Calendar Link Input */}
        <div className="flex flex-col sm:flex-row items-center gap-3 mb-4">
          <input
            ref={inputRef}
            type="text"
            value={googleCalendarUrl}
            onChange={e => setGoogleCalendarUrl(e.target.value)}
            placeholder="Paste your Google Calendar public link here..."
            className="w-full sm:w-96 px-4 py-2 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400/30 focus:border-purple-500 transition-all duration-200 text-sm bg-card/50 backdrop-blur-sm"
          />
          <button
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm"
            onClick={() => inputRef.current?.blur()}
          >
            Link Google Calendar
          </button>
        </div>
        {/* Header */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 bg-purple-600 rounded"></div>
            <h1 className="text-2xl font-medium text-foreground">Calendar</h1>
          </div>
          <p><TypingAnimation text="Manage your upcoming meetings..." speed={70} /></p>
        </div>

        {/* Calendar Navigation (Week) */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigateWeek('prev')}
              className="p-2 rounded-lg hover:bg-muted/50 transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <h2 className="text-lg font-medium text-foreground">
              Week of {days[0].toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </h2>
            <button
              onClick={() => navigateWeek('next')}
              className="p-2 rounded-lg hover:bg-muted/50 transition-colors"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
            <Plus className="h-4 w-4" />
            Add Event
          </button>
        </div>

        {/* Google Calendar-like Grid */}
        <div className="bg-white dark:bg-card/50 backdrop-blur-sm rounded-lg border border-border/50 p-0 shadow-sm">
          {/* Day Headers */}
          <div className="grid grid-cols-8 border-b border-border/30 bg-muted/30">
            <div className="text-xs font-semibold text-muted-foreground py-3 px-2" />
            {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map(day => (
              <div key={day} className="text-center text-xs font-semibold text-muted-foreground py-3 uppercase tracking-wide">
                {day}
              </div>
            ))}
          </div>
          {/* Calendar Grid with Time Slots */}
          <div className="grid grid-cols-8" style={{ minHeight: '420px', maxHeight: '420px' }}>
            {/* Time slots on y-axis */}
            <div className="flex flex-col border-r border-border/30">
              {timeSlots.map((slot, i) => (
                <div key={slot} className="h-10 flex items-start justify-end pr-2 text-xs text-muted-foreground pt-1">
                  {slot}
                </div>
              ))}
            </div>
            {/* Calendar columns for each day */}
            {days.map((day, dayIdx) => (
              <div key={dayIdx} className="flex flex-col border-r border-border/30 bg-white dark:bg-card/50">
                {timeSlots.map((slot, slotIdx) => (
                  <div
                    key={slotIdx}
                    className={`h-10 border-b border-border/30 px-2 py-1 relative group transition-all duration-200 hover:bg-purple-50 dark:hover:bg-purple-900/10 cursor-pointer ${
                      day.toDateString() === new Date().toDateString() && slotIdx === 0 ? 'ring-2 ring-purple-400 z-10' : ''
                    }`}
                    onClick={() => setSelectedDate(day)}
                  >
                    {/* Render events that match this day and time slot (placeholder logic) */}
                    {/* You can enhance this to match event times */}
                    {slotIdx === 0 && (
                      <div className={`absolute left-2 top-1 text-xs font-semibold ${day.toDateString() === new Date().toDateString() ? 'text-purple-700 dark:text-purple-300' : 'text-foreground'}`}>{day.getDate()}</div>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Selected Date Events */}
        {selectedDate && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground">
              Events for {selectedDate.toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </h3>
            <div className="space-y-3">
              {getEventsForDate(selectedDate).map(event => (
                <div
                  key={event.id}
                  className="flex items-center gap-3 p-4 rounded-lg border border-border/50 bg-card/50 backdrop-blur-sm"
                >
                  <div className={`w-3 h-3 rounded-full ${getEventColor(event.type)}`}></div>
                  <div className="flex-1">
                    <h4 className="font-medium text-foreground">{event.title}</h4>
                    <p className="text-sm text-muted-foreground">{event.time}</p>
                  </div>
                </div>
              ))}
              {getEventsForDate(selectedDate).length === 0 && (
                <p className="text-muted-foreground text-center py-8">
                  No events scheduled for this date
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
} 