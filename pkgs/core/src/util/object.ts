/**
 * Picks the specified keys from the object.
 */
export function pickObject<T extends Record<string, unknown>, K extends keyof T>(
  obj: T,
  keys: Set<K>
): Pick<T, K> {
  const result: any = {};

  for (const key of Object.keys(obj)) {
    if (keys.has(key as K)) {
      result[key] = obj[key];
    }
  }

  return result;
}
