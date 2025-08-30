import React from 'react';
import { Repeat } from 'lucide-react';

const RecurringEventBadge = ({ className = '' }) => {
  return (
    <div className={`inline-flex items-center gap-1 px-2 py-1 bg-purple-100 text-purple-800 text-xs font-medium rounded-full ${className}`}>
      <Repeat className="h-3 w-3" />
      <span>Recurring</span>
    </div>
  );
};

export default RecurringEventBadge; 