const {series, src, dest, watch} = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat');

const autoprefixer = require('autoprefixer');
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const sourcemaps = require('gulp-sourcemaps');

const terser = require('gulp-terser-js');
const rename = require('gulp-rename');

//Compilation to Sass

//Objeto de rutas
const path = {
    scss: 'scss/**/*.scss',
    js: 'js/**/*'
}

function scss(){
    return src(path.scss)
    .pipe(sourcemaps.init())
    .pipe( sass())
    .pipe( postcss( [autoprefixer(), cssnano()]))
    .pipe( sourcemaps.write('.'))
    .pipe( rename({ suffix: '.min'}))
    .pipe( dest('./build/css'));
}

function javascript(){
    return src(path.js)
    .pipe(sourcemaps.init())
    .pipe( concat('bundle.js'))
    .pipe( terser())
    .pipe( sourcemaps.write('.'))
    .pipe( rename({ suffix: '.min'}))
    .pipe( dest('./build/js'))
}

function watchArchivos(){
    watch(path.scss, scss);
    watch(path.js, javascript);
}

exports.default = series(scss, javascript, watchArchivos);