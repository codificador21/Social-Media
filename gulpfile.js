const gulp = require("gulp");
const sass = require("gulp-sass");
const cssnano = require("gulp-cssnano");
const rev = require("gulp-rev");
const uglify = require("gulp-uglify-es").default;
const imagemin = require("gulp-imagemin");
const del = require("del");

gulp.task('css',function(){
    console.log('minifying css...');
    gulp.src('./assets/sass/**/*.scss')
    .pipe(sass())
    .pipe(cssnano())
    .pipe(gulp.dest('./assets.css'))

    return gulp.src('./assets/**/*.css')
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest({
        cwd: 'public',
        merge: true
    }))
    .pipe(gulp.dest('./public/assets'));
})

  //Minified javascript
  gulp.task('js', function (done) {
      console.log("Minifying js")
    gulp.src('./assets/**/*.js')
   .pipe(uglify())
   .pipe(rev())
   .pipe(gulp.dest('./public/assets'))
   .pipe(rev.manifest({
       cwd:'public',
       merge: true
     }))
   .pipe(gulp.dest('./public/assets'));
   done();
});

//Minified images
gulp.task('images', function (done) {
    gulp.src('./assets/**/*.+(png|jpg|svg|gif|jpeg)')
    //gulp.src('./uploads/**/**/*.(png|jpg|svg|gif|jpeg)')
   .pipe(imagemin())
   .pipe(rev())
   .pipe(gulp.dest('./public/assets'))
   .pipe(rev.manifest({
       cwd:"public",
       merge:true
     }))
   .pipe(gulp.dest('./public/assets'))
   done();
});

//Whenever server will restart all old work done by gulp will be deleted and it will perform all the tasks and minificatin again
gulp.task("clean:assets" , function(done){
     del.sync("./public/assets");
     done();
});

//Run all the taks one by one 
gulp.task("build" , gulp.series("clean:assets" , "css" , "js", function(done){
    done();
}));