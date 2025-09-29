'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Send, Bot, User, Copy, Download, Eye, Code, Loader2 } from 'lucide-react'

interface Message {
  id: string
  type: 'user' | 'assistant'
  content: string
  timestamp: Date
  query?: string
  confidence?: number
}

interface QueryPreview {
  elasticsearch: string
  description: string
  confidence: number
}

export const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: 'Hello! I\'m your SIEM assistant. I can help you investigate security incidents using natural language. Try asking me about suspicious activities, failed logins, or network anomalies.',
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showQueryPreview, setShowQueryPreview] = useState<QueryPreview | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue.trim(),
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsLoading(true)

    // Simulate NLP processing and query generation
    setTimeout(() => {
      const mockQuery = generateMockQuery(inputValue.trim())
      setShowQueryPreview(mockQuery)

      setTimeout(() => {
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          type: 'assistant',
          content: generateMockResponse(inputValue.trim()),
          timestamp: new Date(),
          query: mockQuery.elasticsearch,
          confidence: mockQuery.confidence
        }

        setMessages(prev => [...prev, assistantMessage])
        setIsLoading(false)
        setShowQueryPreview(null)
      }, 2000)
    }, 1000)
  }

  const generateMockQuery = (input: string): QueryPreview => {
    const queries = {
      'suspicious login': {
        elasticsearch: `{
  "query": {
    "bool": {
      "must": [
        { "match": { "event.action": "logon" } },
        { "range": { "@timestamp": { "gte": "now-24h" } } }
      ],
      "should": [
        { "match": { "event.outcome": "failure" } },
        { "range": { "source.geo.location.lat": { "lt": -90, "gt": 90 } } }
      ]
    }
  },
  "aggs": {
    "by_source_ip": {
      "terms": { "field": "source.ip", "size": 10 }
    }
  }
}`,
        description: 'Searching for failed login attempts and geographically suspicious logins in the last 24 hours',
        confidence: 0.92
      },
      default: {
        elasticsearch: `{
  "query": {
    "bool": {
      "must": [
        { "query_string": { "query": "${input}" } },
        { "range": { "@timestamp": { "gte": "now-1h" } } }
      ]
    }
  }
}`,
        description: `General search for "${input}" in recent logs`,
        confidence: 0.75
      }
    }

    return queries[input.toLowerCase() as keyof typeof queries] || queries.default
  }

  const generateMockResponse = (input: string): string => {
    const responses = {
      'suspicious login': `Found 23 suspicious login attempts in the last 24 hours:

**Key Findings:**
• 15 failed login attempts from IP 192.168.1.45
• 5 successful logins from unusual geographic locations
• 3 logins outside normal business hours

**Top Source IPs:**
• 192.168.1.45 (15 attempts)
• 10.0.0.123 (4 attempts) 
• 203.0.113.5 (4 attempts)

**Recommendations:**
1. Investigate IP 192.168.1.45 for potential brute force attack
2. Review successful logins from unusual locations
3. Consider implementing additional MFA for after-hours access

Would you like me to drill down into any specific IP or time range?`,
      default: `I found several relevant events related to "${input}":

**Summary:**
• 47 matching events in the last hour
• 3 high-priority alerts detected
• 12 unique source IPs involved

**Event Breakdown:**
• Security logs: 28 events
• Network logs: 15 events  
• Application logs: 4 events

The data suggests potential security activity that may require further investigation. Would you like me to focus on any specific aspect or time period?`
    }

    return responses[input.toLowerCase() as keyof typeof responses] || responses.default
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <div className="flex-1 flex flex-col bg-gray-50">
      {/* Chat Header */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-cyber-blue to-cyber-purple rounded-full flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">SIEM Chat Assistant</h2>
              <p className="text-sm text-gray-600">Natural language security investigations</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1 px-2 py-1 bg-green-50 rounded-full">
              <div className="w-2 h-2 bg-green-500 rounded-full status-online"></div>
              <span className="text-xs text-green-700 font-medium">Online</span>
            </div>
          </div>
        </div>
      </div>

      {/* Query Preview Modal */}
      {showQueryPreview && (
        <div className="bg-white border-b border-gray-200 p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <Loader2 className="w-4 h-4 text-cyber-blue animate-spin" />
              <span className="text-sm font-medium text-gray-900">Generating Query...</span>
            </div>
            <div className="flex items-center space-x-2 text-xs text-gray-600">
              <span>Confidence: {Math.round(showQueryPreview.confidence * 100)}%</span>
              <button
                onClick={() => setShowQueryPreview(null)}
                className="p-1 rounded hover:bg-gray-100"
              >
                ✕
              </button>
            </div>
          </div>
          <p className="text-sm text-gray-700 mb-3">{showQueryPreview.description}</p>
          <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-cyber-blue font-medium">Elasticsearch DSL</span>
              <button
                onClick={() => copyToClipboard(showQueryPreview.elasticsearch)}
                className="p-1 rounded hover:bg-gray-100"
                title="Copy query"
              >
                <Copy className="w-3 h-3 text-gray-600" />
              </button>
            </div>
            <pre className="text-xs text-gray-800 overflow-x-auto">
              <code>{showQueryPreview.elasticsearch}</code>
            </pre>
          </div>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex items-start space-x-3 ${
              message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
            }`}
          >
            {/* Avatar */}
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              message.type === 'user'
                ? 'bg-gradient-to-r from-cyber-purple to-cyber-blue'
                : 'bg-gradient-to-r from-cyber-blue to-cyber-green'
            }`}>
              {message.type === 'user' ? (
                <User className="w-4 h-4 text-white" />
              ) : (
                <Bot className="w-4 h-4 text-white" />
              )}
            </div>

            {/* Message Content */}
            <div className={`flex-1 ${message.type === 'user' ? 'max-w-xs' : 'max-w-3xl'}`}>
              <div
                className={`rounded-lg p-4 ${
                  message.type === 'user'
                    ? 'bg-cyber-blue text-white'
                    : 'bg-white border border-gray-200 text-gray-900'
                }`}
              >
                <div className="prose prose-sm max-w-none">
                  {message.content.split('\n').map((line, index) => {
                    if (line.startsWith('**') && line.endsWith('**')) {
                      return (
                        <h4 key={index} className="text-cyber-blue font-semibold mt-4 mb-2">
                          {line.slice(2, -2)}
                        </h4>
                      )
                    }
                    if (line.startsWith('• ')) {
                      return (
                        <p key={index} className={`ml-2 ${message.type === 'user' ? 'text-blue-100' : 'text-gray-700'}`}>
                          {line}
                        </p>
                      )
                    }
                    return line ? (
                      <p key={index} className={`mb-2 ${message.type === 'user' ? 'text-white' : 'text-gray-900'}`}>{line}</p>
                    ) : (
                      <br key={index} />
                    )
                  })}
                </div>

                {/* Message Actions */}
                {message.type === 'assistant' && (
                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-200">
                    <div className="flex items-center space-x-2 text-xs text-gray-600">
                      <span>{message.timestamp.toLocaleTimeString()}</span>
                      {message.confidence && (
                        <span>• Confidence: {Math.round(message.confidence * 100)}%</span>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      {message.query && (
                        <button
                          onClick={() => copyToClipboard(message.query!)}
                          className="p-1 rounded hover:bg-gray-100 transition-colors"
                          title="Copy query"
                        >
                          <Code className="w-4 h-4 text-gray-600" />
                        </button>
                      )}
                      <button
                        onClick={() => copyToClipboard(message.content)}
                        className="p-1 rounded hover:bg-gray-100 transition-colors"
                        title="Copy message"
                      >
                        <Copy className="w-4 h-4 text-gray-600" />
                      </button>
                      <button
                        className="p-1 rounded hover:bg-gray-100 transition-colors"
                        title="Generate report"
                      >
                        <Download className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyber-blue to-cyber-green flex items-center justify-center">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="flex items-center space-x-2">
                <Loader2 className="w-4 h-4 text-cyber-blue animate-spin" />
                <span className="text-gray-600 loading-dots">Processing your request</span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="bg-white border-t border-gray-200 p-4">
        <form onSubmit={handleSubmit} className="flex space-x-4">
          <div className="flex-1 relative">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask about security events, threats, or investigations... (e.g., 'Show suspicious login attempts yesterday')"
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-cyber-blue focus:ring-1 focus:ring-cyber-blue text-gray-900 placeholder-gray-500"
              disabled={isLoading}
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
              {inputValue.trim() && (
                <div className="text-xs text-gray-600">
                  Enter to send
                </div>
              )}
            </div>
          </div>
          <button
            type="submit"
            disabled={!inputValue.trim() || isLoading}
            className="px-6 py-3 bg-cyber-blue hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed rounded-lg transition-colors text-white font-medium flex items-center space-x-2"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
            <span>Send</span>
          </button>
        </form>

        {/* Quick Actions */}
        <div className="mt-3 flex flex-wrap gap-2">
          {[
            'Show suspicious login attempts yesterday',
            'Analyze network traffic anomalies',
            'Find malware detections last week',
            'Check failed authentication events'
          ].map((suggestion) => (
            <button
              key={suggestion}
              onClick={() => setInputValue(suggestion)}
              className="px-3 py-1.5 text-xs bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-full text-gray-700 hover:text-gray-900 transition-colors"
              disabled={isLoading}
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}