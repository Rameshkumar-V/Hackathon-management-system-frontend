import React, { useState } from 'react';
import PageHeader from '../components/PageHeader';
import EventCard from '../components/EventCard';
import { Plus } from 'lucide-react';

const mockEvents = [
  {
    id: 1,
    title: 'Global AI Hackathon 2026',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80',
    status: 'Active',
    startDate: 'May 20, 2026',
    endDate: 'May 22, 2026',
    location: 'Online',
    participants: 450,
    tags: ['AI', 'Machine Learning', 'OpenAI'],
  },
  {
    id: 2,
    title: 'Web3 Innovators Challenge',
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f4ec651?w=800&q=80',
    status: 'Upcoming',
    startDate: 'Jun 10, 2026',
    endDate: 'Jun 15, 2026',
    location: 'San Francisco, CA',
    participants: 200,
    tags: ['Blockchain', 'DeFi', 'Web3'],
  },
  {
    id: 3,
    title: 'Code for Good: Climate Action',
    image: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=800&q=80',
    status: 'Completed',
    startDate: 'Mar 1, 2026',
    endDate: 'Mar 3, 2026',
    location: 'Hybrid',
    participants: 1200,
    tags: ['Sustainability', 'Climate Tech', 'Social Good'],
  }
];

export default function EventsList() {
  const [filter, setFilter] = useState('All');

  const filters = ['All', 'Active', 'Upcoming', 'Completed'];
  
  const filteredEvents = filter === 'All' 
    ? mockEvents 
    : mockEvents.filter(e => e.status === filter);

  return (
    <div className="flex flex-col gap-6">
      <PageHeader 
        title="Hackathons" 
        description="Manage and monitor all your hackathon events."
      >
        <button className="inline-flex items-center justify-center gap-2 rounded-md bg-primary text-primary-foreground h-10 px-4 py-2 font-medium hover:bg-primary/90 transition-colors">
          <Plus className="w-4 h-4" />
          Create Event
        </button>
      </PageHeader>

      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {filters.map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
              filter === f 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredEvents.map(event => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
      
      {filteredEvents.length === 0 && (
        <div className="py-12 text-center text-muted-foreground">
          No events found for this filter.
        </div>
      )}
    </div>
  );
}
