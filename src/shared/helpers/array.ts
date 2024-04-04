export const sortAsc = <T>(array: T[], prop: keyof T) =>
  array.sort((a, b) => (a[prop] < b[prop] ? -1 : a[prop] > b[prop] ? 1 : 0));
