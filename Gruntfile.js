'use strict';

module.exports = function(grunt) {

  // Load Grunt tasks declared in the package.json file
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  require('time-grunt')(grunt);

  // Configure Grunt
  grunt.initConfig({

    clean: {
      begin: {
        files: [{
          dot: true,
          src: [
            'dist/*',
            '!dist/.git*'
          ]
        }]
      },
      end: {
        files: [{
          dot: true,
          src: [
            'dist/css/bootstrap.css',
            'dist/css/main.css',
            'dist/css/normalize.css',
            'dist/js/vendor',
            'dist/js/_main.js',
            'dist/js/enquire.min.js',
            'dist/js/imagesloaded.js',
            'dist/js/skrollr.js',
          ]
        }]
      }
    },
    concat: {
      dist: {
        src: [
          'js/vendor/jquery-1.9.1.min.js',
          'js/vendor/modernizr-2.7.1.min.js',
          'js/imagesloaded.js',
          'js/enquire.min.js',
          'js/skrollr.js',
          'js/_main.js'
        ],
        dest: 'dist/js/final.js'
      }
    },
    connect: {
      all: {
        options:{
          port: 9000,
          hostname: '0.0.0.0',
          middleware: function(connect, options) {
            return [
              require('grunt-contrib-livereload/lib/utils').livereloadSnippet,
              connect.static(options.base)
            ];
          }
        }
      }
    },
    copy: {
      main: {
        files: [
          {
            expand: true,
            src: ['**', '!**/node_modules/**', '!**/dist/**', '!Gruntfile.js', '!README.md', '!TODO.md', '!README'],
            dest: 'dist/'
          },
        ]
      }
    },
    cssmin: {
      combine: {
        files: {
          'dist/css/tidymin.css': ['dist/css/bootstrap.css', 'dist/css/normalize.css', 'dist/css/main.css']
        }
      }
    },
    htmlmin: {
      dist: {
        options: {
          removeComments: true,
          collapseWhitespace: true,
          useShortDoctype: true,
          minifyJS: true
        },
        files: {
          'dist/index.html': 'dist/index.html',
          'dist/mobile.html': 'dist/mobile.html'
        }
      }
    },
    imagemin: {
      dynamic: {
        files: [{
          expand: true,
          src: ['img/*.{png,jpg,gif}'],
          dest: 'dist/'
        }]
      }
    },
    open: {
      all: {
        path: 'http://localhost:<%= connect.all.options.port%>'
      }
    },
    processhtml: {
      dist: {
        files: {
          'dist/index.html': ['index.html'],
          'dist/mobile.html': ['mobile.html']
        }
      }
    },
    regarde: {
      all: {
        files:['index.html', 'mobile.html', 'css/**/*.css', 'js/**/*.js'],
        tasks: ['livereload']
      }
    },
    uglify: {
      my_target: {
        files: {
          'dist/js/final.js': ['dist/js/final.js']
        }
      }
    },
    uncss: {
      dist: {
        files: {
          'dist/css/tidymin.css': ['dist/index.html']
        }
      }
    }
  });

  // Creates the 'serve' task
  grunt.registerTask('serve',[
    'livereload-start',
    'connect',
    'open',
    'regarde'
  ]);

  // Creates the 'build' task
  grunt.registerTask('build', [
    'clean:begin',
    'copy',
    'imagemin',
    'uncss',
    'cssmin',
    'processhtml',
    'concat',
    'htmlmin',
    'clean:end'
  ]);

  // Creates the 'test' task
  grunt.registerTask('test', [

  ]);

};