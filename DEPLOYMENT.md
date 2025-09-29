# CoviLense Deployment Guide

## 🚀 Quick Start

### Prerequisites
- Node.js 18.0 or later
- npm or yarn package manager
- Git

### Local Development Setup

1. **Clone and Install**
```bash
git clone <repository-url>
cd covilense-siem-assistant
npm install
```

2. **Start Development Server**
```bash
npm run dev
```

3. **Open Application**
Navigate to `http://localhost:3000`

## 🏗️ Production Deployment

### Environment Configuration

Create `.env.production` file:
```env
# Application
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://your-domain.com

# Elasticsearch Configuration
ELASTICSEARCH_HOST=your-elasticsearch-cluster:9200
ELASTICSEARCH_USERNAME=siem-reader
ELASTICSEARCH_PASSWORD=secure-password
ELASTICSEARCH_SSL=true

# NLP Service
OPENAI_API_KEY=your-openai-key
NLP_MODEL=gpt-4
NLP_TEMPERATURE=0.3

# Database
DATABASE_URL=postgresql://user:pass@host:5432/covilense
REDIS_URL=redis://redis-host:6379

# Security
JWT_SECRET=your-jwt-secret
SESSION_SECRET=your-session-secret
ENCRYPTION_KEY=your-encryption-key

# Monitoring
LOG_LEVEL=info
METRICS_ENABLED=true
```

### Build and Start

```bash
# Build the application
npm run build

# Start production server
npm start
```

## 🐳 Docker Deployment

### Dockerfile
```dockerfile
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT 3000

CMD ["node", "server.js"]
```

### Docker Compose
```yaml
version: '3.8'

services:
  covilense-app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgresql://postgres:password@db:5432/covilense
      - REDIS_URL=redis://redis:6379
    depends_on:
      - db
      - redis
    restart: unless-stopped

  db:
    image: postgres:15-alpine
    environment:
      - POSTGRES_DB=covilense
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=password
    volumes:
      - postgres_data:/var/lib/postgresql/data
    restart: unless-stopped

  redis:
    image: redis:7-alpine
    volumes:
      - redis_data:/data
    restart: unless-stopped

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/ssl/certs
    depends_on:
      - covilense-app
    restart: unless-stopped

volumes:
  postgres_data:
  redis_data:
```

## ☸️ Kubernetes Deployment

### Namespace
```yaml
apiVersion: v1
kind: Namespace
metadata:
  name: covilense
```

### ConfigMap
```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: covilense-config
  namespace: covilense
data:
  NODE_ENV: "production"
  LOG_LEVEL: "info"
  METRICS_ENABLED: "true"
```

### Secret
```yaml
apiVersion: v1
kind: Secret
metadata:
  name: covilense-secrets
  namespace: covilense
type: Opaque
stringData:
  DATABASE_URL: "postgresql://user:pass@postgres:5432/covilense"
  ELASTICSEARCH_PASSWORD: "your-password"
  OPENAI_API_KEY: "your-openai-key"
  JWT_SECRET: "your-jwt-secret"
```

### Deployment
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: covilense-app
  namespace: covilense
spec:
  replicas: 3
  selector:
    matchLabels:
      app: covilense-app
  template:
    metadata:
      labels:
        app: covilense-app
    spec:
      containers:
      - name: covilense
        image: covilense:latest
        ports:
        - containerPort: 3000
        envFrom:
        - configMapRef:
            name: covilense-config
        - secretRef:
            name: covilense-secrets
        resources:
          requests:
            cpu: 100m
            memory: 256Mi
          limits:
            cpu: 500m
            memory: 512Mi
        livenessProbe:
          httpGet:
            path: /api/health
            port: 3000
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /api/ready
            port: 3000
          initialDelaySeconds: 5
          periodSeconds: 5
```

### Service
```yaml
apiVersion: v1
kind: Service
metadata:
  name: covilense-service
  namespace: covilense
spec:
  selector:
    app: covilense-app
  ports:
  - port: 80
    targetPort: 3000
  type: ClusterIP
```

### Ingress
```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: covilense-ingress
  namespace: covilense
  annotations:
    kubernetes.io/ingress.class: nginx
    cert-manager.io/cluster-issuer: letsencrypt-prod
    nginx.ingress.kubernetes.io/ssl-redirect: "true"
spec:
  tls:
  - hosts:
    - covilense.your-domain.com
    secretName: covilense-tls
  rules:
  - host: covilense.your-domain.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: covilense-service
            port:
              number: 80
