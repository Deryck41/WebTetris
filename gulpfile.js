const gulp = require('gulp');
const browserSync = require('browser-sync');
const sass = require('gulp-sass')(require('sass'));
const cssnano = require('gulp-cssnano');
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');


gulp.task('scss', function() { // Таск работы с "css"
	return gulp.src('app/scss/style.+(scss|sass)')
		.pipe(sass()) // Преобразуем Sass в CSS
		.pipe(sass({errLogToConsole: true}))
		.pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true })) // Добавление префиксов
		.pipe(gulp.dest('dist/css'))
		.pipe(cssnano()) // Минификация
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('app/css'))
		.pipe(gulp.dest('dist/css'))
		.pipe(browserSync.reload({stream: true}))
});

gulp.task('scripts-all', function() { // Таск для "js" (перенос)
	return gulp.src(['app/js/*.js', '!app/js/script.js'])
		.pipe(gulp.dest('dist/js'))
		.pipe(browserSync.reload({ stream: true }))
});

gulp.task('scripts-min', function() { // Таск для "js" (минификация)
	return gulp.src('app/js/script.js')
		//.pipe(uglify())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('app/js'))
		.pipe(gulp.dest('dist/js'))
		.pipe(browserSync.reload({ stream: true }))

});
 
gulp.task('html', function() { // Таск для "html"
	return gulp.src('app/*.html')
		.pipe(gulp.dest('dist/'))
		.pipe(browserSync.reload({ stream: true }))
});

gulp.task('browser-sync', function() { // Создаём таск browser-sync
	browserSync({
		server: {
			baseDir: 'dist' // Директория для сервера - app
		},
		notify: false // Отключаем уведомления
	});
});

gulp.task('img', function() {  // Обработка картинок
	return gulp.src(['app/img/*', 'app/img/*/*'])
	.pipe(imagemin([
		imagemin.gifsicle({interlaced: true}),
		imagemin.mozjpeg({quality: 75, progressive: true}),
		imagemin.optipng({optimizationLevel: 5}),
		imagemin.svgo({
			plugins: [
				{removeViewBox: true},
				{cleanupIDs: false}
			]
		})
	]))
	.pipe(gulp.dest('dist/img'))
});

gulp.task('fonts-dest', function(){
	return gulp.src('app/fonts/*')
	.pipe(gulp.dest('dist/fonts/'));
});

gulp.task('watch', function() { // Создаём таск наблюдения
	gulp.watch('app/scss/*.+(scss|sass)', gulp.parallel('scss'));
	gulp.watch('app/*.html', gulp.parallel('html'));
	gulp.watch('app/js/*.js', gulp.parallel('scripts-all'));
	gulp.watch('app/js/script.js', gulp.parallel('scripts-min'));
	gulp.watch('app/img/*', gulp.parallel('img'));
});
gulp.task('dfl', gulp.parallel('html', 'scss', 'scripts-all', 'scripts-min', 'browser-sync', 'watch', 'img'));