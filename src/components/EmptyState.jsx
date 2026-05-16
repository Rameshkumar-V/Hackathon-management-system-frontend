import React from 'react';
import { FileQuestion } from 'lucide-react';

export default function EmptyState({ 
  icon: Icon = FileQuestion, 
  title = 'No Data Found', 
  description = 'We could not find anything here.',
  action 
}) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center min-h-[400px] border border-dashed border-border rounded-xl bg-muted/30">
      <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center mb-6">
        <Icon className="h-10 w-10 text-muted-foreground" />
      </div>
      <h3 className="text-xl font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-muted-foreground max-w-sm mb-6">{description}</p>
      {action && <div>{action}</div>}
    </div>
  );
}
