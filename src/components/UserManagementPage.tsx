import React from 'react';
import { 
  Users, 
  UserCheck, 
  UserX, 
  UserPlus, 
  Search, 
  Download, 
  Upload,
  Eye,
  Edit,
  Ban,
  CheckCircle,
  Clock,
  AlertTriangle
} from 'lucide-react';

export const UserManagementPage: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">User Management</h1>
        <div className="flex space-x-3">
          <button className="bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl flex items-center space-x-2">
            <UserPlus className="w-4 h-4" />
            <span>Add User</span>
          </button>
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2">
            <Upload className="w-4 h-4" />
            <span>Import</span>
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
              <p className="text-gray-400 text-sm">Total Users</p>
              <p className="text-3xl font-bold text-white">247</p>
              <p className="text-blue-400 text-sm">+12 this month</p>
            </div>
            <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-400" />
            </div>
          </div>
        </div>

        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-gray-400 text-sm">Active Users</p>
              <p className="text-3xl font-bold text-white">231</p>
              <p className="text-green-400 text-sm">93.5% of total</p>
            </div>
            <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
              <UserCheck className="w-6 h-6 text-green-400" />
            </div>
          </div>
        </div>

        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-gray-400 text-sm">Pending</p>
              <p className="text-3xl font-bold text-white">8</p>
              <p className="text-yellow-400 text-sm">Awaiting activation</p>
            </div>
            <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-yellow-400" />
            </div>
          </div>
        </div>

        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-gray-400 text-sm">Suspended</p>
              <p className="text-3xl font-bold text-white">8</p>
              <p className="text-red-400 text-sm">Security violations</p>
            </div>
            <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center">
              <UserX className="w-6 h-6 text-red-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
        <div className="flex flex-wrap gap-4 items-center">
          <select className="bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white">
            <option>Status: All</option>
            <option>Active</option>
            <option>Pending</option>
            <option>Suspended</option>
          </select>
          <select className="bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white">
            <option>Role: All</option>
            <option>Security Admin</option>
            <option>SOC Analyst</option>
            <option>SOC Manager</option>
            <option>Incident Responder</option>
            <option>User</option>
          </select>
          <select className="bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white">
            <option>Department: All</option>
            <option>IT Security</option>
            <option>Finance</option>
            <option>HR</option>
            <option>Operations</option>
          </select>
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search users..."
              className="w-full pl-10 pr-4 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 text-white placeholder-gray-400"
            />
          </div>
          <button className="bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl flex items-center space-x-2">
            <Search className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Users Directory */}
      <div className="bg-slate-800 rounded-xl border border-slate-700">
        <div className="p-6 border-b border-slate-700">
          <h2 className="text-xl font-semibold text-white">Users Directory</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-700/50">
              <tr>
                <th className="text-left p-4 text-gray-300 font-medium">USER</th>
                <th className="text-left p-4 text-gray-300 font-medium">ROLE</th>
                <th className="text-left p-4 text-gray-300 font-medium">DEPARTMENT</th>
                <th className="text-left p-4 text-gray-300 font-medium">STATUS</th>
                <th className="text-left p-4 text-gray-300 font-medium">LAST LOGIN</th>
                <th className="text-left p-4 text-gray-300 font-medium">MFA</th>
                <th className="text-left p-4 text-gray-300 font-medium">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              <tr className="hover:bg-slate-700/30 transition-colors duration-200">
                <td className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-medium text-sm">JD</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">John Doe</p>
                      <p className="text-gray-400 text-sm">john.doe@company.com</p>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <span className="px-2 py-1 bg-purple-500/20 text-purple-400 rounded-lg text-sm font-medium">
                    Security Admin
                  </span>
                </td>
                <td className="p-4 text-gray-300">IT Security</td>
                <td className="p-4">
                  <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded-lg text-sm font-medium">
                    Active
                  </span>
                </td>
                <td className="p-4 text-gray-300">2 minutes ago</td>
                <td className="p-4">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                </td>
                <td className="p-4">
                  <div className="flex space-x-2">
                    <button className="p-1 text-blue-400 hover:text-blue-300 transition-colors duration-200">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-1 text-green-400 hover:text-green-300 transition-colors duration-200">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="p-1 text-red-400 hover:text-red-300 transition-colors duration-200">
                      <Ban className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>

              <tr className="hover:bg-slate-700/30 transition-colors duration-200">
                <td className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-medium text-sm">JS</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">Jane Smith</p>
                      <p className="text-gray-400 text-sm">jane.smith@company.com</p>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded-lg text-sm font-medium">
                    SOC Analyst
                  </span>
                </td>
                <td className="p-4 text-gray-300">IT Security</td>
                <td className="p-4">
                  <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded-lg text-sm font-medium">
                    Active
                  </span>
                </td>
                <td className="p-4 text-gray-300">15 minutes ago</td>
                <td className="p-4">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                </td>
                <td className="p-4">
                  <div className="flex space-x-2">
                    <button className="p-1 text-blue-400 hover:text-blue-300 transition-colors duration-200">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-1 text-green-400 hover:text-green-300 transition-colors duration-200">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="p-1 text-red-400 hover:text-red-300 transition-colors duration-200">
                      <Ban className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>

              <tr className="hover:bg-slate-700/30 transition-colors duration-200">
                <td className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-medium text-sm">MJ</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">Mike Johnson</p>
                      <p className="text-gray-400 text-sm">mike.johnson@company.com</p>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded-lg text-sm font-medium">
                    SOC Manager
                  </span>
                </td>
                <td className="p-4 text-gray-300">IT Security</td>
                <td className="p-4">
                  <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded-lg text-sm font-medium">
                    Active
                  </span>
                </td>
                <td className="p-4 text-gray-300">1 hour ago</td>
                <td className="p-4">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                </td>
                <td className="p-4">
                  <div className="flex space-x-2">
                    <button className="p-1 text-blue-400 hover:text-blue-300 transition-colors duration-200">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-1 text-green-400 hover:text-green-300 transition-colors duration-200">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="p-1 text-red-400 hover:text-red-300 transition-colors duration-200">
                      <Ban className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>

              <tr className="hover:bg-slate-700/30 transition-colors duration-200">
                <td className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-medium text-sm">SW</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">Sarah Wilson</p>
                      <p className="text-gray-400 text-sm">sarah.wilson@company.com</p>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <span className="px-2 py-1 bg-cyan-500/20 text-cyan-400 rounded-lg text-sm font-medium">
                    Incident Responder
                  </span>
                </td>
                <td className="p-4 text-gray-300">IT Security</td>
                <td className="p-4">
                  <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded-lg text-sm font-medium">
                    Pending
                  </span>
                </td>
                <td className="p-4 text-gray-300">Never</td>
                <td className="p-4">
                  <AlertTriangle className="w-5 h-5 text-red-400" />
                </td>
                <td className="p-4">
                  <div className="flex space-x-2">
                    <button className="p-1 text-blue-400 hover:text-blue-300 transition-colors duration-200">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-1 text-green-400 hover:text-green-300 transition-colors duration-200">
                      <CheckCircle className="w-4 h-4" />
                    </button>
                    <button className="p-1 text-red-400 hover:text-red-300 transition-colors duration-200">
                      <UserX className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>

              <tr className="hover:bg-slate-700/30 transition-colors duration-200">
                <td className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-medium text-sm">DB</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">David Brown</p>
                      <p className="text-gray-400 text-sm">david.brown@company.com</p>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <span className="px-2 py-1 bg-gray-500/20 text-gray-400 rounded-lg text-sm font-medium">
                    User
                  </span>
                </td>
                <td className="p-4 text-gray-300">Finance</td>
                <td className="p-4">
                  <span className="px-2 py-1 bg-red-500/20 text-red-400 rounded-lg text-sm font-medium">
                    Suspended
                  </span>
                </td>
                <td className="p-4 text-gray-300">3 days ago</td>
                <td className="p-4">
                  <AlertTriangle className="w-5 h-5 text-red-400" />
                </td>
                <td className="p-4">
                  <div className="flex space-x-2">
                    <button className="p-1 text-blue-400 hover:text-blue-300 transition-colors duration-200">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-1 text-green-400 hover:text-green-300 transition-colors duration-200">
                      <CheckCircle className="w-4 h-4" />
                    </button>
                    <button className="p-1 text-red-400 hover:text-red-300 transition-colors duration-200">
                      <UserX className="w-4 h-4" />
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