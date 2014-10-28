module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    uglify: {
      build: {
        src: ['js/libs/*.js','js/global.js'], //input
        dest: 'js/build/global.min.js' //output
      }
    },

    sass: {                              
      dist: {                            
        options: {                       
          style: 'expanded' //compressed, expanded…
        },
        files: {                         
          'css/build/style.css': 'css/style.scss',       
        }
      }
    },

    autoprefixer: {
    options: {
        browsers: ['last 2 version']
      },
      multiple_files: {
        expand: true,
        flatten: true,
        src: 'css/build/*.css',
        dest: 'css/build/prefixed/'
      }
    },

    connect: {
      server: {
        options: {
          port: 8765,
          livereload: true,
          open: true,
          base: ['./'],
          middleware: function(connect, options) {
            var middlewares;
            middlewares = [];
            middlewares.push(modRewrite(['^[^\\.]*$ /index.html [L]']));
            options.base.forEach(function(base) {
              return middlewares.push(connect["static"](base));
            });
            return middlewares;
          }
        }
      }
    },


    watch:{
       options: {
          livereload: true,
        },
        scripts: {
          files: ['js/*.js'],
          tasks: ['uglify'],
          options: {
            spawn: false,
          }
        },
        css: {
          files: ['css/*.scss'],
          tasks: ['sass', 'autoprefixer'],
          options: {
            spawn: false,
          }
        },
        images: {
          files: ['images/**/*.{png,jpg,gif}', 'images/*.{png,jpg,gif}'],
          tasks: ['imagemin'],
          options: {
            spawn: false,
          }
        },
        html:{
          files: ['./**/*.html'],
          tasks: [],
          options: {
            spawn: false
          }
        }
      },

      jshint: {
        all: ['js/*.js']
      }


  });

  // Load the tasks.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  modRewrite = require('connect-modrewrite')

  // Default task(s).
  grunt.registerTask('default', ['sass','uglify', 'jshint','autoprefixer','connect','watch']);

};