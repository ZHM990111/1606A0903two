//引入
var gulp = require('gulp');
var sass = require('gulp-sass');
var minCss = require('gulp-clean-css');
var uglify = require('gulp-uglify');
//编译scss，压缩css
gulp.task('css', function() {
    return gulp.src('./src/scss/*.scss')
        .pipe(sass())
        .pipe(minCss())
        .pipe(gulp.dest('./src/css'))
});
//监听css
gulp.task('watch', function() {
    return gulp.watch('./src/scss/*.scss', gulp.series('css'))
});

//压缩js
gulp.task('js', function() {
    return gulp.src(['./src/js/**/*.js', '!./src/js/libs/*.js'])
        .pipe(uglify())
        .pipe(gulp.dest('build'))
});