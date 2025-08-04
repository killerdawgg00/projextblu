import React from 'react';
import { 
  AlertTriangle, 
  Shield, 
  Activity, 
  TrendingUp,
  Search,
  Ban,
  FileText,
  Settings,
  BarChart3,
  Network,
  Clock,
  CheckCircle,
  AlertCircle,
  Info,
  Loader2
} from 'lucide-react';
import { DashboardAPI } from '../services/api';
import { useEffect, useState } from 'react';
import { NetworkMonitorAPI } from '@/services/api';

// Skeleton loading component
const SkeletonCard = () => (
  <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 animate-pulse">
    <div className="flex items-center justify-between mb-4">
      <div className="space-y-2">
        <div className="h-4 bg-slate-700 rounded w-24"></div>
        <div className="h-8 bg-slate-700 rounded w-16"></div>
        <div className="h-3 bg-slate-700 rounded w-20"></div>
      </div>
      <div className="w-12 h-12 bg-slate-700 rounded-lg"></div>
    </div>
  </div>
);

export const DashboardPage: React.FC = () => {
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setError(null);
        
        // Use Promise.allSettled to handle partial failures gracefully
        const results = await Promise.allSettled([
          DashboardAPI.getOverviewStats(),
          DashboardAPI.getSecurityFeed(),
          DashboardAPI.getNetworkOverview()
        ]);
        
        const [overviewStats, securityFeed, networkOverview] = results.map(result => 
          result.status === 'fulfilled' ? result.value : null
        );
        
        setDashboardData({
          overview: overviewStats,
          securityFeed,
          network: networkOverview
        });
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
        setError('Failed to load dashboard data');
        // Use fallback data for better UX
        setDashboardData({
          overview: { activeThreats: 23, blockedAttacks: 1247, systemHealth: 98.5, riskScore: 'Medium' },
          securityFeed: [],
          network: { status: 'Healthy', devices: 247, bandwidth: 78 }
        });
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
    
    // Reduced polling frequency for better performance
    const interval = setInterval(fetchDashboardData, 60000); // Update every minute
    
    return () => clearInterval(interval);
  }, []);

  // Show skeleton loading
  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="bg-slate-800 rounded-xl p-6 border border-slate-700 animate-pulse">
              <div className="h-6 bg-slate-700 rounded w-48 mb-6"></div>
              <div className="h-64 bg-slate-700 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Error Banner */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
          <div className="flex items-center space-x-3">
            <AlertTriangle className="w-5 h-5 text-red-400" />
            <span className="text-red-400">{error}</span>
          </div>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-gray-400 text-sm">Active Threats</p>
              <p className="text-3xl font-bold text-white">23</p>
              <p className="text-red-400 text-sm">+3 from yesterday</p>
            </div>
            <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-red-400" />
            </div>
          </div>
        </div>

        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-gray-400 text-sm">Blocked Attacks</p>
              <p className="text-3xl font-bold text-white">1,247</p>
              <p className="text-green-400 text-sm">+12% this week</p>
            </div>
            <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6 text-green-400" />
            </div>
          </div>
        </div>

        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-gray-400 text-sm">System Health</p>
              <p className="text-3xl font-bold text-white">98.5%</p>
              <p className="text-blue-400 text-sm">All systems operational</p>
            </div>
            <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <Activity className="w-6 h-6 text-blue-400" />
            </div>
          </div>
        </div>

        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-gray-400 text-sm">Risk Score</p>
              <p className="text-3xl font-bold text-yellow-400">Medium</p>
              <p className="text-gray-400 text-sm">Score: 6.2/10</p>
            </div>
            <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-yellow-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Threat Activity Timeline */}
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-white">Threat Activity Timeline</h3>
            <div className="flex space-x-2">
              <button className="px-3 py-1 bg-teal-500/20 text-teal-400 rounded-lg text-sm">24H</button>
              <button className="px-3 py-1 text-gray-400 hover:text-white rounded-lg text-sm">7D</button>
              <button className="px-3 py-1 text-gray-400 hover:text-white rounded-lg text-sm">30D</button>
            </div>
          </div>
          <div className="h-64 bg-slate-900/50 rounded-lg flex items-center justify-center">
            <BarChart3 className="w-16 h-16 text-gray-600" />
          </div>
        </div>

        {/* Attack Types */}
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <h3 className="text-xl font-semibold text-white mb-6">Attack Types</h3>
          <div className="h-64 bg-slate-900/50 rounded-lg flex items-center justify-center">
            <div className="w-32 h-32 border-8 border-teal-500 rounded-full flex items-center justify-center">
              <span className="text-gray-400">Chart</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Live Security Feed */}
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <h3 className="text-xl font-semibold text-white mb-6">Live Security Feed</h3>
          <div className="space-y-4">
            <div className="flex items-start space-x-3 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5" />
              <div className="flex-1">
                <p className="text-red-400 font-medium">Critical: Brute Force Attack Detected</p>
                <p className="text-gray-400 text-sm">Source IP: 192.168.1.100 targeting SSH service</p>
                <p className="text-gray-500 text-xs">2 minutes ago</p>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
              <AlertCircle className="w-5 h-5 text-yellow-400 mt-0.5" />
              <div className="flex-1">
                <p className="text-yellow-400 font-medium">Warning: Suspicious File Detected</p>
                <p className="text-gray-400 text-sm">Malware signature found in uploaded file</p>
                <p className="text-gray-500 text-xs">5 minutes ago</p>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
              <div className="flex-1">
                <p className="text-green-400 font-medium">Success: Threat Neutralized</p>
                <p className="text-gray-400 text-sm">DDoS attack successfully blocked</p>
                <p className="text-gray-500 text-xs">15 minutes ago</p>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
              <Info className="w-5 h-5 text-blue-400 mt-0.5" />
              <div className="flex-1">
                <p className="text-blue-400 font-medium">Info: Security Scan Completed</p>
                <p className="text-gray-400 text-sm">Weekly vulnerability scan finished</p>
                <p className="text-gray-500 text-xs">1 hour ago</p>
              </div>
            </div>
          </div>
        </div>

        {/* Network Overview */}
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <h3 className="text-xl font-semibold text-white mb-6">Network Overview</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                <span className="text-white">Firewall Status</span>
              </div>
              <span className="text-green-400 font-medium">Active</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                <span className="text-white">IDS/IPS</span>
              </div>
              <span className="text-green-400 font-medium">Monitoring</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                <span className="text-white">VPN Gateway</span>
              </div>
              <span className="text-yellow-400 font-medium">Warning</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                <span className="text-white">Endpoint Protection</span>
              </div>
              <span className="text-green-400 font-medium">Protected</span>
            </div>

            <div className="bg-slate-700/50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-400">Network Traffic</span>
                <Network className="w-5 h-5 text-teal-400" />
              </div>
              <div className="text-2xl font-bold text-white">2.4 GB/s</div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
        <h3 className="text-xl font-semibold text-white mb-6">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="flex flex-col items-center space-y-2 p-4 bg-slate-700/50 hover:bg-slate-700 rounded-lg transition-colors duration-200">
            <Search className="w-8 h-8 text-teal-400" />
            <span className="text-white font-medium">Run Scan</span>
          </button>
          <button className="flex flex-col items-center space-y-2 p-4 bg-slate-700/50 hover:bg-slate-700 rounded-lg transition-colors duration-200">
            <Ban className="w-8 h-8 text-red-400" />
            <span className="text-white font-medium">Block IP</span>
          </button>
          <button className="flex flex-col items-center space-y-2 p-4 bg-slate-700/50 hover:bg-slate-700 rounded-lg transition-colors duration-200">
            <FileText className="w-8 h-8 text-green-400" />
            <span className="text-white font-medium">Export Logs</span>
          </button>
          <button className="flex flex-col items-center space-y-2 p-4 bg-slate-700/50 hover:bg-slate-700 rounded-lg transition-colors duration-200">
            <Settings className="w-8 h-8 text-gray-400" />
            <span className="text-white font-medium">Settings</span>
          </button>
        </div>
      </div>
    </div>
  );
};