import { CSSProperties, FC as ReactFunctionalComponent, ReactNode } from 'react';

import type { StitchesCSS } from '../../stiches.config';

export type ComponentChild = ReactNode | ReactNode[] | null | undefined;

export interface ComponentProps {
  children?: ComponentChild;
  className?: string;
  style?: CSSProperties;
  css?: StitchesCSS;
}

export type FC<T = Record<string, unknown>> = ReactFunctionalComponent<ComponentProps & T>;