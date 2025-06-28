import React, { useEffect } from 'react';
import { Target, Heart, Zap, Sprout } from 'lucide-react';
import FlipCard from '../components/FlipCard';

const About = ({ section }) => {
  // Sample church history data
  const churchHistory = [
    {
      year: '2008',
      title: 'Church Founded',
      description: 'Place of Victory Swansea started on Sunday 13th July 2008 with about 8 people. We started at Marriott Hotel in Waterfront, Trawler Rd, Maritime Quarter, Swansea SA1 3SS. We were at this address until we moved to Dolphin Hotel in the City Centre in September 2008.'
    },
    {
      year: '2008',
      title: 'Moved to Dolphin Hotel',
      description: 'In September 2008, we moved from Marriott Hotel to Dolphin Hotel in the City Centre, where we continued to grow as a congregation.'
    },
    {
      year: '2013',
      title: 'Current Location',
      description: 'We moved out in 2013 from Dolphin Hotel to our current location at 47B, Westbury Street, Swansea SA1 4JW, which continues to serve as our primary worship space.'
    }
  ]

  // Updated leadership team data
  const leadershipTeam = [
    { 
      id: 1, 
      name: 'Jeffrey Nsofor', 
      role: 'Lead Pastor', 
      imageUrl: '/images/leaders/jeffrey_nsofor.jpg', 
      bio: 'Jeffrey oversees our spiritual direction and leads with wisdom and humility. With over 15 years of pastoral experience, he is passionate about discipleship and community transformation. His leadership focuses on building strong families and equipping believers for ministry.' 
    },
    { 
      id: 2, 
      name: 'Mmesoma Nsofor', 
      role: 'Asst. Pastor', 
      imageUrl: '/images/leaders/mmesoma_nsofor.jpg', 
      bio: 'Mmesoma serves alongside her husband in ministry, focusing on women\'s ministry and family counseling. She brings warmth and compassion to all she does, helping women grow in their faith and build strong family relationships.' 
    },
    { 
      id: 3, 
      name: 'Dr Adesola Ademiloye', 
      role: 'Asst. Pastor', 
      imageUrl: '/images/leaders/sola_ademiloye.jpg', 
      bio: 'Dr. Ademiloye brings academic excellence and spiritual depth to our ministry. He specializes in biblical teaching and youth discipleship programs, helping young people develop a strong foundation in their faith.' 
    },
    { 
      id: 4, 
      name: 'Dr Austin Egwebe', 
      role: 'Asst. Pastor', 
      imageUrl: '/images/leaders/austin_egwebe.jpg', 
      bio: 'Dr. Egwebe contributes his expertise in pastoral care and community outreach. He is dedicated to serving the congregation and reaching out to the local community with the love of Christ.' 
    },
    { 
      id: 5, 
      name: 'Temitope Olabode', 
      role: 'HOD, Creative Arts', 
      imageUrl: '/images/leaders/temitope_olabode.jpg', 
      bio: 'Temitope leads our creative arts ministry, overseeing worship, music, and visual arts. She helps create meaningful worship experiences that draw people closer to God through creative expression.' 
    },
    { 
      id: 6, 
      name: 'Mrs Taiwo Ademiloye', 
      role: 'HOD Admin & Finance', 
      imageUrl: '/images/leaders/taiwo_ademiloye.jpg', 
      bio: 'Mrs. Ademiloye manages our administrative and financial operations with excellence and integrity. She ensures the church runs smoothly so we can focus on ministry and outreach.' 
    }
  ];

  // Team Leads data
  const teamLeads = [
    { 
      id: 1,
      name: 'Ebenezer Ishola', 
      role: 'Evangelism Team Lead', 
      imageUrl: '/images/teams/ebenezer_ishola.jpg', 
      bio: 'Ebenezer leads our evangelism efforts with passion and dedication. He coordinates outreach programs and equips believers to share the gospel effectively in our community and beyond.' 
    },
    { 
      id: 2,
      name: 'Francess Iyere', 
      role: 'Drama Team Lead', 
      imageUrl: '/images/teams/francess_iyere.jpg', 
      bio: 'Francess directs our drama ministry, using creative arts to communicate biblical truths and engage audiences. Her team brings stories to life through powerful performances and skits.' 
    },
    { 
      id: 3,
      name: 'Busayo Fejoku', 
      role: 'Ushering Team Lead', 
      imageUrl: '/images/teams/busayo_fejoku.jpg', 
      bio: 'Busayo ensures smooth operations during services by leading our ushering team. She creates a welcoming atmosphere and helps maintain order during worship services and events.' 
    },
    { 
      id: 4,
      name: 'Ayorinde Idowu', 
      role: 'POV Men Team Lead', 
      imageUrl: '/images/teams/ayorinde_idowu.jpg', 
      bio: 'Ayorinde leads our men\'s ministry, focusing on spiritual growth, accountability, and fellowship. He organizes events and programs that strengthen men in their faith journey.' 
    },
    { 
      id: 5,
      name: 'Dunsin Alade', 
      role: 'Asst. Admin', 
      imageUrl: '/images/teams/dunsin_alade.jpg', 
      bio: 'Dunsin supports our administrative functions with efficiency and attention to detail. He helps coordinate church activities and ensures smooth day-to-day operations.' 
    },
    { 
      id: 6,
      name: 'Lizah Urombo', 
      role: 'Media Team Lead', 
      imageUrl: '/images/teams/lizah_urombo.jpg', 
      bio: 'Lizah oversees our media and communications, managing social media, website content, and digital outreach. She helps us stay connected with our congregation and community.' 
    },
    { 
      id: 7,
      name: 'Nicole Dele-Alufe', 
      role: 'Asst. Choir Director', 
      imageUrl: '/images/teams/nicole_dele-alufe.jpg', 
      bio: 'Nicole supports our choir ministry with her musical talents and leadership. She helps coordinate rehearsals and performances, ensuring excellence in our worship through music.' 
    },
    { 
      id: 8,
      name: 'Rachel Igwe', 
      role: 'Exec. Youth in Christ', 
      imageUrl: '/images/teams/rachel_igwe.jpg', 
      bio: 'Rachel leads our youth ministry with energy and creativity. She organizes activities, Bible studies, and events that help young people grow in their faith and build meaningful relationships.' 
    },
    { 
      id: 9,
      name: 'Taiwo Adeniye', 
      role: 'Prayer Team Lead', 
      imageUrl: '/images/teams/taiwo_adeniye.jpg', 
      bio: 'Taiwo coordinates our prayer ministry, leading intercessory prayer sessions and encouraging the congregation in their prayer life. She helps maintain the spiritual foundation of our church.' 
    },
    { 
      id: 10,
      name: 'Thaina Jesus', 
      role: 'Exec. Youth in Christ', 
      imageUrl: '/images/teams/thaina_jesus.jpg', 
      bio: 'Thaina works alongside our youth ministry leadership to create engaging programs and activities. She helps young people develop their faith and leadership skills through various initiatives.' 
    },
    { 
      id: 11,
      name: 'Veronica Olaosebikan', 
      role: 'Choir Director', 
      imageUrl: '/images/teams/veronica_olaosebikan.jpg', 
      bio: 'Veronica leads our choir with excellence and passion for worship. She directs musical performances, coordinates rehearsals, and helps create an atmosphere of praise through music.' 
    },
    { 
      id: 12,
      name: 'Funke Balogun', 
      role: 'Exec. Youth in Christ', 
      imageUrl: '/images/teams/funke_balogun.jpg', 
      bio: 'Funke contributes to our youth ministry by organizing events and mentoring young people. She helps create a supportive environment where youth can grow spiritually and develop their gifts.' 
    }
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {leadershipTeam.map((leader) => (
              <div key={leader.id} className="h-96 animate-fade-in">
                <FlipCard
                  name={leader.name}
                  role={leader.role}
                  bio={leader.bio}
                  imageUrl={leader.imageUrl}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Leads */}
      <section id="team-leads" className="py-16 bg-gradient-to-br from-purple-50 to-pink-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-100/20 to-pink-100/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900">Our Team Leads</h2>
            <p className="text-xl text-gray-700 mt-2">Serving with excellence across our departments</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamLeads.map((teamLead, index) => (
              <div 
                key={teamLead.id} 
                className="h-96 animate-fade-in-up"
                style={{ 
                  animationDelay: `${index * 0.1}s`,
                  animationFillMode: 'both'
                }}
              >
                <FlipCard
                  name={teamLead.name}
                  role={teamLead.role}
                  bio={teamLead.bio}
                  imageUrl={teamLead.imageUrl}
                />
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