## Setup

Tested with node 8.

**PLEASE NOTE if you downloaded a zip, after unpacking, make sure you copy hidden (dot) files as well. A lot of people forget to do so, and project won't run without Babel configuration in `.babelrc`.**

Clone or download, navigate to folder, and install dependencies:

```
npm install
```

## npm tasks

for fast development mode use:

```
npm start
```

Find file :

```
/source/js/client.js (root)
/source/js/views/App.jsx
/source/js/views/Home.jsx (front/home page)
```
and Home

Once dependencies are installed following npm tasks are availble:

* `start` - starts client app only in development mode, using webpack dev server
* `client:dev` - same as `start`
* `client:build` - builds client application
* `client:preview` - runs client application in *production* mode, using webpack dev server (use for local testing of the client production build)
* `server:dev` - starts server app only in development mode (use for testing server responses)
* `universal:dev` - runs both server and client in watch mode, automatically restarts server on changes
* `universal:build` - builds both server and client

There are other tasks as well which shouldn't be used on their own.

## Running client in dev mode

```sh
npm start
# or
npm run client:dev
```

Visit `http://localhost:8080/` from your browser of choice.
Server is visible from the local network as well.

## Build client (production)

Build will be placed in the `build` folder.

```
npm run client:build
```

If your app is not running on the server root you should change `publicPath` at two places.

In `webpack.config.js` (ATM line 76):

```js
output: {
  path: buildPath,
  publicPath: '/your-app/',
  filename: 'app-[hash].js',
},
```

and in `source/js/constants/routes` (line 1):

```js
const publicPath = '/your-app/'; // Don't forget the trailing slash (`/`).
```

Development server will be available at `http://localhost:8080/your-app/`.

This App created using [Mavin Boilerplate](https://github.com/workco/marvin), [Bootstrap](https://getbootstrap.com/), [React](https://reactjs.org/) and [Redux](https://redux.js.org/)-[Saga](https://github.com/redux-saga/redux-saga). Development using [Webpack](https://webpack.js.org/), deployment using [Docker](https://www.docker.com/)