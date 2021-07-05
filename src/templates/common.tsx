import React, {PropsWithChildren} from 'react';

export const DefaultWrapper = <T extends object>({
  children,
}: PropsWithChildren<T>) => <>{children}</>;
