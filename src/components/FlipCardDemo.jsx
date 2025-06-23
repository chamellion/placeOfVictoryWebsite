import React from 'react';
import FlipCard from './FlipCard';

const FlipCardDemo = () => {
  const demoCards = [
    {
      name: 'Jeffrey Nsofor',
      role: 'Lead Pastor',
      bio: 'Jeffrey oversees our spiritual direction and leads with wisdom and humility. With over 15 years of pastoral experience, he is passionate about discipleship and community transformation.',
      imageUrl: '/images/leaders/jeffrey_nsofor.jpg'
    },
    {
      name: 'Mmesoma Nsofor',
      role: 'Asst. Pastor',
      bio: 'Mmesoma serves alongside her husband in ministry, focusing on women\'s ministry and family counseling. She brings warmth and compassion to all she does.',
      imageUrl: '/images/leaders/mmesoma_nsofor.jpg'
    },
    {
      name: 'Dr Adesola Ademiloye',
      role: 'Asst. Pastor',
      bio: 'Dr. Ademiloye brings academic excellence and spiritual depth to our ministry. He specializes in biblical teaching and youth discipleship programs.',
      imageUrl: '/images/leaders/sola_ademiloye.jpg'
    }
  ];

  return (
    <div className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            FlipCard Component Demo
          </h2>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Hover over the cards on desktop to see the 3D flip effect. On mobile, tap "Read Bio" to toggle the bio section.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {demoCards.map((card, index) => (
            <div key={index} className="h-96">
              <FlipCard
                name={card.name}
                role={card.role}
                bio={card.bio}
                imageUrl={card.imageUrl}
              />
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Usage Example</h3>
            <pre className="text-sm text-gray-700 bg-gray-100 p-4 rounded-lg overflow-x-auto">
{`<FlipCard
  name="Jeffrey Nsofor"
  role="Lead Pastor"
  bio="Jeffrey oversees our spiritual direction and leads with wisdom and humility."
  imageUrl="/images/leaders/jeffrey_nsofor.jpg"
/>`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlipCardDemo; 