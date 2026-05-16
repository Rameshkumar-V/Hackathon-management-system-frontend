import React from 'react';

export default function StatCard({ title, value, icon: Icon, trend, trendValue, className = '' }) {
  return (
    <div className={`rounded-xl border border-border bg-card text-card-foreground shadow-sm p-6 flex flex-col gap-2 ${className}`}>
      <div className="flex items-center justify-between">
        <h3 className="tracking-tight text-sm font-medium text-muted-foreground">{title}</h3>
        {Icon && <Icon className="h-5 w-5 text-muted-foreground" />}
      </div>
      <div className="text-3xl font-bold">{value}</div>
      {trend && (
        <p className="text-xs text-muted-foreground mt-1">
          <span className={`font-medium ${trend === 'up' ? 'text-green-500' : trend === 'down' ? 'text-destructive' : 'text-muted-foreground'}`}>
            {trendValue}
          </span>
          {' '}from last month
        </p>
      )}
    </div>
  );
}
