import React, { useCallback, useContext, useEffect, useState } from 'react';

import { useChannelHandler } from '@gathertown/uikit-chat-hooks';
import { SendbirdBaseChannel, getOpenChannelChatAvailableState, useUniqHandlerId } from '@gathertown/uikit-utils';

import ChannelInput from '../../../components/ChannelInput';
import { UNKNOWN_USER_ID } from '../../../constants';
import { useSendbirdChat } from '../../../hooks/useContext';
import { OpenChannelContexts } from '../module/moduleContext';
import type { OpenChannelProps } from '../types';

const OpenChannelInput = (props: OpenChannelProps['Input']) => {
  const { sdk, currentUser } = useSendbirdChat();

  const {
    channel,
    messageToEdit,
    setMessageToEdit,
    keyboardAvoidOffset = 0,
  } = useContext(OpenChannelContexts.Fragment);

  const [chatAvailableState, setChatAvailableState] = useState({ frozen: false, muted: false, disabled: false });

  const updateChatAvailableState = useCallback(
    (baseChannel: SendbirdBaseChannel) => {
      if (baseChannel.isOpenChannel()) {
        const userId = currentUser?.userId ?? UNKNOWN_USER_ID;
        getOpenChannelChatAvailableState(baseChannel, userId).then(setChatAvailableState);
      }
    },
    [currentUser?.userId],
  );

  useEffect(() => {
    updateChatAvailableState(channel);
  }, [channel, updateChatAvailableState]);

  const handlerId = useUniqHandlerId('OpenChannelInput');
  useChannelHandler(
    sdk,
    handlerId,
    {
      onChannelFrozen(channel) {
        updateChatAvailableState(channel);
      },
      onChannelUnfrozen(channel) {
        updateChatAvailableState(channel);
      },
      onUserMuted(channel) {
        updateChatAvailableState(channel);
      },
      onUserUnmuted(channel) {
        updateChatAvailableState(channel);
      },
      onOperatorUpdated(channel) {
        updateChatAvailableState(channel);
      },
    },
    'open',
  );

  return (
    <ChannelInput
      channel={channel}
      messageToEdit={messageToEdit}
      setMessageToEdit={setMessageToEdit}
      inputMuted={chatAvailableState.muted}
      inputFrozen={channel.isFrozen}
      inputDisabled={chatAvailableState.disabled}
      keyboardAvoidOffset={keyboardAvoidOffset}
      {...props}
    />
  );
};

export default React.memo(OpenChannelInput);
