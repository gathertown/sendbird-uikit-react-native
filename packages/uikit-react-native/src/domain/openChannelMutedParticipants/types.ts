import type React from 'react';

import type { UseUserListOptions } from '@gathertown/uikit-chat-hooks';
import type { SendbirdOpenChannel, SendbirdRestrictedUser } from '@gathertown/uikit-utils';

import type { CommonComponent } from '../../types';

export type OpenChannelMutedParticipantsProps = {
  Fragment: {
    channel: SendbirdOpenChannel;
    onPressHeaderLeft: OpenChannelMutedParticipantsProps['Header']['onPressHeaderLeft'];
    renderUser?: OpenChannelMutedParticipantsProps['List']['renderUser'];
    queryCreator?: UseUserListOptions<SendbirdRestrictedUser>['queryCreator'];
  };
  Header: {
    onPressHeaderLeft: () => void;
  };
  List: {
    renderUser: (props: { user: SendbirdRestrictedUser }) => React.ReactElement | null;
    onLoadNext: () => void;
    mutedParticipants: SendbirdRestrictedUser[];
    ListEmptyComponent?: React.ReactElement;
  };
  StatusError: {
    onPressRetry: () => void;
  };
  Provider: {
    channel: SendbirdOpenChannel;
  };
};

/**
 * Internal context for OpenChannelMutedParticipants
 * For example, the developer can create a custom header
 * with getting data from the domain context
 * */
export type OpenChannelMutedParticipantsContextsType = {
  Fragment: React.Context<{
    headerTitle: string;
    channel: SendbirdOpenChannel;
  }>;
};
export interface OpenChannelMutedParticipantsModule {
  Provider: CommonComponent<OpenChannelMutedParticipantsProps['Provider']>;
  Header: CommonComponent<OpenChannelMutedParticipantsProps['Header']>;
  List: CommonComponent<OpenChannelMutedParticipantsProps['List']>;
  StatusEmpty: CommonComponent;
  StatusLoading: CommonComponent;
  StatusError: CommonComponent<OpenChannelMutedParticipantsProps['StatusError']>;
}

export type OpenChannelMutedParticipantsFragment = CommonComponent<OpenChannelMutedParticipantsProps['Fragment']>;
