# gulp-hot-reload-boilerplate

Starter web application built with [gulp-hot-reload](https://github.com/getjs/gulp-hot-reload)

##Usage

Clone the repository and *npm install* all the modules.

Starting development server is a default gulp task. If everything works, you should see similar output:

```bash
$ gulp
[22:34:01] Using gulpfile ~/dev/gulp-hot-reload-boilerplate/gulpfile.js
[22:34:01] Starting 'build-backend'...
[22:34:01] init application
[22:34:01] Finished 'build-backend' after 92 ms
[22:34:01] Starting 'watch'...
[22:34:01] Finished 'watch' after 13 ms
[22:34:01] Starting 'default'...
[22:34:01] watch
[22:34:01] Finished 'default' after 869 μs
Development server started at http://127.0.0.1:1337
[22:34:02] [webpack] Time: 916ms
chunk    {0} server.js (main) 730 bytes [rendered]
webpack built 2887a3587be1d379be56 in 4468ms
...
```
The program keeps running, as it watches for changes.

To bundle the application for deployment, use dist task:

```bash
$ gulp dist
[22:34:01] Using gulpfile ~/dev/gulp-hot-reload-boilerplate/gulpfile.js
[22:34:01] Starting 'build-backend'...
[22:34:01] init application
[22:34:01] Finished 'build-backend' after 92 ms
[22:34:01] Starting 'watch'...
[22:34:01] Finished 'watch' after 13 ms
[22:34:01] Starting 'default'...
[22:34:01] watch
[22:34:01] Finished 'default' after 869 μs
Development server started at http://127.0.0.1:1337
[22:34:02] [webpack] Time: 916ms
chunk    {0} server.js (main) 730 bytes [rendered]
webpack built 2887a3587be1d379be56 in 4468ms
$
```

Application is bundled to **build/** folder. Client code and static assets are in **build/static/**.

##How it works

##src/server.js

##gulpfile.js

##webpack.server.config.js

File webpack.server.config.js contains configuration for webpack to bundle server application. It differs from standard frontend configuration in several places.

Setting target to 'node' informs webpack to skip processing of core node modules, such as *path* or *http*.
```javascript
  ...
  target: 'node',
  ...
```

Webpack sets mock values for node global variables such as *__dirname*, as they are not present in the browser environment. It is possible to preserve them with following configuration snippet:
```javascript
  ...
  node: {
    console: false,
    process: false,
    global: false,
    buffer: false,
    __filename: false,
    __dirname: false
  }
  ...
```
For more information about setting node poly fills, visit [webpack docuemntation](http://webpack.github.io/docs/configuration.html#node).

Apart of skipping core node modules from processing, we must also skip bundling of modules imported to *node_modules* folder by npm. This is something specific to server configuration only - our Express application has access to *node_modules* at runtime, for browser application it is still necessary to bundle everything together.

Node modules can be calculated directly by reading contents of *node_modules* folder. Modules are preffixed with __commonjs__ to inform webpack to preserve *require* calls. We also filter out *.bin* folder, as it is not read node module.
```javascript
var nodeModules = fs.readdirSync('node_modules')
  .filter(module => module !== '.bin')
  .reduce((prev, module) => Object.assign(prev, {[module]: 'commonjs ' + module}), {})
```

List of moddules can be passed to the config file now:
```javascript
  ...
  externals: nodeModules
  ...
```


