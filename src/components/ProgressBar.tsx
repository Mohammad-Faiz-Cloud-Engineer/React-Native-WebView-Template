import React, {useEffect, useRef} from 'react';
import {View, Animated, StyleSheet} from 'react-native';
import {APP_CONFIG} from '@/config/appConfig';

interface ProgressBarProps {
  progress: number;
  visible: boolean;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  visible,
}) => {
  const animatedWidth = useRef(new Animated.Value(0)).current;
  const animatedOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible && progress < 1) {
      Animated.parallel([
        Animated.timing(animatedOpacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(animatedWidth, {
          toValue: progress,
          duration: 100,
          useNativeDriver: false,
        }),
      ]).start();
    } else {
      Animated.timing(animatedOpacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [progress, visible, animatedWidth, animatedOpacity]);

  if (!APP_CONFIG.UI.showProgressBar) {
    return null;
  }

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: animatedOpacity,
        },
      ]}>
      <Animated.View
        style={[
          styles.progressBar,
          {
            width: animatedWidth.interpolate({
              inputRange: [0, 1],
              outputRange: ['0%', '100%'],
            }),
          },
        ]}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: 'transparent',
    zIndex: 1001,
  },
  progressBar: {
    height: '100%',
    backgroundColor: APP_CONFIG.UI.progressBarColor,
  },
});
