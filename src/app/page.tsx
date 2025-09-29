'use client'

import { useState, useEffect } from 'react'
import { Sidebar } from '@/components/Sidebar'
import { ChatInterface } from '@/components/ChatInterface'
import { Dashboard } from '@/components/Dashboard'
import { ThreatAnalytics } from '@/components/ThreatAnalytics'
import { InvestigationHistory } from '@/components/InvestigationHistory'
import { Settings } from '@/components/Settings'
import { Header } from '@/components/Header'

export default function Home() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header />

        {/* Content Area */}
        <main className="flex-1 overflow-hidden flex">
          {activeTab === 'dashboard' && <Dashboard />}
          {activeTab === 'chat' && <ChatInterface />}
          {activeTab === 'threats' && <ThreatAnalytics />}
          {activeTab === 'history' && <InvestigationHistory />}
          {activeTab === 'settings' && <Settings />}
        </main>
      </div>
    </div>
  )
}