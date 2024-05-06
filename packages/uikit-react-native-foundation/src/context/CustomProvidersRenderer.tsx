import React, { useContext } from 'react';

import { CustomComponentContext } from './CustomComponentCtx';

const CustomProvidersRenderer = React.memo<{ children: React.ReactElement }>(function CustomProviderRenderer({
  children,
}) {
  const ctx = useContext(CustomComponentContext);
  if (ctx?.renderCustomProviders) {
    return ctx.renderCustomProviders({ children });
  }
  return children;
});

export default CustomProvidersRenderer;
