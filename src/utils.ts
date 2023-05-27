/**
 * Helper function to strip null and undefined from a given type.
 * It is mostly supposed to used as a type-aware drop-in replacement to Boolean
 * as in Array.prototype.filter predicate.
 *
 * @example
 * const arr = [1, 2, undefined];
 *
 * // arrWithBoolean => [1, 2], typeof arrWithBoolean => number | undefined
 * const arrWithBoolean = arr.filter(Boolean);
 *
 * // arrWithNotEmpty => [1, 2], typeof arrWithNotEmpty => number
 * const arrWithNotEmpty = arr.filter(nonEmpty);
 */
export const notEmpty = <T>(value: T | null | undefined): value is T => {
  return value !== null && value !== undefined;
};
