module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: '<%= pkg.name %>.js',
        dest: '<%= pkg.name %>.min.js'
      }
    },
    concat: {
        combined: {
            src: ['lib/jquery.min.js', 'lib/jquery.livequery.js', '<%= pkg.name %>.js'],
            dest: '<%= pkg.name %>-jquery.min.js'
        },
        livequery: {
            src: ['lib/jquery.livequery.js', '<%= pkg.name %>.js'],
            dest: '<%= pkg.name %>-livequery.min.js'
        }
    },
    jshint: {
      // define the files to lint
      files: ['gruntfile.js', '<%= pkg.name %>.js', 'test/*.js'],
      // configure JSHint (documented at http://www.jshint.com/docs/)
      options: {
          // more options here if you want to override JSHint defaults
        globals: {
          jQuery: true,
          console: true,
          module: true
        }
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-jshint');

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-concat');

  // Default task(s).
  grunt.registerTask('default', ['jshint', 'concat:combined', 'concat:livequery', 'uglify']);

};
