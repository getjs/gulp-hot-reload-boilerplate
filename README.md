# gulp-hot-reload-boilerplate

Starter web application using build with [gulp-hot-reload](https://github.com/getjs/gulp-hot-reload)

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


