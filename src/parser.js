const Query = require('./queries');
const Operator = require('./operators');

let NUMBERS = /[0-9]/;
let LETTERS = /[a-z|\-|@]/i;
let WHITESPACE = /\s/;
let COLON = /:/;
let COMMA = /,/;
let AND = /and$/;

function tokenizer(input) {
  let current = 0;
  let tokens = [];

  while (current < input.length) {
    let char = input[current];

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

      tokens.push({ type: 'number', value });
      continue;
    }

    if (LETTERS.test(char)) {
      let value = '';
      while (LETTERS.test(char) && char !== undefined) {
        value += char;
        char = input[++current];
      }
      if (AND.test(value)) {
        tokens.push({ type: 'operator', value });
      } else {
        tokens.push({ type: 'literal', value });
      }

      continue;
    }

    throw new TypeError(
      'Tokenizer: I dont know what this character is: ' + char,
    );
  }

  return tokens;
}

function parser(tokens) {
  let output = [];
  let stack = [];

  while (tokens.length > 0) {
    let token = tokens.shift();

    if (token.type === 'number' || token.type === 'literal') {
      output.push(token);
      continue;
    }

    if (token.type === 'operator') {
      if (COLON.test(token.value)) {
        token = { type: 'query', key: output.pop(), value: tokens.shift() };
        output.push(token);
        continue;
      }

      while (stack.length > 0) {
        output.unshift(stack.pop());
      }
      stack.push(token);
    }
  }

  while (stack.length > 0) {
    output.unshift(stack.pop());
  }

  function walk() {
    const head = output.shift();

    if (head.type === 'number') {
      return parseInt(head.value);
    }

    if (head.type === 'literal') {
      return head.value;
    }

    if (head.type === 'operator') {
      const l = walk();
      const r = walk();

      return Operator(head.value, l, r);
    }

    if (head.type === 'query') {
      const l = head.key.value;
      const r = head.value.value;

      return Query(l, r);
    }
  }

  return walk();
}

module.exports = {
  parse: function(query) {
    const tokens = tokenizer(query);
    const ast = parser(tokens);
    return ast;
  },
};
