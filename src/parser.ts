import Query, { Matcher } from './queries';
import Operator from './operators';

const NUMBERS = /[0-9]/;
const LETTERS = /[a-z|\-]/i;
const WHITESPACE = /\s/;
const COLON = /:/;
const COMMA = /,/;
const AND = /and$/;
const AT = /@/;

type Token =
  | { type: 'number' | 'literal' | 'operator'; value: string }
  | { type: 'query'; key: Token; value: Token };

function tokenizer(input: string): Token[] {
  let current = 0;
  const tokens: Token[] = [];

  while (current < input.length) {
    let char = input[current];

    if (AT.test(char)) {
      char = input[++current];
      while (LETTERS.test(char) && char !== undefined) {
        char = input[++current];
      }
    }

    if (WHITESPACE.test(char) || char === ')' || char === '(') {
      current++;
      continue;
    }

    if (COLON.test(char) || COMMA.test(char)) {
      current++;
      tokens.push({ type: 'operator', value: char });
      continue;
    }

    if (NUMBERS.test(char)) {
      let value = '';
      while (NUMBERS.test(char)) {
        value += char;
        char = input[++current];
      }

      tokens.push({ type: 'number', value: value });
      continue;
    }

    if (LETTERS.test(char)) {
      let value = '';
      while (LETTERS.test(char) && char !== undefined) {
        value += char;
        char = input[++current];
      }
      if (AND.test(value)) {
        tokens.push({ type: 'operator', value: value });
      } else {
        tokens.push({ type: 'literal', value: value });
      }

      continue;
    }

    throw new TypeError(
      'Tokenizer: I dont know what this character is: ' + char
    );
  }

  return tokens;
}

function parser(tokens: Token[]): Matcher {
  const output: Token[] = [];
  const stack: Token[] = [];

  while (tokens.length > 0) {
    let token = tokens.shift()!;

    if (token.type === 'number' || token.type === 'literal') {
      output.push(token);
      continue;
    }

    if (token.type === 'operator') {
      if (COLON.test(token.value)) {
        token = { type: 'query', key: output.pop()!, value: tokens.shift()! };
        output.push(token);
        continue;
      }

      while (stack.length > 0) {
        output.unshift(stack.pop()!);
      }
      stack.push(token);
    }
  }

  while (stack.length > 0) {
    output.unshift(stack.pop()!);
  }

  function walk(): string | Matcher {
    const head = output.shift()!;

    if (head.type === 'number' || head.type === 'literal') {
      return head.value;
    }

    if (head.type === 'operator') {
      const l = walk() as Matcher;
      const r = walk() as Matcher;

      return Operator(head.value, l, r);
    }

    if (head.type === 'query') {
      return Query(head.key.value as string, head.value.value as string);
    }

    throw new TypeError(head.type);
  }

  return walk() as Matcher;
}

const cache: { [query: string]: Matcher } = {};

export function parse(query: string): Matcher {
  if (!cache[query]) {
    cache[query] = parser(tokenizer(query));
  }
  return cache[query];
}
