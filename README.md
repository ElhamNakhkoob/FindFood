# FindFood

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app). It uses [`json-server`](https://github.com/typicode/json-server) to mock API data locally.

## Table of Contents

- [Getting Started](#getting-started)
- [Mock API Setup](#mock-api-setup)
- [Tech Stack](#tech-stack)
- [Learn More](#learn-more)

---

## Getting Started

Clone the repository:

```bash
git clone git@github.com:ElhamNakhkoob/FindFood.git
cd FindFood

npm install
# or
yarn install
# or
pnpm install

## Mock API Setup
npm install -g json-server
npm install json-server --save-dev
json-server --watch mock/db.json --port 3004

This will start the mock API server at: http://localhost:3004

Available API endpoints include:

    http://localhost:3004/products

    http://localhost:3004/discount

    http://localhost:3004/orders

## Tech Stack

    Next.js v15.3.3

    React v19.0.0

    Axios for API calls

    Tailwind CSS for styling

    json-server for mock API
```
