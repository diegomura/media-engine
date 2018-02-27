const Query = require('./queries');

let NUMBERS = /[0-9]/;
let LETTERS = /[a-z|\-]/i;
let WHITESPACE = /\s/;
let COLON = /:/;

function tokenizer(input) {
  let current = 0;
  let tokens = [];

  while (current < input.length) {
    let char = input[current];

    if (char === '(') {
      tokens.push({
        type: 'paren',
        value: '(',
      });

      current++;
      continue;
    }

    if (char === ')') {
      tokens.push({
        type: 'paren',
        value: ')',
      });
      current++;
      continue;
    }

    if (WHITESPACE.test(char) || COLON.test(char)) {
      current++;
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
      while (LETTERS.test(char)) {
        value += char;
        char = input[++current];
      }

      tokens.push({ type: 'name', value });
      continue;
    }

    throw new TypeError('Tokenizer: I dont know what this character is: ' + char);
  }

  return tokens;
}

function parser(tokens) {
  let current = 0;

  function walk() {
    let token = tokens[current];

    if (token.type === 'number') {
      current++;
      return parseInt(token.value);
    }

    if (token.type === 'name') {
      current++;
      return Query(token.value, walk());
    }

    throw new TypeError(token.type);
  }

  return walk();
}

module.exports = {
  parse: function(query) {
    const tokens = tokenizer(query);
    const ast = parser(tokens);
    return ast;
  }
};
