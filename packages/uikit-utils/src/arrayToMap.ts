import type { FilterByValueType } from './types';

/**
 * Convert Array of the object to Object
 * @param {object[]} arr
 * @param {keyof object} selector
 * @param {keyof object} [fallbackSelector]
 * @returns {Record<keyof object, object>}
 * @example
 * ```
 *  const arr = [{name: 'john'}, {name: 'chris'}, {name: 'sravan'}, {name: 'hoon'}];
 *  const obj = arrayToMap(arr, 'name');
 *
 *  console.log(obj);
 *  // {
 *  //  'john': {name: 'john'},
 *  //  'chris': {name: 'chris'},
 *  //  'sravan': {name: 'sravan'},
 *  //  'hoon': {name: 'hoon'}
 *  // }
 * ```
 * */
export default function arrayToMap<T extends Record<K, unknown>, K extends keyof T = keyof T>(
  arr: T[],
  selector: K,
  fallbackSelector: K,
): Record<string, T>;

export default function arrayToMap<T extends Record<K, unknown>, K extends keyof T = keyof T>(
  arr: T[],
  selector: keyof FilterByValueType<T, string | number>,
): Record<string, T>;

export default function arrayToMap<T extends Record<K, unknown>, K extends keyof T = keyof T>(
  arr: T[],
  selector: K,
  fallbackSelector?: K,
) {
  return arr.reduce((accum, curr) => {
    const _key = (curr[selector] || curr[fallbackSelector as K]) as string;
    accum[_key] = curr;

    return accum;
  }, {} as Record<string, T>);
}
