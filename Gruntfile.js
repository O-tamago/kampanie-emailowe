module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        uglify: {
            my_target: {
                files: {
                    'public/js/dest/app.min.js': ['public/js/app.js'],
                    'public/js/dest/appRoutes.min.js': ['public/js/appRoutes.js'],
                    'public/js/dest/AccountCtrl.min.js': ['public/js/controllers/AccountCtrl.js'],
                    'public/js/dest/LoginCtrl.min.js': ['public/js/controllers/LoginCtrl.js'],
                    'public/js/dest/RegisterCtrl.min.js': ['public/js/controllers/RegisterCtrl.js']
                }
            }
        },
        nodemon: {
            dev: {
                script: 'server.js',
                env: {
                    PORT: 8080
                },
            }
        },
        watch: {
            scripts: {
                files: ['**/*.js'],
                tasks: ['nodemon'],
                options: {
                    spawn: false,
                },
            },
        },
    });
    // Load the plugin that provides the "uglify" task.    

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-nodemon');

    // Default task(s).
    grunt.registerTask('default', ['uglify', 'watch', 'nodemon']);

};