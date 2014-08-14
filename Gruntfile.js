module.exports = function(grunt) {

  // Load Grunt tasks declared in the package.json file
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  // Configure Grunt
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // concat: {
    //   options: {
    //     separator: ';'
    //   },
    //   dist: {
    //     src: ['js/**/*.js'],
    //     dest: 'dist/js/<%= pkg.name %>.js'
    //   }
    // },
    imagemin: {
      dynamic: {
        files: [{
          expand: true,
          src: ['img/*.{png,jpg,gif}'],
          dest: 'dist/'
        }]
      }
    },
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            'dist/*',
            '!.git*',
            '!dist/.git*'
          ]
        }]
      }
    },
    copy: {
      main: {
        files: [
          // includes files within path and its sub-directories
          {
            expand: true,
            src: ['**', '!**/node_modules/**', '!**/dist/**'],
            dest: 'dist/'
          },
        ]
      }
    },
    cssmin: {
      combine: {
        files: {
          'dist/css/tidymin.css': ['dist/css/bootstrap.css', 'dist/css/normalize.css']
        }
      }
    },
    uncss: {
      dist: {
        files: {
          'dist/css/tidymin.css': ['dist/index.html']
        }
      }
    },
    processhtml: {
      dist: {
        files: {
          'dist/index.html': ['index.html']
        }
      }
    },
    connect: {
      all: {
        options:{
          port: 9000,
          hostname: '0.0.0.0',

          // Livereload needs connect to insert a cJavascript snippet
          // in the pages it serves. This requires using a custom connect middleware
          middleware: function(connect, options) {

            return [

              // Load the middleware provided by the livereload plugin
              // that will take care of inserting the snippet
              require('grunt-contrib-livereload/lib/utils').livereloadSnippet,

              // Serve the project folder
              connect.static(options.base)
            ];
          }
        }
      }
    },
    open: {
      all: {
        // Gets the port from the connect configuration
        path: 'http://localhost:<%= connect.all.options.port%>'
      }
    },

    regarde: {
      all: {
        // files:['index.html', '**/*.css', '**/*.js'],
        files:['index.html'],
        tasks: ['livereload']
      }
    }

  });

  // Creates the 'server' task
  grunt.registerTask('serve',[
    'livereload-start',
    'connect',
    'open',
    'regarde'
  ]);

  // Creates the 'build' task
  grunt.registerTask('build', [
    'clean:dist',
    'copy',
    'imagemin',
    'uncss',
    'cssmin',
    'processhtml',

  ]);

  // grunt.registerTask('sadie', [
  //   'cssmin'
  // ]);



};