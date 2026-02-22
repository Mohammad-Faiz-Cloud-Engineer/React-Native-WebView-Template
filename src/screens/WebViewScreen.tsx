import React, {useRef, useCallback, useMemo} from 'react';
import {StyleSheet, SafeAreaView, StatusBar, Platform} from 'react-native';
import WebView, {
  WebViewNavigation,
  WebViewMessageEvent,
  WebViewErrorEvent,
  WebViewHttpErrorEvent,
} from 'react-native-webview';
import {APP_CONFIG, isSafeUrl} from '@/config/appConfig';
import {URLValidator} from '@/utils/urlValidator';
import {useWebViewState} from '@/hooks/useWebViewState';
import {useBackHandler} from '@/hooks/useBackHandler';
import {LoadingIndicator} from '@/components/LoadingIndicator';
import {ProgressBar} from '@/components/ProgressBar';
import {ErrorScreen} from '@/components/ErrorScreen';

export const WebViewScreen: React.FC = () => {
  const webViewRef = useRef<WebView>(null);
  const {updateCanGoBack} = useBackHandler(webViewRef);

  const {
    loadingState,
    error,
    progress,
    handleLoadStart,
    handleLoadEnd,
    handleLoadProgress,
    handleError,
    resetError,
  } = useWebViewState();

  const handleNavigationStateChange = useCallback(
    (navState: WebViewNavigation) => {
      updateCanGoBack(navState.canGoBack);
    },
    [updateCanGoBack],
  );

  const handleShouldStartLoadWithRequest = useCallback(
    (request: any): boolean => {
      const {url} = request;

      // Sanitize URL
      const sanitizedUrl = URLValidator.sanitizeUrl(url);
      if (!sanitizedUrl) {
        console.warn('Blocked invalid URL');
        return false;
      }

      // Check if URL should be handled in WebView
      if (URLValidator.shouldHandleInWebView(url)) {
        return true;
      }

      // Check if it's a safe URL but external (tel:, mailto:, etc.)
      if (isSafeUrl(url)) {
        URLValidator.handleExternalUrl(url);
        return false;
      }

      // Block all other URLs
      console.warn('Blocked navigation to:', url);
      return false;
    },
    [],
  );

  const handleWebViewError = useCallback(
    (syntheticEvent: WebViewErrorEvent) => {
      const {nativeEvent} = syntheticEvent;
      handleError({
        code: nativeEvent.code,
        description: nativeEvent.description,
        domain: nativeEvent.domain,
      });
    },
    [handleError],
  );

  const handleHttpError = useCallback(
    (syntheticEvent: WebViewHttpErrorEvent) => {
      const {nativeEvent} = syntheticEvent;
      handleError({
        code: nativeEvent.statusCode,
        description: `HTTP Error: ${nativeEvent.statusCode}`,
      });
    },
    [handleError],
  );

  const handleMessage = useCallback((event: WebViewMessageEvent) => {
    // Handle messages from WebView if needed
    const {data} = event.nativeEvent;
    console.log('Message from WebView:', data);
  }, []);

  const handleRetry = useCallback(() => {
    resetError();
    if (webViewRef.current) {
      webViewRef.current.reload();
    }
  }, [resetError]);

  const handleRefresh = useCallback(() => {
    if (webViewRef.current) {
      webViewRef.current.reload();
    }
  }, []);

  const injectedJavaScript = useMemo(() => {
    // Inject JavaScript to enhance security and functionality
    return `
      (function() {
        // Disable console in production
        if (typeof console !== 'undefined') {
          console.log = function() {};
          console.warn = function() {};
          console.error = function() {};
        }
        
        // Prevent eval usage
        window.eval = function() {
          throw new Error('eval is disabled for security');
        };
        
        // Post message to React Native
        window.ReactNativeWebView.postMessage(JSON.stringify({
          type: 'ready',
          timestamp: Date.now()
        }));
      })();
      true;
    `;
  }, []);

  if (error) {
    return <ErrorScreen error={error} onRetry={handleRetry} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ProgressBar progress={progress} visible={loadingState === 'loading'} />
      <WebView
        ref={webViewRef}
        source={{uri: APP_CONFIG.BASE_URL}}
        style={styles.webview}
        // Security settings
        javaScriptEnabled={APP_CONFIG.WEBVIEW_SETTINGS.javaScriptEnabled}
        domStorageEnabled={APP_CONFIG.WEBVIEW_SETTINGS.domStorageEnabled}
        allowFileAccess={APP_CONFIG.WEBVIEW_SETTINGS.allowFileAccess}
        allowFileAccessFromFileURLs={
          APP_CONFIG.WEBVIEW_SETTINGS.allowFileAccessFromFileURLs
        }
        allowUniversalAccessFromFileURLs={
          APP_CONFIG.WEBVIEW_SETTINGS.allowUniversalAccessFromFileURLs
        }
        mixedContentMode={APP_CONFIG.WEBVIEW_SETTINGS.mixedContentMode}
        geolocationEnabled={APP_CONFIG.WEBVIEW_SETTINGS.geolocationEnabled}
        thirdPartyCookiesEnabled={
          APP_CONFIG.WEBVIEW_SETTINGS.thirdPartyCookiesEnabled
        }
        // Performance settings
        cacheEnabled={APP_CONFIG.WEBVIEW_SETTINGS.cacheEnabled}
        cacheMode={APP_CONFIG.WEBVIEW_SETTINGS.cacheMode}
        androidHardwareAccelerationDisabled={false}
        androidLayerType="hardware"
        // Media settings
        mediaPlaybackRequiresUserAction={
          APP_CONFIG.WEBVIEW_SETTINGS.mediaPlaybackRequiresUserAction
        }
        allowsInlineMediaPlayback={
          APP_CONFIG.WEBVIEW_SETTINGS.allowsInlineMediaPlayback
        }
        // UI settings
        pullToRefreshEnabled={APP_CONFIG.UI.enablePullToRefresh}
        onRefresh={handleRefresh}
        startInLoadingState={true}
        renderLoading={() => <LoadingIndicator visible={true} />}
        // Event handlers
        onLoadStart={handleLoadStart}
        onLoadEnd={handleLoadEnd}
        onLoadProgress={({nativeEvent}) =>
          handleLoadProgress(nativeEvent.progress)
        }
        onError={handleWebViewError}
        onHttpError={handleHttpError}
        onNavigationStateChange={handleNavigationStateChange}
        onShouldStartLoadWithRequest={handleShouldStartLoadWithRequest}
        onMessage={handleMessage}
        // Injected JavaScript
        injectedJavaScript={injectedJavaScript}
        // Additional security
        originWhitelist={['https://*', 'http://*']}
        // Disable debugging in production
        webviewDebuggingEnabled={__DEV__}
        // iOS specific
        {...(Platform.OS === 'ios' && {
          allowsBackForwardNavigationGestures: true,
          decelerationRate: 'normal',
        })}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: APP_CONFIG.UI.backgroundColor,
  },
  webview: {
    flex: 1,
  },
});
