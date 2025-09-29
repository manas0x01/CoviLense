'use client'

import React, { useState } from 'react'
import { 
  Search, 
  Calendar,
  Filter,
  Download,
  Eye,
  Clock,
  User,
  FileText,
  MoreVertical,
  ArrowUpDown
} from 'lucide-react'

interface Investigation {
  id: string
  title: string
  description: string
  analyst: string
  status: 'active' | 'completed' | 'closed'
  priority: 'low' | 'medium' | 'high' | 'critical'
  createdAt: Date
  updatedAt: Date
  queries: number
  findings: number
  reportGenerated: boolean
}

export const InvestigationHistory: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [sortBy, setSortBy] = useState('updated')

  // Mock investigation data
  const investigations: Investigation[] = [
    {
      id: 'INV-2024-001',
      title: 'Suspicious PowerShell Activity Investigation',
      description: 'Analyzing multiple PowerShell execution events from WIN-SERVER-01 with potential malicious indicators',
      analyst: 'Sarah Chen',
      status: 'active',
      priority: 'high',
      createdAt: new Date('2024-01-25T10:30:00'),
      updatedAt: new Date('2024-01-25T14:45:00'),
      queries: 15,
      findings: 8,
      reportGenerated: false
    },
    {
      id: 'INV-2024-002',
      title: 'Failed Login Brute Force Attack',
      description: 'Investigation of coordinated brute force attack from multiple IP addresses targeting admin accounts',
      analyst: 'Mike Rodriguez',
      status: 'completed',
      priority: 'critical',
      createdAt: new Date('2024-01-24T08:15:00'),
      updatedAt: new Date('2024-01-24T16:30:00'),
      queries: 23,
      findings: 12,
      reportGenerated: true
    },
    {
      id: 'INV-2024-003',
      title: 'Network Traffic Anomaly Analysis',
      description: 'Investigating unusual network traffic patterns detected by SIEM rules, potential data exfiltration',
      analyst: 'Alex Thompson',
      status: 'closed',
      priority: 'medium',
      createdAt: new Date('2024-01-23T13:20:00'),
      updatedAt: new Date('2024-01-23T17:10:00'),
      queries: 31,
      findings: 5,
      reportGenerated: true
    },
    {
      id: 'INV-2024-004',
      title: 'Malware Execution Chain Investigation',
      description: 'Deep dive analysis of malware execution sequence and lateral movement indicators',
      analyst: 'Sarah Chen',
      status: 'active',
      priority: 'critical',
      createdAt: new Date('2024-01-25T09:00:00'),
      updatedAt: new Date('2024-01-25T15:20:00'),
      queries: 19,
      findings: 15,
      reportGenerated: false
    },
    {
      id: 'INV-2024-005',
      title: 'Email Security Incident Response',
      description: 'Investigation of phishing campaign targeting multiple departments within the organization',
      analyst: 'Emma Wilson',
      status: 'completed',
      priority: 'medium',
      createdAt: new Date('2024-01-22T11:45:00'),
      updatedAt: new Date('2024-01-22T18:30:00'),
      queries: 12,
      findings: 9,
      reportGenerated: true
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-blue-50 text-cyber-blue border-blue-200'
      case 'completed': return 'bg-green-50 text-green-600 border-green-200'
      case 'closed': return 'bg-gray-50 text-gray-600 border-gray-200'
      default: return 'bg-gray-50 text-gray-600 border-gray-200'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-50 text-red-600 border-red-200'
      case 'high': return 'bg-orange-50 text-orange-600 border-orange-200'
      case 'medium': return 'bg-yellow-50 text-yellow-600 border-yellow-200'
      case 'low': return 'bg-green-50 text-green-600 border-green-200'
      default: return 'bg-gray-50 text-gray-600 border-gray-200'
    }
  }

  const filteredInvestigations = investigations.filter(inv => {
    const matchesSearch = inv.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         inv.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         inv.analyst.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || inv.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const sortedInvestigations = [...filteredInvestigations].sort((a, b) => {
    switch (sortBy) {
      case 'updated':
        return b.updatedAt.getTime() - a.updatedAt.getTime()
      case 'created':
        return b.createdAt.getTime() - a.createdAt.getTime()
      case 'title':
        return a.title.localeCompare(b.title)
      case 'priority':
        const priorityOrder = { critical: 4, high: 3, medium: 2, low: 1 }
        return priorityOrder[b.priority] - priorityOrder[a.priority]
      default:
        return 0
    }
  })

  return (
    <div className="flex-1 p-6 bg-gray-50 overflow-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Investigation History</h1>
        <p className="text-gray-600">Track and manage your security investigations and reports</p>
      </div>

      {/* Filters and Search */}
      <div className="mb-6 space-y-4">
        {/* Search Bar */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search investigations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-cyber-blue focus:ring-1 focus:ring-cyber-blue text-gray-900 placeholder-gray-500"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-4">
          {/* Status Filter */}
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 bg-dark-surface border border-dark-border rounded-lg text-white text-sm focus:outline-none focus:border-cyber-blue"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
              <option value="closed">Closed</option>
            </select>
          </div>

          {/* Sort By */}
          <div className="flex items-center space-x-2">
            <ArrowUpDown className="w-4 h-4 text-gray-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 bg-dark-surface border border-dark-border rounded-lg text-white text-sm focus:outline-none focus:border-cyber-blue"
            >
              <option value="updated">Last Updated</option>
              <option value="created">Created Date</option>
              <option value="title">Title</option>
              <option value="priority">Priority</option>
            </select>
          </div>

          {/* Export All */}
          <button className="flex items-center space-x-2 px-4 py-2 bg-cyber-blue hover:bg-cyber-blue/80 rounded-lg text-white text-sm font-medium transition-colors ml-auto">
            <Download className="w-4 h-4" />
            <span>Export All</span>
          </button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-dark-surface rounded-lg p-4 border border-dark-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Total Investigations</p>
              <p className="text-2xl font-bold text-white">{investigations.length}</p>
            </div>
            <FileText className="w-8 h-8 text-cyber-blue" />
          </div>
        </div>

        <div className="bg-dark-surface rounded-lg p-4 border border-dark-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Active Cases</p>
              <p className="text-2xl font-bold text-cyber-blue">
                {investigations.filter(inv => inv.status === 'active').length}
              </p>
            </div>
            <Clock className="w-8 h-8 text-cyber-blue" />
          </div>
        </div>

        <div className="bg-dark-surface rounded-lg p-4 border border-dark-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Completed</p>
              <p className="text-2xl font-bold text-cyber-green">
                {investigations.filter(inv => inv.status === 'completed').length}
              </p>
            </div>
            <User className="w-8 h-8 text-cyber-green" />
          </div>
        </div>

        <div className="bg-dark-surface rounded-lg p-4 border border-dark-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Reports Generated</p>
              <p className="text-2xl font-bold text-cyber-purple">
                {investigations.filter(inv => inv.reportGenerated).length}
              </p>
            </div>
            <FileText className="w-8 h-8 text-cyber-purple" />
          </div>
        </div>
      </div>

      {/* Investigations Table */}
      <div className="bg-dark-surface rounded-lg border border-dark-border">
        <div className="p-6 border-b border-dark-border">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">
              Investigation Cases ({sortedInvestigations.length})
            </h3>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-dark-bg">
              <tr>
                <th className="text-left text-sm font-medium text-gray-400 p-4">Investigation</th>
                <th className="text-left text-sm font-medium text-gray-400 p-4">Analyst</th>
                <th className="text-left text-sm font-medium text-gray-400 p-4">Status</th>
                <th className="text-left text-sm font-medium text-gray-400 p-4">Priority</th>
                <th className="text-left text-sm font-medium text-gray-400 p-4">Progress</th>
                <th className="text-left text-sm font-medium text-gray-400 p-4">Updated</th>
                <th className="text-right text-sm font-medium text-gray-400 p-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-border">
              {sortedInvestigations.map((investigation) => (
                <tr key={investigation.id} className="hover:bg-dark-bg/50 transition-colors">
                  <td className="p-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-white font-medium">{investigation.title}</span>
                        <span className="text-xs text-gray-500 font-mono">{investigation.id}</span>
                      </div>
                      <p className="text-sm text-gray-400 line-clamp-2">{investigation.description}</p>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-gradient-to-r from-cyber-blue to-cyber-purple rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-white">{investigation.analyst}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className={`inline-flex px-2 py-1 rounded text-xs font-medium border ${getStatusColor(investigation.status)}`}>
                      {investigation.status.toUpperCase()}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className={`inline-flex px-2 py-1 rounded text-xs font-medium border ${getPriorityColor(investigation.priority)}`}>
                      {investigation.priority.toUpperCase()}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Queries: {investigation.queries}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Findings: {investigation.findings}</span>
                      </div>
                      {investigation.reportGenerated && (
                        <div className="flex items-center space-x-1">
                          <FileText className="w-3 h-3 text-cyber-green" />
                          <span className="text-xs text-cyber-green">Report Available</span>
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="text-sm text-gray-400">
                      <div className="flex items-center space-x-1 mb-1">
                        <Clock className="w-3 h-3" />
                        <span>{investigation.updatedAt.toLocaleDateString()}</span>
                      </div>
                      <span className="text-xs">{investigation.updatedAt.toLocaleTimeString()}</span>
                    </div>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <button 
                        className="p-1.5 rounded hover:bg-dark-border transition-colors"
                        title="View investigation"
                      >
                        <Eye className="w-4 h-4 text-gray-400" />
                      </button>
                      {investigation.reportGenerated && (
                        <button 
                          className="p-1.5 rounded hover:bg-dark-border transition-colors"
                          title="Download report"
                        >
                          <Download className="w-4 h-4 text-gray-400" />
                        </button>
                      )}
                      <button 
                        className="p-1.5 rounded hover:bg-dark-border transition-colors"
                        title="More options"
                      >
                        <MoreVertical className="w-4 h-4 text-gray-400" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {sortedInvestigations.length === 0 && (
          <div className="p-8 text-center">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-white mb-2">No investigations found</h3>
            <p className="text-gray-400">Try adjusting your search criteria or filters.</p>
          </div>
        )}
      </div>
    </div>
  )
}