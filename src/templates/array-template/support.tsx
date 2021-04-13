import React from 'react';

import {IdType, Maybe} from '../..';

import {ArrayTemplateItemWrapperProps} from './array-template';

export const ItemWrapper = <T extends object, K extends IdType<T>>({
  label,
  value,
  renderer: Renderer,
}: ArrayTemplateItemWrapperProps<T, K>) => <></>;

export const Wrapper = <T extends object>({
  children,
}: React.PropsWithChildren<{data: Maybe<T>}>) => <></>;
