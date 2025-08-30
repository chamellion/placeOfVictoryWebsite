import React from 'react';
import { Calendar } from 'lucide-react';

const MonthFilter = ({ selectedMonth, onMonthChange, className = '' }) => {
  // Generate options for current month and next 6 months
  const generateMonthOptions = () => {
    const options = [];
    const today = new Date();
    
    // Add "All Events" option
    options.push({
      value: 'all',
      label: 'All Events'
    });
    
    // Add current month and next 6 months
    for (let i = 0; i < 7; i++) {
      const date = new Date(today.getFullYear(), today.getMonth() + i, 1);
      const value = date.toISOString().slice(0, 7); // YYYY-MM format
      const label = date.toLocaleDateString('en-US', { 
        month: 'long', 
        year: 'numeric' 
      });
      
      options.push({ value, label });
    }
    
    return options;
  };

  const monthOptions = generateMonthOptions();

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Calendar className="h-4 w-4 text-gray-600" />
      <select
        value={selectedMonth}
        onChange={(e) => onMonthChange(e.target.value)}
        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white text-gray-900 text-sm"
      >
        {monthOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default MonthFilter; 