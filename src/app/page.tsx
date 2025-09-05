'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    // Automatically redirect to dashboard after a short delay to show the page briefly
    const timer = setTimeout(() => {
      router.replace('/dashboard');
    }, 2000); // 2 second delay

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-accent/5">
      <div className="text-center max-w-2xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-foreground mb-6">
          Welcome to Netch
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          Advanced network monitoring and management platform with enterprise-grade security.
        </p>
        <div className="space-y-4">
          <Link 
            href="/dashboard" 
            className="inline-block px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
          >
            Go to Dashboard
          </Link>
          <div className="flex gap-4 justify-center">
            <Link 
              href="/about" 
              className="px-4 py-2 text-sm bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/90 transition-colors"
            >
              About
            </Link>
            <Link 
              href="/contact" 
              className="px-4 py-2 text-sm bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/90 transition-colors"
            >
              Contact
            </Link>
          </div>
        </div>
        <div className="mt-8 text-sm text-muted-foreground">
          Redirecting to dashboard in 2 seconds...
        </div>
      </div>
    </div>
  );
}
