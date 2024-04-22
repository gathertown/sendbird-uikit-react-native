import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';

import createStyleSheet from '../../styles/createStyleSheet';
import useUIKitTheme from '../../theme/useUIKitTheme';

type Props = React.PropsWithChildren<{
  style?: StyleProp<ViewStyle>;
}>;
const DialogBox = ({ style, children }: Props) => {
  const { colors, modal } = useUIKitTheme();
  return (
    <View style={[styles.container, { backgroundColor: colors.ui.dialog.default.none.background, borderRadius: modal.borderRadius ?? 4 }, style]}>
      {children}
    </View>
  );
};

const styles = createStyleSheet({
  container: {
    width: 280,
  },
});

export default DialogBox;
