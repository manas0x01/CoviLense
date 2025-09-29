// Utility function for conditional classes
export function clsx(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ')
}

// Format date for display
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date)
}

// Format relative time
export function formatRelativeTime(date: Date): string {
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`
  return `${Math.floor(diffInSeconds / 86400)} days ago`
}

// Generate mock data for development
export function generateMockThreatData() {
  const data = []
  const now = new Date()
  
  for (let i = 23; i >= 0; i--) {
    const date = new Date(now.getTime() - i * 60 * 60 * 1000)
    data.push({
      time: date.toISOString(),
      threats: Math.floor(Math.random() * 50) + 10,
      blocked: Math.floor(Math.random() * 40) + 5,
      malware: Math.floor(Math.random() * 20) + 2,
      phishing: Math.floor(Math.random() * 15) + 3,
    })
  }
  
  return data
}

// Validate IP address
export function isValidIP(ip: string): boolean {
  const ipv4Regex = /^(\d{1,3}\.){3}\d{1,3}$/
  const ipv6Regex = /^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/
  return ipv4Regex.test(ip) || ipv6Regex.test(ip)
}

// Generate Elasticsearch query from natural language
export function generateElasticsearchQuery(nlInput: string): {
  query: string
  description: string
  confidence: number
} {
  const patterns = [
    {
      pattern: /failed login|authentication fail|login fail/i,
      template: `{
  "query": {
    "bool": {
      "must": [
        { "match": { "event.action": "logon" } },
        { "match": { "event.outcome": "failure" } },
        { "range": { "@timestamp": { "gte": "now-24h" } } }
      ]
    }
  },
  "aggs": {
    "by_source_ip": {
      "terms": { "field": "source.ip", "size": 10 }
    }
  }
}`,
      description: 'Searching for failed authentication attempts',
      confidence: 0.9
    },
    {
      pattern: /malware|virus|trojan/i,
      template: `{
  "query": {
    "bool": {
      "should": [
        { "match": { "event.category": "malware" } },
        { "match": { "threat.software.type": "malware" } },
        { "match": { "file.hash.*": "*" } }
      ],
      "must": [
        { "range": { "@timestamp": { "gte": "now-7d" } } }
      ]
    }
  }
}`,
      description: 'Searching for malware-related events',
      confidence: 0.85
    },
    {
      pattern: /suspicious|anomaly|unusual/i,
      template: `{
  "query": {
    "bool": {
      "should": [
        { "match": { "event.risk_score": { "query": ">75" } } },
        { "match": { "rule.name": "*suspicious*" } },
        { "match": { "event.severity": "high" } }
      ],
      "must": [
        { "range": { "@timestamp": { "gte": "now-1h" } } }
      ]
    }
  }
}`,
      description: 'Searching for suspicious or anomalous activities',
      confidence: 0.75
    }
  ]

  for (const pattern of patterns) {
    if (pattern.pattern.test(nlInput)) {
      return {
        query: pattern.template,
        description: pattern.description,
        confidence: pattern.confidence
      }
    }
  }

  // Default query
  return {
    query: `{
  "query": {
    "query_string": {
      "query": "${nlInput.replace(/"/g, '\\"')}"
    }
  },
  "size": 100
}`,
    description: `General search for "${nlInput}"`,
    confidence: 0.6
  }
}