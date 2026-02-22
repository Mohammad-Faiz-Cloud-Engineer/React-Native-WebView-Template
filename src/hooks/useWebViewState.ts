import {useState, useCallback} from 'react';
import type {LoadingState, WebViewError} from '@/types';

/**
 * Custom hook to manage WebView state
 */
export const useWebViewState = () => {
  const [loadingState, setLoadingState] = useState<LoadingState>('idle');
  const [error, setError] = useState<WebViewError | null>(null);
  const [progress, setProgress] = useState(0);

  const handleLoadStart = useCallback(() => {
    setLoadingState('loading');
    setError(null);
    setProgress(0);
  }, []);

  const handleLoadEnd = useCallback(() => {
    setLoadingState('success');
    setProgress(1);
  }, []);

  const handleLoadProgress = useCallback((progressValue: number) => {
    setProgress(progressValue);
  }, []);

  const handleError = useCallback((errorData: WebViewError) => {
    setLoadingState('error');
    setError(errorData);
    setProgress(0);
  }, []);

  const resetError = useCallback(() => {
    setError(null);
    setLoadingState('idle');
  }, []);

  return {
    loadingState,
    error,
    progress,
    handleLoadStart,
    handleLoadEnd,
    handleLoadProgress,
    handleError,
    resetError,
  };
};
