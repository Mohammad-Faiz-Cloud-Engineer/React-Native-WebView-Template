import React from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import {APP_CONFIG} from '@/config/appConfig';

interface LoadingIndicatorProps {
  visible: boolean;
}

export const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({
  visible,
}) => {
  if (!visible) {
    return null;
  }

  return (
    <View style={styles.container}>
      <ActivityIndicator
        size="large"
        color={APP_CONFIG.UI.loadingColor}
        testID="loading-indicator"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: APP_CONFIG.UI.backgroundColor,
    zIndex: 1000,
  },
});
