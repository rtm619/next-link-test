var gulp = require('gulp');

var critical = require('critical').stream;

gulp.task('critical-css', function() {
  return gulp
    .src('out/**/*.html', { base: './' })
    .pipe(
      critical({
        base: 'out/',
        inline: true,
        css: ['out/static/css/index.css'],
        dimensions: [{ height: 1080, width: 1920 }],
        minify: true,
      })
    )
    .on('error', function(err) {
      console.error(err);
    })
    .pipe(gulp.dest('./'));
});

gulp.task('default', ['critical-css'], function() {
  process.exit(0);
});
