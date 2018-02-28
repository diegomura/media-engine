# media queries
> Media queries engine written in pure JS!

[![npm](https://img.shields.io/npm/v/media-queries.svg)](https://npm.im/media-queries)
[![Travis](https://img.shields.io/travis/diegomura/media-queries.svg)](https://travis-ci.org/diegomura/media-queries)
[![license](https://img.shields.io/npm/l/media-queries.svg)](./LICENSE)

## API
`min-height`
```js
matchMedia(
  {
    'min-height: 700': {
      color: 'green',
    },
  },
  { height: 800 }
);
// { color: 'green' }

matchMedia(
  {
    'min-height: 700': {
      color: 'green',
    },
  },
  { height: 100 }
);
// { }
```

`max-height`
```js
matchMedia(
  {
    'max-height: 700': {
      color: 'green',
    },
  },
  { height: 100 }
);
// { color: 'green' }

matchMedia(
  {
    'max-height: 700': {
      color: 'green',
    },
  },
  { height: 800 }
);
// { }
```

`min-width`
```js
matchMedia(
  {
    'min-width: 700': {
      color: 'green',
    },
  },
  { width: 800 }
);
// { color: 'green' }

matchMedia(
  {
    'min-width: 700': {
      color: 'green',
    },
  },
  { width: 100 }
);
// { }
```

`max-width`
```js
matchMedia(
  {
    'max-width: 700': {
      color: 'green',
    },
  },
  { width: 100 }
);
// { color: 'green' }

matchMedia(
  {
    'max-width: 700': {
      color: 'green',
    },
  },
  { width: 800 }
);
// { }
```

`orientation`
```js
matchMedia(
  {
    'orientation: landscape': {
      color: 'green',
    },
  },
  { orientation: 'landscape' }
);
// { color: 'green' }

matchMedia(
  {
    'orientation: landscape': {
      color: 'green',
    },
  },
  { orientation: 'portrait' }
);
// { }
```

`and operator`
```js
matchMedia(
  {
    '(min-width: 700) and (orientation: landscape)': {
      color: 'green',
    },
  },
  { width: 800, orientation: 'landscape' }
);
// { color: 'green' }
```

`or operator`
```js
matchMedia(
  {
    '(min-width: 700), (orientation: landscape)': {
      color: 'green',
    },
  },
  { orientation: 'landscape' }
);
// { color: 'green' }
```

`multiple queries`
```js
matchMedia(
  {
    'orientation: landscape': {
      color: 'green',
    },
    'min-width: 700': {
      background: 'red',
    }
  },
  { orientation: 'landscape', width: 800 }
);
// { color: 'green', background: 'red' }
```
