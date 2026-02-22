import {useEffect, useRef} from 'react';
import {BackHandler} from 'react-native';
import type WebView from 'react-native-webview';

/**
 * Custom hook to handle Android back button
 * Navigates back in WebView history if possible, otherwise exits app
 */
export const useBackHandler = (webViewRef: React.RefObject<WebView>) => {
  const canGoBackRef = useRef(false);

  useEffect(() => {
    const backAction = () => {
      if (canGoBackRef.current && webViewRef.current) {
        webViewRef.current.goBack();
        return true; // Prevent default behavior
      }
      return false; // Allow default behavior (exit app)
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [webViewRef]);

  const updateCanGoBack = (canGoBack: boolean) => {
    canGoBackRef.current = canGoBack;
  };

  return {updateCanGoBack};
};
