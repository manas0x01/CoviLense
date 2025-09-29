'use client'

import React, { useState } from 'react'
import { 
  AlertTriangle, 
  TrendingUp, 
  TrendingDown,
  Filter,
  Calendar,
  Download,
  Eye,
  MapPin,
  Clock,
  Server,
  User,
  Shield
} from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area } from 'recharts'

export const ThreatAnalytics: React.FC = () => {
  const [timeRange, setTimeRange] = useState('7d')
  const [filterType, setFilterType] = useState('all')

  // Mock data for threat analytics
  const threatTrendData = [
    { date: '2024-01-01', malware: 12, phishing: 8, ddos: 3, insider: 2 },
    { date: '2024-01-02', malware: 15, phishing: 12, ddos: 1, insider: 4 },
    { date: '2024-01-03', malware: 8, phishing: 6, ddos: 5, insider: 1 },
    { date: '2024-01-04', malware: 22, phishing: 15, ddos: 2, insider: 3 },
    { date: '2024-01-05', malware: 18, phishing: 9, ddos: 4, insider: 5 },
    { date: '2024-01-06', malware: 25, phishing: 18, ddos: 3, insider: 2 },
    { date: '2024-01-07', malware: 20, phishing: 14, ddos: 6, insider: 4 },
  ]

  const attackVectorData = [
    { name: 'Malware', value: 120, color: '#FF4757', trend: '+15%' },
    { name: 'Phishing', value: 82, color: '#FF6B35', trend: '+8%' },
    { name: 'DDoS', value: 24, color: '#8B5CF6', trend: '-12%' },
    { name: 'Insider Threat', value: 21, color: '#00D9FF', trend: '+22%' },
    { name: 'Ransomware', value: 15, color: '#00FF94', trend: '+45%' },
    { name: 'APT', value: 8, color: '#FFA502', trend: '-5%' },
  ]

  const geographicData = [
    { country: 'Russia', attacks: 45, severity: 'high' },
    { country: 'China', attacks: 38, severity: 'high' },
    { country: 'North Korea', attacks: 28, severity: 'medium' },
    { country: 'Iran', attacks: 22, severity: 'medium' },
    { country: 'United States', attacks: 15, severity: 'low' },
    { country: 'Germany', attacks: 12, severity: 'low' },
  ]

  const criticalThreats = [
    {
      id: 1,
      name: 'APT-2024-001',
      severity: 'critical',
      type: 'Advanced Persistent Threat',
      targets: 'Government Infrastructure',
      firstSeen: '2024-01-15',
      lastActivity: '2 hours ago',
      indicators: 15,
      description: 'Sophisticated campaign targeting ISRO systems with custom malware'
    },
    {
      id: 2,
      name: 'RANSOM-2024-005',
      severity: 'high',
      type: 'Ransomware',
      targets: 'File Servers',
      firstSeen: '2024-01-20',
      lastActivity: '6 hours ago',
      indicators: 8,
      description: 'New ransomware variant encrypting critical data files'
    },
    {
      id: 3,
      name: 'PHISH-2024-032',
      severity: 'medium',
      type: 'Phishing Campaign',
      targets: 'Email Users',
      firstSeen: '2024-01-22',
      lastActivity: '1 day ago',
      indicators: 23,
      description: 'Targeted spear-phishing emails mimicking official communications'
    }
  ]

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-700 bg-red-50 border-red-200'
      case 'high': return 'text-orange-700 bg-orange-50 border-orange-200'
      case 'medium': return 'text-yellow-700 bg-yellow-50 border-yellow-200'
      case 'low': return 'text-green-700 bg-green-50 border-green-200'
      default: return 'text-gray-700 bg-gray-50 border-gray-200'
    }
  }

  const getTrendIcon = (trend: string) => {
    return trend.startsWith('+') ? 
      <TrendingUp className="w-4 h-4 text-red-600" /> : 
      <TrendingDown className="w-4 h-4 text-green-600" />
  }

  return (
    <div className="flex-1 p-6 bg-gray-50 overflow-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Threat Analytics</h1>
          <p className="text-gray-600">Advanced threat intelligence and attack pattern analysis</p>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Time Range Filter */}
          <div className="flex space-x-2">
            {['24h', '7d', '30d', '90d'].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  timeRange === range
                    ? 'bg-cyber-blue text-white'
                    : 'bg-white text-gray-600 hover:text-gray-900 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {range}
              </button>
            ))}
          </div>
          
          {/* Export Button */}
          <button className="flex items-center space-x-2 px-4 py-2 bg-white hover:bg-gray-50 border border-gray-200 rounded-lg text-gray-700 hover:text-gray-900 transition-colors">
            <Download className="w-4 h-4" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-red-50 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">342</div>
              <div className="flex items-center text-red-600 text-sm">
                <TrendingUp className="w-4 h-4 mr-1" />
                +18%
              </div>
            </div>
          </div>
          <h3 className="text-gray-600 text-sm mb-1">Total Threats</h3>
          <p className="text-xs text-gray-500">Last 7 days</p>
        </div>

        <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-red-50 rounded-lg">
              <Shield className="w-6 h-6 text-red-600" />
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">23</div>
              <div className="flex items-center text-red-600 text-sm">
                <TrendingUp className="w-4 h-4 mr-1" />
                +35%
              </div>
            </div>
          </div>
          <h3 className="text-gray-600 text-sm mb-1">Critical Alerts</h3>
          <p className="text-xs text-gray-500">Requires immediate attention</p>
        </div>

        <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-blue-50 rounded-lg">
              <MapPin className="w-6 h-6 text-cyber-blue" />
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">15</div>
              <div className="flex items-center text-orange-600 text-sm">
                <TrendingUp className="w-4 h-4 mr-1" />
                +8%
              </div>
            </div>
          </div>
          <h3 className="text-gray-600 text-sm mb-1">Attack Sources</h3>
          <p className="text-xs text-gray-500">Unique countries</p>
        </div>

        <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-green-50 rounded-lg">
              <Shield className="w-6 h-6 text-green-600" />
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">94.2%</div>
              <div className="flex items-center text-green-600 text-sm">
                <TrendingUp className="w-4 h-4 mr-1" />
                +2.1%
              </div>
            </div>
          </div>
          <h3 className="text-gray-400 text-sm mb-1">Block Rate</h3>
          <p className="text-xs text-gray-500">Automated prevention</p>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Threat Trends */}
        <div className="bg-dark-surface rounded-lg p-6 border border-dark-border">
          <h3 className="text-lg font-semibold text-white mb-4">Threat Activity Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={threatTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2D2D3A" />
              <XAxis dataKey="date" stroke="#6B7280" tick={{ fontSize: 12 }} />
              <YAxis stroke="#6B7280" tick={{ fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1A1A24',
                  border: '1px solid #2D2D3A',
                  borderRadius: '8px'
                }}
              />
              <Area type="monotone" dataKey="malware" stackId="1" stroke="#FF4757" fill="#FF4757" fillOpacity={0.6} />
              <Area type="monotone" dataKey="phishing" stackId="1" stroke="#FF6B35" fill="#FF6B35" fillOpacity={0.6} />
              <Area type="monotone" dataKey="ddos" stackId="1" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.6} />
              <Area type="monotone" dataKey="insider" stackId="1" stroke="#00D9FF" fill="#00D9FF" fillOpacity={0.6} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Attack Vectors */}
        <div className="bg-dark-surface rounded-lg p-6 border border-dark-border">
          <h3 className="text-lg font-semibold text-white mb-4">Attack Vector Analysis</h3>
          <div className="space-y-4">
            {attackVectorData.map((vector, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-dark-bg rounded-lg">
                <div className="flex items-center space-x-3">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: vector.color }}
                  />
                  <span className="text-white font-medium">{vector.name}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-2xl font-bold text-white">{vector.value}</span>
                  <div className="flex items-center space-x-1">
                    {getTrendIcon(vector.trend)}
                    <span className={`text-sm font-medium ${
                      vector.trend.startsWith('+') ? 'text-red-400' : 'text-green-400'
                    }`}>
                      {vector.trend}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Geographic Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 bg-dark-surface rounded-lg p-6 border border-dark-border">
          <h3 className="text-lg font-semibold text-white mb-4">Geographic Attack Distribution</h3>
          <div className="space-y-3">
            {geographicData.map((country, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-dark-bg rounded-lg hover:bg-dark-border/50 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    country.severity === 'high' ? 'bg-red-500' :
                    country.severity === 'medium' ? 'bg-orange-500' : 'bg-green-500'
                  }`} />
                  <span className="text-white font-medium">{country.country}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-gray-400">{country.attacks} attacks</span>
                  <div className={`px-2 py-1 rounded text-xs ${getSeverityColor(country.severity)}`}>
                    {country.severity.toUpperCase()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-dark-surface rounded-lg p-6 border border-dark-border">
          <h3 className="text-lg font-semibold text-white mb-4">Threat Intelligence</h3>
          <div className="space-y-4">
            <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <AlertTriangle className="w-4 h-4 text-red-400" />
                <span className="text-red-400 font-medium">High Risk IOCs</span>
              </div>
              <p className="text-sm text-gray-300">47 new indicators detected</p>
            </div>
            
            <div className="p-3 bg-orange-500/10 border border-orange-500/30 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Shield className="w-4 h-4 text-orange-400" />
                <span className="text-orange-400 font-medium">Campaign Activity</span>
              </div>
              <p className="text-sm text-gray-300">3 active APT campaigns</p>
            </div>
            
            <div className="p-3 bg-cyber-blue/10 border border-cyber-blue/30 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <TrendingUp className="w-4 h-4 text-cyber-blue" />
                <span className="text-cyber-blue font-medium">Trend Analysis</span>
              </div>
              <p className="text-sm text-gray-300">Ransomware up 45% this week</p>
            </div>
          </div>
        </div>
      </div>

      {/* Critical Threats Table */}
      <div className="bg-dark-surface rounded-lg border border-dark-border">
        <div className="p-6 border-b border-dark-border">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">Critical Active Threats</h3>
            <div className="flex items-center space-x-2">
              <button className="p-2 rounded-lg hover:bg-dark-border transition-colors">
                <Filter className="w-4 h-4 text-gray-400" />
              </button>
              <button className="p-2 rounded-lg hover:bg-dark-border transition-colors">
                <Calendar className="w-4 h-4 text-gray-400" />
              </button>
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-dark-bg">
              <tr>
                <th className="text-left text-sm font-medium text-gray-400 p-4">Threat ID</th>
                <th className="text-left text-sm font-medium text-gray-400 p-4">Type</th>
                <th className="text-left text-sm font-medium text-gray-400 p-4">Severity</th>
                <th className="text-left text-sm font-medium text-gray-400 p-4">Targets</th>
                <th className="text-left text-sm font-medium text-gray-400 p-4">Last Activity</th>
                <th className="text-left text-sm font-medium text-gray-400 p-4">IOCs</th>
                <th className="text-right text-sm font-medium text-gray-400 p-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-border">
              {criticalThreats.map((threat) => (
                <tr key={threat.id} className="hover:bg-dark-bg/50 transition-colors">
                  <td className="p-4">
                    <div>
                      <span className="text-white font-medium">{threat.name}</span>
                      <p className="text-xs text-gray-400 mt-1">{threat.description}</p>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="text-gray-300">{threat.type}</span>
                  </td>
                  <td className="p-4">
                    <div className={`inline-flex px-2 py-1 rounded text-xs font-medium border ${getSeverityColor(threat.severity)}`}>
                      {threat.severity.toUpperCase()}
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="text-gray-300">{threat.targets}</span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-1 text-gray-300">
                      <Clock className="w-4 h-4" />
                      <span>{threat.lastActivity}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="px-2 py-1 bg-cyber-blue/20 text-cyber-blue rounded text-sm font-medium">
                      {threat.indicators}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <button className="p-1.5 rounded hover:bg-dark-border transition-colors" title="View details">
                        <Eye className="w-4 h-4 text-gray-400" />
                      </button>
                      <button className="p-1.5 rounded hover:bg-dark-border transition-colors" title="Export IOCs">
                        <Download className="w-4 h-4 text-gray-400" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}