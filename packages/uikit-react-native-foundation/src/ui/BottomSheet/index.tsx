import React, { useContext } from 'react';
import { TouchableOpacity, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import type Icon from '../../components/Icon';
import Modal from '../../components/Modal';
import { CustomComponentContext } from '../../context/CustomComponentCtx';
import useHeaderStyle from '../../styles/useHeaderStyle';
import DialogSheet from '../Dialog/DialogSheet';

type HeaderProps = { onClose: () => Promise<void> };
export type BottomSheetItem = {
  sheetItems: {
    icon?: keyof typeof Icon.Assets;
    iconColor?: string;
    title: string;
    titleColor?: string;
    disabled?: boolean;
    onPress: () => void;
    style?: 'default' | 'destructive';
  }[];
  HeaderComponent?: (props: HeaderProps) => JSX.Element;
};
type Props = {
  visible: boolean;
  onHide: () => Promise<void>;
  onError?: (error: unknown) => void;
  onDismiss?: () => void;
} & BottomSheetItem;

export type BottomSheetRenderProp = (props: Props) => React.ReactElement;

const BottomSheet = ({ onDismiss, onHide, visible, sheetItems, HeaderComponent }: Props) => {
  const { statusBarTranslucent } = useHeaderStyle();
  const { width } = useWindowDimensions();
  const { bottom, left, right } = useSafeAreaInsets();
  const ctx = useContext(CustomComponentContext);

  if (ctx?.renderBottomSheet) {
    return ctx.renderBottomSheet({ onDismiss, onHide, visible, sheetItems, HeaderComponent });
  }

  return (
    <Modal
      type={'slide'}
      onClose={onHide}
      onDismiss={onDismiss}
      statusBarTranslucent={statusBarTranslucent}
      visible={visible}
      backgroundStyle={{ alignItems: 'center', justifyContent: 'flex-end' }}
    >
      <DialogSheet style={{ width, paddingBottom: bottom }}>
        {HeaderComponent && <HeaderComponent onClose={onHide} />}
        {sheetItems.map(({ onPress, ...props }, idx) => (
          <TouchableOpacity
            activeOpacity={0.75}
            key={props.title + idx}
            style={{ paddingLeft: left, paddingRight: right }}
            disabled={props.disabled}
            onPress={async () => {
              await onHide();
              try {
                onPress();
              } catch {}
            }}
          >
            <DialogSheet.Item {...props} />
          </TouchableOpacity>
        ))}
      </DialogSheet>
    </Modal>
  );
};

export default BottomSheet;
