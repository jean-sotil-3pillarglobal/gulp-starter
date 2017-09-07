var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var config = require('./config')();
var del = require('del');

// LESS bundle task
gulp.task('less-styles', function() {
    return gulp.src(config.dev.less)
        .pipe(plugins.concat('bundle.css'))
        .pipe(plugins.less({
            paths: [
                './node_modules/bootstrap-less',
                "./node_modules/toastr"
            ]
        }))
        .pipe(plugins.autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9'))
        .pipe(gulp.dest(config.public.styles))
        .pipe(plugins.connect.reload());
});

// JS bundle task
gulp.task('js-bundle', ['js-lint'], function() {
    return gulp.src(config.dev.js)
        .pipe(gulp.dest("./public"))
        .pipe(plugins.connect.reload());
});

// Minify JS task
gulp.task('minify-js', ['js-bundle'], function() {
    return gulp.src(config.public['bundle-js'])
        .pipe(plugins.uglify())
        .pipe(gulp.dest(config.public.js));
});

// Minify CSS task
gulp.task('minify-css', ['less-styles'], function() {
    return gulp.src(config.public['bundle-css'])
        .pipe(plugins.minifyCss({
            keepSpecialComments: 0
        }))
        .pipe(gulp.dest(config.public.styles));
});

// esLint task
gulp.task('js-lint', function() {
    return gulp.src(config.dev.js)
        .pipe(plugins.eslint())
        .pipe(plugins.eslint.format())
        .pipe(plugins.eslint.failAfterError());
});

// htmlHint task
gulp.task('html-hint', ['jade-html'], function() {
    gulp.src(config.public.html)
        .pipe(plugins.htmlhint('.htmlhintrc'))
        .pipe(plugins.htmlhint.failReporter());
});

// Jade task
gulp.task('jade-html', ['del:views'], function() {
    gulp.src(config.dev.templates)
        .pipe(plugins.jade({ pretty: true }))
        .pipe(gulp.dest(config.public.templates))
        .pipe(plugins.connect.reload());
});

// Delete views
gulp.task('del:views', function() {
    return del(config.public.templates);
});

// Image Optimization Task
gulp.task('imagemin', function() {
    gulp.src(config.dev.images)
        .pipe(plugins.imagemin())
        .pipe(gulp.dest(config.public.images));
})

// Watcher:dev
gulp.task("watch:dev", function() {
    gulp.watch(config.dev.js, ['js-bundle'])
    gulp.watch(config.dev.less, ['less-styles']);
    gulp.watch(config.dev.templates, ['jade-html']);
});

// Watcher:prod
gulp.task("watch:prod", function() {
    gulp.watch(config.dev.js, ['minify-js'])
    gulp.watch(config.dev.less, ['minify-css']);
    gulp.watch(config.dev.templates, ['jade-html']);
});

gulp.task('server', function(){
  plugins.connect.server({
    root: '.',
    livereload: true,
    port: 9001
  });
});

// Serve task
gulp.task('serve', ['less-styles', 'js-bundle', 'html-hint', 'watch:dev']);

// Serve task
gulp.task('serve:prod', ['minify-css', 'minify-js', 'html-hint', 'watch:prod']);


// Default
gulp.task('default', ['serve:prod']);