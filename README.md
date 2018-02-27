# media queries

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
)
```
