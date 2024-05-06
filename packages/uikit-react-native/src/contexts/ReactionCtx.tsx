import { CustomComponentContext } from '@gathertown/uikit-react-native-foundation';
import type { SendbirdBaseChannel, SendbirdBaseMessage } from '@gathertown/uikit-utils';
import { NOOP } from '@gathertown/uikit-utils';
import React, { useCallback, useContext, useReducer, useRef, useState } from 'react';

import { ReactionBottomSheets } from '../components/ReactionBottomSheets';
import { LocalizationContext } from '../contexts/LocalizationCtx';
import { SendbirdChatContext } from '../contexts/SendbirdChatCtx';
import { UserProfileContext } from '../contexts/UserProfileCtx';
import { useReaction } from '../hooks/useContext';

type State = {
  message?: SendbirdBaseMessage;
  channel?: SendbirdBaseChannel;
};
export type ReactionContextType = {
  openReactionList(param: Required<State>): void;
  openReactionUserList(param: Required<State> & { focusIndex?: number }): void;
  updateReactionFocusedItem(param?: State): void;
  focusIndex: number;
  onDismiss: () => void;
  reactionUserListVisible: boolean;
  reactionListVisible: boolean;
  onCloseReactionUserList: () => Promise<void>;
  onCloseReactionList: () => Promise<void>;
} & State;

type Props = React.PropsWithChildren<{}>;

export const ReactionContext = React.createContext<ReactionContextType | null>(null);

export const ReactionProvider = ({ children }: Props) => {
  const [state, setState] = useReducer((prev: State, next: State) => ({ ...prev, ...next }), {});
  const [reactionUserListFocusIndex, setReactionUserListFocusIndex] = useState(0);

  const [reactionListVisible, setReactionListVisible] = useState(false);
  const [reactionUserListVisible, setReactionUserListVisible] = useState(false);

  const closeResolver = useRef<() => void>(NOOP);

  const createOnCloseWithResolver = (callback: () => void) => {
    return () => {
      return new Promise<void>((resolve) => {
        closeResolver.current = resolve;
        callback();
      });
    };
  };

  const openReactionList: ReactionContextType['openReactionList'] = useCallback((params) => {
    setState(params);
    setReactionListVisible(true);
  }, []);

  const openReactionUserList: ReactionContextType['openReactionUserList'] = useCallback(
    ({ channel, message, focusIndex = 0 }) => {
      setState({ channel, message });
      setReactionUserListFocusIndex(focusIndex);
      setReactionUserListVisible(true);
    },
    [],
  );
  const updateReactionFocusedItem: ReactionContextType['updateReactionFocusedItem'] = useCallback((params) => {
    if (params) setState(params);
    else setState({});
  }, []);

  const onDismiss = useCallback(() => {
    setState({});
    closeResolver.current?.();
  }, [setState]);

  const onCloseReactionUserList = createOnCloseWithResolver(() => setReactionUserListVisible(false));
  const onCloseReactionList = createOnCloseWithResolver(() => setReactionListVisible(false));

  const reactionCtx = {
    ...state,
    openReactionList,
    openReactionUserList,
    updateReactionFocusedItem,
    focusIndex: reactionUserListFocusIndex,
    onDismiss,
    reactionUserListVisible,
    reactionListVisible,
    onCloseReactionUserList,
    onCloseReactionList,
  };
  return <ReactionContext.Provider value={reactionCtx}>{children}</ReactionContext.Provider>;
};

export const ReactionBottomSheetsWrapper = () => {
  const chatCtx = useContext(SendbirdChatContext);
  const localizationCtx = useContext(LocalizationContext);
  const userProfileCtx = useContext(UserProfileContext);
  const ctx = useContext(CustomComponentContext);
  if (!chatCtx) throw new Error('SendbirdChatContext is not provided');
  if (!localizationCtx) throw new Error('LocalizationContext is not provided');
  if (!userProfileCtx) throw new Error('UserProfileContext is not provided');

  const reactionCtx = useReaction();
  const {
    onDismiss,
    reactionUserListVisible,
    reactionListVisible,
    focusIndex,
    onCloseReactionUserList,
    onCloseReactionList,
  } = reactionCtx;

  const sheetProps = {
    chatCtx,
    reactionCtx,
    localizationCtx,
    userProfileCtx,
    onDismiss,
  };

  return (
    <>
      {ctx?.renderReactionBottomSheetUserListRenderProp ? (
        ctx.renderReactionBottomSheetUserListRenderProp({
          message: sheetProps.reactionCtx.message,
          onDismiss: sheetProps.onDismiss,
          onClose: onCloseReactionUserList,
          visible: reactionUserListVisible,
          getEmoji: (key: string) => chatCtx.emojiManager.allEmojiMap[key],
          initialFocusIndex: focusIndex,
        })
      ) : (
        <ReactionBottomSheets.UserList
          {...sheetProps}
          visible={reactionUserListVisible}
          onClose={onCloseReactionUserList}
        />
      )}
      <ReactionBottomSheets.ReactionList {...sheetProps} visible={reactionListVisible} onClose={onCloseReactionList} />
    </>
  );
};
