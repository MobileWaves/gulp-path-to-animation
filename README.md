#gulp-path-to-animation

## Synopsis
Use to generate `scss` files with predefined @keyframes animations by reading configuration of paths to be interpolated.

### Why would you need this?
* Do you want to have smooth css animations you don't want to handle by java script?
* Do you need to pause them?
* Do you need to resize and keep the animated element's position?
* Do you want to write such animation manually? And rewrite them every time the client changes the design?
* Animations using translate instead of top/left positioning are considered as better performance and calculating translate movement manually could be painfully sometimes.

`path-to-animation` needs just a JSON file with animations paths you would need and it will interpolate them and create the file with predefined `@keyframes` animations you need.

## Installation

```
npm install gulp-path-to-animation
```

## Usage

```
var gulp = require('gulp');

// this module is for the sake of the example in order to rename the file we will create
var rename = require('gulp-rename');

var pathToAnimation = require('gulp-path-to-animation');

gulp.task('default', function() {
  // define which is your paths configuration file
  gulp.src('./animation-paths.json')
    // get the css content after some calculations
    .pipe(pathToAnimation({
      namespace: 'my-namespace',
      elementWidth: 100,
      elementHeight: 100
    }))
    // use gulp-rename to specify the name of the output file
    .pipe(rename({
      basename: 'output-file',
      extname: '.scss'
    }))
    // write it wherever you like
    .pipe(gulp.dest('./dist'));
});
```

## pathToAnimation(options)

#### options
* Type: `Object`

#### options.namespace
* Description: The namespace is used to generate the @keyframes and css class name. It is also a guidance to specify which property of the JSON content to read the animations from.
* Type: `String`

#### options.elementWidth
* Description: Animated element's width. It's needed in order to calculate the path related to its size in percentages.
* Type: `Number|String`

#### options.elementHeight
* Description: Animated element's height. It's needed in order to calculate the path related to its size in percentages.
* Type: `Number|String`

#### options.sassMixin
* Description: The name of the sass mixin to be used for the generated css class.
* **optional**
* Type: `String`
* Default: `curved-animation`

## Dependancies
We depend on SASS. We expect the developers to use SASS in the project they plan to use `path-to-animation`

We will generate sass file and you will be able to `import` it into your project. We expect you to have defined sass mixin which name you could provide via the arguments described above. The default is mixin name is `curved-animation`.

## Test
In order to asure everything works as expected, run:

```
npm install
npm test
```

## Other tools:
* [path-to-animation](https://github.com/MobileWaves/path-to-animation)
* [grunt-path-to-animation](https://github.com/MobileWaves/grunt-path-to-animation)
* [gulp-path-to-animation](https://github.com/MobileWaves/gulp-path-to-animation)


## Changelog
* **0.1.1** - Synchronize version numbers between the `path-to-animation` modules
* **0.0.1** - Initial version

# Contributions
If you have any suggestions or the tool doesn't cover your needs, don't hasitate to fork us or send us an email <opensource@mobilewaves.com>. Every comment or contribution will be very appreciated.


# MIT License

Copyright (c) 2016 Mobile Wave Solutions (<opensource@mobilewaves.com>)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.