module.exports = function(grunt) {
  grunt.initConfig({
    jshint: {
      files: ['src/*.js']
    },
    uglify: {
      files: {
        expand: true,
        cwd: 'src/',
        src: ['*.js'],
        dest: 'build/'
      }
    },
    watch: {
      files: ['src/*.js'],
      tasks: ['uglify']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.registerTask('default', ['jshint', 'uglify']);
}
