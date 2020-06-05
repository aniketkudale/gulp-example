var gulp = require('gulp'),
	jshint = require('gulp-jshint'),
	gutil = require('gulp-util'),
	concat = require('gulp-concat'),
	sourcemaps = require('gulp-sourcemaps')
	sass = require('gulp-sass');

//Task for jsHint	
gulp.task('jshint', function() {
	return gulp.src('js/*.js')
			   .pipe(jshint())
			   .pipe(jshint.reporter('jshint-stylish'));
});

//Task to convert SASS to CSS
gulp.task('build-sass', function() {
	return gulp.src('sass/*.scss')
			   .pipe(sass())
			   .pipe(concat('style.css'))
			   .pipe(gulp.dest('dist/css'));
});

//Task to create bundle.js
gulp.task('build-js', function() {
	return gulp.src('js/*.js')
			   .pipe(sourcemaps.init())
			   .pipe(concat('bundle.js'))
			   .pipe(gutil.env.type === 'production' ? uglify() : gutil.noop())
			   .pipe(sourcemaps.write())
			   .pipe(gulp.dest('dist/js'));
});

//Watch for changes
gulp.task('watch', function() {
	gulp.watch('test/*.js', gulp.series('jshint'));
	gulp.watch('sass/*.scss', gulp.series('build-sass'));
	gulp.watch('js/*.js', gulp.series('build-js'));
});

// create a default task for watch
gulp.task('default', gulp.series('watch'));
	