```

## 🔧 Infrastructure Requirements

### Minimum System Requirements
- **CPU**: 2 cores
- **RAM**: 4GB
- **Storage**: 20GB
- **Network**: 100 Mbps

### Recommended Production Setup
- **CPU**: 4-8 cores
- **RAM**: 8-16GB
- **Storage**: 100GB SSD
- **Network**: 1 Gbps
- **Load Balancer**: Yes
- **SSL Termination**: Required

### High Availability Setup
- **Application Servers**: 3+ instances
- **Database**: PostgreSQL cluster with replication
- **Cache**: Redis cluster
- **Load Balancer**: HAProxy/Nginx with health checks
- **Monitoring**: Prometheus + Grafana
- **Logging**: ELK Stack integration

## 🛡️ Security Configuration

### SSL/TLS Setup
```bash
# Generate SSL certificate (Let's Encrypt)
certbot certonly --nginx -d covilense.your-domain.com

# Update Nginx configuration
server {
    listen 443 ssl http2;
    server_name covilense.your-domain.com;
    
    ssl_certificate /etc/letsencrypt/live/covilense.your-domain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/covilense.your-domain.com/privkey.pem;
    
    # Security headers
    add_header X-Frame-Options DENY;
    add_header X-Content-Type-Options nosniff;
    add_header X-XSS-Protection "1; mode=block";
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains";
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### Firewall Rules
```bash
# Allow HTTP/HTTPS traffic
ufw allow 80/tcp
ufw allow 443/tcp

# Allow SSH (change default port)
ufw allow 22/tcp

# Allow application port (if needed)
ufw allow 3000/tcp

# Enable firewall
ufw enable
```

## 📊 Monitoring & Logging

### Health Check Endpoints
- `GET /api/health` - Basic health check
- `GET /api/ready` - Readiness probe
- `GET /api/metrics` - Prometheus metrics

### Log Configuration
```javascript
// logger.js
const winston = require('winston');

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: { service: 'covilense' },
  transports: [
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' }),
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
    })
  ]
});
```

## 🔄 Backup & Recovery

### Database Backup
```bash
# Daily backup script
#!/bin/bash
BACKUP_DIR="/backups/covilense"
DATE=$(date +%Y%m%d_%H%M%S)

# Create backup
pg_dump -h localhost -U postgres covilense > $BACKUP_DIR/covilense_$DATE.sql

# Compress backup
gzip $BACKUP_DIR/covilense_$DATE.sql

# Clean old backups (keep 30 days)
find $BACKUP_DIR -name "*.sql.gz" -mtime +30 -delete
```

### Restore Procedure
```bash
# Stop application
docker-compose down

# Restore database
gunzip -c backup_file.sql.gz | psql -h localhost -U postgres covilense

# Start application
docker-compose up -d
```

## 📈 Performance Optimization

### Next.js Optimization
```javascript
// next.config.js
module.exports = {
  compress: true,
  poweredByHeader: false,
  generateEtags: false,
  
  experimental: {
    optimizeCss: true,
    optimizeImages: true,
  },
  
  images: {
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60,
  },
  
  headers: async () => [
    {
      source: '/(.*)',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, immutable',
        },
      ],
    },
  ],
}
```

### Database Optimization
```sql
-- Create indexes for better performance
CREATE INDEX CONCURRENTLY idx_alerts_timestamp ON alerts(timestamp DESC);
CREATE INDEX CONCURRENTLY idx_investigations_status ON investigations(status);
CREATE INDEX CONCURRENTLY idx_threats_severity ON threats(severity, created_at);

-- Optimize queries
VACUUM ANALYZE alerts;
VACUUM ANALYZE investigations;
VACUUM ANALYZE threats;
```

## 🚨 Troubleshooting

### Common Issues

1. **Application won't start**
   - Check environment variables
   - Verify database connectivity
   - Review application logs

2. **High memory usage**
   - Increase Node.js heap size: `--max-old-space-size=4096`
   - Optimize database queries
   - Implement proper caching

3. **Slow response times**
   - Add database indexes
   - Enable Redis caching
   - Optimize Elasticsearch queries

### Debugging Commands
```bash
# Check application logs
docker logs covilense-app

# Monitor system resources
htop
iostat -x 1

# Check database performance
psql -c "SELECT * FROM pg_stat_activity;"

# Test Elasticsearch connectivity
curl -X GET "localhost:9200/_cluster/health"
```

This deployment guide provides comprehensive instructions for setting up CoviLense in various environments, from development to high-availability production deployments.