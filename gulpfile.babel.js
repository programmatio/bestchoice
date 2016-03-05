  var gulp = require('gulp');
  var babel = require('gulp-babel');
  var mocha = require('gulp-mocha');
  var istanbul = require('gulp-istanbul');
  var docco = require('gulp-docco');
  var watch = require('gulp-watch');
   
  //Transpile ES6 to ES5

  gulp.task('js', function() {
    return gulp.src('src/**/*.js')
      .pipe(babel())
      .pipe(gulp.dest('app'));
  });


  gulp.task('pre-test', function () {
    return gulp.src(['./test/**/*.js'])
      .pipe(istanbul())
      .pipe(istanbul.hookRequire());
  });

  //Run Tests

  gulp.task('test-js', function() {
    return gulp.src('./test/**/*.js', {read: false})
        .pipe(mocha(
          {
            reporter: 'nyan',
            compilers: {
                js: babel
            }
          }

          ))
        .pipe(istanbul.writeReports())
        // Enforce a coverage of at least 90%
        .pipe(istanbul.enforceThresholds({ thresholds: { global: 90 } }));
  });

  //Generate documentation

  gulp.task('docs', function() {
    return gulp.src('./**/*.js')
      .pipe(docco())
      .pipe(gulp.dest('./docs'));
  });

  gulp.task('watch', function() {
    gulp.watch(['./src/**/*.js', './test/**/*.js'], ['pre-test', 'test-js']);
  });

  gulp.task('default', ['js','test-js' ,'docs','watch']);

  gulp.task('test', ['pre-test','test-js']);
