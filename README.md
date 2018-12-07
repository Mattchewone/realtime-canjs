# realtime demo with canjs

Demo using feathersjs channels to filter realtime data.

## Getting started

To install all dependencies, (e.g. after cloning it from a Git repository) run

```
npm install donejs -g
npm install
```

## Issues

- Will not load when in `ssr` mode cannot resolve the `@feathers` deps and instead returns the index html.
- When using a http-server to serve static files and load the `development.html` page it will load initially and and you can click the messages link to navigate to messages. Which will load the data, but after a refresh the page will not load and this error is thrown:
```
Promise Error
    at Promise.promiseThen (http://localhost:8080/node_modules/can-zone/lib/zones/globals.js:88:26)
    at renderInZone (http://localhost:8080/src/index.stache:280:6)
    at eval (http://localhost:8080/src/index.stache:89:17)
    at Task.run (http://localhost:8080/node_modules/can-zone/lib/zone.js:43:17)
    at Zone.run (http://localhost:8080/node_modules/can-zone/lib/zone.js:210:26)
    at reattachWithZone (http://localhost:8080/src/index.stache:87:6)
    at eval (http://localhost:8080/src/index.stache:358:6)
``` 