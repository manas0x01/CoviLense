'use client'

import React from 'react'
import { 
  Shield, 
  MessageSquare, 
  BarChart3, 
  History, 
  Settings as SettingsIcon,
  ChevronLeft,
  ChevronRight,
  Activity
} from 'lucide-react'

interface SidebarProps {
  activeTab: string
  setActiveTab: (tab: string) => void
  collapsed: boolean
  onToggleCollapse: () => void
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  activeTab, 
  setActiveTab, 
  collapsed, 
  onToggleCollapse 
}) => {
  const menuItems = [
    { id: 'dashboard', icon: Shield, label: 'Dashboard' },
    { id: 'chat', icon: MessageSquare, label: 'Chat Assistant' },
    { id: 'threats', icon: Activity, label: 'Threat Analytics' },
    { id: 'history', icon: History, label: 'Investigation History' },
    { id: 'settings', icon: SettingsIcon, label: 'Settings' },
  ]

  return (
    <div className={`bg-white border-r border-gray-200 transition-all duration-300 shadow-sm ${collapsed ? 'w-16' : 'w-64'}`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        {!collapsed && (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-cyber-blue to-cyber-purple rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">CoviLense</h1>
              <p className="text-xs text-gray-500">SIEM Assistant</p>
            </div>
          </div>
        )}
        <button
          onClick={onToggleCollapse}
          className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
        >
          {collapsed ? (
            <ChevronRight className="w-4 h-4 text-gray-600" />
          ) : (
            <ChevronLeft className="w-4 h-4 text-gray-600" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="mt-6">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.id
          
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-100 transition-colors ${
                isActive 
                  ? 'bg-blue-50 border-r-2 border-cyber-blue text-cyber-blue' 
                  : 'text-gray-700 hover:text-gray-900'
              }`}
              title={collapsed ? item.label : undefined}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-cyber-blue' : ''}`} />
              {!collapsed && <span className="font-medium">{item.label}</span>}
            </button>
          )
        })}
      </nav>

      {/* Status Indicator */}
      <div className="absolute bottom-4 left-4 right-4">
        {!collapsed && (
          <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-2 h-2 bg-cyber-green rounded-full status-online"></div>
              <span className="text-sm font-medium text-gray-900">System Status</span>
            </div>
            <div className="space-y-1 text-xs text-gray-600">
              <div className="flex justify-between">
                <span>Elasticsearch</span>
                <span className="text-cyber-green">Online</span>
              </div>
              <div className="flex justify-between">
                <span>Query Engine</span>
                <span className="text-cyber-green">Active</span>
              </div>
              <div className="flex justify-between">
                <span>NLP Service</span>
                <span className="text-cyber-green">Ready</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}