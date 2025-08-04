import React from 'react';
import Link from 'next/link';
import { Shield, ChevronRight, Play } from 'lucide-react';

export const HeroSection: React.FC = () => {
  return (
    <section id="home" className="relative min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 overflow-hidden">

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20 min-h-screen flex items-center">
        <div className="max-w-4xl">
          <div className="mb-8">
            <div className="inline-flex items-center space-x-2 bg-teal-500/20 backdrop-blur-sm border border-teal-500/30 rounded-full px-4 py-2 text-teal-300 text-sm font-medium">
              <Shield className="w-4 h-4" />
              <span>Next-Generation Cloud Security</span>
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            DefendaX
            <span className="block bg-gradient-to-r from-teal-400 to-cyan-300 bg-clip-text text-transparent">
              AI Security Platform
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl leading-relaxed">
            AI-powered cybersecurity platform with intelligent threat detection, network monitoring, automated incident response, and comprehensive reporting for your digital infrastructure.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Link 
              href="/register"
              className="bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 group"
            >
              <span>Get Started Free</span>
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
            <button className="border-2 border-teal-500 text-teal-400 hover:bg-teal-500 hover:text-white font-semibold px-8 py-4 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 group">
              <Play className="w-5 h-5" />
              <span>Watch Demo</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="text-3xl font-bold text-teal-400 mb-2">99.9%</div>
              <div className="text-white font-medium mb-1">Uptime</div>
              <div className="text-gray-400 text-sm">Enterprise-grade reliability</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="text-3xl font-bold text-teal-400 mb-2">24/7</div>
              <div className="text-white font-medium mb-1">Monitoring</div>
              <div className="text-gray-400 text-sm">Real-time threat detection</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="text-3xl font-bold text-teal-400 mb-2">500+</div>
              <div className="text-white font-medium mb-1">Enterprises</div>
              <div className="text-gray-400 text-sm">Trust our security</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="animate-bounce">
          <div className="w-6 h-10 border-2 border-teal-400 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-teal-400 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
};