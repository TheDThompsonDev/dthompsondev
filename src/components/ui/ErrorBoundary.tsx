'use client';

import { Component, ReactNode } from 'react';

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
    onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
    showRetry?: boolean;
    retryLabel?: string;
}

interface State {
    hasError: boolean;
    error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        if (this.props.onError) {
            this.props.onError(error, errorInfo);
        }
    }

    private resetError = () => {
        this.setState({ hasError: false, error: undefined });
    };

    render() {
        if (this.state.hasError) {
            if (this.props.fallback) {
                return this.props.fallback;
            }

            return (
                <div className="relative bg-red-50 border-2 border-red-200 rounded-xl p-8 text-center">
                    <div className="max-w-md mx-auto">
                        <div className="text-6xl mb-4">⚠️</div>

                        <h3 className="text-2xl font-bold text-red-800 mb-3">
                            Something went wrong
                        </h3>

                        <p className="text-base text-red-700/80 mb-4">
                            An unexpected error occurred. Please try again.
                        </p>

                        {process.env.NODE_ENV === 'development' && this.state.error && (
                            <div className="mb-6 p-4 bg-red-100 border border-red-300 rounded text-left">
                                <p className="text-xs font-mono text-red-800 break-words">
                                    <strong>Error:</strong> {this.state.error.message}
                                </p>
                            </div>
                        )}

                        {(this.props.showRetry !== false) && (
                            <button
                                onClick={this.resetError}
                                className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 font-bold uppercase tracking-wider transition-colors duration-300 rounded"
                            >
                                {this.props.retryLabel || 'Try Again'}
                            </button>
                        )}
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}
