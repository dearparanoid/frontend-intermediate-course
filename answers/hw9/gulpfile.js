// 這邊就是引入各種 gulp 的 plugin，用法可以自己用關鍵字去查
var gulp = require('gulp');
var babel = require('gulp-babel');
var rename = require("gulp-rename");
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var gulpSequence = require('gulp-sequence');
var cleanCSS = require('gulp-clean-css');
var uglify = require('gulp-uglify');

// 這個是把 cool.scss compile 成 css，然後寫到 dist 這個資料夾底下
gulp.task('sass', function() {
    return gulp.src('sass/style.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('dist'));
});

// 這個是把 my-es6.js 用 babel compile，重新命名成 my.js 然後存到 dist 底下
gulp.task('babel', function() {
    return gulp.src('src/js/*.js')
        .pipe(babel())
        .pipe(rename('index.js'))
        .pipe(gulp.dest('dist'));
})

// 這個是壓縮 CSS，並且重新命名叫 cool.min.css
gulp.task('minify-css', function() {
    return gulp.src('stylesheets/*.css')
        .pipe(cleanCSS())
        .pipe(rename('style.min.css'))
        .pipe(gulp.dest('dist'));
})

// 這個是壓縮 js，重新命名成 my.min.js
// gulp.task('uglify-js', function() {
//     return gulp.src('dist/index.js')
//         .pipe(uglify())
//         .pipe(rename('index.min.js'))
//         .pipe(gulp.dest('dist'));
// })

gulp.task('scripts', function() {
    return gulp.src(['src/js/*.js', 'src/js/i18n/*.js'])
        .pipe(concat('all.js'))
        .pipe(gulp.dest('dist'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
});

// 這個是為了讓上面的任務有順序的跑
gulp.task('default', gulpSequence('sass', 'minify-css', 'scripts'));