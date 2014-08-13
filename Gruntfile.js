module.exports = function(grunt) {

  // Load Grunt tasks declared in the package.json file
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  // Configure Grunt
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['js/**/*.js'],
        dest: 'dist/js/<%= pkg.name %>.js'
      }
    },
    uglify: {
      options: {
        // the banner is inserted at the top of the output
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
        }
      }
    },
    imagemin: {
      dynamic: {                         // Another target
        files: [{
          expand: true,                  // Enable dynamic expansion
          src: ['img/*.{png,jpg,gif}'],   // Actual patterns to match
          dest: 'dist/'                  // Destination path prefix
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
      minify: {
        expand: true,
        cwd: 'dist/css/',
        src: ['*.css', '!*.min.css'],
        dest: 'dist/css/',
        ext: '.min.css'
      }
    },
    // // Remove unused CSS across multiple files, compressing the final output
    // uncss: {
    //   dist: {
    //     files: [
    //       { src: '*.html', dest: 'dist/css/compiled.min.css'}
    //     ]
    //   },
    //   options: {
    //     compress:true
    //   }
    // },
    processhtml: {
      dist: {
        files: {
          'dist/index.html': ['index.html']
        }
      }
    },

    // grunt-contrib-connect will serve the files of the project
    // on specified port and hostname
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


    // grunt-open will open your browser at the project's URL
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
  grunt.registerTask('serve',['livereload-start', 'connect', 'open', 'regarde']);

  // grunt.registerTask('serve', function (target) {
  //   if (target === 'dist') {
  //     console.log('tried dist');
  //     return grunt.task.run(['build', 'express:prod', 'open', 'express-keepalive']);
  //   }
  //   grunt.task.run([
  //     'livereload-start',
  //     'connect',
  //     'open',
  //     'regarde'
  //   ]);
  // });

  // Andrew's 'build' task
  grunt.registerTask('build', [
    'clean:dist',
    'copy',
    // 'concat',
    // 'imagemin', // dis works
    'processhtml',
    'cssmin',
    // 'uncss',
    // 'uglify'
  ]);
};