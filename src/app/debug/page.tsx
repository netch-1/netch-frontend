'use client';

import { useState } from 'react';

export default function DebugPage() {
  const [envCheck] = useState({
    nodeEnv: process.env.NODE_ENV,
    hasUrl: false,
    hasKey: false,
    url: 'Not configured',
    key: 'Not configured'
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/10 p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-foreground">Debug Information</h1>
          <p className="text-muted-foreground">
            This page shows debug information about the application
          </p>
        </div>

        {/* Environment Information */}
        <div className="bg-card border border-border/50 rounded-lg p-6 space-y-4">
          <h2 className="text-xl font-semibold text-foreground">Environment Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p><strong>NODE_ENV:</strong> {envCheck?.nodeEnv || 'Not set'}</p>
            </div>
          </div>
        </div>

        {/* Application Status */}
        <div className="bg-card border border-border/50 rounded-lg p-6 space-y-4">
          <h2 className="text-xl font-semibold text-foreground">Application Status</h2>
          <div className="space-y-2">
            <p><strong>Status:</strong> <span className="text-green-500">Running</span></p>
            <p><strong>Version:</strong> 1.0.0</p>
            <p><strong>Framework:</strong> Next.js 15.4.2</p>
            <p><strong>React:</strong> 19.1.0</p>
          </div>
        </div>

        {/* Raw Data */}
        <div className="bg-card border border-border/50 rounded-lg p-6 space-y-4">
          <h2 className="text-xl font-semibold text-foreground">Raw Debug Data</h2>
          <pre className="bg-muted p-4 rounded-md overflow-x-auto text-sm">
            {JSON.stringify({ envCheck }, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
} 