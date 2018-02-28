# media queries
[![npm](https://img.shields.io/npm/v/media-queries.svg)](https://npm.im/media-queries)
[![Travis](https://img.shields.io/travis/diegomura/media-queriesn.svg)](https://travis-ci.org/diegomura/media-queries)
[![license](https://img.shields.io/npm/l/media-queries.svg)](./LICENSE)
> Media queries engine written in pure JS!

## API
```js
matchMedia(
  {
    'min-width: 700px': {
      color: 'green',
    },
    '(min-width: 700px) and (orientation: landscape)': {
      color: 'red',
    },
    '(min-width: 700px), (orientation: landscape)': {
      color: 'black',
    }
  },
  {
    width: 100,
    height: 100,
    orientation: 'landscape',
  }
);
```
