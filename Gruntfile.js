module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),


    jshint: {
      options: {
        eqeqeq: true,
        curly: true,
        undef: false,
        unused: false
      },
      target: {
        src: ['js/app/src/**/*.js']               
      }
    },


  
    sass: {
      options: {
        precision: 5
      },
      dev: {
        options: {
          style: 'nested', // compact, compressed, nested or expanded
          lineNumbers: true
        },
        files: {
          'build/screen.css' : 'sass/screen.scss'
        }
      },
      prod: {
        options: {
          style: 'compressed', // compact, compressed, nested or expanded
          lineNumbers: true
        },
        files: {
          'build/screen.css' : 'sass/screen.scss'
        }
      }
    },


    autoprefixer: {
     options: {
        browsers: ['last 2 versions', 'ie 8', 'ie 9']
      },
      multiple_files: {
        expand: true,
        flatten: true,
        src: 'build/*.css',
        dest: 'build/'
      }
    },   


    

    // concat: {   
    //   dev: {
    //     src: ['js/vendor/jquery.bxslider.js', 'js/functions.js', 'js/plugins-init.js', 'js/main.js'],
    //     dest: 'build/main.min.js' 
    //   },   
    //   appBundle: {
    //     // old app files
    //     // src: ['js/app/plugins-init.js', 'js/app/modules/setup.js', 'js/app/modules/search.js', 'js/app/modules/histogram.js', 'js/app/modules/arriveDepart.js'],
    //     src: ['js/app/plugins-init.js'],        
    //     dest: 'build/appBundle.js'
    //   },
    //   dist: {
    //     src: ['js/app/config.js', 'build/plugins.min.js', 'build/appBundle.js'],
    //     dest: 'build/app.min.js'
    //   }
    //   // test: {
    //   //   src: ['js/app/plugins-init.js', 'js/app/modules/setup.js', 'js/app/modules/search.js', 'js/app/modules/histogram.js', 'js/app/modules/arriveDepart.js'],
    //   //   dest: 'build/testBundle.js'        
    //   // }
    // }, 





    // uglify: {
    //   // dev: {
    //   //   options: {
    //   //     beautify: true,
    //   //     mangle: false
    //   //   },
    //   //   files: {
    //   //     'build/main.min.js' : ['js/vendor/jquery.bxslider.js', 'js/functions.js', 'js/plugins-init.js', 'js/main.js'],
    //   //     // 'build/app/app.min.js' : ['js/app/plugins-init.js', 'js/app/app.js']
    //   //     'build/app/app.min.js' : ['js/app/plugins-init.js', 'build/appBundle.js']
    //   //   }
    //   // },
    //   prod: {
    //     files: {
    //       'build/main.min.js' : 'build/main.min.js',
    //       'build/app.min.js' : 'build/app.min.js'
    //     }
    //   }
    // },


    browserify: {
      options: {
        browserifyOptions: {
           debug: true
        }
      },
      
      'build/bundle.js': ['js/app/src/**/*.js'],
      
    }, 




    watch: {
      options: {
        livereload: true
      },
      css: {
        files: ['sass/**/*.scss'],
        tasks: ['sass:dev', 'autoprefixer']
      },
      js: {
        files: ['js/*.js', 'js/app/src/**/*.js', '!build/main.min.js'], // Watch for changes in JS files except for script.min.js to avoid reload loops
        tasks: ['jshint', 'browserify']
      }
    },



    browserSync: {
      dev: {
        bsFiles: {
          src: [
            'build/*.css',
            'build/*.js'
          ],
        },
        options: {
          watchTask: true,
          debugInfo: true,
          logConnections: true,
          notify: true,
          // proxy: appConfig['proxy'],          
          proxy: "localhost/portfolio",
          ghostMode: {
            scroll: true,
            links: true,
            forms: true
          }
        }
      }
    },    

  });



  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-browser-sync');
  grunt.loadNpmTasks('grunt-contrib-concat');  
  grunt.loadNpmTasks('grunt-contrib-jshint');  
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-browserify');


  grunt.registerTask('default', ['jshint', 'sass:dev', 'autoprefixer', 'browserify', 'browserSync', 'watch']);
  
  grunt.registerTask('production', ['jshint', 'sass:prod', 'uglify:prod', 'autoprefixer']);



};