//引入
var gulp = require('gulp');
var sass = require('gulp-sass');
var minCss = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var server = require('gulp-webserver');
var url = require('url');
var path = require('path');
var fs = require('fs');
var listJson = require('./mork/list.json');
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
//起服务
gulp.task('ser', function() {
    return gulp.src('src')
        .pipe(server({
            port: 9090,
            open: true,
            middleware: function(req, res, next) {
                //console.log(req)
                var pathname = url.parse(req.url).pathname;
                if (pathname === '/favicon.ico') {
                    res.end('')
                    return
                }
                if (pathname === '/api/list') {
                    var key = url.parse(req.url, true).query.key;
                    var target = [];
                    listJson.forEach(function(item) {
                        if (item.cont.match(key)) {
                            target.push(item);
                        }
                    });
                    res.end(JSON.stringify({ code: 1, data: target }))
                } else {
                    pathname = pathname === '/' ? 'index.html' : pathname;
                    res.end(fs.readFileSync(path.join(__dirname, 'src', pathname)));
                }
            }
        }))
});
//整合任务
gulp.task('dev', gulp.series('css', 'js', 'ser', 'watch'));