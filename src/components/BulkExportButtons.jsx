import React, { useState } from 'react';
import { Download } from 'lucide-react';
import { exportMultipleEventsToICal } from '../lib/utils/calendar';

const BulkExportButtons = ({ events, selectedMonth, className = '' }) => {
  const [isExporting, setIsExporting] = useState(false);

  const handleBulkExport = async () => {
    setIsExporting(true);
    try {
      let eventsToExport = events;
      let filename = 'all_events.ics';
      
      // If a specific month is selected, filter events
      if (selectedMonth && selectedMonth !== 'all') {
        const [year, month] = selectedMonth.split('-');
        const startOfMonth = new Date(parseInt(year), parseInt(month) - 1, 1);
        const endOfMonth = new Date(parseInt(year), parseInt(month), 0);
        
        eventsToExport = events.filter(event => {
          const eventDate = new Date(event.date);
          return eventDate >= startOfMonth && eventDate <= endOfMonth;
        });
        
        const monthName = startOfMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
        filename = `${monthName.toLowerCase().replace(' ', '_')}_events.ics`;
      }
      
      if (eventsToExport.length === 0) {
        alert('No events to export for the selected period.');
        return;
      }
      
      await exportMultipleEventsToICal(eventsToExport, filename);
    } catch (error) {
      console.error('[BulkExport] Error exporting events:', error);
      alert('Failed to export events. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  const getExportText = () => {
    if (selectedMonth && selectedMonth !== 'all') {
      const [year, month] = selectedMonth.split('-');
      const date = new Date(parseInt(year), parseInt(month) - 1, 1);
      const monthName = date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
      return `Export ${monthName} Events`;
    }
    return 'Export All Events';
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <button
        onClick={handleBulkExport}
        disabled={isExporting || events.length === 0}
        className="flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 disabled:bg-primary-400 text-white text-sm font-medium rounded-lg transition-colors"
        title="Export all events to iCal file"
      >
        <Download className="h-4 w-4" />
        <span>{isExporting ? 'Exporting...' : getExportText()}</span>
      </button>
      
      <span className="text-sm text-gray-600">
        ({events.length} event{events.length !== 1 ? 's' : ''})
      </span>
    </div>
  );
};

export default BulkExportButtons; 