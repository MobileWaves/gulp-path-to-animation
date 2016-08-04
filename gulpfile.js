var gulp = require('gulp');
var rename = require('gulp-rename');
var pathToAnimation = require('./path-to-animation.js');

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