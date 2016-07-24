/**
 * Created by cyberd on 02.06.16.
 */

var debug = true;

var gulp        = require('gulp'),
    uglify      = require('gulp-uglify'),
    browserify  = require('browserify'),
    typescript  = require('gulp-typescript'),
    concat      = require('gulp-concat'),
    source      = require('vinyl-source-stream'),
    buffer      = require('vinyl-buffer'),
    gutil       = require('gulp-util'),
    webserver = require('gulp-webserver'),
    tsProject   = typescript.createProject( './tsconfig.json' );
    transform   = require('vinyl-transform');

var server = {
    host: '0.0.0.0',
    port: '8081'
};

// Start local webserver
gulp.task('webserver', function() {
    gulp.src( '.' )
        .pipe(webserver({
            host:             server.host,
            port:             server.port,
            livereload:       false,
            directoryListing: false
        }));
});

gulp.task('typescripten', function() {
return tsProject.src()
        .pipe(typescript(tsProject))
        .js.pipe(gulp.dest('./'));
});

gulp.task('make', ['typescripten'], function() {
    var b = browserify({
        entries: './app.js',
        debug: true
    });

    return b.bundle()
        .pipe(source('app.js'))
        .pipe(buffer())
       // .pipe(uglify())
        .on('error', gutil.log)
        .pipe(gulp.dest('./'));
});


gulp.task('debug', ['typescripten'], function() {
    var b = browserify({
        entries: 'app.js',
        debug: true
    });

    return b.bundle()
        .pipe(source('app.js'))
        .pipe(buffer())
        .on('error', gutil.log)
        .pipe(gulp.dest('./'));
});


gulp.task('watch', [(!debug) ? 'make' : 'debug'], function() {
    gulp.watch('./*.ts', [ (!debug) ? 'make' : 'debug' ]);
});


gulp.task('default', ['make']);
