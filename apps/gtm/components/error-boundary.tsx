'use client'

import React, { Component, ErrorInfo, ReactNode } from 'react'

import { logger } from '@/lib/logger'

interface Props {
    children: ReactNode
    fallback?: ReactNode
}

interface State {
    hasError: boolean
}

class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false
    }

    public static getDerivedStateFromError(_: Error): State {
        return { hasError: true }
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        logger.error('Uncaught client-side error', { error, componentStack: errorInfo.componentStack })
    }

    private getIsEs(): boolean {
        if (typeof document === 'undefined') return false
        return document.cookie.includes('NEXT_LOCALE=es')
    }

    public render() {
        if (this.state.hasError) {
            const isEs = this.getIsEs()
            return this.props.fallback || (
                <div className="flex items-center justify-center min-vh-100 p-8">
                    <div className="max-w-md w-full text-center p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-red-100 dark:border-red-900/30">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">{isEs ? 'Algo salió mal' : 'Oops, something went wrong'}</h2>
                        <p className="text-gray-600 dark:text-gray-400 mb-6">
                            {isEs ? 'Inténtalo de nuevo o escríbenos si el problema continúa.' : 'The application encountered an unexpected error. Please try refreshing the page.'}
                        </p>
                        <button
                            onClick={() => window.location.reload()}
                            className="bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
                        >
                            {isEs ? 'Recargar Página' : 'Refresh Page'}
                        </button>
                    </div>
                </div>
            )
        }

        return this.props.children
    }
}

export default ErrorBoundary
