import React, { useEffect, useRef, useState } from 'react';
import { Platform, StyleProp, StyleSheet, ViewStyle } from 'react-native';

import { useForceUpdate } from '@gathertown/uikit-utils';

import createStyleSheet from '../../styles/createStyleSheet';
import useUIKitTheme from '../../theme/useUIKitTheme';
import Box from '../Box';
import Icon from '../Icon';
import Image from '../Image';
import LoadingSpinner from '../../ui/LoadingSpinner';

const useRetry = (hasError: boolean, retryCount = 5) => {
  // NOTE: Glide(fast-image) will retry automatically on Android
  if (Platform.OS === 'android') return '';

  const forceUpdate = useForceUpdate();
  const retryCountRef = useRef(1);
  const retryTimeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (hasError) {
      const reloadReservation = () => {
        if (retryCountRef.current < retryCount) {
          retryTimeoutRef.current = setTimeout(() => {
            retryCountRef.current++;
            reloadReservation();
            forceUpdate();
          }, retryCountRef.current * 5000);
        }
      };

      return reloadReservation();
    } else {
      return clearTimeout(retryTimeoutRef.current);
    }
  }, [hasError]);

  return retryCountRef.current;
};

type Props = {
  source: number | { uri: string };
  width?: number | string;
  height?: number | string;
  style?: StyleProp<ViewStyle>;
  cachedSource?: string;
};
const ImageWithPlaceholder = (props: Props) => {
  const { palette, select, colors } = useUIKitTheme();
  const [imageNotFound, setImageNotFound] = useState(false);
  const [loading, setLoading] = useState(true);
  
  const key = useRetry(imageNotFound);
  return (
    <Box
      style={[{ overflow: 'hidden', width: props.width, height: props.height }, props.style, styles.container]}
      backgroundColor={select({ dark: palette.background400, light: palette.background100 })}
    >
      {loading && <LoadingSpinner />}
      <Image
        key={key}
        source={props.source}
        style={[StyleSheet.absoluteFill, imageNotFound && styles.hide]}
        resizeMode={'cover'}
        resizeMethod={'resize'}
        onError={() => {
          setLoading(false);
          setImageNotFound(true);
        }}
        onLoad={() => {
          setLoading(false);
          setImageNotFound(false);
        }}
      />
      {
        props.cachedSource && (loading || imageNotFound) && (
          <Image
            key={`local-${key}`}
            source={{
              uri: props.cachedSource,
            }}
            style={StyleSheet.absoluteFill}
            resizeMode={'cover'}
            resizeMethod={'resize'}
          />
        )
      }
      {imageNotFound && !props.cachedSource && (
        <Icon
          containerStyle={StyleSheet.absoluteFill}
          icon={'thumbnail-none'}
          size={48}
          color={colors.onBackground02}
        />
      )}
    </Box>
  );
};

const styles = createStyleSheet({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 0,
  },
  hide: {
    display: 'none',
  },
});

export default ImageWithPlaceholder;
