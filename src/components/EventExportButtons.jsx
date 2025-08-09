import React, { useState } from 'react';
import { Calendar, Download, ExternalLink } from 'lucide-react';
import { exportToGoogleCalendar, exportToICal, downloadICalFile } from '../lib/utils/calendar';

const EventExportButtons = ({ event }) => {
  const [isExporting, setIsExporting] = useState(false);

  const handleGoogleCalendarExport = () => {
    try {
      const googleCalendarUrl = exportToGoogleCalendar(event);
      window.open(googleCalendarUrl, '_blank', 'noopener,noreferrer');
    } catch (error) {
      console.error('[EventExport] Error exporting to Google Calendar:', error);
      alert('Failed to export to Google Calendar. Please try again.');
    }
  };

  const handleICalExport = async () => {
    setIsExporting(true);
    try {
      const icsData = await exportToICal(event);
      const filename = `${event.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.ics`;
      downloadICalFile(icsData, filename);
    } catch (error) {
      console.error('[EventExport] Error exporting to iCal:', error);
      alert('Failed to export to iCal. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-2 mt-4">
      <button
        onClick={handleGoogleCalendarExport}
        className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
        title="Add to Google Calendar"
      >
        <Calendar className="h-4 w-4" />
        <span>Google Calendar</span>
        <ExternalLink className="h-3 w-3" />
      </button>
      
      <button
        onClick={handleICalExport}
        disabled={isExporting}
        className="flex items-center justify-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white text-sm font-medium rounded-lg transition-colors"
        title="Download iCal file for Apple Calendar/Outlook"
      >
        <Download className="h-4 w-4" />
        <span>{isExporting ? 'Exporting...' : 'iCal Download'}</span>
      </button>
    </div>
  );
};

export default EventExportButtons; 