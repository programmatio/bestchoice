  var gulp = require('gulp');
  var babel = require('gulp-babel');
  var mocha = require('gulp-mocha');
  var docco = require('gulp-docco');
  var watch = require('gulp-watch');
   
  //Transpile ES6 to ES5

  gulp.task('js', function() {
    return gulp.src('src/**/*.js')
      .pipe(babel())
      .pipe(gulp.dest('app'));
  });

  //Run Tests

  gulp.task('test', function() {
    return gulp.src('app/test/**/*.js', {read: false})
        .pipe(mocha({reporter: 'nyan'}));
  });

  //Generate documentation

  gulp.task('docs', function() {
    return gulp.src('./**/*.js')
      .pipe(docco())
      .pipe(gulp.dest('./docs'));
  });

  gulp.task('watch', function() {
    gulp.watch('./src/**/*.js', ['js', 'test']);
  });

  gulp.task('default', ['js','test','docs','watch']);
