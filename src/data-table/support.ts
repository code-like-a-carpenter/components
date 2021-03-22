const pattern = /^(\w+)\.(.+)$/;

/**
 * Extracts data from an object using dotted keypaths. Does not support arrays
 * or array notation
 */
export function getColumnData(rowData: unknown, keyPath: string): unknown {
  if (!keyPath) {
    return rowData;
  }

  if (typeof rowData !== 'object') {
    return null;
  }

  if (rowData === null) {
    return null;
  }

  const match = keyPath.match(pattern);
  if (match) {
    const [_, key, rest] = match;
    // @ts-expect-error
    return getColumnData(rowData[key], rest);
  }

  // @ts-expect-error
  return rowData[keyPath];
}
