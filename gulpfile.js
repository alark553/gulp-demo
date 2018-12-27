var gulp = require("gulp");
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");

var paths = {
  src: "src/**/*",
  srcJS: "src/**/*.js",
  tmp: "tmp", // tmp folder
  tmpJS: "tmp/**/*.js", // js files in tmp folder
  dist: "dist",
  distJS: "dist/**/*.js"
};

gulp.task("js", function() {
  return gulp.src(paths.srcJS).pipe(gulp.dest(paths.tmp));
});

gulp.task("copy", ["js"]);
