var gulp = require("gulp");
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
var replace = require("gulp-replace-task");
var args = require("yargs").argv;
var fs = require("fs");
var runSequence = require("run-sequence");
var gulpif = require("gulp-if");

var paths = {
  src: "src/**/*",
  srcJS: "src/**/*.js",
  tmp: "tmp", // tmp folder
  tmpJS: "tmp/**/*.js", // js files in tmp folder
  dist: "dist",
  distJS: "dist/**/*.js"
};

var env = args.env || "dev";

gulp.task("setEnv", function() {
  var filename = "env.config." + env + ".json";
  console.log("filename ", filename);
  var settings = JSON.parse(fs.readFileSync("src/" + filename, "utf8"));
  console.log("settings ", settings);

  gulp
    .src("apiConfig/app.js")
    .pipe(
      replace({
        patterns: [
          {
            match: "apiDomain",
            replacement: settings.apiDomain
          },
          {
            match: "elasticApi",
            replacement: settings.elasticApi
          },
        ]
      })
    )
    .pipe(gulp.dest("src/scripts/./"));
});

gulp.task("js", function() {
  return gulp
    .src(paths.srcJS)
    .pipe(concat("script.min.js"))
    .pipe(gulpif(args.env !== "dev", uglify()))
    .pipe(gulp.dest(paths.dist));
});

gulp.task("default", function() {
  runSequence("setEnv", "js");
});
