import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'CoviLense - Conversational SIEM Assistant',
  description: 'AI-powered SIEM investigation assistant with natural language queries and automated threat reporting',
  keywords: ['SIEM', 'Cybersecurity', 'Threat Detection', 'Elasticsearch', 'AI Assistant'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="light">
      <body className="bg-gray-50 text-gray-900">
        {children}
      </body>
    </html>
  )
}