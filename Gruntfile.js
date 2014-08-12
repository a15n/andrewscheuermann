module.exports = function(grunt) {

  // Load Grunt tasks declared in the package.json file
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  // Configure Grunt
  grunt.initConfig({

    // copy: {
    //   dist: {
    //     cwd: 'src/',
    //     expand: true,
    //     src: '**',
    //     dest: 'dist/'
    //   }
    // },
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
    // processhtml: {
    //   dist: {
    //     files: {
    //       'dist/index.html': ['index.html']
    //     }
    //   }
    // },
    // uglify: {
    //   dist: {
    //     files: {
    //       'dist/js/compiled.min.js': ['js/vendor/*.js','js/*.js']
    //       // make sure we load jQuery first
    //     }
    //   }
    // },

    // grunt-contrib-connect will serve the files of the project
    // on specified port and hostname
    connect: {
      all: {
        options:{
          port: 9000,
          hostname: '0.0.0.0',
          // No need for keepalive anymore as watch will keep Grunt running
          //keepalive: true,

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

    // grunt-regarde monitors the files and triggers livereload
    // Surprisingly, livereload complains when you try to use grunt-contrib-watch instead of grunt-regarde
    regarde: {
      all: {
        // This'll just watch the index.html file, you could add **/*.js or **/*.css
        // to watch Javascript and CSS files too.
        files:['index.html'],
        // This configures the task that will run when the file change
        tasks: ['livereload']
      }
    }

  });

  // Creates the 'server' task
  grunt.registerTask('serve',['livereload-start', 'connect', 'open', 'regarde']);

  // Creates the 'build' task
  // grunt.registerTask('build', ['copy', 'processhtml', 'uncss', 'uglify']);
};















