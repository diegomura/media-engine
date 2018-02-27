const matchMedia = require('../src');

test.only('Should match max-height', () => {
  const result = matchMedia(
    { 'max-height: 700px': { color: 'green' }},
    { height: 100 },
  );

  expect(result).toBe({ color: 'green' });
});

test('Should match min-height', () => {
  const result = matchMedia(
    { 'min-height: 700px': { color: 'green' }},
    { height: 800 },
  );

  expect(result).toBe({ color: 'green' });
});

test('Should match max-width', () => {
  const result = matchMedia(
    { 'max-width: 700px': { color: 'green' }},
    { width: 100 },
  );

  expect(result).toBe({ color: 'green' });
});

test('Should match min-width', () => {
  const result = matchMedia(
    { 'min-width: 700px': { color: 'green' }},
    { width: 800 },
  );

  expect(result).toBe({ color: 'green' });
});

test('Should match orientation', () => {
  const result = matchMedia(
    { 'orientation: landscape': { color: 'green' }},
    { orientation: 'landscape' },
  );

  expect(result).toBe({ color: 'green' });
});

test('Should match and operator', () => {
  const result = matchMedia(
    { '(max-height: 700px) and (orientation: landscape)': { color: 'green' }},
    { height: 100, orientation: 'landscape' },
  );

  expect(result).toBe({ color: 'green' });
});

test('Should match or operator', () => {
  const result = matchMedia(
    { '(max-height: 700px), (orientation: landscape)': { color: 'green' }},
    { orientation: 'landscape' },
  );

  expect(result).toBe({ color: 'green' });
});

test('Should match several queries', () => {
  const result = matchMedia(
    {
      'max-height: 700px': { color: 'green' },
      'orientation: landscape': { background: 'red' },
    },
    { height: 100, orientation: 'landscape' },
  );

  expect(result).toBe({ color: 'green', background: 'red' });
});
