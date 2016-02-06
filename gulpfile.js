var gulp = require('gulp');
var assign = require('lodash.assign');
var browserify = require('browserify');
var watchify = require('watchify');
var buffer = require('vinyl-buffer');
var source = require('vinyl-source-stream');
var plugins = require('gulp-load-plugins')();
var express = require('express')

var browserifyOptions = assign({}, watchify.args, {
  entries: ['js/index.js'],
  debug: true,
  standalone: 'underlinejs'
});

var b = watchify(browserify(browserifyOptions))
  .transform('babelify', {
    presets: ['es2015']
  });

gulp.task('js', bundle);
b.on('update', bundle);
b.on('log', plugins.util.log);

function onError (err) {
  plugins.util.log('\n', plugins.util.colors.red(err), '\n');
}

function bundle () {
  return b.bundle()
    .on('error', function (err) {
      onError(err)
      this.emit('end')
    })
    .pipe(source('index.js'))
    .pipe(buffer())
    .pipe(plugins.sourcemaps.init({
      loadMaps: true
    }))
    .pipe(plugins.uglify())
    .pipe(plugins.sourcemaps.write('./'))
    .pipe(gulp.dest('build'))
    .pipe(plugins.livereload());
}

gulp.task('serve', () => {
  const app = express()

  app.use('/css', express.static(__dirname + '/css'));
  app.use('/js', express.static(__dirname + '/js'));
  app.use('/audio', express.static(__dirname + '/audio'));
  app.use(express.static(__dirname + '/'));

  app.listen(3000)
  plugins.util.log(plugins.util.colors.green('./index.html being served on localhost:3000'))
})

gulp.task('watch', function () {
  plugins.livereload.listen();
  gulp.start('serve');
  gulp.start('js');
});
