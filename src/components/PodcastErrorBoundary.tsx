'use client';

import { Component, ReactNode } from 'react';
import { logger } from '@/lib/logger';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class PodcastErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    logger.error('Podcast component error', error, {
      componentStack: errorInfo.componentStack,
    });
  }

  private resetError = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="relative bg-[#153230]/5 border-2 border-[#153230]/20 rounded-xl p-8 text-center">
          <div className="max-w-md mx-auto">
            {/* Radio icon for podcast context */}
            <div className="text-6xl mb-4">📻</div>

            <h3 className="text-2xl md:text-3xl font-black text-[#153230] mb-3 tracking-tight">
              Radio Interference Detected
            </h3>

            <p className="text-base text-[#153230]/80 mb-4 leading-relaxed">
              We're having trouble tuning into the podcast feed. This is usually temporary.
            </p>

            {/* Show error details only in development */}
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded text-left">
                <p className="text-xs font-mono text-red-700 break-words">
                  <strong>Dev Error:</strong> {this.state.error.message}
                </p>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
              {/* Try again without full reload */}
              <button
                onClick={this.resetError}
                className="bg-[#2e6089] hover:bg-[#153230] text-white px-6 py-3 font-bold uppercase tracking-wider transition-colors duration-300"
              >
                Try Again
              </button>

              {/* Go back to home */}
              <button
                onClick={() => window.location.href = '/'}
                className="bg-[#153230]/10 hover:bg-[#153230]/20 text-[#153230] px-6 py-3 font-bold uppercase tracking-wider transition-colors duration-300"
              >
                Back to Home
              </button>
            </div>

            <p className="text-sm text-[#153230]/50">
              Podcast feeds are refreshed automatically. Please try again in a few minutes.
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

