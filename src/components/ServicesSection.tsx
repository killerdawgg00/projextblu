import React from 'react';
import { 
  Shield, 
  Eye, 
  FileCheck, 
  Activity, 
  AlertTriangle, 
  Users,
  CheckCircle,
  ArrowRight,
  Cloud,
  Lock,
  Zap
} from 'lucide-react';

export const ServicesSection: React.FC = () => {
  const services = [
    {
      icon: Shield,
      title: "Cloud Security",
      description: "Comprehensive cloud infrastructure protection with advanced threat detection and real-time monitoring.",
      features: ["24/7 Monitoring", "Threat Detection", "Automated Response", "Compliance Reporting"]
    },
    {
      icon: Eye,
      title: "Threat Intelligence",
      description: "Advanced threat intelligence and analysis to identify and neutralize security risks before they impact your business.",
      features: ["Real-time Analysis", "Behavioral Detection", "Threat Hunting", "Risk Assessment"]
    },
    {
      icon: FileCheck,
      title: "Compliance Management",
      description: "Ensure your organization meets industry standards and regulatory requirements with automated compliance monitoring.",
      features: ["GDPR Compliance", "SOC 2 Certification", "ISO 27001", "Audit Support"]
    },
    {
      icon: Activity,
      title: "Network Monitoring",
      description: "Continuous network surveillance with intelligent anomaly detection and performance optimization.",
      features: ["Traffic Analysis", "Bandwidth Monitoring", "Device Management", "Performance Metrics"]
    },
    {
      icon: AlertTriangle,
      title: "Incident Response",
      description: "Rapid incident response and recovery services to minimize downtime and protect your digital assets.",
      features: ["24/7 Response Team", "Forensic Analysis", "Recovery Planning", "Post-Incident Review"]
    },
    {
      icon: Users,
      title: "Security Consulting",
      description: "Expert security consulting services to help you build and maintain a robust cybersecurity strategy.",
      features: ["Security Audits", "Risk Assessment", "Strategy Planning", "Training Programs"]
    }
  ];

  return (
    <section id="services" className="py-20 bg-slate-900">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-teal-500/20 backdrop-blur-sm border border-teal-500/30 rounded-full px-4 py-2 text-teal-300 text-sm font-medium mb-6">
            <Shield className="w-4 h-4" />
            <span>Our Services</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Comprehensive
            <span className="block bg-gradient-to-r from-teal-400 to-cyan-300 bg-clip-text text-transparent">
              Security Solutions
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Protect your digital infrastructure with our enterprise-grade cybersecurity services designed for modern businesses.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-8 hover:bg-slate-800/70 transition-all duration-300 group"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-teal-500/20 to-cyan-500/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-8 h-8 text-teal-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">{service.title}</h3>
                <p className="text-gray-300 mb-6 leading-relaxed">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center space-x-3">
                      <CheckCircle className="w-4 h-4 text-teal-400 flex-shrink-0" />
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button className="mt-6 flex items-center space-x-2 text-teal-400 hover:text-teal-300 transition-colors duration-200 group">
                  <span className="font-medium">Learn More</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Why Choose Us */}
        <div className="bg-gradient-to-r from-slate-800/50 to-blue-900/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 md:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold text-white mb-6">
                Why Choose DefendaX?
              </h3>
              <p className="text-gray-300 mb-8 leading-relaxed">
                With over a decade of experience in cybersecurity, we provide enterprise-grade protection that scales with your business needs.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-teal-500/20 rounded-lg flex items-center justify-center">
                    <Cloud className="w-6 h-6 text-teal-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">Cloud-Native Security</h4>
                    <p className="text-gray-400 text-sm">Built for modern cloud infrastructure</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-teal-500/20 rounded-lg flex items-center justify-center">
                    <Lock className="w-6 h-6 text-teal-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">Zero-Trust Architecture</h4>
                    <p className="text-gray-400 text-sm">Never trust, always verify approach</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-teal-500/20 rounded-lg flex items-center justify-center">
                    <Zap className="w-6 h-6 text-teal-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">AI-Powered Detection</h4>
                    <p className="text-gray-400 text-sm">Machine learning threat identification</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-slate-800/50 rounded-xl p-6 text-center">
                <div className="text-3xl font-bold text-teal-400 mb-2">99.9%</div>
                <div className="text-white font-medium mb-1">Uptime</div>
                <div className="text-gray-400 text-sm">Guaranteed availability</div>
              </div>
              <div className="bg-slate-800/50 rounded-xl p-6 text-center">
                <div className="text-3xl font-bold text-teal-400 mb-2">24/7</div>
                <div className="text-white font-medium mb-1">Support</div>
                <div className="text-gray-400 text-sm">Always available</div>
              </div>
              <div className="bg-slate-800/50 rounded-xl p-6 text-center">
                <div className="text-3xl font-bold text-teal-400 mb-2">500+</div>
                <div className="text-white font-medium mb-1">Clients</div>
                <div className="text-gray-400 text-sm">Trust our platform</div>
              </div>
              <div className="bg-slate-800/50 rounded-xl p-6 text-center">
                <div className="text-3xl font-bold text-teal-400 mb-2">&lt;2min</div>
                <div className="text-white font-medium mb-1">Response</div>
                <div className="text-gray-400 text-sm">Average detection time</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};