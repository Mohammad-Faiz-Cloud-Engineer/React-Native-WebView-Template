import {Linking} from 'react-native';
import {isAllowedDomain, isAllowedScheme, isSafeUrl} from '@/config/appConfig';

/**
 * Validates and handles URL navigation
 */
export class URLValidator {
  /**
   * Check if URL should be handled by WebView or external app
   */
  static shouldHandleInWebView(url: string): boolean {
    if (!url) {
      return false;
    }

    // Check if it's a safe URL
    if (!isSafeUrl(url)) {
      return false;
    }

    // HTTPS URLs from allowed domains should be handled in WebView
    if (url.startsWith('https://') && isAllowedDomain(url)) {
      return true;
    }

    return false;
  }

  /**
   * Handle external URLs (tel:, mailto:, etc.)
   */
  static async handleExternalUrl(url: string): Promise<boolean> {
    try {
      // Check if scheme is allowed
      if (!isAllowedScheme(url)) {
        console.warn('Blocked URL with disallowed scheme:', url);
        return false;
      }

      // Check if URL can be opened
      const canOpen = await Linking.canOpenURL(url);
      
      if (canOpen) {
        await Linking.openURL(url);
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Error opening external URL:', error);
      return false;
    }
  }

  /**
   * Sanitize URL to prevent injection attacks
   */
  static sanitizeUrl(url: string): string {
    if (!url || typeof url !== 'string') {
      return '';
    }

    // Remove any whitespace
    url = url.trim();

    // Block dangerous protocols
    const dangerousProtocols = ['javascript:', 'data:', 'file:', 'vbscript:'];
    const urlLower = url.toLowerCase();
    
    for (const protocol of dangerousProtocols) {
      if (urlLower.startsWith(protocol)) {
        console.warn('Blocked dangerous URL:', url);
        return '';
      }
    }

    return url;
  }

  /**
   * Extract domain from URL
   */
  static extractDomain(url: string): string {
    try {
      const urlObj = new URL(url);
      return urlObj.hostname;
    } catch {
      return '';
    }
  }

  /**
   * Check if URL is HTTP (insecure)
   */
  static isInsecureUrl(url: string): boolean {
    return url.toLowerCase().startsWith('http://');
  }
}
