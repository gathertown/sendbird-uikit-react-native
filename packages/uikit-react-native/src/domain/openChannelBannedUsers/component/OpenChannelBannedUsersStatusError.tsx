import React from 'react';

import { Box } from '@gathertown/uikit-react-native-foundation';

import TypedPlaceholder from '../../../components/TypedPlaceholder';
import type { OpenChannelBannedUsersModule } from '../types';

const OpenChannelBannedUsersStatusError: OpenChannelBannedUsersModule['StatusError'] = ({ onPressRetry }) => {
  return (
    <Box flex={1} alignItems={'center'} justifyContent={'center'}>
      <TypedPlaceholder type={'error-wrong'} onPressRetry={onPressRetry} />
    </Box>
  );
};

export default OpenChannelBannedUsersStatusError;
