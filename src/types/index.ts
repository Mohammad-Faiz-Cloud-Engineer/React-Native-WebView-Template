export interface WebViewError {
  code: number;
  description: string;
  domain?: string;
}

export interface NavigationState {
  url: string;
  title: string;
  loading: boolean;
  canGoBack: boolean;
  canGoForward: boolean;
}

export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

export interface AppState {
  isConnected: boolean;
  loadingState: LoadingState;
  error: WebViewError | null;
}
