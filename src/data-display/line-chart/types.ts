export type Graphable = number | Date;

export interface Datum<
  X extends Graphable = Graphable,
  Y extends Graphable = Graphable
> {
  readonly x: X;
  readonly y: Y;
}

export interface DatumWithSeries<
  X extends Graphable = Graphable,
  Y extends Graphable = Graphable
> extends Datum<X, Y> {
  readonly series: string;
}

export interface LineSeries<
  X extends Graphable = Graphable,
  Y extends Graphable = Graphable
> {
  readonly data: Datum<X, Y>[];
  readonly label: string;
}
