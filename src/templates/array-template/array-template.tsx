import _ from 'lodash';
import React from 'react';

import {ConfigureFunction, IdType, Maybe} from '../..';
import {
  Configurer,
  FieldConfigurationProvider,
  useConfiguredFieldIds,
  useFieldConfiguration,
} from '../configuration';
import {
  FieldWrapperProps,
  ItemWrapper as ItemWrapperType,
  Wrapper as WrapperType,
} from '../support';

export interface ArrayTemplateProps<
  T extends object,
  K extends IdType<T> = IdType<T>
> {
  data: Maybe<Maybe<T>[]>;
  idField: K;
  configure: ConfigureFunction<T>;
  /** table */
  Wrapper: WrapperType<Maybe<T>[]>;
  /** tr */
  ItemWrapper: ItemWrapperType<T>;

  /** td */
  FieldWrapper: <T2 extends T, K2 extends IdType<T2>>(
    props: FieldWrapperProps<T2, K2>
  ) => React.ReactElement | null;
}

type WrapFieldProps<T extends object> = Omit<
  WrapDataProps<T>,
  'Wrapper' | 'ItemWrapper'
> & {
  data: Maybe<T>[];
  datum: T;
  fieldId: string;
};

export const WrapField = <T extends object>({
  datum,
  fieldId,
  FieldWrapper,
  ...rest
}: WrapFieldProps<T>) => {
  const config = useFieldConfiguration(fieldId);
  const value = _.get(datum, config.keyPath);
  return (
    <FieldWrapper
      fieldId={fieldId}
      value={value}
      field={config.keyPath as IdType<T>}
      {...rest}
      {...config}
      data={datum}
    />
  );
};

export type WrapDataProps<T extends object> = Omit<
  ArrayTemplateProps<T>,
  'configure'
>;

export const WrapData = <T extends object>({
  data,
  idField,
  Wrapper,
  ItemWrapper,
  FieldWrapper,
}: WrapDataProps<T>) => {
  const fieldIds = useConfiguredFieldIds<T>();
  if (!data) {
    return null;
  }
  return (
    <Wrapper data={data}>
      {data.map((datum) => (
        <>
          {datum && (
            <ItemWrapper key={String(datum[idField])} data={datum}>
              {fieldIds.map((fieldId) => (
                <WrapField
                  idField={idField}
                  key={fieldId}
                  data={data}
                  datum={datum}
                  fieldId={fieldId}
                  FieldWrapper={FieldWrapper}
                />
              ))}
            </ItemWrapper>
          )}
        </>
      ))}
    </Wrapper>
  );
};
export const ArrayTemplate = <T extends object>({
  configure: Configure,
  ...rest
}: ArrayTemplateProps<T>) => (
  <FieldConfigurationProvider>
    <Configure FieldConfigurer={Configurer} />
    <WrapData {...rest} />
  </FieldConfigurationProvider>
);
