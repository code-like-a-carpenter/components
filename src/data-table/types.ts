export type StringKey<D> = Extract<keyof D, string>;
export type IdType<D> = StringKey<D>;

export interface RenderProps<T extends object> {
  // ideally, this would be ComponentType, but I don't think typescript syntax
  // will let me template anything by a function (or maybe a class).
  FieldRenderer: <T2 extends T, K2 extends IdType<T2>>(
    props: FieldRendererProps<T2, K2>
  ) => JSX.Element | null;
}

export type FieldRendererProps<T extends object, K extends IdType<T>> = {
  name: K;
  label?: React.ReactNode;
  render?: T[K] extends object ? React.ComponentType<RenderProps<T[K]>> : never;
};

export type FieldRenderer<
  T extends object,
  K extends IdType<T>
> = React.ComponentType<FieldRendererProps<T, K>>;
