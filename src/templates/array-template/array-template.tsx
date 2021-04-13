import {ConfigureFunction, IdType, Maybe} from '../..';
import {
  FieldWrapperProps,
  ItemWrapper,
  LabelWrapperProps,
  Wrapper,
} from '../support';

export interface ArrayTemplateProps<T extends object> {
  data: Maybe<Maybe<T>[]>;
  configure: ConfigureFunction<T>;
  /** table */
  Wrapper: Wrapper<Maybe<T>[]>;
  /** tr */
  ItemWrapper: ItemWrapper<T>;

  /** td */
  FieldWrapper: <T2 extends T, K2 extends IdType<T2>>(
    props: FieldWrapperProps<T2, K2>
  ) => React.ReactElement | null;

  /** th */
  LabelWrapper?: <T2 extends T, K2 extends IdType<T2>>(
    props: LabelWrapperProps<T2, K2>
  ) => React.ReactElement | null;

  /** thead */
  Before?: Wrapper<Maybe<T>[]>;
  /** tbody */
  Data?: Wrapper<Maybe<T>[]>;
  /** tfoot */
  After?: Wrapper<Maybe<T>[]>;
}

export const ArrayTemplate = <T extends object>(props: ArrayTemplateProps<T>) =>
  null;
