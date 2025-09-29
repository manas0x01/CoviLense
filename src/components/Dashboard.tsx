'use client'

import React, { useState } from 'react'
import { 
  Activity, 
  Shield, 
  AlertTriangle, 
  TrendingUp, 
  Users,
  Server,
  Clock,
  Eye
} from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts'

export const Dashboard: React.FC = () => {
  const [timeRange, setTimeRange] = useState('24h')

  // Dynamic data based on timeline
  const getTimelineData = () => {
    switch (timeRange) {
      case '1h':
        return {
          threatData: [
            { time: '00:00', threats: 3, blocked: 3 },
            { time: '10:00', threats: 1, blocked: 1 },
            { time: '20:00', threats: 2, blocked: 1 },
            { time: '30:00', threats: 4, blocked: 3 },
            { time: '40:00', threats: 2, blocked: 2 },
            { time: '50:00', threats: 3, blocked: 2 },
          ],
          stats: {
            totalThreats: 15,
            threatsBlocked: 12,
            activeAlerts: 3,
            systemUptime: '99.8%'
          },
          alertsByType: [
            { name: 'Malware', value: 5, color: '#FF4757' },
            { name: 'Suspicious Login', value: 4, color: '#FF6B35' },
            { name: 'Data Exfiltration', value: 2, color: '#8B5CF6' },
            { name: 'Network Anomaly', value: 4, color: '#00D9FF' },
          ],
          recentAlerts: [
            { id: 1, severity: 'high', title: 'Suspicious PowerShell Execution', source: 'WIN-SERVER-01', time: '2 min ago' },
            { id: 2, severity: 'medium', title: 'Failed Login Attempts', source: '192.168.1.45', time: '5 min ago' },
            { id: 3, severity: 'low', title: 'Port Scan Detected', source: '10.0.0.123', time: '12 min ago' }
          ]
        }
      case '24h':
        return {
          threatData: [
            { time: '00:00', threats: 12, blocked: 10 },
            { time: '04:00', threats: 8, blocked: 7 },
            { time: '08:00', threats: 24, blocked: 20 },
            { time: '12:00', threats: 18, blocked: 16 },
            { time: '16:00', threats: 32, blocked: 28 },
            { time: '20:00', threats: 15, blocked: 14 },
          ],
          stats: {
            totalThreats: 109,
            threatsBlocked: 95,
            activeAlerts: 14,
            systemUptime: '99.2%'
          },
          alertsByType: [
            { name: 'Malware', value: 45, color: '#FF4757' },
            { name: 'Suspicious Login', value: 32, color: '#FF6B35' },
            { name: 'Data Exfiltration', value: 18, color: '#8B5CF6' },
            { name: 'Network Anomaly', value: 25, color: '#00D9FF' },
          ],
          recentAlerts: [
            { id: 1, severity: 'high', title: 'Suspicious PowerShell Execution', source: 'WIN-SERVER-01', time: '2 min ago' },
            { id: 2, severity: 'medium', title: 'Failed Login Attempts', source: '192.168.1.45', time: '5 min ago' },
            { id: 3, severity: 'low', title: 'Port Scan Detected', source: '10.0.0.123', time: '12 min ago' },
            { id: 4, severity: 'high', title: 'Malicious File Upload', source: 'WEB-SERVER-02', time: '18 min ago' }
          ]
        }
      case '7d':
        return {
          threatData: [
            { time: 'Mon', threats: 234, blocked: 198 },
            { time: 'Tue', threats: 189, blocked: 165 },
            { time: 'Wed', threats: 312, blocked: 278 },
            { time: 'Thu', threats: 278, blocked: 245 },
            { time: 'Fri', threats: 445, blocked: 389 },
            { time: 'Sat', threats: 156, blocked: 142 },
            { time: 'Sun', threats: 123, blocked: 115 }
          ],
          stats: {
            totalThreats: 1737,
            threatsBlocked: 1532,
            activeAlerts: 28,
            systemUptime: '98.7%'
          },
          alertsByType: [
            { name: 'Malware', value: 267, color: '#FF4757' },
            { name: 'Suspicious Login', value: 189, color: '#FF6B35' },
            { name: 'Data Exfiltration', value: 98, color: '#8B5CF6' },
            { name: 'Network Anomaly', value: 156, color: '#00D9FF' },
          ],
          recentAlerts: [
            { id: 1, severity: 'critical', title: 'Advanced Persistent Threat Detected', source: 'NETWORK-CORE', time: '1 hour ago' },
            { id: 2, severity: 'high', title: 'Ransomware Activity', source: 'FILE-SERVER-03', time: '3 hours ago' },
            { id: 3, severity: 'high', title: 'Privilege Escalation Attempt', source: 'AD-CONTROLLER', time: '6 hours ago' },
            { id: 4, severity: 'medium', title: 'Brute Force Attack', source: '203.0.113.45', time: '8 hours ago' }
          ]
        }
      case '30d':
        return {
          threatData: [
            { time: 'Week 1', threats: 3456, blocked: 3123 },
            { time: 'Week 2', threats: 4234, blocked: 3789 },
            { time: 'Week 3', threats: 2987, blocked: 2654 },
            { time: 'Week 4', threats: 5678, blocked: 4987 },
          ],
          stats: {
            totalThreats: 16355,
            threatsBlocked: 14553,
            activeAlerts: 42,
            systemUptime: '97.8%'
          },
          alertsByType: [
            { name: 'Malware', value: 1234, color: '#FF4757' },
            { name: 'Suspicious Login', value: 987, color: '#FF6B35' },
            { name: 'Data Exfiltration', value: 456, color: '#8B5CF6' },
            { name: 'Network Anomaly', value: 789, color: '#00D9FF' },
          ],
          recentAlerts: [
            { id: 1, severity: 'critical', title: 'Nation State Actor Detected', source: 'PERIMETER-FW', time: '2 days ago' },
            { id: 2, severity: 'critical', title: 'Zero-Day Exploit Attempt', source: 'WEB-APP-01', time: '3 days ago' },
            { id: 3, severity: 'high', title: 'Data Breach Attempt', source: 'DATABASE-MAIN', time: '5 days ago' },
            { id: 4, severity: 'high', title: 'Cryptocurrency Miner', source: 'WORKSTATION-45', time: '1 week ago' }
          ]
        }
      default:
        return {
          threatData: [],
          stats: { totalThreats: 0, threatsBlocked: 0, activeAlerts: 0, systemUptime: '0%' },
          alertsByType: [],
          recentAlerts: []
        }
    }
  }

  const currentData = getTimelineData()

  const getSeverityClass = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'text-red-700 bg-red-50 border-red-200';
      case 'high':
        return 'text-orange-700 bg-orange-50 border-orange-200';
      case 'medium':
        return 'text-yellow-700 bg-yellow-50 border-yellow-200';
      case 'low':
        return 'text-green-700 bg-green-50 border-green-200';
      default:
        return 'text-gray-700 bg-gray-50 border-gray-200';
    }
  }

  return (
    <div className="flex-1 p-6 bg-gray-50 overflow-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Security Operations Dashboard</h1>
        <p className="text-gray-600">Real-time threat monitoring and system status</p>
      </div>

      {/* Time Range Selector */}
      <div className="flex space-x-2 mb-6">
        {['1h', '24h', '7d', '30d'].map((range) => (
          <button
            key={range}
            onClick={() => setTimeRange(range)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              timeRange === range
                ? 'bg-cyber-blue text-white shadow-sm'
                : 'bg-white text-gray-700 hover:text-gray-900 hover:bg-gray-100 border border-gray-300'
            }`}
          >
            {range}
          </button>
        ))}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-red-100 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">{currentData.stats.activeAlerts}</span>
          </div>
          <h3 className="text-gray-600 text-sm mb-1">Active Threats</h3>
          <div className="flex items-center">
            <TrendingUp className="w-4 h-4 text-red-600 mr-1" />
            <span className="text-red-600 text-sm">Real-time data</span>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-green-100 rounded-lg">
              <Shield className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">{currentData.stats.threatsBlocked.toLocaleString()}</span>
          </div>
          <h3 className="text-gray-600 text-sm mb-1">Threats Blocked</h3>
          <div className="flex items-center">
            <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
            <span className="text-green-600 text-sm">Security Active</span>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Activity className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">{currentData.stats.systemUptime}</span>
          </div>
          <h3 className="text-gray-600 text-sm mb-1">System Uptime</h3>
          <div className="flex items-center">
            <span className="text-green-600 text-sm">All systems operational</span>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">23</span>
          </div>
          <h3 className="text-gray-600 text-sm mb-1">Active Analysts</h3>
          <div className="flex items-center">
            <span className="text-gray-500 text-sm">SOC Team Online</span>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Threat Timeline */}
        <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Threat Activity Timeline</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={currentData.threatData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="time" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Line type="monotone" dataKey="threats" stroke="#DC2626" strokeWidth={2} />
              <Line type="monotone" dataKey="blocked" stroke="#059669" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Alert Distribution */}
        <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Alert Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={currentData.alertsByType}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {currentData.alertsByType.map((entry: any, index: number) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Alerts */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Recent Security Alerts</h3>
            <button className="text-cyber-blue hover:text-blue-700 text-sm font-medium">
              View All
            </button>
          </div>
        </div>
        <div className="divide-y divide-gray-200">
          {currentData.recentAlerts.map((alert: any) => (
            <div key={alert.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div className={`px-2 py-1 rounded text-xs font-medium border ${getSeverityClass(alert.severity)}`}>
                    {alert.severity.toUpperCase()}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-gray-900 font-medium mb-1">{alert.title}</h4>
                    <div className="flex items-center text-gray-600 text-sm space-x-4">
                      <div className="flex items-center">
                        <Server className="w-4 h-4 mr-1" />
                        {alert.source}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {alert.time}
                      </div>
                    </div>
                  </div>
                </div>
                <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors" title="View alert details">
                  <Eye className="w-4 h-4 text-gray-500" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}