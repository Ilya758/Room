let projectFolder = "dist";
let sourceFolder = "src";

let path = {
  build: {
    html: projectFolder + "/",
    css: projectFolder + "/css/",
    js: projectFolder + "/js/",
    img: projectFolder + "/img/",
    fonts: projectFolder + "/fonts/",
  },
  src: {
    html: [sourceFolder + "/pages/*.html", "!" + sourceFolder + "/pages/components/*.html"],
    css: sourceFolder + "/scss/*.scss",
    js: sourceFolder + "/js/*.js",
    img: sourceFolder + "/img/**/*.{jpg,png,svg,gif,ico,webp}",
    fonts: sourceFolder + "/fonts/*.*{ttf,woff2}",
  },
  watch: {
    html: sourceFolder + "/pages/**/*.html",
    css: sourceFolder + "/scss/**/*.scss",
    js: sourceFolder + "/js/**/*.js",
    img: sourceFolder + "/img/**/*.{jpg,png,svg,gif,ico,webp}",
    fonts: sourceFolder + "/fonts/*.*{ttf,woff2}",
  },
  clean: "./" + projectFolder + "/"
};

let {
  src,
  dest
} = require('gulp'),
  gulp = require('gulp'),
  browsersync = require('browser-sync').create(),
  //pug = require('gulp-pug'),
  del = require('del'),
  sass = require('gulp-sass'),
  autoprefixer = require('gulp-autoprefixer'),
  gcmq = require('gulp-group-css-media-queries'),
  cleanCSS = require('gulp-clean-css'),
  rename = require("gulp-rename"),
  uglify = require('gulp-uglify-es').default,
  imagemin = require('gulp-imagemin');

function browserSync() {
  browsersync.init({
    server: {
      baseDir: "./" + projectFolder + "/"
    },
    port: 3000,
    notify: false
  });
}

function html() {
  return src(path.src.html)
    /**.pipe(
      pug({
        pretty: true
      })
    ) */
    .pipe(dest(path.build.html))
    .pipe(browsersync.stream());
}

function css() {
  return src(path.src.css)
    .pipe(
      sass({
        outputStyle: "expanded"
      })
    )
    .pipe(gcmq())
    .pipe(
      autoprefixer({
        overrideBrowserslist: ["last 5 versions"],
        cascade: true
      })
    )
    .pipe(dest(path.build.css))
    .pipe(cleanCSS())
    .pipe(
      rename({
        extname: ".min.css"
      })
    )
    .pipe(dest(path.build.css))
    .pipe(browsersync.stream());
}

function js() {
  return src(path.src.js)
    .pipe(dest(path.build.js))
    .pipe(uglify())
    .pipe(
      rename({
        extname: ".min.js"
      })
    )
    .pipe(dest(path.build.js))
    .pipe(browsersync.stream());
}

function images() {
  return src(path.src.img)
    .pipe(
      imagemin({
        progressive: 'true',
        svgoPlugins: [{ removeViewBox: false }],
        interlaced: true,
        optimizationLevel: 4
      })
    )
    .pipe(dest(path.build.img))
    .pipe(browsersync.stream());
}

function fonts() {
  return src(path.src.fonts)
    .pipe(dest(path.build.fonts))
  //.pipe(browsersync.stream());
}

function watchFiles() {
  gulp.watch([path.watch.html], html);
  gulp.watch([path.watch.css], css);
  gulp.watch([path.watch.js], js);
  gulp.watch([path.watch.img], images);
  gulp.watch([path.watch.fonts], fonts);
}

function clean() {
  return del(path.clean);
}

let build = gulp.series(clean, gulp.parallel(js, css, html, images, fonts));
let watch = gulp.parallel(build, watchFiles, browserSync);

exports.images = images;
exports.js = js;
exports.css = css;
exports.html = html;
exports.fonts = fonts;
exports.build = build;
exports.watch = watch;
exports.default = watch;