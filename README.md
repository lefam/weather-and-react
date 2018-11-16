# Small React App by Leonel Machava

## Overview

This repo hosts the source code of simple app based on React which simply calls the Yahoo Weather APIs to fetch
the temperature and local time of the browser user.

Tech stack:

- React
- Webpack
- Babel
- HMR
- Sass
- ES6 / ES7

## Notes

* To avoid CORS issue, the built-in development server has been configured with a proxy to the Weather API.

* The current (geo)location of the browser can be faked using developer tools, ie, you can manually set a location for
testing.


## Deployment / local

To get started clone this repo and run the following actions (you will need Node.js 6+):

```
yarn install
```

To start the app, run:

```
npm start
```

Point your browser at http://localhost:8080 and enjoy!

## Continuing Development

The app has HMR configured. When you run the app with `npm start`, HMR is enabled and you should
see source code changes updated on the browser in real-time without a full page reload.

For simplicity ESLint has not been enabled.

## Building

To build the package in production mode run:

```
npm run build
```

To build the package in development mode just run:

```
npm run build-dev
```
