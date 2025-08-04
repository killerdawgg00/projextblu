import React from 'react';
import { 
  AlertTriangle, 
  Shield, 
  Search, 
  Download,
  Eye,
  Edit,
  CheckCircle,
  Brain,
  Zap,
  TrendingUp,
  Activity,
  Bot
} from 'lucide-react';
import { ThreatDetectionAPI, SentinelAIService } from '../services/api';
import { sentinelAI } from '../services/ai-service';
import { useEffect, useState } from 'react';

export const ThreatDetectionPage: React.FC = () => {
  const [threats, setThreats] = useState<any[]>([]);
  const [threatStats, setThreatStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [aiAnalysis, setAiAnalysis] = useState<any>(null);
  const [aiInsights, setAiInsights] = useState<string[]>([]);

  useEffect(() => {
    const fetchThreatData = async () => {
      try {
        const [activeThreats, stats] = await Promise.all([
          ThreatDetectionAPI.getActiveThreats(),
          ThreatDetectionAPI.getThreatStats()
        ]);
        
        setThreats(activeThreats);
        setThreatStats(stats);

        // AI Analysis of threats
        if (activeThreats.length > 0) {
          const aiResults = await Promise.all(
            activeThreats.map(threat => sentinelAI.analyzeThreat(threat))
          );
          setAiAnalysis(aiResults);
          
          // Generate AI insights
          const insights = [
            'AI detected 23% increase in sophisticated attack patterns',
            'Machine learning models identified new malware variants',
            'Behavioral analysis shows potential insider threat indicators',
            'Threat correlation engine linked 3 related incidents'
          ];
          setAiInsights(insights);
        }
      } catch (error) {
        console.error('Failed to fetch threat data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchThreatData();
    
    // Real-time updates for threat detection
    const interval = setInterval(fetchThreatData, 10000); // Update every 10 seconds
    
    return () => clearInterval(interval);
  }, []);

  const handleQuarantine = async (threatId: string) => {
    try {
      await ThreatDetectionAPI.quarantineThreat(threatId);
      // Refresh threat data
      const activeThreats = await ThreatDetectionAPI.getActiveThreats();
      setThreats(activeThreats);
    } catch (error) {
      console.error('Failed to quarantine threat:', error);
    }
  };

  const handleFullScan = async () => {
    try {
      await ThreatDetectionAPI.runFullScan();
      // Show success message or update UI
    } catch (error) {
      console.error('Failed to start full scan:', error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">AI-Powered Threat Detection</h1>
          <p className="text-gray-400 mt-2">Sentinel AI continuously monitors and analyzes threats in real-time</p>
        </div>
        <div className="flex space-x-3">
          <button 
            onClick={handleFullScan}
            className="bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl flex items-center space-x-2"
          >
            <Search className="w-4 h-4" />
            <span>AI Scan</span>
          </button>
          <button className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* AI Insights Banner */}
      {aiInsights.length > 0 && (
        <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 border border-blue-500/30 rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Sentinel AI Insights</h3>
              <p className="text-blue-300 text-sm">Real-time AI analysis and predictions</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {aiInsights.map((insight, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-white/10 rounded-lg">
                <Zap className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                <span className="text-blue-200 text-sm">{insight}</span>
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
              <p className="text-gray-400 text-sm">Critical Threats</p>
              <p className="text-3xl font-bold text-white">8</p>
              <p className="text-red-400 text-sm">AI Confidence: 94%</p>
            </div>
            <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-red-400" />
            </div>
          </div>
        </div>

        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-gray-400 text-sm">High Risk</p>
              <p className="text-3xl font-bold text-white">15</p>
              <p className="text-yellow-400 text-sm">AI Confidence: 87%</p>
            </div>
            <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6 text-yellow-400" />
            </div>
          </div>
        </div>

        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-gray-400 text-sm">AI Detected</p>
              <p className="text-3xl font-bold text-white">42</p>
              <p className="text-teal-400 text-sm">ML Accuracy: 96%</p>
            </div>
            <div className="w-12 h-12 bg-teal-500/20 rounded-lg flex items-center justify-center">
              <Bot className="w-6 h-6 text-teal-400" />
            </div>
          </div>
        </div>

        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-gray-400 text-sm">Resolved</p>
              <p className="text-3xl font-bold text-white">156</p>
              <p className="text-green-400 text-sm">Auto-Resolved: 78%</p>
            </div>
            <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-400" />
            </div>
          </div>
        </div>
      </div>

      {/* AI Analysis Cards */}
      {aiAnalysis && aiAnalysis.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <div className="flex items-center space-x-3 mb-4">
              <Brain className="w-6 h-6 text-blue-400" />
              <h3 className="text-xl font-semibold text-white">AI Threat Analysis</h3>
            </div>
            <div className="space-y-4">
              {aiAnalysis.slice(0, 3).map((analysis: any, index: number) => (
                <div key={index} className="p-4 bg-slate-700/50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white font-medium">{analysis.threatType}</span>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      analysis.riskScore > 80 ? 'bg-red-500/20 text-red-400' :
                      analysis.riskScore > 60 ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-green-500/20 text-green-400'
                    }`}>
                      Risk: {analysis.riskScore}/100
                    </span>
                  </div>
                  <p className="text-gray-300 text-sm mb-2">{analysis.aiAnalysis}</p>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-gray-400">Confidence:</span>
                    <span className="text-blue-400 text-sm font-medium">
                      {Math.round((1 - analysis.falsePositiveProbability) * 100)}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <div className="flex items-center space-x-3 mb-4">
              <TrendingUp className="w-6 h-6 text-purple-400" />
              <h3 className="text-xl font-semibold text-white">AI Recommendations</h3>
            </div>
            <div className="space-y-4">
              {aiAnalysis.slice(0, 3).map((analysis: any, index: number) => (
                <div key={index} className="p-4 bg-slate-700/50 rounded-lg">
                  <h4 className="text-white font-medium mb-2">{analysis.threatType} Actions</h4>
                  <ul className="space-y-1">
                    {analysis.recommendedActions.slice(0, 3).map((action: string, actionIndex: number) => (
                      <li key={actionIndex} className="flex items-start space-x-2">
                        <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-300 text-sm">{action}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Active Threats Table */}
      <div className="bg-slate-800 rounded-xl border border-slate-700">
        <div className="p-6 border-b border-slate-700 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white">Active Threats</h2>
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-2 px-3 py-1 bg-blue-500/20 rounded-lg">
              <Activity className="w-4 h-4 text-blue-400" />
              <span className="text-blue-400 text-sm font-medium">AI Monitoring</span>
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-700/50">
              <tr>
                <th className="text-left p-4 text-gray-300 font-medium">THREAT</th>
                <th className="text-left p-4 text-gray-300 font-medium">AI ANALYSIS</th>
                <th className="text-left p-4 text-gray-300 font-medium">SEVERITY</th>
                <th className="text-left p-4 text-gray-300 font-medium">SOURCE</th>
                <th className="text-left p-4 text-gray-300 font-medium">TIME</th>
                <th className="text-left p-4 text-gray-300 font-medium">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              <tr className="hover:bg-slate-700/30 transition-colors duration-200">
                <td className="p-4">
                  <div className="flex items-center space-x-3">
                    <AlertTriangle className="w-5 h-5 text-red-400" />
                    <div>
                      <span className="text-white font-medium">Trojan.Win32.Agent</span>
                      <div className="text-xs text-gray-400">AI Confidence: 94%</div>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <div className="text-sm text-gray-300">
                    <div className="flex items-center space-x-2 mb-1">
                      <Brain className="w-3 h-3 text-blue-400" />
                      <span className="text-blue-400">AI Detected</span>
                    </div>
                    <span className="text-xs">Behavioral analysis triggered</span>
                  </div>
                </td>
                <td className="p-4">
                  <span className="px-2 py-1 bg-red-500/20 text-red-400 rounded-lg text-sm font-medium">
                    Critical
                  </span>
                </td>
                <td className="p-4 text-gray-300">192.168.1.45</td>
                <td className="p-4 text-gray-300">2 min ago</td>
                <td className="p-4">
                  <span className="px-2 py-1 bg-red-500/20 text-red-400 rounded-lg text-sm font-medium">
                    Quarantine
                  </span>
                </td>
              </tr>
              
              <tr className="hover:bg-slate-700/30 transition-colors duration-200">
                <td className="p-4">
                  <div className="flex items-center space-x-3">
                    <Shield className="w-5 h-5 text-yellow-400" />
                    <div>
                      <span className="text-white font-medium">Suspicious Activity</span>
                      <div className="text-xs text-gray-400">AI Confidence: 87%</div>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <div className="text-sm text-gray-300">
                    <div className="flex items-center space-x-2 mb-1">
                      <Brain className="w-3 h-3 text-blue-400" />
                      <span className="text-blue-400">AI Detected</span>
                    </div>
                    <span className="text-xs">Anomaly pattern identified</span>
                  </div>
                </td>
                <td className="p-4">
                  <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded-lg text-sm font-medium">
                    High
                  </span>
                </td>
                <td className="p-4 text-gray-300">10.0.0.12</td>
                <td className="p-4 text-gray-300">5 min ago</td>
                <td className="p-4">
                  <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded-lg text-sm font-medium">
                    Investigate
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};