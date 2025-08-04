import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Download, 
  Calendar, 
  Filter,
  BarChart3,
  TrendingUp,
  Shield,
  AlertTriangle,
  Clock,
  CheckCircle,
  Plus,
  Eye,
  Trash2
} from 'lucide-react';
import { ReportsAPI } from '../services/api';

export const ReportsPage: React.FC = () => {
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDateRange, setSelectedDateRange] = useState('last-30-days');
  const [selectedReportType, setSelectedReportType] = useState('security-overview');

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const reportHistory = await ReportsAPI.getReportHistory();
        setReports(reportHistory);
      } catch (error) {
        console.error('Failed to fetch reports:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  const handleGenerateReport = async () => {
    try {
      const dateRange = getDateRange(selectedDateRange);
      await ReportsAPI.generateReport(selectedReportType, dateRange);
      
      // Refresh report history
      const reportHistory = await ReportsAPI.getReportHistory();
      setReports(reportHistory);
    } catch (error) {
      console.error('Failed to generate report:', error);
    }
  };

  const handleDownloadReport = async (reportId: string) => {
    try {
      const blob = await ReportsAPI.downloadReport(reportId);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `report-${reportId}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Failed to download report:', error);
    }
  };

  const getDateRange = (range: string) => {
    const now = new Date();
    const start = new Date();
    
    switch (range) {
      case 'last-7-days':
        start.setDate(now.getDate() - 7);
        break;
      case 'last-30-days':
        start.setDate(now.getDate() - 30);
        break;
      case 'last-90-days':
        start.setDate(now.getDate() - 90);
        break;
      default:
        start.setDate(now.getDate() - 30);
    }
    
    return { start: start.toISOString(), end: now.toISOString() };
  };

  const reportTypes = [
    { value: 'security-overview', label: 'Security Overview', icon: Shield },
    { value: 'threat-analysis', label: 'Threat Analysis', icon: AlertTriangle },
    { value: 'incident-summary', label: 'Incident Summary', icon: FileText },
    { value: 'compliance-audit', label: 'Compliance Audit', icon: CheckCircle },
    { value: 'performance-metrics', label: 'Performance Metrics', icon: TrendingUp }
  ];

  const dateRanges = [
    { value: 'last-7-days', label: 'Last 7 Days' },
    { value: 'last-30-days', label: 'Last 30 Days' },
    { value: 'last-90-days', label: 'Last 90 Days' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Reports</h1>
        <button 
          onClick={handleGenerateReport}
          className="bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Generate Report</span>
        </button>
      </div>

      {/* Report Generation */}
      <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
        <h3 className="text-xl font-semibold text-white mb-6">Generate New Report</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">Report Type</label>
            <select 
              value={selectedReportType}
              onChange={(e) => setSelectedReportType(e.target.value)}
              className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white"
            >
              {reportTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">Date Range</label>
            <select 
              value={selectedDateRange}
              onChange={(e) => setSelectedDateRange(e.target.value)}
              className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white"
            >
              {dateRanges.map((range) => (
                <option key={range.value} value={range.value}>
                  {range.label}
                </option>
              ))}
            </select>
          </div>
          
          <div className="flex items-end">
            <button 
              onClick={handleGenerateReport}
              className="w-full bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
            >
              <BarChart3 className="w-4 h-4" />
              <span>Generate</span>
            </button>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-gray-400 text-sm">Total Reports</p>
              <p className="text-3xl font-bold text-white">47</p>
            </div>
            <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-blue-400" />
            </div>
          </div>
        </div>

        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-gray-400 text-sm">This Month</p>
              <p className="text-3xl font-bold text-white">12</p>
            </div>
            <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-400" />
            </div>
          </div>
        </div>

        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-gray-400 text-sm">Scheduled</p>
              <p className="text-3xl font-bold text-white">8</p>
            </div>
            <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-yellow-400" />
            </div>
          </div>
        </div>

        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-gray-400 text-sm">Downloads</p>
              <p className="text-3xl font-bold text-white">156</p>
            </div>
            <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
              <Download className="w-6 h-6 text-purple-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Report History */}
      <div className="bg-slate-800 rounded-xl border border-slate-700">
        <div className="p-6 border-b border-slate-700 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white">Report History</h2>
          <div className="flex space-x-2">
            <button className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2">
              <Filter className="w-4 h-4" />
              <span>Filter</span>
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-700/50">
              <tr>
                <th className="text-left p-4 text-gray-300 font-medium">REPORT NAME</th>
                <th className="text-left p-4 text-gray-300 font-medium">TYPE</th>
                <th className="text-left p-4 text-gray-300 font-medium">DATE RANGE</th>
                <th className="text-left p-4 text-gray-300 font-medium">GENERATED</th>
                <th className="text-left p-4 text-gray-300 font-medium">STATUS</th>
                <th className="text-left p-4 text-gray-300 font-medium">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              <tr className="hover:bg-slate-700/30 transition-colors duration-200">
                <td className="p-4">
                  <div>
                    <p className="text-white font-medium">Monthly Security Overview</p>
                    <p className="text-gray-400 text-sm">Comprehensive security analysis</p>
                  </div>
                </td>
                <td className="p-4">
                  <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded-lg text-sm font-medium">
                    Security Overview
                  </span>
                </td>
                <td className="p-4 text-gray-300">Jan 1 - Jan 31, 2024</td>
                <td className="p-4 text-gray-300">2 hours ago</td>
                <td className="p-4">
                  <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded-lg text-sm font-medium">
                    Ready
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => handleDownloadReport('report-001')}
                      className="p-1 text-blue-400 hover:text-blue-300 transition-colors duration-200"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                    <button className="p-1 text-green-400 hover:text-green-300 transition-colors duration-200">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-1 text-red-400 hover:text-red-300 transition-colors duration-200">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>

              <tr className="hover:bg-slate-700/30 transition-colors duration-200">
                <td className="p-4">
                  <div>
                    <p className="text-white font-medium">Threat Analysis Report</p>
                    <p className="text-gray-400 text-sm">Detailed threat landscape analysis</p>
                  </div>
                </td>
                <td className="p-4">
                  <span className="px-2 py-1 bg-red-500/20 text-red-400 rounded-lg text-sm font-medium">
                    Threat Analysis
                  </span>
                </td>
                <td className="p-4 text-gray-300">Dec 15 - Jan 15, 2024</td>
                <td className="p-4 text-gray-300">1 day ago</td>
                <td className="p-4">
                  <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded-lg text-sm font-medium">
                    Processing
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex space-x-2">
                    <button className="p-1 text-gray-400 cursor-not-allowed">
                      <Download className="w-4 h-4" />
                    </button>
                    <button className="p-1 text-green-400 hover:text-green-300 transition-colors duration-200">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-1 text-red-400 hover:text-red-300 transition-colors duration-200">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>

              <tr className="hover:bg-slate-700/30 transition-colors duration-200">
                <td className="p-4">
                  <div>
                    <p className="text-white font-medium">Compliance Audit Report</p>
                    <p className="text-gray-400 text-sm">SOC 2 compliance assessment</p>
                  </div>
                </td>
                <td className="p-4">
                  <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded-lg text-sm font-medium">
                    Compliance Audit
                  </span>
                </td>
                <td className="p-4 text-gray-300">Q4 2023</td>
                <td className="p-4 text-gray-300">3 days ago</td>
                <td className="p-4">
                  <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded-lg text-sm font-medium">
                    Ready
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => handleDownloadReport('report-003')}
                      className="p-1 text-blue-400 hover:text-blue-300 transition-colors duration-200"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                    <button className="p-1 text-green-400 hover:text-green-300 transition-colors duration-200">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-1 text-red-400 hover:text-red-300 transition-colors duration-200">
                      <Trash2 className="w-4 h-4" />
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