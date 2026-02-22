# Configuration Examples

This document provides real-world configuration examples for different types of WebView applications.

## Table of Contents

1. [News/Blog Application](#newsblog-application)
2. [E-commerce Application](#e-commerce-application)
3. [Documentation Site](#documentation-site)
4. [SaaS Dashboard](#saas-dashboard)
5. [Social Media Platform](#social-media-platform)
6. [Educational Platform](#educational-platform)
7. [Banking/Finance App](#bankingfinance-app)
8. [Restaurant/Food Delivery](#restaurantfood-delivery)

---

## News/Blog Application

Perfect for news websites, blogs, and content platforms.

```typescript
// src/config/appConfig.ts
export const APP_CONFIG = {
  APP_NAME: 'Daily News',
  BASE_URL: 'https://news.example.com',
  
  ALLOWED_DOMAINS: [
    'news.example.com',
    'www.news.example.com',
    '*.news.example.com',
    'cdn.news.example.com',  // For images/assets
  ],
  
  ALLOWED_SCHEMES: [
    'https',
    'mailto',  // For newsletter subscriptions
  ],
  
  WEBVIEW_SETTINGS: {
    javaScriptEnabled: true,
    domStorageEnabled: true,
    allowFileAccess: false,
    allowFileAccessFromFileURLs: false,
    allowUniversalAccessFromFileURLs: false,
    mixedContentMode: 'never',
    cacheEnabled: true,
    cacheMode: 'LOAD_DEFAULT',
    thirdPartyCookiesEnabled: false,  // Not needed for news
    geolocationEnabled: false,
    mediaPlaybackRequiresUserAction: false,  // Auto-play videos
    allowsInlineMediaPlayback: true,
  },
  
  UI: {
    enablePullToRefresh: true,  // Important for news apps
    loadingColor: '#FF6B6B',
    showProgressBar: true,
    progressBarColor: '#FF6B6B',
    backgroundColor: '#FFFFFF',
  },
  
  ERROR_MESSAGES: {
    NO_INTERNET: 'Unable to load news. Check your connection.',
    LOAD_ERROR: 'Failed to load articles. Please try again.',
    BLOCKED_NAVIGATION: 'This link cannot be opened.',
    SSL_ERROR: 'Secure connection failed.',
  },
  
  DEEP_LINK: {
    scheme: 'dailynews',
    enabled: true,
  },
};
```

---

## E-commerce Application

For online stores and shopping platforms.

```typescript
// src/config/appConfig.ts
export const APP_CONFIG = {
  APP_NAME: 'ShopNow',
  BASE_URL: 'https://shop.example.com',
  
  ALLOWED_DOMAINS: [
    'shop.example.com',
    'www.shop.example.com',
    'checkout.example.com',
    'payment.example.com',
    'secure.example.com',
    'api.example.com',
    'cdn.example.com',
  ],
  
  ALLOWED_SCHEMES: [
    'https',
    'tel',      // For customer support
    'mailto',   // For order confirmations
    'sms',      // For OTP verification
  ],
  
  WEBVIEW_SETTINGS: {
    javaScriptEnabled: true,
    domStorageEnabled: true,
    allowFileAccess: false,
    allowFileAccessFromFileURLs: false,
    allowUniversalAccessFromFileURLs: false,
    mixedContentMode: 'never',
    cacheEnabled: true,
    cacheMode: 'LOAD_DEFAULT',
    thirdPartyCookiesEnabled: true,  // Required for payment gateways
    geolocationEnabled: true,  // For location-based delivery
    mediaPlaybackRequiresUserAction: false,
    allowsInlineMediaPlayback: true,
  },
  
  UI: {
    enablePullToRefresh: true,
    loadingColor: '#4CAF50',
    showProgressBar: true,
    progressBarColor: '#4CAF50',
    backgroundColor: '#F5F5F5',
  },
  
  ERROR_MESSAGES: {
    NO_INTERNET: 'No internet connection. Your cart is saved.',
    LOAD_ERROR: 'Unable to load store. Please try again.',
    BLOCKED_NAVIGATION: 'This action is not allowed.',
    SSL_ERROR: 'Secure connection required for shopping.',
  },
  
  DEEP_LINK: {
    scheme: 'shopnow',
    enabled: true,
  },
};
```

---

## Documentation Site

For technical documentation and knowledge bases.

```typescript
// src/config/appConfig.ts
export const APP_CONFIG = {
  APP_NAME: 'DevDocs',
  BASE_URL: 'https://docs.example.com',
  
  ALLOWED_DOMAINS: [
    'docs.example.com',
    '*.docs.example.com',
    'api-docs.example.com',
    'cdn.example.com',
  ],
  
  ALLOWED_SCHEMES: [
    'https',
    'mailto',  // For feedback
  ],
  
  WEBVIEW_SETTINGS: {
    javaScriptEnabled: true,
    domStorageEnabled: true,
    allowFileAccess: false,
    allowFileAccessFromFileURLs: false,
    allowUniversalAccessFromFileURLs: false,
    mixedContentMode: 'never',
    cacheEnabled: true,
    cacheMode: 'LOAD_CACHE_ELSE_NETWORK',  // Aggressive caching for docs
    thirdPartyCookiesEnabled: false,
    geolocationEnabled: false,
    mediaPlaybackRequiresUserAction: true,
    allowsInlineMediaPlayback: true,
  },
  
  UI: {
    enablePullToRefresh: true,
    loadingColor: '#2196F3',
    showProgressBar: false,  // Cleaner for documentation
    progressBarColor: '#2196F3',
    backgroundColor: '#FAFAFA',
  },
  
  ERROR_MESSAGES: {
    NO_INTERNET: 'Offline mode. Some content may be unavailable.',
    LOAD_ERROR: 'Failed to load documentation.',
    BLOCKED_NAVIGATION: 'External links are not allowed.',
    SSL_ERROR: 'Secure connection failed.',
  },
  
  DEEP_LINK: {
    scheme: 'devdocs',
    enabled: true,
  },
};
```

---

## SaaS Dashboard

For web applications and dashboards.

```typescript
// src/config/appConfig.ts
export const APP_CONFIG = {
  APP_NAME: 'Dashboard',
  BASE_URL: 'https://app.example.com',
  
  ALLOWED_DOMAINS: [
    'app.example.com',
    'api.example.com',
    'auth.example.com',
    'cdn.example.com',
    'analytics.example.com',
  ],
  
  ALLOWED_SCHEMES: [
    'https',
    'mailto',
    'tel',
  ],
  
  WEBVIEW_SETTINGS: {
    javaScriptEnabled: true,
    domStorageEnabled: true,
    allowFileAccess: false,
    allowFileAccessFromFileURLs: false,
    allowUniversalAccessFromFileURLs: false,
    mixedContentMode: 'never',
    cacheEnabled: true,
    cacheMode: 'LOAD_NO_CACHE',  // Always fresh data for dashboards
    thirdPartyCookiesEnabled: true,  // For SSO and analytics
    geolocationEnabled: false,
    mediaPlaybackRequiresUserAction: true,
    allowsInlineMediaPlayback: true,
  },
  
  UI: {
    enablePullToRefresh: true,
    loadingColor: '#9C27B0',
    showProgressBar: true,
    progressBarColor: '#9C27B0',
    backgroundColor: '#FFFFFF',
  },
  
  ERROR_MESSAGES: {
    NO_INTERNET: 'Connection lost. Reconnecting...',
    LOAD_ERROR: 'Failed to load dashboard. Please refresh.',
    BLOCKED_NAVIGATION: 'Navigation not allowed.',
    SSL_ERROR: 'Secure connection required.',
  },
  
  DEEP_LINK: {
    scheme: 'dashboard',
    enabled: true,
  },
};
```

---

## Social Media Platform

For social networks and community platforms.

```typescript
// src/config/appConfig.ts
export const APP_CONFIG = {
  APP_NAME: 'SocialHub',
  BASE_URL: 'https://social.example.com',
  
  ALLOWED_DOMAINS: [
    'social.example.com',
    '*.social.example.com',
    'media.example.com',
    'cdn.example.com',
    'upload.example.com',
  ],
  
  ALLOWED_SCHEMES: [
    'https',
    'mailto',
    'tel',
    'sms',
  ],
  
  WEBVIEW_SETTINGS: {
    javaScriptEnabled: true,
    domStorageEnabled: true,
    allowFileAccess: false,
    allowFileAccessFromFileURLs: false,
    allowUniversalAccessFromFileURLs: false,
    mixedContentMode: 'never',
    cacheEnabled: true,
    cacheMode: 'LOAD_DEFAULT',
    thirdPartyCookiesEnabled: true,
    geolocationEnabled: true,  // For location tagging
    mediaPlaybackRequiresUserAction: false,  // Auto-play videos
    allowsInlineMediaPlayback: true,
  },
  
  UI: {
    enablePullToRefresh: true,
    loadingColor: '#E91E63',
    showProgressBar: true,
    progressBarColor: '#E91E63',
    backgroundColor: '#000000',  // Dark theme
  },
  
  ERROR_MESSAGES: {
    NO_INTERNET: 'No connection. Posts will sync when online.',
    LOAD_ERROR: 'Failed to load feed. Pull to refresh.',
    BLOCKED_NAVIGATION: 'This link cannot be opened.',
    SSL_ERROR: 'Secure connection failed.',
  },
  
  DEEP_LINK: {
    scheme: 'socialhub',
    enabled: true,
  },
};
```

---

## Educational Platform

For e-learning and course platforms.

```typescript
// src/config/appConfig.ts
export const APP_CONFIG = {
  APP_NAME: 'LearnHub',
  BASE_URL: 'https://learn.example.com',
  
  ALLOWED_DOMAINS: [
    'learn.example.com',
    'courses.example.com',
    'video.example.com',
    'cdn.example.com',
    'quiz.example.com',
  ],
  
  ALLOWED_SCHEMES: [
    'https',
    'mailto',
  ],
  
  WEBVIEW_SETTINGS: {
    javaScriptEnabled: true,
    domStorageEnabled: true,
    allowFileAccess: false,
    allowFileAccessFromFileURLs: false,
    allowUniversalAccessFromFileURLs: false,
    mixedContentMode: 'never',
    cacheEnabled: true,
    cacheMode: 'LOAD_DEFAULT',
    thirdPartyCookiesEnabled: true,  // For video platforms
    geolocationEnabled: false,
    mediaPlaybackRequiresUserAction: false,  // Auto-play lessons
    allowsInlineMediaPlayback: true,
  },
  
  UI: {
    enablePullToRefresh: true,
    loadingColor: '#FF9800',
    showProgressBar: true,
    progressBarColor: '#FF9800',
    backgroundColor: '#FAFAFA',
  },
  
  ERROR_MESSAGES: {
    NO_INTERNET: 'Offline mode. Downloaded courses available.',
    LOAD_ERROR: 'Failed to load course. Please try again.',
    BLOCKED_NAVIGATION: 'External links require permission.',
    SSL_ERROR: 'Secure connection required.',
  },
  
  DEEP_LINK: {
    scheme: 'learnhub',
    enabled: true,
  },
};
```

---

## Banking/Finance App

For financial services (requires additional security measures).

```typescript
// src/config/appConfig.ts
export const APP_CONFIG = {
  APP_NAME: 'SecureBank',
  BASE_URL: 'https://secure.bank.example.com',
  
  ALLOWED_DOMAINS: [
    'secure.bank.example.com',
    'api.bank.example.com',
    'auth.bank.example.com',
  ],
  
  ALLOWED_SCHEMES: [
    'https',  // ONLY HTTPS
    'tel',    // For customer support
  ],
  
  WEBVIEW_SETTINGS: {
    javaScriptEnabled: true,
    domStorageEnabled: true,
    allowFileAccess: false,
    allowFileAccessFromFileURLs: false,
    allowUniversalAccessFromFileURLs: false,
    mixedContentMode: 'never',
    cacheEnabled: false,  // No caching for sensitive data
    cacheMode: 'LOAD_NO_CACHE',
    thirdPartyCookiesEnabled: false,  // Strict security
    geolocationEnabled: false,
    mediaPlaybackRequiresUserAction: true,
    allowsInlineMediaPlayback: false,
  },
  
  UI: {
    enablePullToRefresh: true,
    loadingColor: '#1976D2',
    showProgressBar: true,
    progressBarColor: '#1976D2',
    backgroundColor: '#FFFFFF',
  },
  
  ERROR_MESSAGES: {
    NO_INTERNET: 'Secure connection required. Please check your network.',
    LOAD_ERROR: 'Unable to connect securely. Please try again.',
    BLOCKED_NAVIGATION: 'This action is not allowed for security.',
    SSL_ERROR: 'SSL certificate validation failed. Connection blocked.',
  },
  
  DEEP_LINK: {
    scheme: 'securebank',
    enabled: true,
  },
};

// Additional security recommendations for banking apps:
// 1. Implement certificate pinning
// 2. Add biometric authentication
// 3. Implement session timeout
// 4. Add jailbreak/root detection
// 5. Encrypt local storage
// 6. Implement rate limiting
// 7. Add fraud detection
```

---

## Restaurant/Food Delivery

For food ordering and delivery platforms.

```typescript
// src/config/appConfig.ts
export const APP_CONFIG = {
  APP_NAME: 'FoodExpress',
  BASE_URL: 'https://order.foodexpress.com',
  
  ALLOWED_DOMAINS: [
    'order.foodexpress.com',
    'menu.foodexpress.com',
    'payment.foodexpress.com',
    'tracking.foodexpress.com',
    'cdn.foodexpress.com',
  ],
  
  ALLOWED_SCHEMES: [
    'https',
    'tel',      // Call restaurant/driver
    'sms',      // OTP verification
    'mailto',
  ],
  
  WEBVIEW_SETTINGS: {
    javaScriptEnabled: true,
    domStorageEnabled: true,
    allowFileAccess: false,
    allowFileAccessFromFileURLs: false,
    allowUniversalAccessFromFileURLs: false,
    mixedContentMode: 'never',
    cacheEnabled: true,
    cacheMode: 'LOAD_DEFAULT',
    thirdPartyCookiesEnabled: true,  // For payment gateways
    geolocationEnabled: true,  // For delivery address
    mediaPlaybackRequiresUserAction: true,
    allowsInlineMediaPlayback: true,
  },
  
  UI: {
    enablePullToRefresh: true,
    loadingColor: '#FF5722',
    showProgressBar: true,
    progressBarColor: '#FF5722',
    backgroundColor: '#FFFFFF',
  },
  
  ERROR_MESSAGES: {
    NO_INTERNET: 'No connection. Your cart is saved.',
    LOAD_ERROR: 'Failed to load menu. Please try again.',
    BLOCKED_NAVIGATION: 'This action is not allowed.',
    SSL_ERROR: 'Secure connection required for ordering.',
  },
  
  DEEP_LINK: {
    scheme: 'foodexpress',
    enabled: true,
  },
};
```

---

## Tips for Configuration

### Security Levels

**High Security** (Banking, Healthcare):
- `cacheEnabled: false`
- `thirdPartyCookiesEnabled: false`
- `geolocationEnabled: false`
- Implement certificate pinning
- Add biometric authentication

**Medium Security** (E-commerce, SaaS):
- `cacheEnabled: true`
- `thirdPartyCookiesEnabled: true` (if needed)
- `geolocationEnabled: true` (if needed)
- Standard SSL validation

**Standard Security** (News, Blogs):
- `cacheEnabled: true`
- `cacheMode: 'LOAD_CACHE_ELSE_NETWORK'`
- `thirdPartyCookiesEnabled: false`
- Basic security measures

### Performance Optimization

**Content-Heavy Apps** (News, Social):
- `cacheEnabled: true`
- `cacheMode: 'LOAD_DEFAULT'`
- `mediaPlaybackRequiresUserAction: false`

**Real-Time Apps** (Dashboard, Trading):
- `cacheEnabled: false`
- `cacheMode: 'LOAD_NO_CACHE'`
- `enablePullToRefresh: true`

**Documentation Apps**:
- `cacheMode: 'LOAD_CACHE_ELSE_NETWORK'`
- `showProgressBar: false`
- Aggressive caching

### Domain Configuration

Always include:
- Main domain
- API subdomain
- CDN subdomain
- Authentication subdomain
- Payment subdomain (if applicable)

Example:
```typescript
ALLOWED_DOMAINS: [
  'example.com',
  'www.example.com',
  'api.example.com',
  'cdn.example.com',
  'auth.example.com',
  '*.example.com',  // Catch-all for subdomains
]
```

---

## Testing Your Configuration

After configuring, test:

1. ✅ Main URL loads correctly
2. ✅ Navigation within allowed domains works
3. ✅ External domains are blocked
4. ✅ HTTP URLs are blocked (if HTTPS-only)
5. ✅ Deep links work
6. ✅ Pull to refresh works
7. ✅ Error screens display correctly
8. ✅ Back button works (Android)
9. ✅ Loading indicators show
10. ✅ Dark mode works (if applicable)

---

For more information, see [README.md](README.md) and [SECURITY.md](SECURITY.md).
