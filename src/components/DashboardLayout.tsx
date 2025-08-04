import React, { useState } from 'react';
import { NetworkMonitorAPI } from '@/services/api';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { 
  Shield, 
  BarChart3, 
  AlertTriangle, 
  Network, 
  Users, 
  FileText, 
  Settings,
  Search,
  Bell,
  User,
  ChevronDown,
  Plus,
  LogOut,
  UserCircle,
  CreditCard
} from 'lucide-react';
import { ChatbotButton } from './ChatbotButton';
import { ChatbotAPI } from '@/services/api';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();
  const { user, profile, signOut } = useAuth();
  const { theme, resolvedTheme } = useTheme();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const navItems = [
    { label: 'Dashboard', href: '/dashboard', icon: BarChart3 },
    { label: 'Threat Detection', href: '/dashboard/threat-detection', icon: AlertTriangle },
    { label: 'Network Monitor', href: '/dashboard/network-monitor', icon: Network },
    { label: 'Incident Response', href: '/dashboard/incident-response', icon: Shield },
    { label: 'User Management', href: '/dashboard/user-management', icon: Users },
    { label: 'Reports', href: '/dashboard/reports', icon: FileText },
    { label: 'Settings', href: '/dashboard/settings', icon: Settings },
  ];

  const handleSignOut = async () => {
    await signOut();
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-slate-900 flex">
      {/* Sidebar */}
      <div className="w-64 bg-slate-800 border-r border-slate-700 flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-slate-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-lg flex items-center justify-center shadow-lg">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-teal-400 to-cyan-300 bg-clip-text text-transparent">
                DefendaX Dashboard
              </h1>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-teal-500/20 to-cyan-500/20 text-teal-400 border border-teal-500/30'
                    : 'text-gray-300 hover:bg-slate-700 hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Add Button */}
        <div className="p-4 border-t border-slate-700">
          <button className="w-12 h-12 bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 rounded-full flex items-center justify-center shadow-lg transition-all duration-200">
            <Plus className="w-6 h-6 text-white" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-slate-800 border-b border-slate-700 px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Search */}
            <div className="relative max-w-md w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search threats, logs..."
                className="w-full pl-10 pr-4 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 text-white placeholder-gray-400"
              />
            </div>

            {/* User Menu */}
            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-400 hover:text-white transition-colors duration-200">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>

              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-3 p-2 rounded-lg hover:bg-slate-700 transition-colors duration-200"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-medium text-white">
                      {profile?.full_name || user?.email || 'User'}
                    </div>
                    <div className="text-xs text-gray-400">
                      {user?.email || 'Security Admin'}
                    </div>
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </button>

                {/* Dropdown Menu */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-slate-800 border border-slate-700 rounded-xl shadow-2xl z-50">
                    {/* User Info Header */}
                    <div className="p-4 border-b border-slate-700">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-full flex items-center justify-center">
                          <User className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <div className="text-white font-medium">
                            {profile?.full_name || user?.email || 'User'}
                          </div>
                          <div className="text-gray-400 text-sm">
                            {user?.email || 'Security Admin'}
                          </div>
                          <div className="text-teal-400 text-xs font-mono">
                            ID: {user?.id?.slice(0, 8) || 'USR-2024-001'}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Menu Items */}
                    <div className="py-2">
                      <Link
                        href="/dashboard/settings"
                        className="w-full flex items-center space-x-3 px-4 py-3 text-gray-300 hover:bg-slate-700 hover:text-white transition-colors duration-200"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <UserCircle className="w-5 h-5" />
                        <span>Profile Settings</span>
                      </Link>
                      
                      <Link
                        href="/dashboard/settings"
                        className="w-full flex items-center space-x-3 px-4 py-3 text-gray-300 hover:bg-slate-700 hover:text-white transition-colors duration-200"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <Settings className="w-5 h-5" />
                        <span>Account Settings</span>
                      </Link>
                      
                    </div>

                    {/* Sign Out */}
                    <div className="border-t border-slate-700 py-2">
                      <button 
                        onClick={handleSignOut}
                        className="w-full flex items-center space-x-3 px-4 py-3 text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors duration-200"
                      >
                        <LogOut className="w-5 h-5" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
        
        {/* Chatbot Button */}
        <ChatbotButton />
      </div>
    </div>
  );
};