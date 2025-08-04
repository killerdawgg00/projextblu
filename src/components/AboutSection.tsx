import React from 'react';
import { 
  Shield, 
  Users, 
  Award, 
  Target,
  CheckCircle,
  Globe,
  Zap,
  Heart
} from 'lucide-react';

export const AboutSection: React.FC = () => {
  const stats = [
    { number: "10+", label: "Years Experience", description: "In cybersecurity" },
    { number: "500+", label: "Enterprise Clients", description: "Worldwide" },
    { number: "99.9%", label: "Uptime Guarantee", description: "Service reliability" },
    { number: "24/7", label: "Security Monitoring", description: "Round the clock" }
  ];

  const values = [
    {
      icon: Shield,
      title: "Security First",
      description: "We prioritize security in everything we do, ensuring your digital assets are protected with the highest standards."
    },
    {
      icon: Users,
      title: "Client-Centric",
      description: "Our clients' success is our success. We build lasting partnerships through exceptional service and support."
    },
    {
      icon: Zap,
      title: "Innovation",
      description: "We continuously evolve our technology to stay ahead of emerging threats and provide cutting-edge solutions."
    },
    {
      icon: Heart,
      title: "Integrity",
      description: "We operate with transparency, honesty, and ethical practices in all our business relationships."
    }
  ];

  const team = [
    {
      name: "Sarah Chen",
      role: "Chief Executive Officer",
      image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400",
      description: "15+ years in cybersecurity leadership"
    },
    {
      name: "Michael Rodriguez",
      role: "Chief Technology Officer",
      image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400",
      description: "Expert in cloud security architecture"
    },
    {
      name: "Emily Johnson",
      role: "Head of Security Operations",
      image: "https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=400",
      description: "Incident response and threat hunting specialist"
    },
    {
      name: "David Park",
      role: "VP of Engineering",
      image: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=400",
      description: "AI and machine learning security expert"
    }
  ];

  return (
    <section id="about" className="py-20 bg-gradient-to-b from-slate-900 to-blue-900">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-teal-500/20 backdrop-blur-sm border border-teal-500/30 rounded-full px-4 py-2 text-teal-300 text-sm font-medium mb-6">
            <Users className="w-4 h-4" />
            <span>About DefendaX</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Protecting Digital
            <span className="block bg-gradient-to-r from-teal-400 to-cyan-300 bg-clip-text text-transparent">
              Futures Since 2014
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            We&apos;re a team of cybersecurity experts dedicated to providing enterprise-grade protection for businesses of all sizes in an increasingly connected world.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-teal-400 to-cyan-300 bg-clip-text text-transparent mb-2">
                {stat.number}
              </div>
              <div className="text-white font-semibold mb-1">{stat.label}</div>
              <div className="text-gray-400 text-sm">{stat.description}</div>
            </div>
          ))}
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-8">
            <div className="w-16 h-16 bg-gradient-to-br from-teal-500/20 to-cyan-500/20 rounded-xl flex items-center justify-center mb-6">
              <Target className="w-8 h-8 text-teal-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Our Mission</h3>
            <p className="text-gray-300 leading-relaxed mb-6">
              To democratize enterprise-grade cybersecurity by making advanced threat protection accessible, affordable, and easy to implement for organizations worldwide.
            </p>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-teal-400 flex-shrink-0" />
                <span className="text-gray-300">Protect digital assets with cutting-edge technology</span>
              </li>
              <li className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-teal-400 flex-shrink-0" />
                <span className="text-gray-300">Provide 24/7 monitoring and rapid response</span>
              </li>
              <li className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-teal-400 flex-shrink-0" />
                <span className="text-gray-300">Deliver exceptional customer service and support</span>
              </li>
            </ul>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-8">
            <div className="w-16 h-16 bg-gradient-to-br from-teal-500/20 to-cyan-500/20 rounded-xl flex items-center justify-center mb-6">
              <Globe className="w-8 h-8 text-teal-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Our Vision</h3>
            <p className="text-gray-300 leading-relaxed mb-6">
              To create a world where every organization, regardless of size, has access to world-class cybersecurity protection that adapts and evolves with emerging threats.
            </p>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-teal-400 flex-shrink-0" />
                <span className="text-gray-300">Lead innovation in AI-powered threat detection</span>
              </li>
              <li className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-teal-400 flex-shrink-0" />
                <span className="text-gray-300">Build the most trusted security platform globally</span>
              </li>
              <li className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-teal-400 flex-shrink-0" />
                <span className="text-gray-300">Empower businesses to thrive securely in the digital age</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Values */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-white text-center mb-12">Our Core Values</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div key={index} className="text-center group">
                  <div className="w-20 h-20 bg-gradient-to-br from-teal-500/20 to-cyan-500/20 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-10 h-10 text-teal-400" />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-4">{value.title}</h4>
                  <p className="text-gray-300 leading-relaxed">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Team */}
        <div>
          <h3 className="text-3xl font-bold text-white text-center mb-12">Meet Our Leadership Team</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 text-center hover:bg-slate-800/70 transition-all duration-300">
                <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-6">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="text-xl font-bold text-white mb-2">{member.name}</h4>
                <p className="text-teal-400 font-medium mb-3">{member.role}</p>
                <p className="text-gray-300 text-sm leading-relaxed">{member.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div className="mt-20 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-6">Certifications & Compliance</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-gradient-to-br from-teal-500/20 to-cyan-500/20 rounded-xl flex items-center justify-center mb-4">
                <Award className="w-8 h-8 text-teal-400" />
              </div>
              <span className="text-white font-medium">SOC 2 Type II</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-gradient-to-br from-teal-500/20 to-cyan-500/20 rounded-xl flex items-center justify-center mb-4">
                <Award className="w-8 h-8 text-teal-400" />
              </div>
              <span className="text-white font-medium">ISO 27001</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-gradient-to-br from-teal-500/20 to-cyan-500/20 rounded-xl flex items-center justify-center mb-4">
                <Award className="w-8 h-8 text-teal-400" />
              </div>
              <span className="text-white font-medium">GDPR Compliant</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-gradient-to-br from-teal-500/20 to-cyan-500/20 rounded-xl flex items-center justify-center mb-4">
                <Award className="w-8 h-8 text-teal-400" />
              </div>
              <span className="text-white font-medium">HIPAA Ready</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};