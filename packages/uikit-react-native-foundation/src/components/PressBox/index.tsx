import * as React from 'react';
import { useState } from 'react';
import type { GestureResponderEvent, StyleProp, ViewProps, ViewStyle } from 'react-native';
import { Pressable, TouchableOpacity, Vibration } from 'react-native';

import { isFunction } from '@gathertown/uikit-utils';

type PressBoxStateParams = {
  pressed: boolean;
};

type Props = {
  onPress?: (event: GestureResponderEvent) => void;
  onLongPress?: (event: GestureResponderEvent) => void;
  delayLongPress?: number;
  activeOpacity?: number;
  style?: StyleProp<ViewStyle> | ((state: PressBoxStateParams) => StyleProp<ViewStyle>);
  hitSlop?: ViewProps['hitSlop'];
  children?: React.ReactNode | ((params: PressBoxStateParams) => React.ReactNode);
};

export const DEFAULT_LONG_PRESS_DELAY = 250;

const PressBox = (props: Props) => {
  if (props.activeOpacity && props.activeOpacity < 1) return <PressBoxWithTouchableOpacity {...props} />;
  return <PressBoxWithPressable {...props} />;
};

const PressBoxWithPressable = ({ children, ...props }: Props) => {
  return (
    <Pressable
      disabled={!props.onPress && !props.onLongPress}
      delayLongPress={DEFAULT_LONG_PRESS_DELAY}
      {...props}
      onLongPress={(evt) => {
        Vibration.vibrate();
        props.onLongPress?.(evt);
      }}
    >
      {(state) => (isFunction(children) ? children(state) : children)}
    </Pressable>
  );
};

const PressBoxWithTouchableOpacity = ({ children, style, ...props }: Props) => {
  const [pressed, setPressed] = useState(false);
  const state: PressBoxStateParams = { pressed };

  return (
    <TouchableOpacity
      disabled={!props.onPress && !props.onLongPress}
      delayLongPress={DEFAULT_LONG_PRESS_DELAY}
      style={isFunction(style) ? style(state) : style}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      {...props}
      onLongPress={(evt) => {
        Vibration.vibrate();
        props.onLongPress?.(evt);
      }}
    >
      {isFunction(children) ? children(state) : children}
    </TouchableOpacity>
  );
};

export default PressBox;
