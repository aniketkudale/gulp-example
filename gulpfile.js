var gulp = require('gulp'),
	jshint = require('gulp-jshint'),
	gutil = require('gulp-util'),
	concat = require('gulp-concat'),
	sourcemaps = require('gulp-sourcemaps')
	sass = require('gulp-sass');
	
gulp.task('jshint', function() {
	return gulp.src('js/*.js')
			   .pipe(jshint())
			   .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('build-sass', function() {
	return gulp.src('sass/*.scss')
			   .pipe(sass())
			   .pipe(concat('style.css'))
			   .pipe(gulp.dest('dist/css'));
});
gulp.task('build-js', function() {
	return gulp.src('js/*.js')
			   .pipe(sourcemaps.init())
			   .pipe(concat('bundle.js'))
			   .pipe(gutil.env.type === 'production' ? uglify() : gutil.noop())
			   .pipe(sourcemaps.write())
			   .pipe(gulp.dest('dist/js'));
});

gulp.task('watch', function() {
	gulp.watch('test/*.js', gulp.series('jshint'));
	gulp.watch('sass/*.scss', gulp.series('build-sass'));
	gulp.watch('js/*.js', gulp.series('build-js'));
});

// create a default task and just log a message
gulp.task('default', gulp.series('watch'));
	
