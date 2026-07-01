# Lab 3: Unearthed Part 3 Exemplar

## Overview

In the third part of this lab, students will dip into React once again, creating a backend that can respond to API requests, as well as familiarizing themselves with the way React apps send API requests via `useEffect()` and the `async`/`await` design pattern.

## Project Screenshot

![screenshot of completed project](readme_screenshot.gif)

## Setup

### Dependencies

* [Vite](https://vitejs.dev/guide/)
* [React](https://www.npmjs.com/package/react)
* [React DOM](https://www.npmjs.com/package/react-dom)
* [React Router](https://www.npmjs.com/package/react-router)
* [Express](https://expressjs.com/)
* [PostgreSQL](https://www.npmjs.com/package/pg)
* [Nodemon](https://www.npmjs.com/package/nodemon)
* [Body Parser](https://www.npmjs.com/package/body-parser)
* [CORS](https://www.npmjs.com/package/cors)

---

### Install Dependencies

Before installing dependencies, you will need `node` and `npm` installed globally on your machine by installing  [NodeJS](https://nodejs.org/en/download/) onto your machine.

To install the dependencies for the client-side, run the following command in the `client` directory:

```sh
npm install
```

Alternatively, you can install the client-side dependencies individually:

```sh
npm install react
npm install react-dom
npm install react-router-dom
npm install vite@latest
```

To install the dependencies for the client-side, run the following command in the `server` directory:

```sh
npm install
```

Alternatively, you can install the client-side dependencies individually:

```sh
npm install express
npm install nodemon
npm install pg
npm install body-parser
npm install cors
```

---

### Run UnEarthed Part 3

In the `server` directory, run the following in your terminal:

```sh
npm run dev

```

In the `client` directory, run the following in your terminal:

```sh
npm run dev

```

Visit the web application in the browser:

```html
http://localhost:5173/
```

---

*Last Updated: March 2023*