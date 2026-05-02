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

module.exports = {
  add,
  isPrime,
  reverseString,
  getCharactersCount,
  formatDate
};
