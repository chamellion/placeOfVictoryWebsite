import React from 'react';

const About = () => {
  // Sample church history data
  const churchHistory = [
    {
      year: '1975',
      title: 'Church Founded',
      description: 'RCCG Place of Victory was founded by a small group of dedicated believers who met in a local home for Bible study and prayer.'
    },
    {
      year: '1980',
      title: 'First Building',
      description: 'The congregation grew and purchased its first building, a modest structure that served as our home for 15 years.'
    },
    {
      year: '1995',
      title: 'Current Location',
      description: 'We moved to our current location, breaking ground on a new sanctuary that continues to serve as our primary worship space.'
    },
    {
      year: '2005',
      title: 'Community Center',
      description: 'Added the Family Life Center to expand our ministry, providing space for youth activities, community outreach, and fellowship events.'
    },
    {
      year: '2018',
      title: 'Sanctuary Expansion',
      description: 'Completed a major renovation and expansion of our sanctuary to accommodate our growing congregation.'
    }
  ];

  // Sample leadership data
  const leadershipTeam = [
    {
      id: 1,
      name: 'Pastor John Smith',
      role: 'Senior Pastor',
      bio: 'Pastor John has been serving at RCCG Place of Victory for over 15 years. He has a passion for teaching God\'s Word and discipling others to grow in their faith.',
      imageUrl: 'https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      role: 'Worship Pastor',
      bio: 'Sarah leads our worship ministry with creativity and a heart for authentic worship. She has been on staff for 8 years and is passionate about helping others connect with God through music.',
      imageUrl: 'https://images.unsplash.com/photo-1593104547489-5cfb3839a3b5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 3,
      name: 'Michael Thompson',
      role: 'Youth Pastor',
      bio: 'Michael oversees our vibrant youth ministry, creating engaging programs that help teens grow in their faith and develop Christian character.',
      imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 4,
      name: 'Rebecca Martinez',
      role: 'Children\'s Ministry Director',
      bio: 'Rebecca has a heart for children and over 10 years of experience in education. She creates fun, Bible-based programs that help children learn about God\'s love.',
      imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80',
    }
  ];

  // Core beliefs
  const coreBeliefs = [
    {
      id: 1,
      title: 'The Bible',
      description: 'We believe the Bible is God\'s Word, inspired by the Holy Spirit, without error, and the final authority for all matters of faith and conduct.'
    },
    {
      id: 2,
      title: 'God',
      description: 'We believe in one God who exists eternally in three persons: Father, Son, and Holy Spirit.'
    },
    {
      id: 3,
      title: 'Jesus Christ',
      description: 'We believe Jesus Christ is fully God and fully human. He was born of a virgin, lived a sinless life, died on the cross for our sins, rose bodily from the dead, and ascended to heaven.'
    },
    {
      id: 4,
      title: 'Salvation',
      description: 'We believe salvation is a gift of God received through faith in Jesus Christ alone. It cannot be earned through good works but leads to a life of obedience and service.'
    },
    {
      id: 5,
      title: 'The Church',
      description: 'We believe the church is the body of Christ on earth, expressing His love through worship, fellowship, discipleship, ministry, and evangelism.'
    },
    {
      id: 6,
      title: 'The Holy Spirit',
      description: 'We believe the Holy Spirit indwells every believer, empowering them to live a godly life and equipping them with gifts for service.'
    }
  ];

  // Service times
  const serviceTimes = [
    { 
      day: 'Sunday', 
      services: [
        'First Service: 9:30 AM – 11:00 AM',
        'Second Service: 12:00 PM – 2:00 PM'
      ] 
    },
    { 
      day: 'Wednesday', 
      services: ['Bible Study: 6:30 PM – 8:00 PM'] 
    },
    { 
      day: 'Friday', 
      services: ['Prayer Meeting: 6:30 PM – 8:00 PM'] 
    }
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-primary-700 text-white py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">About Our Church</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            Learn about our history, our team, what we believe, and how you can join us in our journey of faith.
          </p>
        </div>
      </section>

      {/* Our History */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900">Our History</h2>
            <p className="text-xl text-gray-700 mt-2">The story of God's faithfulness over the years</p>
          </div>
          
          <div className="relative max-w-4xl mx-auto">
            {/* Timeline */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gray-200"></div>
            
            {/* Timeline Events */}
            <div className="space-y-12">
              {churchHistory.map((event, index) => (
                <div key={index} className={`flex flex-col md:flex-row ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                  <div className="md:w-1/2"></div>
                  <div className="hidden md:flex justify-center items-center">
                    <div className="w-12 h-12 rounded-full bg-primary-600 text-white flex items-center justify-center z-10 text-lg">
                      {event.year.substring(2)}
                    </div>
                  </div>
                  <div className="md:w-1/2 bg-white rounded-xl shadow-md p-6">
                    <div className="md:hidden text-primary-600 font-bold mb-2 text-lg">{event.year}</div>
                    <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-2">{event.title}</h3>
                    <p className="text-lg text-gray-700">{event.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900">Our Leadership Team</h2>
            <p className="text-xl text-gray-700 mt-2">Meet the people who help guide and serve our church</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {leadershipTeam.map((leader) => (
              <div key={leader.id} className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={leader.imageUrl} 
                    alt={leader.name} 
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-1">{leader.name}</h3>
                  <p className="text-primary-600 font-medium mb-4 text-lg">{leader.role}</p>
                  <p className="text-lg text-gray-700">{leader.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Beliefs */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900">What We Believe</h2>
            <p className="text-xl text-gray-700 mt-2">Core beliefs that guide our faith and practice</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coreBeliefs.map((belief) => (
              <div key={belief.id} className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-shadow">
                <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3">{belief.title}</h3>
                <p className="text-lg text-gray-700">{belief.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Times & Location */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900">Service Times & Location</h2>
            <p className="text-xl text-gray-700 mt-2">Join us for worship and fellowship</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl md:text-3xl font-semibold text-gray-900 mb-6">Service Times</h3>
              <div className="space-y-6">
                {serviceTimes.map((item, index) => (
                  <div key={index} className="bg-white rounded-xl shadow-md p-6">
                    <h4 className="text-xl md:text-2xl font-semibold text-primary-600 mb-3">{item.day}</h4>
                    <ul className="space-y-3">
                      {item.services.map((service, sIndex) => (
                        <li key={sIndex} className="flex items-center">
                          <span className="h-3 w-3 rounded-full bg-primary-600 mr-3"></span>
                          <span className="text-lg text-gray-700">{service}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-xl md:text-3xl font-semibold text-gray-900 mb-6">Our Location</h3>
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="h-96 w-full">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.215280026992!2d-73.98750708445387!3d40.75838007932703!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25855c6480299%3A0x55194ec5a1ae072e!2sTimes%20Square!5e0!3m2!1sen!2sus!4v1653484597704!5m2!1sen!2sus"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Church Location"
                  ></iframe>
                </div>
                <div className="p-6">
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">RCCG Place of Victory</h4>
                  <p className="text-lg text-gray-700 mb-0">47B Westbury Street<br />Swansea</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About; 