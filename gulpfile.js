const gulp = require('gulp'),
    gulpSass = require('gulp-sass'),
    gulpPlumber = require('gulp-plumber');


// build scss   
gulp.task('style', () => {
    gulp.src('css/**.scss')
        .pipe(gulpPlumber())
        .pipe(gulpSass({
            outputStyle: 'compressed'
        }))
        .pipe(gulp.dest('dist'))
});

gulp.task('watch', () => {
    gulp.watch('css/**.scss', ['style'])
});