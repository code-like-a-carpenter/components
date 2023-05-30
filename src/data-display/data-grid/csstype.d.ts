// eslint-disable-next-line import/no-unresolved
import 'csstype';

declare module 'csstype' {
  // eslint-disable-next-line @typescript-eslint/ban-types
  interface Properties<TLength = (string & {}) | 0, TTime = string & {}> {
    '--data-unit'?: string;
    '--data-gap'?: string;
    '--data-grid__item_height'?: string;
    '--data-grid__item_width'?: string;
  }
}
