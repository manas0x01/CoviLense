// Common types used across the application

export interface Message {
  id: string
  type: 'user' | 'assistant'
  content: string
  timestamp: Date
  query?: string
  confidence?: number
}

export interface QueryPreview {
  elasticsearch: string
  description: string
  confidence: number
}

export interface ThreatMetric {
  id: string
  name: string
  value: number
  trend: string
  severity: 'low' | 'medium' | 'high' | 'critical'
  color: string
}

export interface Investigation {
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

export interface Alert {
  id: string
  title: string
  description: string
  severity: 'low' | 'medium' | 'high' | 'critical'
  source: string
  timestamp: Date
  status: 'open' | 'investigating' | 'resolved' | 'false_positive'
  assignedTo?: string
  tags: string[]
}

export interface ThreatIntelligence {
  id: string
  name: string
  type: 'malware' | 'phishing' | 'apt' | 'ransomware' | 'ddos' | 'insider'
  severity: 'low' | 'medium' | 'high' | 'critical'
  description: string
  indicators: string[]
  firstSeen: Date
  lastSeen: Date
  confidence: number
  sources: string[]
}

export interface User {
  id: string
  email: string
  name: string
  role: 'analyst' | 'senior_analyst' | 'admin' | 'viewer'
  department: string
  lastLogin: Date
  isActive: boolean
  mfaEnabled: boolean
}

export interface SystemSettings {
  general: {
    theme: 'light' | 'dark' | 'auto'
    language: string
    timezone: string
    autoRefresh: boolean
    refreshInterval: number
  }
  elasticsearch: {
    host: string
    username: string
    password: string
    indexPattern: string
    maxResults: number
    timeout: number
    sslEnabled: boolean
  }
  nlp: {
    provider: 'openai' | 'anthropic' | 'local'
    model: string
    temperature: number
    maxTokens: number
    confidenceThreshold: number
    apiKey: string
  }
  notifications: {
    email: boolean
    push: boolean
    slack: boolean
    teams: boolean
    criticalThreshold: 'low' | 'medium' | 'high' | 'critical'
    emailAddress: string
  }
  security: {
    sessionTimeout: number
    mfaEnabled: boolean
    auditLogging: boolean
    rbacEnabled: boolean
    allowedIpRanges: string
  }
}

export interface DashboardMetrics {
  activeThreats: number
  threatsBlocked: number
  systemUptime: number
  activeAnalysts: number
  criticalAlerts: number
  investigationsOpen: number
}

export interface ChartDataPoint {
  time: string
  date?: string
  threats?: number
  blocked?: number
  malware?: number
  phishing?: number
  ddos?: number
  insider?: number
  value?: number
  name?: string
  color?: string
}

// API Response types
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface ElasticsearchResponse {
  took: number
  timed_out: boolean
  hits: {
    total: {
      value: number
      relation: string
    }
    hits: Array<{
      _source: Record<string, any>
      _score: number
    }>
  }
  aggregations?: Record<string, any>
}

// Event types for the application
export type AppEvent = 
  | { type: 'QUERY_EXECUTED'; payload: { query: string; results: any } }
  | { type: 'ALERT_TRIGGERED'; payload: Alert }
  | { type: 'INVESTIGATION_CREATED'; payload: Investigation }
  | { type: 'THREAT_DETECTED'; payload: ThreatIntelligence }
  | { type: 'USER_LOGIN'; payload: { userId: string; timestamp: Date } }
  | { type: 'SETTINGS_UPDATED'; payload: Partial<SystemSettings> }