Personal Site
=========
This is [my personal site](http://andrewscheuermann.com/). I'm pretty awesome.

Primary Features
---------
* **Parallax Scrolling**: The landing page features parallax scrolling and is a visual representation of my resume and the story of how I became a software engineer. Big credit to [Petr Tichy](http://ihatetomatoes.net/simple-parallax-scrolling-tutorial/) for the parallax scrolling tutorial.
```
<!-- HTML -->
<section id="slide-7" class="homeSlide">
	<div class="bcg"
		data-top-bottom="background-position: 50% -100px;"
		data-bottom-top="background-position: 50% 100px;"
		data-anchor-target="#slide-7"
	>
  	<div class="hsContainer">
  		<div class="hsContent"
  			data-center="opacity: 1"
  			data-center-top="opacity: 0"
  			data--100-bottom="opacity: 0;"
  			data-anchor-target="#slide-7"
  		>
    		<h2>Studied at Fullstack Academy, a Javascript focused bootcamp in NYC</h2>
  		</div>
  	</div>
	</div>
</section>
-----------------------------
/* CSS */
#slide-7 h2 {
  position: fixed;
  top: 15%;
  right: 40%;
  bottom: 20%;
  left: 5%;
}
```
* **Optimized Client-Side Performance**: After initially building the site I used [Grunt](http://gruntjs.com/) and [Image Optimizer](http://www.imageoptimizer.net/Pages/Home.aspx) to reduce the page size from 14.0MB to 4.6MB **(a 67% reduction)** and decrease the load time from 6 seconds to 2.5 seconds **(a 58% reduction)**, both measurements were taken before caching and with one Heroku dyno running. Screenshots of the before and after network tabs are included below. I personally crafted my `grunt build` process and have also included that code below.
![](/README/before.png?raw=true)
![](/README/after.png?raw=true)
```
'use strict';

module.exports = function(grunt) {

  // Load Grunt tasks declared in the package.json file
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

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
          'dist/index.html': 'dist/index.html'
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
          'dist/index.html': ['index.html']
        }
      }
    },
    regarde: {
      all: {
        files:['index.html', 'css/**/*.css', 'js/**/*.js'],
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

};
```

