import React, { useEffect } from 'react';
import { Target, Heart, Zap, Sprout } from 'lucide-react';

const About = ({ section }) => {
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

  // Updated leadership team data
  const leadershipTeam = [
    { id: 1, name: 'Jeffrey Nsofor', role: 'Lead Pastor', imageUrl: '/images/leaders/jeffrey_nsofor.jpg', bio: '' },
    { id: 2, name: 'Mmesoma Nsofor', role: 'Asst. Pastor', imageUrl: '/images/leaders/mmesoma_nsofor.jpg', bio: '' },
    { id: 3, name: 'Dr Adesola Ademiloye', role: 'Asst. Pastor', imageUrl: '/images/leaders/sola_ademiloye.jpg', bio: '' },
    { id: 4, name: 'Dr Austin Egwebe', role: 'Asst. Pastor', imageUrl: '/images/leaders/austin_egwebe.jpg', bio: '' },
    { id: 5, name: 'Temitope Olabode', role: 'HOD, Creative Arts', imageUrl: '/images/leaders/temitope_olabode.jpg', bio: '' },
    { id: 6, name: 'Mrs Taiwo Ademiloye', role: 'HOD Admin & Finance', imageUrl: '/images/leaders/taiwo_ademiloye.jpg', bio: '' }
  ];

  // Our Values data with Lucide icons
  const ourValues = [
    {
      id: 1,
      title: 'Purpose',
      description: 'Why are we in Swansea? To reveal Jesus through our lifestyle and service to the community.',
      icon: Target
    },
    {
      id: 2,
      title: 'Passion',
      description: 'We stay focused through prayer, the Word, and constant evaluation.',
      icon: Heart
    },
    {
      id: 3,
      title: 'Power',
      description: 'We rely on the Holy Spirit\'s empowerment, study, and training.',
      icon: Zap
    },
    {
      id: 4,
      title: 'Produce',
      description: 'We sustain vision through discipleship and leadership development.',
      icon: Sprout
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

  // Scroll to section if specified
  useEffect(() => {
    if (section) {
      const element = document.getElementById(section);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [section]);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-700 via-primary-600 to-primary-800 text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">About Our Church</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-8">
            RCCG Place of Victory (POV) Church Swansea is a vibrant, Pentecostal church for all nations, where individuals are transformed into believers who are eager to reveal Jesus through exemplary Christian lifestyle, charity, and personal transformation.
          </p>
        </div>
      </section>

      {/* Our History */}
      <section id="history" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900">Our History</h2>
            <p className="text-xl text-gray-700 mt-2">The story of God's faithfulness over the years</p>
          </div>
          
          <div className="relative max-w-4xl mx-auto">
            {/* Timeline */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-primary-500 to-primary-300"></div>
            
            {/* Timeline Events */}
            <div className="space-y-12">
              {churchHistory.map((event, index) => (
                <div key={index} className={`flex flex-col md:flex-row ${index % 2 === 0 ? 'md:flex-row-reverse' : ''} animate-fade-in`}>
                  <div className="md:w-1/2"></div>
                  <div className="hidden md:flex justify-center items-center">
                    <div className="w-12 h-12 rounded-full bg-primary-500 text-white flex items-center justify-center z-10 text-lg font-bold shadow-lg animate-pulse">
                      {event.year.substring(2)}
                    </div>
                  </div>
                  <div className="md:w-1/2 bg-white rounded-3xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 hover:scale-105">
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

      {/* Vision Section */}
      <section className="py-16 bg-gradient-to-r from-amber-50 to-orange-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-100/20 to-orange-100/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto animate-fade-in">
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-6">Vision</h2>
            <p className="text-xl md:text-2xl text-gray-700 leading-relaxed">
              To raise a generation of believers who are eager to reveal Jesus to the dying world through exemplary Christian lifestyle, charity and personal transformation.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-gradient-to-r from-blue-50 to-indigo-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100/20 to-indigo-100/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto animate-fade-in">
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-6">Mission</h2>
            <p className="text-xl md:text-2xl text-gray-700 leading-relaxed">
              This vision is achieved through discipleship, transformational prayers, intimate worship, and community engagement for the propagation of the gospel.
            </p>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-16 bg-gradient-to-br from-green-50 to-emerald-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-100/20 to-emerald-100/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900">Our Values</h2>
            <p className="text-xl text-gray-700 mt-2">The principles that guide our ministry and community</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {ourValues.map((value) => {
              const IconComponent = value.icon;
              return (
                <div key={value.id} className="bg-white rounded-3xl shadow-lg p-8 text-center hover:shadow-xl transition-all duration-300 hover:scale-105 animate-fade-in">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 text-primary-600 mb-6">
                    <IconComponent className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">{value.title}</h3>
                  <p className="text-lg text-gray-700 leading-relaxed">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section id="leadership" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900">Our Leadership Team</h2>
            <p className="text-xl text-gray-700 mt-2">Meet the people who help guide and serve our church</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {leadershipTeam.map((leader) => (
              <div key={leader.id} className="bg-gray-50 rounded-3xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105 animate-fade-in">
                <div className="h-96 overflow-hidden bg-gray-200 flex items-center justify-center">
                  <img 
                    src={leader.imageUrl} 
                    alt={leader.name} 
                    className="w-full h-full object-cover object-center"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div className="hidden items-center justify-center w-full h-full text-gray-500 text-4xl">
                    👤
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-1">{leader.name}</h3>
                  <p className="text-primary-600 font-medium text-lg">{leader.role}</p>
                  {leader.bio && <p className="text-lg text-gray-700 mt-4">{leader.bio}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Beliefs */}
      <section id="beliefs" className="py-16 bg-gradient-to-br from-purple-50 to-pink-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-100/20 to-pink-100/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900">What We Believe</h2>
            <p className="text-xl text-gray-700 mt-2">Core beliefs that guide our faith and practice</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coreBeliefs.map((belief) => (
              <div key={belief.id} className="bg-white rounded-3xl p-8 hover:shadow-lg transition-all duration-300 hover:scale-105 animate-fade-in">
                <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3">{belief.title}</h3>
                <p className="text-lg text-gray-700">{belief.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Times & Location */}
      <section id="services" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900">Service Times & Location</h2>
            <p className="text-xl text-gray-700 mt-2">Join us for worship and fellowship</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl md:text-3xl font-semibold text-gray-900 mb-6">Service Times</h3>
              <div className="space-y-6">
                {serviceTimes.map((item, index) => (
                  <div key={index} className="bg-gray-50 rounded-3xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 hover:scale-105 animate-fade-in">
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
              <div className="bg-gray-50 rounded-3xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105 animate-fade-in">
                <div className="h-96 w-full">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2483.3857394282765!2d-3.9498946999999997!3d51.6202823!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x486e03c8b0f8e5eb%3A0xf2bfa9c5a1b8c4d3!2s47B%20Westbury%20St%2C%20Swansea%20SA1%204JW%2C%20UK!5e0!3m2!1sen!2sus!4v1703000000000!5m2!1sen!2sus"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Church Location - 47B Westbury Street, Swansea"
                  ></iframe>
                </div>
                <div className="p-8">
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">RCCG Place of Victory</h4>
                  <p className="text-lg text-gray-700 mb-0">47B Westbury Street<br />Swansea, SA1 4JW<br />United Kingdom</p>
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