import { parse } from './parser';
import { MatchOptions } from './queries';

function matchMedia<T extends object>(
  queries: { [query: string]: T },
  options: MatchOptions
): Partial<T> {
  const result: Partial<T> = {};

  Object.keys(queries).forEach(query => {
    if (parse(query).match(options)) {
      Object.assign(result, queries[query]);
    }
  });

  return result;
}

export = matchMedia;
