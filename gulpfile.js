var gulp = require('gulp');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var jsFiles = ['*.js', 'server/**/*.js'];
var nodemon = require('gulp-nodemon');
var uglify = require('gulp-uglify');
var cssnano = require('gulp-cssnano');


gulp.task('style', function () {
    return gulp.src(jsFiles).
    pipe(jshint()).
    pipe(jshint.reporter('jshint-stylish', {
        vebose: true
    })).pipe(jscs());
});


gulp.task('default' , function(){
    gulp.src('./client/controllers/*.js').
    pipe(uglify()).pipe(gulp.dest('./client/controllers/minijs/'));


    gulp.src('./client/services/*.js').
    pipe(uglify()).pipe(gulp.dest('./client/services/minijs/'));


    gulp.src('./client/directives/*.js').
    pipe(uglify()).pipe(gulp.dest('./client/directives/minijs/'));

    gulp.src('./client/routing.js').
    pipe(uglify()).pipe(gulp.dest('./client/minijs/'));

    gulp.src('./client/vr/PhotoSphereViewer/src/*.js').
    pipe(uglify()).pipe(gulp.dest('./client/vr/PhotoSphereViewer/src/minijs/'));


    gulp.src('./client/vr/valiant360/jquery.valiant360.js').
    pipe(uglify()).pipe(gulp.dest('./client/vr/valiant360/minijs/jquery.valiant360.js'));

    return gulp.src('./client/styles/*.css')
        .pipe(cssnano())
        .pipe(gulp.dest('./client/styles/min'));


})

gulp.task('serve', ['style'], function () {
    var options = {
        script: 'app.js',
        delayTime: 1,
        env: {
            'PORT': 3000
        },
        watch: jsFiles
    };
    return nodemon(options).on('restart', function () {
        console.log('restarting');
    });
});
