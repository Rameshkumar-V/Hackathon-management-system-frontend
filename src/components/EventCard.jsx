import React from 'react';
import { Calendar as CalendarIcon, MapPin, Users } from 'lucide-react';

export default function EventCard({ event }) {
  const { 
    title, 
    image, 
    status, 
    startDate, 
    endDate, 
    location, 
    participants, 
    tags = [] 
  } = event;

  const statusColors = {
    Upcoming: 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800',
    Active: 'bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800',
    Completed: 'bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700',
  };

  return (
    <div className="group rounded-xl border border-border bg-card text-card-foreground shadow-sm overflow-hidden hover:shadow-md transition-all duration-300 hover:border-primary/50">
      <div className="aspect-video w-full overflow-hidden relative">
        <img 
          src={image || 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80'} 
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 right-3">
          <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${statusColors[status] || statusColors.Upcoming}`}>
            {status}
          </span>
        </div>
      </div>
      
      <div className="p-5 flex flex-col gap-4">
        <div>
          <h3 className="text-lg font-bold line-clamp-1 group-hover:text-primary transition-colors">{title}</h3>
          
          <div className="mt-3 flex flex-col gap-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <CalendarIcon className="h-4 w-4 shrink-0" />
              <span className="line-clamp-1">{startDate} - {endDate}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 shrink-0" />
              <span className="line-clamp-1">{location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 shrink-0" />
              <span>{participants} Registered</span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-border">
          {tags.map((tag, idx) => (
            <span key={idx} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-muted text-muted-foreground">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
