# CoviLense - Conversational SIEM Assistant

## Overview

CoviLense is an advanced AI-powered Security Information and Event Management (SIEM) assistant designed for cybersecurity professionals. It features a natural language interface that converts investigator prompts into optimized Elasticsearch queries, supports multi-turn investigations, and auto-generates comprehensive threat reports.

## 🚀 Key Features

### 🤖 Conversational Interface
- **Natural Language Queries**: Convert plain English questions into optimized Elasticsearch DSL/KQL queries
- **Multi-turn Context**: Maintains conversation context across follow-up questions and investigations
- **Query Confidence Scoring**: Shows confidence levels for generated queries with preview functionality

### 📊 Advanced Analytics
- **Real-time Threat Monitoring**: Live dashboard with threat activity metrics
- **Geographic Attack Distribution**: Visual representation of attack sources by country
- **Attack Vector Analysis**: Detailed breakdown of threat types and trends
- **Critical Threat Intelligence**: Active threat campaigns and IOC tracking

### 🔍 Investigation Management
- **Investigation History**: Track and manage security investigations
- **Automated Report Generation**: Create comprehensive PDF reports with charts and analysis
- **Query Optimization**: Intelligent query planning to avoid SIEM overload
- **Multi-analyst Collaboration**: Share investigations and findings across team

### 🛡️ Security Features
- **Role-Based Access Control (RBAC)**: Granular permission management
- **Multi-Factor Authentication**: Enhanced security for sensitive operations
- **Audit Logging**: Complete audit trail of all activities
- **IP Whitelisting**: Restrict access by IP ranges

## 🏗️ Architecture

### Frontend Technologies
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Recharts** - Data visualization library
- **Lucide React** - Icon library
- **Framer Motion** - Animation library

### Backend Integration Points
- **Elasticsearch/Wazuh APIs** - SIEM data sources
- **OpenAI/Anthropic APIs** - Natural language processing
- **Redis** - Context caching and session management
- **PostgreSQL** - Audit logs and user management

## 🎨 UI/UX Features

### Cybersecurity-Themed Design
- **Dark Theme**: Eye-friendly interface for 24/7 SOC operations
- **Cyber Color Palette**: Blue, purple, green accent colors
- **Glowing Effects**: Subtle animations and status indicators
- **Responsive Layout**: Works on desktop, tablet, and mobile devices

### Interactive Components
- **Real-time Charts**: Live updating threat metrics
- **Query Preview**: Show generated queries before execution
- **Status Indicators**: System health and connection status
- **Progressive Loading**: Smooth loading states for all operations

## 📋 Installation & Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Getting Started

1. **Clone the repository**
```bash
git clone https://github.com/your-org/covilense-siem-assistant.git
cd covilense-siem-assistant
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Run development server**
```bash
npm run dev
# or
yarn dev
```

4. **Open application**
Navigate to [http://localhost:3000](http://localhost:3000) in your browser.

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file in the root directory:

```env
# Elasticsearch Configuration
ELASTICSEARCH_HOST=localhost:9200
ELASTICSEARCH_USERNAME=elastic
ELASTICSEARCH_PASSWORD=your_password

# OpenAI Configuration
OPENAI_API_KEY=your_openai_api_key

# Redis Configuration
REDIS_URL=redis://localhost:6379

# Database Configuration
DATABASE_URL=postgresql://username:password@localhost:5432/covilense
```

### SIEM Integration
1. Configure Elasticsearch connection in Settings > Elasticsearch
2. Set up index patterns for your log sources
3. Configure authentication credentials
4. Test connection and verify data access

## 📱 Application Sections

### 1. Dashboard
- **Security metrics overview**: Active threats, blocked attacks, system uptime
- **Threat timeline charts**: Visual representation of attack patterns
- **Alert distribution**: Categorized threat analysis
- **Recent security alerts**: Latest incidents requiring attention

### 2. Chat Assistant
- **Natural language interface**: Ask questions in plain English
- **Query generation**: Automatic conversion to Elasticsearch queries
- **Multi-turn conversations**: Context-aware follow-up questions
- **Results visualization**: Tables, charts, and formatted reports

### 3. Threat Analytics
- **Advanced threat intelligence**: APT campaigns and IOC analysis
- **Geographic distribution**: Attack source mapping
- **Trend analysis**: Historical attack pattern analysis
- **Critical threat tracking**: Active campaign monitoring

### 4. Investigation History
- **Case management**: Track all security investigations
- **Report generation**: Automated PDF reports with findings
- **Collaboration tools**: Share investigations with team members
- **Progress tracking**: Monitor investigation status and outcomes

### 5. Settings
- **System configuration**: Elasticsearch, NLP engine settings
- **Security settings**: MFA, RBAC, session management
- **Notification preferences**: Email, Slack, Teams integration
- **User management**: Role assignments and permissions

## 🔐 Security Considerations

### Data Protection
- **Read-only SIEM access**: No modifications to source data
- **Encrypted communications**: TLS for all API communications
- **Secure credential storage**: Encrypted password storage
- **Session management**: Automatic timeout and invalidation

### Access Control
- **Multi-factor authentication**: Required for all users
- **Role-based permissions**: Granular access control
- **IP whitelisting**: Restrict access by network location
- **Audit logging**: Complete activity tracking

## 🚀 Deployment

### Production Build
```bash
npm run build
npm start
```

### Docker Deployment
```bash
docker build -t covilense .
docker run -p 3000:3000 covilense
```

### Environment-Specific Configuration
- Development: Local Elasticsearch instance
- Staging: Shared testing environment
- Production: High-availability cluster setup

## 🤝 Contributing

### Development Guidelines
1. Follow TypeScript best practices
2. Use Tailwind CSS for styling
3. Implement proper error handling
4. Write comprehensive tests
5. Document all new features

### Code Style
- ESLint configuration included
- Prettier for code formatting
- Conventional commits for version control
- Component-based architecture

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

### Documentation
- API documentation available at `/docs`
- Component library at `/storybook`
- Architecture diagrams in `/docs/architecture`

### Contact Information
- **Technical Support**: tech-support@isro.gov.in
- **Security Issues**: security@isro.gov.in
- **Feature Requests**: features@isro.gov.in

---

**CoviLense** - Empowering cybersecurity professionals with AI-driven threat investigation capabilities.

*Built for ISRO's Smart India Hackathon 2024 - Problem Statement #25173*