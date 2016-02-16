  var gulp = require('gulp');
  var mocha = require('gulp-mocha');
  var docco = require("gulp-docco");
   
  //Run Tests

  gulp.task('test', () => {
    return gulp.src('./test/**/*.js', {read: false})
        .pipe(mocha({reporter: 'nyan'}));
  });

  //Generate documentation

  gulp.task('docs', () => {
    gulp.src("./**/*.js")
      .pipe(docco())
      .pipe(gulp.dest('./docs'))
  });


  gulp.task('default', ['test', 'docs']);
