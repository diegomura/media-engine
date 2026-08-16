export interface MatchOptions {
  width?: number;
  height?: number;
  orientation?: string;
}

export interface Matcher {
  match(options: MatchOptions): boolean;
}

export default function Query(type: string, value: string): Matcher {
  const size = Number(value);

  switch (type) {
    case 'max-height':
      return { match: o => o.height !== undefined && size >= o.height };
    case 'min-height':
      return { match: o => o.height !== undefined && size <= o.height };
    case 'max-width':
      return { match: o => o.width !== undefined && size >= o.width };
    case 'min-width':
      return { match: o => o.width !== undefined && size <= o.width };
    case 'orientation':
      return { match: o => value === o.orientation };
    default:
      throw new Error(value);
  }
}
