import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import type {WebViewError} from '@/types';
import {APP_CONFIG} from '@/config/appConfig';

interface ErrorScreenProps {
  error: WebViewError | null;
  onRetry: () => void;
}

export const ErrorScreen: React.FC<ErrorScreenProps> = ({error, onRetry}) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  if (!error) {
    return null;
  }

  const getErrorMessage = () => {
    if (error.code === -1009 || error.code === -1001) {
      return APP_CONFIG.ERROR_MESSAGES.NO_INTERNET;
    }
    if (error.description?.toLowerCase().includes('ssl')) {
      return APP_CONFIG.ERROR_MESSAGES.SSL_ERROR;
    }
    return APP_CONFIG.ERROR_MESSAGES.LOAD_ERROR;
  };

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: isDark ? '#000000' : '#FFFFFF'},
      ]}>
      <View style={styles.content}>
        <Text style={[styles.emoji, {color: isDark ? '#FFFFFF' : '#000000'}]}>
          ⚠️
        </Text>
        <Text
          style={[styles.title, {color: isDark ? '#FFFFFF' : '#000000'}]}
          testID="error-title">
          Oops!
        </Text>
        <Text
          style={[styles.message, {color: isDark ? '#CCCCCC' : '#666666'}]}
          testID="error-message">
          {getErrorMessage()}
        </Text>
        <TouchableOpacity
          style={[
            styles.button,
            {backgroundColor: isDark ? '#1C1C1E' : '#007AFF'},
          ]}
          onPress={onRetry}
          testID="retry-button">
          <Text style={styles.buttonText}>Try Again</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  content: {
    alignItems: 'center',
    maxWidth: 300,
  },
  emoji: {
    fontSize: 64,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },
  button: {
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 8,
    minWidth: 150,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});
