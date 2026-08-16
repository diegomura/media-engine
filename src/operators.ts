import { Matcher } from './queries';

export default function Operator(
  type: string,
  left: Matcher,
  right: Matcher
): Matcher {
  switch (type) {
    case 'and':
      return { match: o => left.match(o) && right.match(o) };
    case ',':
      return { match: o => left.match(o) || right.match(o) };
    default:
      throw new Error(type);
  }
}
