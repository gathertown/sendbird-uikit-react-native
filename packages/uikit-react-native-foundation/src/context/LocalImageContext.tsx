import {  getThumbnailUriFromFileMessage } from '@gathertown/uikit-utils';
import { FileMessage } from '@sendbird/chat/message';
import React, { useContext, useMemo  } from 'react';

type LocalImageContextType = Record<string, string>

export const LocalImageContext = React.createContext<LocalImageContextType | null>(null);

export const useLocalImageCache = (message: FileMessage) => {
  const localImageContext = useContext(LocalImageContext);

  if (!localImageContext) {
    console.warn('Missing local image context');
    return;
  }

  if (message && message.sendingStatus === 'pending') {
    localImageContext[message.reqId] = getThumbnailUriFromFileMessage(message);
  }

  return localImageContext[message.reqId];
};

export const LocalImageProvider = ({ children }: { children: React.ReactNode}) => {
  const cache = useMemo(() => ({}), []);
  return (
    <LocalImageContext.Provider value={cache}>
      {children}
    </LocalImageContext.Provider>
  );
};
