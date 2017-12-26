const gulp = require('gulp'),
    gulpSass = require('gulp-sass'),
    gulpPlumber = require('gulp-plumber'),
    autoprefixer = require('gulp-autoprefixer'),
    babel = require('gulp-babel');


// build scss   
gulp.task('style', () => {
    gulp.src('css/**.scss')
        .pipe(gulpPlumber())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulpSass({
            outputStyle: 'compressed'
        }))
        .pipe(gulp.dest('dist'))
});

gulp.task('build-es6', () =>
    gulp.src('es6/**.js')
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(gulp.dest('dist/es6'))
);

gulp.task('watch', () => {
    gulp.watch('css/**.scss', ['style'])
});