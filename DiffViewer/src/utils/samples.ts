import { SampleData } from '@/types';

export const SAMPLES: SampleData = {
  javascript: {
    old: `function calculateTotal(items) {
  let total = 0;
  for (let i = 0; i < items.length; i++) {
    total += items[i].price;
  }
  return total;
}

const cart = [
  { name: 'Apple', price: 1.50 },
  { name: 'Banana', price: 0.75 }
];

console.log(calculateTotal(cart));`,
    new: `function calculateTotal(items) {
  return items.reduce((total, item) => total + item.price, 0);
}

const cart = [
  { name: 'Apple', price: 1.50 },
  { name: 'Banana', price: 0.75 },
  { name: 'Orange', price: 2.00 }
];

console.log('Total:', calculateTotal(cart));`,
  },
  typescript: {
    old: `interface User {
  name: string;
  age: number;
}

function greetUser(user: User) {
  console.log("Hello " + user.name);
}`,
    new: `interface User {
  name: string;
  age: number;
  email?: string;
}

function greetUser(user: User): string {
  return \`Hello \${user.name}, you are \${user.age} years old\`;
}

console.log(greetUser({ name: 'John', age: 30 }));`,
  },
  python: {
    old: `def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

for i in range(10):
    print(fibonacci(i))`,
    new: `def fibonacci(n, memo={}):
    if n in memo:
        return memo[n]
    if n <= 1:
        return n
    memo[n] = fibonacci(n-1, memo) + fibonacci(n-2, memo)
    return memo[n]

# Print first 10 Fibonacci numbers
for i in range(10):
    print(f"F({i}) = {fibonacci(i)}")`,
  },
  html: {
    old: `<!DOCTYPE html>
<html>
<head>
    <title>My Page</title>
</head>
<body>
    <h1>Hello World</h1>
    <p>Welcome to my website</p>
</body>
</html>`,
    new: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Modern Page</title>
</head>
<body>
    <header>
        <h1>Hello World</h1>
    </header>
    <main>
        <p>Welcome to my awesome website</p>
    </main>
</body>
</html>`,
  },
  css: {
    old: `.button {
  background-color: blue;
  color: white;
  padding: 10px;
}`,
    new: `.button {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  transition: transform 0.2s ease;
}

.button:hover {
  transform: scale(1.05);
}`,
  },
  json: {
    old: `{
  "name": "my-app",
  "version": "1.0.0"
}`,
    new: `{
  "name": "my-app",
  "version": "2.0.0",
  "description": "My awesome application",
  "author": "Developer",
  "scripts": {
    "dev": "vite",
    "build": "vite build"
  }
}`,
  },
  markdown: {
    old: `# Hello World

This is my first markdown file.`,
    new: `# Hello World

This is my **improved** markdown file with:

- Better formatting
- More content
- Lists and emphasis

> A quote for inspiration`,
  },
};
