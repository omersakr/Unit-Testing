const {
  add,
  isPrime,
  reverseString,
  getCharactersCount,
  formatDate
} = require('./functions');

// Test add 
describe('add', () => {
  test('adds 2 + 3 to equal 5', () => {
    expect(add(2, 3)).toBe(5);
  });

  test('adds negative numbers', () => {
    expect(add(-1, -1)).toBe(-2);
  });

  test('adds zero', () => {
    expect(add(5, 0)).toBe(5);
  });
});

// Test isPrime 
describe('isPrime', () => {
  test('2 is prime', () => {
    expect(isPrime(2)).toBe(true);
  });

  test('7 is prime', () => {
    expect(isPrime(7)).toBe(true);
  });

  test('4 is not prime', () => {
    expect(isPrime(4)).toBe(false);
  });

  test('1 is not prime', () => {
    expect(isPrime(1)).toBe(false);
  });

  test('negative numbers are not prime', () => {
    expect(isPrime(-5)).toBe(false);
  });
});

// Test reverseString
describe('reverseString', () => {
  test('reverses "hello" to "olleh"', () => {
    expect(reverseString('hello')).toBe('olleh');
  });

  test('reverses empty string', () => {
    expect(reverseString('')).toBe('');
  });

  test('reverses single character', () => {
    expect(reverseString('a')).toBe('a');
  });
});

// Test getCharactersCount
describe('getCharactersCount', () => {
  test('counts characters in "hello"', () => {
    expect(getCharactersCount('hello')).toEqual({
      h: 1,
      e: 1,
      l: 2,
      o: 1
    });
  });

  test('counts characters in empty string', () => {
    expect(getCharactersCount('')).toEqual({});
  });

  test('counts repeated characters', () => {
    expect(getCharactersCount('aaa')).toEqual({ a: 3 });
  });
});

// Test formatDate
describe('formatDate', () => {
  test('formats date correctly', () => {
    const date = new Date('2024-03-15');
    expect(formatDate(date)).toBe('2024-03-15');
  });

  test('formats date with single digit month and day', () => {
    const date = new Date('2024-01-05');
    expect(formatDate(date)).toBe('2024-01-05');
  });

  test('formats current date', () => {
    const date = new Date('2026-12-25');
    expect(formatDate(date)).toBe('2026-12-25');
  });
});
