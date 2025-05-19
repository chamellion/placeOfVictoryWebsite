import React, { useState } from 'react';
import { Search, Calendar, User, PlayCircle, Clock } from 'lucide-react';

const Sermons = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSeries, setSelectedSeries] = useState('All');
  
  // Sample sermon series data
  const seriesList = ['All', 'Faith Journey', 'Hope in Christ', 'Living Word', 'Prayer', 'Community'];
  
  // Sample sermon data
  const sermonsData = [
    {
      id: 1,
      title: 'Finding Peace in Troubled Times',
      speaker: 'Pastor John Smith',
      date: 'May 14, 2023',
      series: 'Hope in Christ',
      duration: '38:42',
      description: 'In this sermon, Pastor John explores how we can find peace through Christ even in the most challenging circumstances of life, drawing from Philippians 4:6-7.',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      imageUrl: 'https://images.unsplash.com/photo-1487730116645-74489c95b41b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    },
    {
      id: 2,
      title: 'The Power of Prayer',
      speaker: 'Pastor John Smith',
      date: 'May 7, 2023',
      series: 'Prayer',
      duration: '42:18',
      description: 'This message examines the transformative power of prayer in our daily lives and how to develop a deeper prayer life based on James 5:13-16.',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      imageUrl: 'https://images.unsplash.com/photo-1476801071117-fbc157ae3f01?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    },
    {
      id: 3,
      title: 'Walking by Faith',
      speaker: 'Sarah Johnson',
      date: 'April 30, 2023',
      series: 'Faith Journey',
      duration: '35:21',
      description: 'Sarah shares powerful insights on what it means to walk by faith and not by sight, exploring 2 Corinthians 5:7 and examples from Scripture.',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      imageUrl: 'https://images.unsplash.com/photo-1519834769826-325ec5ac8129?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    },
    {
      id: 4,
      title: 'Living in Community',
      speaker: 'Pastor John Smith',
      date: 'April 23, 2023',
      series: 'Community',
      duration: '40:55',
      description: 'Pastor John discusses the importance of Christian community and how we can build stronger relationships within the church, based on Acts 2:42-47.',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      imageUrl: 'https://images.unsplash.com/photo-1539541417736-3d44c90da315?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    },
    {
      id: 5,
      title: 'Understanding God\'s Word',
      speaker: 'Michael Thompson',
      date: 'April 16, 2023',
      series: 'Living Word',
      duration: '37:12',
      description: 'Michael explores practical ways to study and apply Scripture in our daily lives, drawing from 2 Timothy 3:16-17 and Psalm 119.',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      imageUrl: 'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    },
    {
      id: 6,
      title: 'Overcoming Challenges with Faith',
      speaker: 'Pastor John Smith',
      date: 'April 9, 2023',
      series: 'Faith Journey',
      duration: '39:28',
      description: 'This sermon focuses on how faith in Christ helps us overcome life\'s challenges, with lessons from Hebrews 11 and the stories of faith heroes.',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      imageUrl: 'https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    },
  ];
  
  // Filter sermons based on search term and selected series
  const filteredSermons = sermonsData.filter(sermon => {
    const matchesSearch = sermon.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         sermon.speaker.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         sermon.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSeries = selectedSeries === 'All' || sermon.series === selectedSeries;
    
    return matchesSearch && matchesSeries;
  });
  
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-primary-700 text-white py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">Sermons</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Watch or listen to our latest messages and grow in your faith journey.
          </p>
        </div>
      </section>
      
      {/* Search and Filter */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="relative w-full md:w-96">
              <input
                type="text"
                placeholder="Search sermons..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full py-3 pl-12 pr-4 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            </div>
            
            <div className="flex flex-wrap gap-2 w-full md:w-auto">
              {seriesList.map((series) => (
                <button
                  key={series}
                  onClick={() => setSelectedSeries(series)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium ${
                    selectedSeries === series
                      ? 'bg-primary-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {series}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Sermons Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredSermons.length > 0 ? (
              filteredSermons.map((sermon) => (
                <div key={sermon.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img
                      src={sermon.imageUrl}
                      alt={sermon.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                      <a
                        href={sermon.videoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-white bg-opacity-90 rounded-full text-primary-600 hover:text-primary-700"
                        aria-label="Play sermon"
                      >
                        <PlayCircle size={36} />
                      </a>
                    </div>
                    <span className="absolute top-0 right-0 bg-primary-600 text-white text-xs font-bold px-3 py-1 m-2 rounded-md">
                      {sermon.series}
                    </span>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{sermon.title}</h3>
                    <div className="flex items-center text-gray-700 text-sm mb-2">
                      <User size={16} className="mr-1" />
                      <span>{sermon.speaker}</span>
                    </div>
                    <div className="flex items-center text-gray-700 text-sm mb-2">
                      <Calendar size={16} className="mr-1" />
                      <span>{sermon.date}</span>
                    </div>
                    <div className="flex items-center text-gray-700 text-sm mb-4">
                      <Clock size={16} className="mr-1" />
                      <span>{sermon.duration}</span>
                    </div>
                    <p className="text-gray-700 mb-4 line-clamp-3">{sermon.description}</p>
                    <a
                      href={sermon.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-600 hover:text-primary-700 font-medium flex items-center"
                    >
                      Watch Now
                      <PlayCircle size={16} className="ml-1" />
                    </a>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <h3 className="text-xl font-medium text-gray-700 mb-2">No sermons found</h3>
                <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
              </div>
            )}
          </div>
        </div>
      </section>
      
      {/* Subscribe Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Subscribe to Our Sermons</h2>
          <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
            Never miss a message. Subscribe to receive our weekly sermons directly in your inbox.
          </p>
          <div className="flex flex-col sm:flex-row justify-center max-w-lg mx-auto gap-4">
            <input
              type="email"
              placeholder="Your email address"
              className="py-3 px-4 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 flex-grow"
            />
            <button className="py-3 px-6 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Sermons; 