const matchMedia = require('../src');

test('Should match max-height if valid', () => {
  const result = matchMedia(
    { 'max-height: 700': { color: 'green' }},
    { height: 100 },
  );

  expect(result).toEqual({ color: 'green' });
});

test('Should not match max-height if invalid', () => {
  const result = matchMedia(
    { 'max-height: 700': { color: 'green' }},
    { height: 800 },
  );

  expect(result).toEqual({});
});

test('Should match min-height if valid', () => {
  const result = matchMedia(
    { 'min-height: 700': { color: 'green' }},
    { height: 800 },
  );

  expect(result).toEqual({ color: 'green' });
});

test('Should not match min-height if invalid', () => {
  const result = matchMedia(
    { 'min-height: 700': { color: 'green' }},
    { height: 100 },
  );

  expect(result).toEqual({});
});

test('Should match max-width if valid', () => {
  const result = matchMedia(
    { 'max-width: 700': { color: 'green' }},
    { width: 100 },
  );

  expect(result).toEqual({ color: 'green' });
});

test('Should not match max-width if invalid', () => {
  const result = matchMedia(
    { 'max-width: 700': { color: 'green' }},
    { width: 800 },
  );

  expect(result).toEqual({});
});

test('Should match min-width if valid', () => {
  const result = matchMedia(
    { 'min-width: 700': { color: 'green' }},
    { width: 800 },
  );

  expect(result).toEqual({ color: 'green' });
});

test('Should not match min-width if invalid', () => {
  const result = matchMedia(
    { 'min-width: 700': { color: 'green' }},
    { width: 100 },
  );

  expect(result).toEqual({});
});

test.skip('Should match orientation if valid', () => {
  const result = matchMedia(
    { 'orientation: landscape': { color: 'green' }},
    { orientation: 'landscape' },
  );

  expect(result).toEqual({ color: 'green' });
});

test.skip('Should not match orientation if invalid', () => {
  const result = matchMedia(
    { 'orientation: landscape': { color: 'green' }},
    { orientation: 'portrait' },
  );

  expect(result).toEqual();
});

test.skip('Should match and operator', () => {
  const result = matchMedia(
    { '(max-height: 700px) and (orientation: landscape)': { color: 'green' }},
    { height: 100, orientation: 'landscape' },
  );

  expect(result).toEqual({ color: 'green' });
});

test.skip('Should match or operator', () => {
  const result = matchMedia(
    { '(max-height: 700px), (orientation: landscape)': { color: 'green' }},
    { orientation: 'landscape' },
  );

  expect(result).toEqual({ color: 'green' });
});

test.skip('Should match several queries', () => {
  const result = matchMedia(
    {
      'max-height: 700px': { color: 'green' },
      'orientation: landscape': { background: 'red' },
    },
    { height: 100, orientation: 'landscape' },
  );

  expect(result).toEqual({ color: 'green', background: 'red' });
});
