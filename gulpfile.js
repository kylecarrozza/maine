const {series, watch, src, dest, parallel} = require('gulp');
const log = require('fancy-log')
const gulp = require('gulp')
const pump = require('pump')
const postcss = require('gulp-postcss');
const gulpSass = require('gulp-sass')(require('sass'));
const zip = require('gulp-zip');
const gulpMinify = require('gulp-minify');
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');
const concat = require("gulp-concat");
const browserSync = require('browser-sync').create()

const handleError = (done) => {
    return function (err) {
        if (err) {
            beeper();
        }
        return done(err);
    };
};

const minify = () =>
    gulp.src([
        'node_modules/jquery/dist/jquery.min.js', 
        'node_modules/jquery-validation/dist/jquery.validate.min.js',
        './assets/js/main.js'
    ])
        .pipe(concat("main.js"))
        .pipe(gulpMinify({ext:{min:'.min.js' }, mangle: true}))
        .pipe(gulp.dest('./assets/built/'))

const sass = () =>
    gulp.src('./assets/scss/main.scss')
        .on('error', log.error)
        .pipe(gulpSass())
        .pipe(postcss([require('tailwindcss'), require('autoprefixer')]))
        .pipe(cleanCSS())
        .pipe(rename('main.min.css'))
        .pipe(gulp.dest('./assets/built'))
        .pipe(browserSync.stream())

const devel = () => {
    gulp.watch('./assets/scss/*.scss', sass)
    gulp.watch('./assets/js/main.js', minify)
    gulp.watch(['*.html','*/*.html','*/*/*.html'], sass)
}

function zipper(done) {
    const targetDir = 'dist/';
    const themeName = require('./package.json').name;
    const filename = themeName + '.zip';

    pump([
        src([
            '**',
            '!node_modules', '!node_modules/**',
            '!dist', '!dist/**'
        ]),
        zip(filename),
        dest(targetDir)
    ], handleError(done));
}

exports.sass = sass
exports.css = gulp.series(sass)
exports.devel = gulp.parallel(devel)
exports.build = gulp.series(gulp.parallel(exports.css, minify))
exports.zip = gulp.series(exports.build, zipper);
exports.default = exports.build