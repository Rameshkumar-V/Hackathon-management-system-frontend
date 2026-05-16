import React from 'react';
import PageHeader from '../components/PageHeader';
import StatCard from '../components/StatCard';
import { Users, Calendar, Trophy, Zap } from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader 
        title="Dashboard" 
        description="Overview of your hackathon platform activities and statistics."
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard 
          title="Total Participants" 
          value="1,248" 
          icon={Users} 
          trend="up" 
          trendValue="+12%" 
        />
        <StatCard 
          title="Active Hackathons" 
          value="3" 
          icon={Calendar} 
        />
        <StatCard 
          title="Projects Submitted" 
          value="432" 
          icon={Trophy} 
          trend="up" 
          trendValue="+5%" 
        />
        <StatCard 
          title="Platform Activity" 
          value="89%" 
          icon={Zap} 
          trend="down" 
          trendValue="-2%" 
        />
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 mt-4">
        {/* Placeholder for charts or recent activity */}
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm min-h-[300px] flex items-center justify-center text-muted-foreground">
          Participant Growth Chart (Placeholder)
        </div>
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm min-h-[300px] flex items-center justify-center text-muted-foreground">
          Recent Registrations (Placeholder)
        </div>
      </div>
    </div>
  );
}
