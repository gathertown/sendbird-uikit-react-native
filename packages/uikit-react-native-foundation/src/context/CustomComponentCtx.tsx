import {
  SendbirdBaseMessage,
  SendbirdEmoji,
  SendbirdFileMessage,
  SendbirdReaction,
  SendbirdUserMessage,
} from '@gathertown/uikit-utils';
import React from 'react';
import { TextInput } from 'react-native';

import { AlertRenderProp } from '../ui/Alert';
import { BottomSheetRenderProp } from '../ui/BottomSheet';
import { AdminMessageRenderProp } from '../ui/GroupChannelMessage/Message.admin';
import { FileMessageRenderProp } from '../ui/GroupChannelMessage/Message.file';
import { UnknownMessageRenderProp } from '../ui/GroupChannelMessage/Message.unknown';
import { UserMessageRenderProp } from '../ui/GroupChannelMessage/Message.user';
import {
  IncomingMessageContainerRenderProp,
  OutgoingMessageContainerRenderProp,
} from '../ui/GroupChannelMessage/MessageContainer';

type GenericMessageRenderProp = (props: { content: React.ReactNode }) => React.ReactElement;

export type EmojiSelectorRenderProp = (props: {
  emojis: SendbirdEmoji[];
  message: SendbirdBaseMessage;
  onPress: (key: string, react: boolean) => void;
}) => React.ReactElement;

export type MessageReactionsRenderProp = (props: {
  getEmoji: (key: string) => SendbirdEmoji;
  message: SendbirdBaseMessage;
  currentUserId?: string;
  openReactionUserList: (idx: number) => void;
  onReactionPress: (reaction: SendbirdReaction) => void;
}) => React.ReactElement;

export type ReactionBottomSheetUserListRenderProp = (props: {
  onClose: () => Promise<void>;
  onDismiss: VoidFunction;
  visible: boolean;
  message?: SendbirdBaseMessage;
  getEmoji: (key: string) => SendbirdEmoji;
  initialFocusIndex: number;
}) => React.ReactElement;

export type EditInputRenderProp = (props: {
  onSave: VoidFunction;
  onCancel: VoidFunction;
  onChangeText: (val: string) => void;
  isDisabled: boolean;
  messageToEdit: SendbirdUserMessage | SendbirdFileMessage;
  ref: React.Ref<TextInput>;
}) => React.ReactElement;

export type SendInputRenderProp = (props: {
  onSend: VoidFunction;
  onPressAttachment: VoidFunction;
  onChangeText: (val: string) => void;
  isDisabled: boolean;
  ref: React.Ref<TextInput>;
}) => React.ReactElement;

export type CustomProvidersRenderProp = ({ children }: { children: React.ReactElement }) => React.ReactElement;

export type CombinedNewMessagesScrollToBottomButtonRenderProp = (props: {
  visible: boolean;
  onPress: () => void;
  newMessagesCount: number;
}) => React.ReactElement;

export type ToastType = 'normal' | 'error' | 'success';
export type ShowToastRenderProp = (text: string, type?: ToastType) => void;

export type CustomComponentContextType = {
  renderIncomingMessageContainer?: IncomingMessageContainerRenderProp;
  renderOutgoingMessageContainer?: OutgoingMessageContainerRenderProp;
  renderAlert?: AlertRenderProp;
  renderBottomSheet?: BottomSheetRenderProp;
  renderUserMessage?: UserMessageRenderProp;
  renderFileMessage?: FileMessageRenderProp;
  renderGenericMessage?: GenericMessageRenderProp;
  renderAdminMessage?: AdminMessageRenderProp;
  renderUnknownMessage?: UnknownMessageRenderProp;
  renderEmojiSelector?: EmojiSelectorRenderProp;
  renderMessageReactionsRenderProp?: MessageReactionsRenderProp;
  renderReactionBottomSheetUserListRenderProp?: ReactionBottomSheetUserListRenderProp;
  messageInput?: {
    renderEditInput: EditInputRenderProp;
    renderSendInput: SendInputRenderProp;
  };
  renderCustomProviders?: CustomProvidersRenderProp;
  renderCombinedNewMessagesScrollToBottomButton?: CombinedNewMessagesScrollToBottomButtonRenderProp;
  renderToast?: ShowToastRenderProp;
};

type Props = React.PropsWithChildren<CustomComponentContextType>;

export const CustomComponentContext = React.createContext<CustomComponentContextType | null>(null);
export const CustomComponentProvider = ({ children, ...rest }: Props) => {
  return <CustomComponentContext.Provider value={rest}>{children}</CustomComponentContext.Provider>;
};
export type { BottomSheetRenderProp } from '../ui/BottomSheet';

export type {
  UnknownMessageRenderProp,
  GenericMessageRenderProp,
  FileMessageRenderProp,
  UserMessageRenderProp,
  IncomingMessageContainerRenderProp,
  OutgoingMessageContainerRenderProp,
  AdminMessageRenderProp,
};
