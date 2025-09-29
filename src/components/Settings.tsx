'use client'

import React, { useState } from 'react'
import { 
  Settings as SettingsIcon,
  Database,
  Shield,
  Bell,
  Key,
  Users,
  Server,
  Globe,
  Save,
  RefreshCw,
  Eye,
  EyeOff,
  Check,
  X,
  AlertTriangle
} from 'lucide-react'

export const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('general')
  const [showApiKey, setShowApiKey] = useState(false)
  const [settings, setSettings] = useState({
    general: {
      theme: 'dark',
      language: 'en',
      timezone: 'UTC',
      autoRefresh: true,
      refreshInterval: 30
    },
    elasticsearch: {
      host: 'localhost:9200',
      username: 'elastic',
      password: '••••••••••••',
      indexPattern: 'logs-*',
      maxResults: 10000,
      timeout: 30,
      sslEnabled: true
    },
    nlp: {
      provider: 'openai',
      model: 'gpt-4',
      temperature: 0.3,
      maxTokens: 2048,
      confidenceThreshold: 0.7,
      apiKey: '••••••••••••••••••••••••••••••••'
    },
    notifications: {
      email: true,
      push: true,
      slack: false,
      teams: false,
      criticalThreshold: 'high',
      emailAddress: 'analyst@isro.gov.in'
    },
    security: {
      sessionTimeout: 30,
      mfaEnabled: true,
      auditLogging: true,
      rbacEnabled: true,
      allowedIpRanges: '10.0.0.0/8, 192.168.0.0/16'
    }
  })

  const tabs = [
    { id: 'general', label: 'General', icon: SettingsIcon },
    { id: 'elasticsearch', label: 'Elasticsearch', icon: Database },
    { id: 'nlp', label: 'NLP Engine', icon: Globe },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'users', label: 'User Management', icon: Users },
  ]

  const handleSave = () => {
    // Implement save functionality
    console.log('Saving settings:', settings)
  }

  const testConnection = (type: string) => {
    // Implement connection testing
    console.log(`Testing ${type} connection...`)
  }

  return (
    <div className="flex-1 bg-gray-50 overflow-hidden">
      <div className="flex h-full">
        {/* Settings Sidebar */}
        <div className="w-64 bg-white border-r border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">Settings</h2>
            <p className="text-sm text-gray-600 mt-1">Configure CoviLense</p>
          </div>
          
          <nav className="mt-6">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 px-6 py-3 text-left hover:bg-gray-50 transition-colors ${
                    activeTab === tab.id 
                      ? 'bg-blue-50 border-r-2 border-cyber-blue text-cyber-blue' 
                      : 'text-gray-700 hover:text-gray-900'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${activeTab === tab.id ? 'text-cyber-blue' : ''}`} />
                  <span className="font-medium">{tab.label}</span>
                </button>
              )
            })}
          </nav>
        </div>

        {/* Settings Content */}
        <div className="flex-1 overflow-auto">
          <div className="p-8">
            {activeTab === 'general' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">General Settings</h3>
                  <p className="text-gray-400 mb-6">Configure basic application preferences</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-dark-surface rounded-lg p-6 border border-dark-border">
                    <h4 className="text-lg font-medium text-white mb-4">Interface</h4>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Theme</label>
                        <select 
                          className="w-full px-3 py-2 bg-dark-bg border border-dark-border rounded-lg text-white focus:outline-none focus:border-cyber-blue"
                          value={settings.general.theme}
                          onChange={(e) => setSettings(prev => ({
                            ...prev,
                            general: { ...prev.general, theme: e.target.value }
                          }))}
                        >
                          <option value="dark">Dark</option>
                          <option value="light">Light</option>
                          <option value="auto">Auto</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Language</label>
                        <select 
                          className="w-full px-3 py-2 bg-dark-bg border border-dark-border rounded-lg text-white focus:outline-none focus:border-cyber-blue"
                          value={settings.general.language}
                          onChange={(e) => setSettings(prev => ({
                            ...prev,
                            general: { ...prev.general, language: e.target.value }
                          }))}
                        >
                          <option value="en">English</option>
                          <option value="hi">Hindi</option>
                          <option value="es">Spanish</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="bg-dark-surface rounded-lg p-6 border border-dark-border">
                    <h4 className="text-lg font-medium text-white mb-4">Auto-Refresh</h4>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-medium text-gray-300">Enable Auto-Refresh</label>
                        <button
                          onClick={() => setSettings(prev => ({
                            ...prev,
                            general: { ...prev.general, autoRefresh: !prev.general.autoRefresh }
                          }))}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            settings.general.autoRefresh ? 'bg-cyber-blue' : 'bg-gray-600'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              settings.general.autoRefresh ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>

                      {settings.general.autoRefresh && (
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Refresh Interval (seconds)
                          </label>
                          <input
                            type="number"
                            min="5"
                            max="300"
                            className="w-full px-3 py-2 bg-dark-bg border border-dark-border rounded-lg text-white focus:outline-none focus:border-cyber-blue"
                            value={settings.general.refreshInterval}
                            onChange={(e) => setSettings(prev => ({
                              ...prev,
                              general: { ...prev.general, refreshInterval: parseInt(e.target.value) }
                            }))}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'elasticsearch' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">Elasticsearch Configuration</h3>
                  <p className="text-gray-400 mb-6">Configure connection to your Elasticsearch cluster</p>
                </div>

                <div className="bg-dark-surface rounded-lg p-6 border border-dark-border">
                  <div className="flex items-center justify-between mb-6">
                    <h4 className="text-lg font-medium text-white">Connection Settings</h4>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-cyber-green rounded-full"></div>
                      <span className="text-sm text-cyber-green">Connected</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Host & Port</label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 bg-dark-bg border border-dark-border rounded-lg text-white focus:outline-none focus:border-cyber-blue"
                        value={settings.elasticsearch.host}
                        onChange={(e) => setSettings(prev => ({
                          ...prev,
                          elasticsearch: { ...prev.elasticsearch, host: e.target.value }
                        }))}
                        placeholder="localhost:9200"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Index Pattern</label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 bg-dark-bg border border-dark-border rounded-lg text-white focus:outline-none focus:border-cyber-blue"
                        value={settings.elasticsearch.indexPattern}
                        onChange={(e) => setSettings(prev => ({
                          ...prev,
                          elasticsearch: { ...prev.elasticsearch, indexPattern: e.target.value }
                        }))}
                        placeholder="logs-*"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Username</label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 bg-dark-bg border border-dark-border rounded-lg text-white focus:outline-none focus:border-cyber-blue"
                        value={settings.elasticsearch.username}
                        onChange={(e) => setSettings(prev => ({
                          ...prev,
                          elasticsearch: { ...prev.elasticsearch, username: e.target.value }
                        }))}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
                      <div className="relative">
                        <input
                          type={showApiKey ? 'text' : 'password'}
                          className="w-full px-3 py-2 pr-10 bg-dark-bg border border-dark-border rounded-lg text-white focus:outline-none focus:border-cyber-blue"
                          value={settings.elasticsearch.password}
                          onChange={(e) => setSettings(prev => ({
                            ...prev,
                            elasticsearch: { ...prev.elasticsearch, password: e.target.value }
                          }))}
                        />
                        <button
                          type="button"
                          onClick={() => setShowApiKey(!showApiKey)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                        >
                          {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Max Results</label>
                      <input
                        type="number"
                        className="w-full px-3 py-2 bg-dark-bg border border-dark-border rounded-lg text-white focus:outline-none focus:border-cyber-blue"
                        value={settings.elasticsearch.maxResults}
                        onChange={(e) => setSettings(prev => ({
                          ...prev,
                          elasticsearch: { ...prev.elasticsearch, maxResults: parseInt(e.target.value) }
                        }))}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Timeout (seconds)</label>
                      <input
                        type="number"
                        className="w-full px-3 py-2 bg-dark-bg border border-dark-border rounded-lg text-white focus:outline-none focus:border-cyber-blue"
                        value={settings.elasticsearch.timeout}
                        onChange={(e) => setSettings(prev => ({
                          ...prev,
                          elasticsearch: { ...prev.elasticsearch, timeout: parseInt(e.target.value) }
                        }))}
                      />
                    </div>
                  </div>

                  <div className="mt-6 flex items-center space-x-4">
                    <button
                      onClick={() => testConnection('elasticsearch')}
                      className="flex items-center space-x-2 px-4 py-2 bg-cyber-blue hover:bg-cyber-blue/80 rounded-lg text-white transition-colors"
                    >
                      <RefreshCw className="w-4 h-4" />
                      <span>Test Connection</span>
                    </button>
                    
                    <div className="flex items-center space-x-1">
                      <Check className="w-4 h-4 text-cyber-green" />
                      <span className="text-sm text-cyber-green">SSL Enabled</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'nlp' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">NLP Engine Configuration</h3>
                  <p className="text-gray-400 mb-6">Configure the natural language processing engine</p>
                </div>

                <div className="bg-dark-surface rounded-lg p-6 border border-dark-border">
                  <h4 className="text-lg font-medium text-white mb-4">LLM Configuration</h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Provider</label>
                      <select className="w-full px-3 py-2 bg-dark-bg border border-dark-border rounded-lg text-white focus:outline-none focus:border-cyber-blue">
                        <option value="openai">OpenAI</option>
                        <option value="anthropic">Anthropic</option>
                        <option value="local">Local Model</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Model</label>
                      <select className="w-full px-3 py-2 bg-dark-bg border border-dark-border rounded-lg text-white focus:outline-none focus:border-cyber-blue">
                        <option value="gpt-4">GPT-4</option>
                        <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
                        <option value="claude-3">Claude 3</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Temperature</label>
                      <input
                        type="number"
                        min="0"
                        max="1"
                        step="0.1"
                        className="w-full px-3 py-2 bg-dark-bg border border-dark-border rounded-lg text-white focus:outline-none focus:border-cyber-blue"
                        value={settings.nlp.temperature}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Confidence Threshold</label>
                      <input
                        type="number"
                        min="0"
                        max="1"
                        step="0.1"
                        className="w-full px-3 py-2 bg-dark-bg border border-dark-border rounded-lg text-white focus:outline-none focus:border-cyber-blue"
                        value={settings.nlp.confidenceThreshold}
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-300 mb-2">API Key</label>
                      <div className="relative">
                        <input
                          type="password"
                          className="w-full px-3 py-2 pr-10 bg-dark-bg border border-dark-border rounded-lg text-white focus:outline-none focus:border-cyber-blue"
                          value={settings.nlp.apiKey}
                          placeholder="Enter your API key"
                        />
                        <Key className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">Security Settings</h3>
                  <p className="text-gray-400 mb-6">Configure security and access control settings</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-dark-surface rounded-lg p-6 border border-dark-border">
                    <h4 className="text-lg font-medium text-white mb-4">Authentication</h4>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <label className="text-sm font-medium text-gray-300">Multi-Factor Authentication</label>
                          <p className="text-xs text-gray-400">Require MFA for all users</p>
                        </div>
                        <button
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            settings.security.mfaEnabled ? 'bg-cyber-blue' : 'bg-gray-600'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              settings.security.mfaEnabled ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Session Timeout (minutes)</label>
                        <input
                          type="number"
                          className="w-full px-3 py-2 bg-dark-bg border border-dark-border rounded-lg text-white focus:outline-none focus:border-cyber-blue"
                          value={settings.security.sessionTimeout}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="bg-dark-surface rounded-lg p-6 border border-dark-border">
                    <h4 className="text-lg font-medium text-white mb-4">Access Control</h4>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <label className="text-sm font-medium text-gray-300">Role-Based Access Control</label>
                          <p className="text-xs text-gray-400">Enable RBAC for granular permissions</p>
                        </div>
                        <button
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            settings.security.rbacEnabled ? 'bg-cyber-blue' : 'bg-gray-600'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              settings.security.rbacEnabled ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Allowed IP Ranges</label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 bg-dark-bg border border-dark-border rounded-lg text-white focus:outline-none focus:border-cyber-blue"
                          value={settings.security.allowedIpRanges}
                          placeholder="10.0.0.0/8, 192.168.0.0/16"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Save Button */}
            <div className="mt-8 flex justify-end space-x-4">
              <button className="px-6 py-2 border border-dark-border text-gray-300 hover:text-white hover:bg-dark-border rounded-lg transition-colors">
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="flex items-center space-x-2 px-6 py-2 bg-cyber-blue hover:bg-cyber-blue/80 text-white rounded-lg transition-colors"
              >
                <Save className="w-4 h-4" />
                <span>Save Settings</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}