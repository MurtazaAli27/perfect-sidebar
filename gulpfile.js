const gulp = require("gulp");
const autoprefixer = require("gulp-autoprefixer");
const browserSync = require("browser-sync").create();
const reload = browserSync.reload;
const sass = require("gulp-sass");
const cleanCSS = require("gulp-clean-css");
const sourcemaps = require("gulp-sourcemaps");
const concat = require("gulp-concat");
const imagemin = require("gulp-imagemin");
const changed = require("gulp-changed");
const uglify = require("gulp-uglify");
const lineec = require("gulp-line-ending-corrector");

function css() {
	return gulp
		.src("./src/scss/**/*.scss")
		.pipe(sourcemaps.init({ loadMaps: true }))
		.pipe(sass().on("error", sass.logError))
		.pipe(autoprefixer("last 2 versions"))
		.pipe(sourcemaps.write())
		.pipe(lineec())
		.pipe(gulp.dest("./src/styles"));
}

function concatCSS() {
	return gulp
		.src("./src/styles/**/*.css")
		.pipe(sourcemaps.init({ loadMaps: true, largeFile: true }))
		.pipe(concat("style.min.css"))
		.pipe(cleanCSS())
		.pipe(sourcemaps.write("./maps/"))
		.pipe(lineec())
		.pipe(gulp.dest("./src/css"));
}

function javascript() {
	return gulp.src("./src/scripts/**/*.js").pipe(concat("app.min.js")).pipe(uglify()).pipe(lineec()).pipe(gulp.dest("./src/js"));
}

function watch() {
	browserSync.init({
		server: {
			baseDir: "./",
		},
	});
	gulp.watch("./src/scss/**/*.scss", gulp.series([css, concatCSS]));
	gulp.watch("./src/scripts/**/*.js", javascript);
	gulp.watch(["./*.html", "./src/js/app.min.js", "./src/css/style.min.css"]).on("change", browserSync.reload);
}

exports.css = css;
exports.concatCSS = concatCSS;
exports.javascript = javascript;
exports.watch = watch;
var build = gulp.parallel(watch);
gulp.task("default", build);
