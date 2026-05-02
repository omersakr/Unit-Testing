const {
  add,
  isPrime,
  reverseString,
  getCharactersCount,
  formatDate,
  validatePassword,
  maskCardNumber,
  range,
  groupBy,
  deepEqual,
  Observable
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

// Test validatePassword
describe('validatePassword', () => {
  test('valid password with all requirements', () => {
    expect(validatePassword('Password1!')).toBe(true);
  });

  test('password too short', () => {
    expect(validatePassword('Pass1!')).toBe(false);
  });

  test('password without uppercase', () => {
    expect(validatePassword('password1!')).toBe(false);
  });

  test('password without number', () => {
    expect(validatePassword('Password!')).toBe(false);
  });

  test('password without special character', () => {
    expect(validatePassword('Password1')).toBe(false);
  });

  test('complex valid password', () => {
    expect(validatePassword('MyP@ssw0rd123')).toBe(true);
  });
});

// Test maskCardNumber
describe('maskCardNumber', () => {
  test('masks 16 digit card number', () => {
    expect(maskCardNumber('1234567890123456')).toBe('************3456');
  });

  test('masks card number with spaces', () => {
    expect(maskCardNumber('1234 5678 9012 3456')).toBe('************3456');
  });

  test('handles short card number', () => {
    expect(maskCardNumber('123')).toBe('123');
  });

  test('masks exactly 4 digits', () => {
    expect(maskCardNumber('1234')).toBe('1234');
  });

  test('masks 5 digits', () => {
    expect(maskCardNumber('12345')).toBe('*2345');
  });
});

// Test range
describe('range', () => {
  test('generates range with default step', () => {
    expect(range(1, 5)).toEqual([1, 2, 3, 4]);
  });

  test('generates range with custom step', () => {
    expect(range(0, 10, 2)).toEqual([0, 2, 4, 6, 8]);
  });

  test('generates range with negative step', () => {
    expect(range(5, 0, -1)).toEqual([5, 4, 3, 2, 1]);
  });

  test('generates empty range when start equals end', () => {
    expect(range(5, 5)).toEqual([]);
  });

  test('generates empty range when step direction is wrong', () => {
    expect(range(1, 5, -1)).toEqual([]);
  });

  test('throws error when step is zero', () => {
    expect(() => range(1, 5, 0)).toThrow('Step cannot be zero');
  });

  test('generates range with decimal step', () => {
    expect(range(0, 1, 0.2)).toEqual([0, 0.2, 0.4, 0.6000000000000001, 0.8]);
  });
});

// Test groupBy
describe('groupBy', () => {
  test('groups array of objects by key', () => {
    const users = [
      { name: 'Ahmed', age: 25 },
      { name: 'Sara', age: 30 },
      { name: 'Omar', age: 25 }
    ];
    expect(groupBy(users, 'age')).toEqual({
      25: [
        { name: 'Ahmed', age: 25 },
        { name: 'Omar', age: 25 }
      ],
      30: [{ name: 'Sara', age: 30 }]
    });
  });

  test('groups by string property', () => {
    const items = [
      { type: 'fruit', name: 'apple' },
      { type: 'vegetable', name: 'carrot' },
      { type: 'fruit', name: 'banana' }
    ];
    expect(groupBy(items, 'type')).toEqual({
      fruit: [
        { type: 'fruit', name: 'apple' },
        { type: 'fruit', name: 'banana' }
      ],
      vegetable: [{ type: 'vegetable', name: 'carrot' }]
    });
  });

  test('handles empty array', () => {
    expect(groupBy([], 'key')).toEqual({});
  });

  test('handles single item', () => {
    const items = [{ category: 'A', value: 1 }];
    expect(groupBy(items, 'category')).toEqual({
      A: [{ category: 'A', value: 1 }]
    });
  });
});

// Test deepEqual
describe('deepEqual', () => {
  test('compares primitive values', () => {
    expect(deepEqual(5, 5)).toBe(true);
    expect(deepEqual('hello', 'hello')).toBe(true);
    expect(deepEqual(5, 10)).toBe(false);
  });

  test('compares simple objects', () => {
    expect(deepEqual({ a: 1, b: 2 }, { a: 1, b: 2 })).toBe(true);
    expect(deepEqual({ a: 1, b: 2 }, { a: 1, b: 3 })).toBe(false);
  });

  test('compares nested objects', () => {
    const obj1 = { a: 1, b: { c: 2, d: 3 } };
    const obj2 = { a: 1, b: { c: 2, d: 3 } };
    expect(deepEqual(obj1, obj2)).toBe(true);
  });

  test('compares arrays', () => {
    expect(deepEqual([1, 2, 3], [1, 2, 3])).toBe(true);
    expect(deepEqual([1, 2, 3], [1, 2, 4])).toBe(false);
  });

  test('handles null and undefined', () => {
    expect(deepEqual(null, null)).toBe(true);
    expect(deepEqual(undefined, undefined)).toBe(true);
    expect(deepEqual(null, undefined)).toBe(false);
  });

  test('compares objects with different keys', () => {
    expect(deepEqual({ a: 1 }, { b: 1 })).toBe(false);
  });

  test('compares complex nested structures', () => {
    const obj1 = { a: [1, { b: 2 }], c: { d: [3, 4] } };
    const obj2 = { a: [1, { b: 2 }], c: { d: [3, 4] } };
    expect(deepEqual(obj1, obj2)).toBe(true);
  });
});

// Test Observer Pattern
describe('Observable', () => {
  test('subscribes and notifies observers', () => {
    const observable = new Observable();
    const mockObserver = jest.fn();
    
    observable.subscribe(mockObserver);
    observable.notify('test data');
    
    expect(mockObserver).toHaveBeenCalledWith('test data');
    expect(mockObserver).toHaveBeenCalledTimes(1);
  });

  test('notifies multiple observers', () => {
    const observable = new Observable();
    const observer1 = jest.fn();
    const observer2 = jest.fn();
    
    observable.subscribe(observer1);
    observable.subscribe(observer2);
    observable.notify('hello');
    
    expect(observer1).toHaveBeenCalledWith('hello');
    expect(observer2).toHaveBeenCalledWith('hello');
  });

  test('unsubscribes observer', () => {
    const observable = new Observable();
    const observer = jest.fn();
    
    observable.subscribe(observer);
    observable.unsubscribe(observer);
    observable.notify('data');
    
    expect(observer).not.toHaveBeenCalled();
  });

  test('unsubscribes using returned function', () => {
    const observable = new Observable();
    const observer = jest.fn();
    
    const unsubscribe = observable.subscribe(observer);
    unsubscribe();
    observable.notify('data');
    
    expect(observer).not.toHaveBeenCalled();
  });

  test('handles multiple notifications', () => {
    const observable = new Observable();
    const observer = jest.fn();
    
    observable.subscribe(observer);
    observable.notify('first');
    observable.notify('second');
    observable.notify('third');
    
    expect(observer).toHaveBeenCalledTimes(3);
    expect(observer).toHaveBeenNthCalledWith(1, 'first');
    expect(observer).toHaveBeenNthCalledWith(2, 'second');
    expect(observer).toHaveBeenNthCalledWith(3, 'third');
  });

  test('does not notify after unsubscribe', () => {
    const observable = new Observable();
    const observer = jest.fn();
    
    observable.subscribe(observer);
    observable.notify('before');
    observable.unsubscribe(observer);
    observable.notify('after');
    
    expect(observer).toHaveBeenCalledTimes(1);
    expect(observer).toHaveBeenCalledWith('before');
  });
});
