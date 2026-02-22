/**
 * Application Configuration
 * 
 * This is the ONLY file you need to modify to customize your WebView app.
 * Change the values below to match your requirements.
 */

export const APP_CONFIG = {
  /**
   * Application Name
   * This will be displayed in the app and should match your app.json
   */
  APP_NAME: 'WebViewApp',

  /**
   * Base URL
   * The main URL that will be loaded in the WebView
   */
  BASE_URL: 'https://example.com',

  /**
   * Allowed Domains
   * List of domains that the WebView is allowed to navigate to.
   * Any navigation outside these domains will be blocked.
   * Use wildcards for subdomains: '*.example.com'
   */
  ALLOWED_DOMAINS: [
    'example.com',
    'www.example.com',
    '*.example.com',
  ],

  /**
   * Allowed URL Schemes
   * URL schemes that are allowed to be opened (e.g., mailto, tel)
   */
  ALLOWED_SCHEMES: ['https', 'mailto', 'tel', 'sms'],

  /**
   * WebView Settings
   */
  WEBVIEW_SETTINGS: {
    // Enable JavaScript (required for most modern websites)
    javaScriptEnabled: true,
    
    // Enable DOM storage
    domStorageEnabled: true,
    
    // Disable file access for security
    allowFileAccess: false,
    
    // Disable file access from file URLs
    allowFileAccessFromFileURLs: false,
    
    // Disable universal access from file URLs
    allowUniversalAccessFromFileURLs: false,
    
    // Disable mixed content (HTTP in HTTPS)
    mixedContentMode: 'never',
    
    // Enable caching for better performance
    cacheEnabled: true,
    
    // Cache mode: 'LOAD_DEFAULT' | 'LOAD_CACHE_ELSE_NETWORK' | 'LOAD_NO_CACHE' | 'LOAD_CACHE_ONLY'
    cacheMode: 'LOAD_DEFAULT',
    
    // Enable third-party cookies (adjust based on your needs)
    thirdPartyCookiesEnabled: true,
    
    // Disable geolocation (enable if your app needs it)
    geolocationEnabled: false,
    
    // Media playback requires user action
    mediaPlaybackRequiresUserAction: false,
    
    // Allow inline media playback (iOS)
    allowsInlineMediaPlayback: true,
  },

  /**
   * UI Configuration
   */
  UI: {
    // Show pull-to-refresh
    enablePullToRefresh: true,
    
    // Loading indicator color
    loadingColor: '#007AFF',
    
    // Show loading progress bar
    showProgressBar: true,
    
    // Progress bar color
    progressBarColor: '#007AFF',
    
    // Background color while loading
    backgroundColor: '#FFFFFF',
  },

  /**
   * Error Messages
   */
  ERROR_MESSAGES: {
    NO_INTERNET: 'No internet connection. Please check your network settings.',
    LOAD_ERROR: 'Failed to load the page. Please try again.',
    BLOCKED_NAVIGATION: 'Navigation to this URL is not allowed.',
    SSL_ERROR: 'SSL certificate error. Cannot load insecure content.',
  },

  /**
   * Deep Link Configuration
   * Configure your app's deep link scheme here
   */
  DEEP_LINK: {
    scheme: 'webviewapp', // Change this to your app's scheme
    enabled: true,
  },
};

/**
 * Validate if a URL belongs to allowed domains
 */
export const isAllowedDomain = (url: string): boolean => {
  try {
    const urlObj = new URL(url);
    const hostname = urlObj.hostname.toLowerCase();
    
    return APP_CONFIG.ALLOWED_DOMAINS.some(domain => {
      const domainLower = domain.toLowerCase();
      
      // Handle wildcard subdomains
      if (domainLower.startsWith('*.')) {
        const baseDomain = domainLower.substring(2);
        return hostname === baseDomain || hostname.endsWith('.' + baseDomain);
      }
      
      return hostname === domainLower;
    });
  } catch {
    return false;
  }
};

/**
 * Validate if a URL scheme is allowed
 */
export const isAllowedScheme = (url: string): boolean => {
  try {
    const urlObj = new URL(url);
    return APP_CONFIG.ALLOWED_SCHEMES.includes(urlObj.protocol.replace(':', ''));
  } catch {
    return false;
  }
};

/**
 * Check if URL is safe to load
 */
export const isSafeUrl = (url: string): boolean => {
  if (!url || typeof url !== 'string') {
    return false;
  }

  // Block javascript: protocol
  if (url.toLowerCase().startsWith('javascript:')) {
    return false;
  }

  // Block data: protocol
  if (url.toLowerCase().startsWith('data:')) {
    return false;
  }

  // Block file: protocol
  if (url.toLowerCase().startsWith('file:')) {
    return false;
  }

  return isAllowedScheme(url) && isAllowedDomain(url);
};
