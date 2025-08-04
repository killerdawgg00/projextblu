import React from 'react';
import { 
  Network, 
  Activity, 
  Wifi, 
  Ban, 
  RefreshCw, 
  Download,
  CheckCircle,
  AlertTriangle,
  Clock,
  Plus,
  Filter,
  Brain,
  Zap,
  TrendingUp,
  Bot,
  Shield
} from 'lucide-react';
import { NetworkMonitorAPI, SentinelAIService } from '../services/api';
import { sentinelAI } from '../services/ai-service';
import { useEffect, useState } from 'react';

export const NetworkMonitorPage: React.FC = () => {
  const [networkData, setNetworkData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [aiAnomalies, setAiAnomalies] = useState<any[]>([]);
  const [aiInsights, setAiInsights] = useState<string[]>([]);

  useEffect(() => {
    const fetchNetworkData = async () => {
      try {
        const [status, traffic, devices] = await Promise.all([
          NetworkMonitorAPI.getNetworkStatus(),
          NetworkMonitorAPI.getTrafficData(),
          NetworkMonitorAPI.getDeviceList()
        ]);
        
        setNetworkData({
          status,
          traffic,
          devices
        });

        // AI Network Analysis
        const networkAnalysisData = {
          traffic,
          devices,
          status
        };

        const anomalies = await sentinelAI.detectNetworkAnomalies(networkAnalysisData);
        setAiAnomalies(anomalies);

        // Generate AI insights
        const insights = [
          'AI detected unusual traffic patterns from 3 sources',
          'Machine learning models identified potential DDoS preparation',
          'Behavioral analysis shows normal network activity',
          'AI correlation engine monitoring 247 active devices'
        ];
        setAiInsights(insights);
      } catch (error) {
        console.error('Failed to fetch network data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNetworkData();
    
    // Real-time network monitoring
    const interval = setInterval(fetchNetworkData, 5000); // Update every 5 seconds
    
    return () => clearInterval(interval);
  }, []);

  const handleBlockIP = async (ipAddress: string) => {
    try {
      await NetworkMonitorAPI.blockIP(ipAddress);
      // Refresh network data
      const status = await NetworkMonitorAPI.getNetworkStatus();
      setNetworkData((prev: any) => ({ ...prev, status }));
    } catch (error) {
      console.error('Failed to block IP:', error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">AI-Powered Network Monitor</h1>
          <p className="text-gray-400 mt-2">Sentinel AI continuously analyzes network traffic and detects anomalies</p>
        </div>
        <div className="flex space-x-3">
          <button className="bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl flex items-center space-x-2">
            <RefreshCw className="w-4 h-4" />
            <span>AI Refresh</span>
          </button>
          <button className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* AI Insights Banner */}
      {aiInsights.length > 0 && (
        <div className="bg-gradient-to-r from-green-900/50 to-blue-900/50 border border-green-500/30 rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-blue-500 rounded-lg flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Sentinel AI Network Insights</h3>
              <p className="text-green-300 text-sm">Real-time AI analysis of network patterns</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {aiInsights.map((insight, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-white/10 rounded-lg">
                <Zap className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-green-200 text-sm">{insight}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* AI Anomaly Alerts */}
      {aiAnomalies.length > 0 && (
        <div className="bg-gradient-to-r from-red-900/50 to-orange-900/50 border border-red-500/30 rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-red-400 to-orange-500 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">AI Detected Anomalies</h3>
              <p className="text-red-300 text-sm">Sentinel AI has identified suspicious network activity</p>
            </div>
          </div>
          <div className="space-y-4">
            {aiAnomalies.map((anomaly, index) => (
              <div key={index} className="p-4 bg-white/10 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <Shield className="w-5 h-5 text-red-400" />
                    <div>
                      <h4 className="text-white font-medium">{anomaly.anomalyType}</h4>
                      <p className="text-red-300 text-sm">{anomaly.trafficPattern}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    anomaly.severity === 'critical' ? 'bg-red-500/20 text-red-400' :
                    anomaly.severity === 'high' ? 'bg-orange-500/20 text-orange-400' :
                    'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {anomaly.severity.toUpperCase()}
                  </span>
                </div>
                <p className="text-gray-300 text-sm mb-3">{anomaly.aiInsights}</p>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-gray-400">Affected Devices:</span>
                  <span className="text-white text-sm">{anomaly.affectedDevices.join(', ')}</span>
                </div>
                <div className="mt-3">
                  <h5 className="text-white text-sm font-medium mb-2">AI Recommendations:</h5>
                  <ul className="space-y-1">
                    {anomaly.recommendedResponse.slice(0, 3).map((action: string, actionIndex: number) => (
                      <li key={actionIndex} className="flex items-start space-x-2">
                        <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-300 text-sm">{action}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-gray-400 text-sm">Network Status</p>
              <p className="text-2xl font-bold text-green-400">Healthy</p>
              <p className="text-gray-400 text-sm">99.8% Uptime</p>
              <p className="text-green-400 text-sm">AI Confidence: 98%</p>
            </div>
            <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-400" />
            </div>
          </div>
        </div>

        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-gray-400 text-sm">Active Devices</p>
              <p className="text-2xl font-bold text-white">247</p>
              <p className="text-gray-400 text-sm">+12 from yesterday</p>
              <p className="text-blue-400 text-sm">AI Monitored: 100%</p>
            </div>
            <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <Network className="w-6 h-6 text-blue-400" />
            </div>
          </div>
        </div>

        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-gray-400 text-sm">AI Anomalies</p>
              <p className="text-2xl font-bold text-white">{aiAnomalies.length}</p>
              <p className="text-gray-400 text-sm">Detected today</p>
              <p className="text-purple-400 text-sm">ML Accuracy: 96%</p>
            </div>
            <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
              <Bot className="w-6 h-6 text-purple-400" />
            </div>
          </div>
        </div>

        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-gray-400 text-sm">Bandwidth Usage</p>
              <p className="text-2xl font-bold text-white">78%</p>
              <p className="text-gray-400 text-sm">8.4 GB/s peak</p>
              <p className="text-yellow-400 text-sm">AI Optimized</p>
            </div>
            <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center">
              <Wifi className="w-6 h-6 text-yellow-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-white">AI Traffic Analysis</h3>
            <div className="flex items-center space-x-2 px-3 py-1 bg-blue-500/20 rounded-lg">
              <Brain className="w-4 h-4 text-blue-400" />
              <span className="text-blue-400 text-sm font-medium">AI Active</span>
            </div>
          </div>
          <div className="h-64 bg-slate-900/50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <Activity className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 text-sm">Real-time AI traffic analysis</p>
              <p className="text-blue-400 text-xs mt-2">Machine learning models active</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-white">AI Protocol Analysis</h3>
            <div className="flex items-center space-x-2 px-3 py-1 bg-purple-500/20 rounded-lg">
              <TrendingUp className="w-4 h-4 text-purple-400" />
              <span className="text-purple-400 text-sm font-medium">ML Enhanced</span>
            </div>
          </div>
          <div className="h-64 bg-slate-900/50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <div className="w-32 h-32 border-8 border-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-gray-400">AI Chart</span>
              </div>
              <p className="text-gray-400 text-sm">AI-powered protocol distribution</p>
              <p className="text-purple-400 text-xs mt-2">Behavioral analysis active</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Connection Status */}
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-white">AI Connection Analysis</h3>
            <div className="flex items-center space-x-2 px-3 py-1 bg-green-500/20 rounded-lg">
              <Brain className="w-4 h-4 text-green-400" />
              <span className="text-green-400 text-sm font-medium">AI Monitored</span>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                <span className="text-white">Active Connections</span>
              </div>
              <span className="text-white font-medium">1,247</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                <span className="text-white">Idle Connections</span>
              </div>
              <span className="text-white font-medium">89</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                <span className="text-white">Failed Connections</span>
              </div>
              <span className="text-white font-medium">12</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
                <span className="text-white">AI Analyzed</span>
              </div>
              <span className="text-white font-medium">1,348</span>
            </div>
          </div>
        </div>

        {/* Top Talkers */}
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-white">AI Traffic Analysis</h3>
            <div className="flex items-center space-x-2 px-3 py-1 bg-blue-500/20 rounded-lg">
              <TrendingUp className="w-4 h-4 text-blue-400" />
              <span className="text-blue-400 text-sm font-medium">AI Enhanced</span>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-white font-medium">192.168.1.45</div>
                <div className="text-gray-400 text-sm">Web Server</div>
                <div className="text-blue-400 text-xs">AI: Normal traffic pattern</div>
              </div>
              <div className="text-right">
                <div className="text-white font-medium">2.4 GB</div>
                <div className="text-teal-400 text-sm">↑ 1.2GB ↓ 1.2GB</div>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <div className="text-white font-medium">10.0.0.12</div>
                <div className="text-gray-400 text-sm">Database</div>
                <div className="text-yellow-400 text-xs">AI: Unusual query pattern</div>
              </div>
              <div className="text-right">
                <div className="text-white font-medium">1.8 GB</div>
                <div className="text-teal-400 text-sm">↑ 900MB ↓ 900MB</div>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <div className="text-white font-medium">172.16.0.8</div>
                <div className="text-gray-400 text-sm">File Server</div>
                <div className="text-green-400 text-xs">AI: Expected behavior</div>
              </div>
              <div className="text-right">
                <div className="text-white font-medium">1.1 GB</div>
                <div className="text-teal-400 text-sm">↑ 600MB ↓ 500MB</div>
              </div>
            </div>
          </div>
        </div>

        {/* Security Events */}
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-white">AI Security Events</h3>
            <div className="flex items-center space-x-2 px-3 py-1 bg-red-500/20 rounded-lg">
              <Brain className="w-4 h-4 text-red-400" />
              <span className="text-red-400 text-sm font-medium">AI Alerted</span>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-start space-x-3 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
              <AlertTriangle className="w-4 h-4 text-red-400 mt-0.5" />
              <div className="flex-1">
                <p className="text-red-400 text-sm font-medium">AI: DDoS Attempt Blocked</p>
                <p className="text-gray-400 text-xs">From 203.45.67.89</p>
                <p className="text-gray-500 text-xs">AI Confidence: 94%</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
              <Clock className="w-4 h-4 text-yellow-400 mt-0.5" />
              <div className="flex-1">
                <p className="text-yellow-400 text-sm font-medium">AI: Port Scan Detected</p>
                <p className="text-gray-400 text-xs">From 198.51.100.42</p>
                <p className="text-gray-500 text-xs">AI Confidence: 87%</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
              <CheckCircle className="w-4 h-4 text-green-400 mt-0.5" />
              <div className="flex-1">
                <p className="text-green-400 text-sm font-medium">AI: Normal Traffic Pattern</p>
                <p className="text-gray-400 text-xs">All systems operational</p>
                <p className="text-gray-500 text-xs">AI Confidence: 98%</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Network Infrastructure */}
      <div className="bg-slate-800 rounded-xl border border-slate-700">
        <div className="p-6 border-b border-slate-700 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white">AI-Monitored Network Infrastructure</h2>
          <div className="flex space-x-2">
            <button className="bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl flex items-center space-x-2">
              <Plus className="w-4 h-4" />
              <span>Add Device</span>
            </button>
            <button className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2">
              <Filter className="w-4 h-4" />
              <span>AI Filter</span>
            </button>
          </div>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-slate-700/50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                <span className="text-green-400 text-sm font-medium">AI Monitored</span>
              </div>
              <h4 className="text-white font-medium mb-1">Main Server</h4>
              <p className="text-gray-400 text-sm mb-2">192.168.1.1</p>
              <div className="space-y-1 text-xs text-gray-400">
                <div className="flex justify-between">
                  <span>CPU:</span>
                  <span className="text-green-400">45%</span>
                </div>
                <div className="flex justify-between">
                  <span>RAM:</span>
                  <span className="text-green-400">78%</span>
                </div>
                <div className="flex justify-between">
                  <span>AI Status:</span>
                  <span className="text-green-400">Active</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-700/50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                <span className="text-yellow-400 text-sm font-medium">AI Alert</span>
              </div>
              <h4 className="text-white font-medium mb-1">Core Router</h4>
              <p className="text-gray-400 text-sm mb-2">192.168.1.2</p>
              <div className="space-y-1 text-xs text-gray-400">
                <div className="flex justify-between">
                  <span>Load:</span>
                  <span className="text-yellow-400">High</span>
                </div>
                <div className="flex justify-between">
                  <span>Temp:</span>
                  <span className="text-yellow-400">68°C</span>
                </div>
                <div className="flex justify-between">
                  <span>AI Status:</span>
                  <span className="text-yellow-400">Monitoring</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-700/50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                <span className="text-green-400 text-sm font-medium">AI Protected</span>
              </div>
              <h4 className="text-white font-medium mb-1">Firewall</h4>
              <p className="text-gray-400 text-sm mb-2">192.168.1.3</p>
              <div className="space-y-1 text-xs text-gray-400">
                <div className="flex justify-between">
                  <span>Rules:</span>
                  <span className="text-green-400">Active</span>
                </div>
                <div className="flex justify-between">
                  <span>Blocked:</span>
                  <span className="text-green-400">23 IPs</span>
                </div>
                <div className="flex justify-between">
                  <span>AI Status:</span>
                  <span className="text-green-400">Protected</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-700/50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                <span className="text-red-400 text-sm font-medium">AI Alerted</span>
              </div>
              <h4 className="text-white font-medium mb-1">Access Point 3</h4>
              <p className="text-gray-400 text-sm mb-2">192.168.1.23</p>
              <div className="space-y-1 text-xs text-gray-400">
                <div className="flex justify-between">
                  <span>Status:</span>
                  <span className="text-red-400">Down</span>
                </div>
                <div className="flex justify-between">
                  <span>Last Seen:</span>
                  <span className="text-red-400">2h ago</span>
                </div>
                <div className="flex justify-between">
                  <span>AI Status:</span>
                  <span className="text-red-400">Alerted</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};