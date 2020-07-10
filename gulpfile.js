var gulp = require("gulp");
var plumber = require("gulp-plumber");
var sourcemap = require("gulp-sourcemaps");
var less = require("gulp-less");
var autoprefixer = require("autoprefixer");
var postcss = require("gulp-postcss");
var csso = require('gulp-csso');
var server = require("browser-sync").create();
var rename = require("gulp-rename");

gulp.task("css", function() {
return gulp.src("source/less/style.less")
.pipe(plumber())
.pipe(sourcemap.init())
.pipe(less())
.pipe(csso())
.pipe(rename("style-min.css"))
.pipe(sourcemap.write("."))
.pipe(gulp.dest("source/css"))
.pipe(server.stream());
});

gulp.task("server", function () {
server.init({
server: "source/",
notify: false,
open: true,
cors: true,
ui: false
});

gulp.watch("source/less/**/*.less", gulp.series("css"));
gulp.watch("source/*.html").on("change", server.reload);
gulp.watch("source/js/*.js").on("change", server.reload);
});

gulp.task("start", gulp.series("css", "server"));

gulp.task("refresh", function (done) {
server.reload();
done();
});