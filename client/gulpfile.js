var gulp = require('gulp');
var sass = require('gulp-sass');
var cleanCss = require('gulp-clean-css');
var rename = require('gulp-rename');
var inject = require('gulp-inject');
//var babel = require("gulp-babel");
//var plumber = require("gulp-plumber");

var paths = {
  sass: ['./src/app/**/*.scss'],
};

gulp.task('default', ['sass']);

gulp.task('sass', function(done) {
  var scss =  gulp.src('./src/assets/styles/index.scss')

  scss
  .pipe(sass())
  .on('error', sass.logError)
  .pipe(gulp.dest('./src/assets/styles'))
  .pipe(cleanCss({keepSpecialComments: 0}))
  .pipe(rename({ extname: '.min.css' }))
  .pipe(gulp.dest('./src/assets/styles'))
  .on('end', done);
});

// adds all scss stylesheets to components.scss
gulp.task('loadSass', function(){
  var sass =  gulp.src(paths.sass, {read: false})
 
  var sassOptions = {
    addRootSlash: false,
    addPrefix: '.',
    transform: function (filepath) {
      return '@import "' + filepath + '";';
    }
  }

  gulp.src('./src/assets/styles/_components.scss')
  .pipe(inject(sass, sassOptions))
  .pipe(gulp.dest('./src/assets/styles/'))

})

// adds all JS files to index.html 
// modules first, then other files
// gulp.task('loadJs', function(){
//   var modules = gulp.src(paths.modules, {read: false})
//   var js = gulp.src(paths.js, {read: false})
//   var index = gulp.src(paths.index)

//   var modulesOptions = {
//     name: 'modules',
//     relative: true,
//   }

//   var jsOptions = {
//     relative: true,
//     transform: function (filepath) {
//       // ignore app and modules because we loaded these first
//       if ( filepath.slice(-6) === 'app.js' ||  filepath.slice(-9) === 'module.js' ){
//         return
//       }
//       return inject.transform.apply(inject.transform, arguments);
//     }
//   }

//   index
//   .pipe(inject(modules, modulesOptions))
//   .pipe(gulp.dest('./www/'))
//   .pipe(inject(js, jsOptions))
//   .pipe(gulp.dest('./www/'))

// })

gulp.task('loadFiles', ['loadSass', 'loadJs'])

gulp.task('watch', ['sass'], function() {

  gulp.watch([paths.sass], ['sass']);

});