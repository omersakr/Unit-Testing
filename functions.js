// task1 Add two numbers
function add(a, b) {
  return a + b;
}

// task2 is prime
function isPrime(n) {
  if (n <= 1) return false;
  if (n <= 3) return true;
  if (n % 2 === 0 || n % 3 === 0) return false;
  
  for (let i = 5; i * i <= n; i += 6) {
    if (n % i === 0 || n % (i + 2) === 0) return false;
  }
  return true;
}

// task3 Reverse
function reverseString(str) {
  return str.split('').reverse().join('');
}

// task4 Count characters
function getCharactersCount(string) {
  const count = {};
  for (let char of string) {
    count[char] = (count[char] || 0) + 1;
  }
  return count;
}

// task5 Format date
function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// task6 Validate password
function validatePassword(password) {
  if (password.length < 8) return false;
  
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  
  return hasUppercase && hasNumber && hasSpecial;
}

// task7 Mask card number
function maskCardNumber(cardNumber) {
  const cleaned = cardNumber.replace(/\s/g, '');
  if (cleaned.length < 4) return cleaned;
  
  const lastFour = cleaned.slice(-4);
  const masked = '*'.repeat(cleaned.length - 4);
  return masked + lastFour;
}

// task8 Range (Design Pattern)
function range(start, end, step = 1) {
  if (step === 0) throw new Error('Step cannot be zero');
  
  const result = [];
  
  if (step > 0) {
    for (let i = start; i < end; i += step) {
      result.push(i);
    }
  } else {
    for (let i = start; i > end; i += step) {
      result.push(i);
    }
  }
  
  return result;
}

// task9 Group by
function groupBy(arr, key) {
  return arr.reduce((result, item) => {
    const groupKey = item[key];
    if (!result[groupKey]) {
      result[groupKey] = [];
    }
    result[groupKey].push(item);
    return result;
  }, {});
}

// task10 Deep equal (Bonus)
function deepEqual(obj1, obj2) {
  if (obj1 === obj2) return true;
  
  if (obj1 == null || obj2 == null) return false;
  
  if (typeof obj1 !== 'object' || typeof obj2 !== 'object') {
    return obj1 === obj2;
  }
  
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  
  if (keys1.length !== keys2.length) return false;
  
  for (let key of keys1) {
    if (!keys2.includes(key)) return false;
    if (!deepEqual(obj1[key], obj2[key])) return false;
  }
  
  return true;
}

// Observer Pattern Implementation
class Observable {
  constructor() {
    this.observers = [];
  }
  
  subscribe(observer) {
    this.observers.push(observer);
    return () => {
      this.observers = this.observers.filter(obs => obs !== observer);
    };
  }
  
  unsubscribe(observer) {
    this.observers = this.observers.filter(obs => obs !== observer);
  }
  
  notify(data) {
    this.observers.forEach(observer => observer(data));
  }
}

module.exports = {
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
};
