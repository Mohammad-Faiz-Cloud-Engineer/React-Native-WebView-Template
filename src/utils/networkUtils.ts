import {useEffect, useState} from 'react';
import {Platform} from 'react-native';

/**
 * Network connectivity utilities
 */

export const checkInternetConnection = async (): Promise<boolean> => {
  try {
    // Simple connectivity check
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    const response = await fetch('https://www.google.com/generate_204', {
      method: 'HEAD',
      signal: controller.signal,
    });

    clearTimeout(timeoutId);
    return response.ok;
  } catch {
    return false;
  }
};

/**
 * Hook to monitor network connectivity
 */
export const useNetworkStatus = () => {
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const checkConnection = async () => {
      const connected = await checkInternetConnection();
      if (isMounted) {
        setIsConnected(connected);
      }
    };

    checkConnection();

    // Check connection every 30 seconds
    const interval = setInterval(checkConnection, 30000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  return isConnected;
};
