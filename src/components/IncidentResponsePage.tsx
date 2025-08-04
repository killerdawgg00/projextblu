import React from 'react';
import { 
  AlertTriangle, 
  Clock, 
  CheckCircle, 
  Plus, 
  RefreshCw, 
  Download,
  Eye,
  Edit,
  Trash2,
  User
} from 'lucide-react';
import { IncidentResponseAPI } from '../services/api';
import { useEffect, useState } from 'react';

export const IncidentResponsePage: React.FC = () => {
  const [incidents, setIncidents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIncidents = async () => {
      try {
        const incidentData = await IncidentResponseAPI.getIncidents();
        setIncidents(incidentData);
      } catch (error) {
        console.error('Failed to fetch incidents:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchIncidents();
    
    // Regular updates for incident status
    const interval = setInterval(fetchIncidents, 15000); // Update every 15 seconds
    
    return () => clearInterval(interval);
  }, []);

  const handleCreateIncident = async () => {
    try {
      const newIncident = {
        title: 'New Security Incident',
        priority: 'medium',
        category: 'investigation',
        description: 'Manual incident creation from dashboard'
      };
      
      await IncidentResponseAPI.createIncident(newIncident);
      // Refresh incidents
      const incidentData = await IncidentResponseAPI.getIncidents();
      setIncidents(incidentData);
    } catch (error) {
      console.error('Failed to create incident:', error);
    }
  };

  const handleResolveIncident = async (incidentId: string) => {
    try {
      await IncidentResponseAPI.resolveIncident(incidentId);
      // Refresh incidents
      const incidentData = await IncidentResponseAPI.getIncidents();
      setIncidents(incidentData);
    } catch (error) {
      console.error('Failed to resolve incident:', error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Incident Response</h1>
        <div className="flex space-x-3">
          <button 
            onClick={handleCreateIncident}
            className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>New Incident</span>
          </button>
          <button className="bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl flex items-center space-x-2">
            <RefreshCw className="w-4 h-4" />
            <span>Refresh</span>
          </button>
          <button className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-gray-400 text-sm">Critical Incidents</p>
              <p className="text-3xl font-bold text-white">3</p>
              <p className="text-red-400 text-sm">Requires immediate action</p>
            </div>
            <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-red-400" />
            </div>
          </div>
        </div>

        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-gray-400 text-sm">High Priority</p>
              <p className="text-3xl font-bold text-white">7</p>
              <p className="text-yellow-400 text-sm">Under investigation</p>
            </div>
            <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-yellow-400" />
            </div>
          </div>
        </div>

        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-gray-400 text-sm">Resolved Today</p>
              <p className="text-3xl font-bold text-white">15</p>
              <p className="text-green-400 text-sm">Average time: 2.3 hours</p>
            </div>
            <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-400" />
            </div>
          </div>
        </div>

        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-gray-400 text-sm">MTTR</p>
              <p className="text-3xl font-bold text-white">1.8h</p>
              <p className="text-blue-400 text-sm">Mean Time to Resolution</p>
            </div>
            <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-blue-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
        <div className="flex flex-wrap gap-4">
          <select className="bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white">
            <option>Status: All</option>
            <option>Open</option>
            <option>In Progress</option>
            <option>Resolved</option>
          </select>
          <select className="bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white">
            <option>Priority: All</option>
            <option>Critical</option>
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>
          <select className="bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white">
            <option>Category: All</option>
            <option>Malware</option>
            <option>Phishing</option>
            <option>DDoS</option>
            <option>Unauthorized Access</option>
          </select>
          <select className="bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white">
            <option>Assigned: All</option>
            <option>John Doe</option>
            <option>Jane Smith</option>
            <option>Mike Johnson</option>
          </select>
        </div>
      </div>

      {/* Active Incidents Table */}
      <div className="bg-slate-800 rounded-xl border border-slate-700">
        <div className="p-6 border-b border-slate-700">
          <h2 className="text-xl font-semibold text-white">Active Incidents</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-700/50">
              <tr>
                <th className="text-left p-4 text-gray-300 font-medium">ID</th>
                <th className="text-left p-4 text-gray-300 font-medium">TITLE</th>
                <th className="text-left p-4 text-gray-300 font-medium">PRIORITY</th>
                <th className="text-left p-4 text-gray-300 font-medium">STATUS</th>
                <th className="text-left p-4 text-gray-300 font-medium">CATEGORY</th>
                <th className="text-left p-4 text-gray-300 font-medium">ASSIGNED</th>
                <th className="text-left p-4 text-gray-300 font-medium">CREATED</th>
                <th className="text-left p-4 text-gray-300 font-medium">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              <tr className="hover:bg-slate-700/30 transition-colors duration-200">
                <td className="p-4">
                  <span className="text-teal-400 font-mono text-sm">#INC-2024-001</span>
                </td>
                <td className="p-4">
                  <div>
                    <p className="text-white font-medium">Suspicious Network Activity Detected</p>
                    <p className="text-gray-400 text-sm">Multiple failed login attempts from external IP</p>
                  </div>
                </td>
                <td className="p-4">
                  <span className="px-2 py-1 bg-red-500/20 text-red-400 rounded-lg text-sm font-medium">
                    Critical
                  </span>
                </td>
                <td className="p-4">
                  <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded-lg text-sm font-medium">
                    In Progress
                  </span>
                </td>
                <td className="p-4 text-gray-300">Unauthorized Access</td>
                <td className="p-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-full flex items-center justify-center">
                      <User className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-white text-sm">John Doe</span>
                  </div>
                </td>
                <td className="p-4 text-gray-300">2 hours ago</td>
                <td className="p-4">
                  <div className="flex space-x-2">
                    <button className="p-1 text-blue-400 hover:text-blue-300 transition-colors duration-200">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-1 text-green-400 hover:text-green-300 transition-colors duration-200">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="p-1 text-green-400 hover:text-green-300 transition-colors duration-200">
                      <CheckCircle className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>

              <tr className="hover:bg-slate-700/30 transition-colors duration-200">
                <td className="p-4">
                  <span className="text-teal-400 font-mono text-sm">#INC-2024-002</span>
                </td>
                <td className="p-4">
                  <div>
                    <p className="text-white font-medium">Malware Detected on Workstation</p>
                    <p className="text-gray-400 text-sm">Trojan.Win32.Generic found on WS-045</p>
                  </div>
                </td>
                <td className="p-4">
                  <span className="px-2 py-1 bg-red-500/20 text-red-400 rounded-lg text-sm font-medium">
                    Critical
                  </span>
                </td>
                <td className="p-4">
                  <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded-lg text-sm font-medium">
                    Open
                  </span>
                </td>
                <td className="p-4 text-gray-300">Malware</td>
                <td className="p-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-full flex items-center justify-center">
                      <User className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-white text-sm">Jane Smith</span>
                  </div>
                </td>
                <td className="p-4 text-gray-300">4 hours ago</td>
                <td className="p-4">
                  <div className="flex space-x-2">
                    <button className="p-1 text-blue-400 hover:text-blue-300 transition-colors duration-200">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-1 text-green-400 hover:text-green-300 transition-colors duration-200">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="p-1 text-green-400 hover:text-green-300 transition-colors duration-200">
                      <CheckCircle className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>

              <tr className="hover:bg-slate-700/30 transition-colors duration-200">
                <td className="p-4">
                  <span className="text-teal-400 font-mono text-sm">#INC-2024-003</span>
                </td>
                <td className="p-4">
                  <div>
                    <p className="text-white font-medium">DDoS Attack Mitigated</p>
                    <p className="text-gray-400 text-sm">High volume traffic from botnet sources</p>
                  </div>
                </td>
                <td className="p-4">
                  <span className="px-2 py-1 bg-orange-500/20 text-orange-400 rounded-lg text-sm font-medium">
                    High
                  </span>
                </td>
                <td className="p-4">
                  <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded-lg text-sm font-medium">
                    Resolved
                  </span>
                </td>
                <td className="p-4 text-gray-300">DDoS</td>
                <td className="p-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-full flex items-center justify-center">
                      <User className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-white text-sm">Mike Johnson</span>
                  </div>
                </td>
                <td className="p-4 text-gray-300">6 hours ago</td>
                <td className="p-4">
                  <div className="flex space-x-2">
                    <button className="p-1 text-blue-400 hover:text-blue-300 transition-colors duration-200">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-1 text-green-400 hover:text-green-300 transition-colors duration-200">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="p-1 text-red-400 hover:text-red-300 transition-colors duration-200">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>

              <tr className="hover:bg-slate-700/30 transition-colors duration-200">
                <td className="p-4">
                  <span className="text-teal-400 font-mono text-sm">#INC-2024-004</span>
                </td>
                <td className="p-4">
                  <div>
                    <p className="text-white font-medium">Phishing Email Campaign</p>
                    <p className="text-gray-400 text-sm">Targeted attack on finance department</p>
                  </div>
                </td>
                <td className="p-4">
                  <span className="px-2 py-1 bg-orange-500/20 text-orange-400 rounded-lg text-sm font-medium">
                    High
                  </span>
                </td>
                <td className="p-4">
                  <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded-lg text-sm font-medium">
                    In Progress
                  </span>
                </td>
                <td className="p-4 text-gray-300">Phishing</td>
                <td className="p-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-full flex items-center justify-center">
                      <User className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-white text-sm">Sarah Wilson</span>
                  </div>
                </td>
                <td className="p-4 text-gray-300">1 day ago</td>
                <td className="p-4">
                  <div className="flex space-x-2">
                    <button className="p-1 text-blue-400 hover:text-blue-300 transition-colors duration-200">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-1 text-green-400 hover:text-green-300 transition-colors duration-200">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="p-1 text-green-400 hover:text-green-300 transition-colors duration-200">
                      <CheckCircle className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>

              <tr className="hover:bg-slate-700/30 transition-colors duration-200">
                <td className="p-4">
                  <span className="text-teal-400 font-mono text-sm">#INC-2024-005</span>
                </td>
                <td className="p-4">
                  <div>
                    <p className="text-white font-medium">Unauthorized Access Attempt</p>
                    <p className="text-gray-400 text-sm">Failed admin login from unknown location</p>
                  </div>
                </td>
                <td className="p-4">
                  <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded-lg text-sm font-medium">
                    Medium
                  </span>
                </td>
                <td className="p-4">
                  <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded-lg text-sm font-medium">
                    Open
                  </span>
                </td>
                <td className="p-4 text-gray-300">Unauthorized Access</td>
                <td className="p-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-full flex items-center justify-center">
                      <User className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-white text-sm">David Brown</span>
                  </div>
                </td>
                <td className="p-4 text-gray-300">2 days ago</td>
                <td className="p-4">
                  <div className="flex space-x-2">
                    <button className="p-1 text-blue-400 hover:text-blue-300 transition-colors duration-200">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-1 text-green-400 hover:text-green-300 transition-colors duration-200">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="p-1 text-green-400 hover:text-green-300 transition-colors duration-200">
                      <CheckCircle className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};