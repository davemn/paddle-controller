module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    clean: ['index.html', 'index.css'],
    
    less: {
      site: {
        files: { 'index.css': 'less/index.less' }
      }
    },
    
    jade: {
      options: { pretty: true },
      site: {
        files: { 
          'index.html': 'index.jade'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-jade');

  // Default task(s).
  grunt.registerTask('default', ['clean', 'less', 'jade']);
};