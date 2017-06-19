var gulp = require('gulp');
var gulpSequence = require('gulp-sequence');
var inline = require('gulp-inline');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var babel = require('gulp-babel');

gulp.task('uglify:js', function() {
	return gulp.src('dist/bundle.js')
		.pipe(babel({
			presets: ['es2015']
		}))
		.pipe(rename('bundle.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('dist/'));
});

gulp.task('inline', function() {
	return gulp.src('index.html')
		.pipe(inline({
			base: '/',
			//js: uglify,
			css: minifyCss,
		}))
		.pipe(gulp.dest('dist/'));
});

gulp.task('default', gulpSequence('uglify:js', 'inline'));