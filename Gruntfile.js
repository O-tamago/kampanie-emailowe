module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        uglify: {
            my_target: {
                files: {
                    'public/js/dest/app.min.js': ['public/js/dest/built.js'],

                },
                options: {
                    mangle: false
                }
            }
        },

        watch: {
            scripts: {
                files: ['public/js/controllers/AccountCtrl.js', 'public/js/controllers/LoginCtrl.js', 'public/js/controllers/RegisterCtrl.js',
                    'public/js/appRoutes.js', 'public/js/app.js'],
                tasks: ['concat', 'uglify'],

            },
        },
        concurrent: {
            target: {
                tasks: ['watch', 'nodemon'],
                options: {
                    logConcurrentOutput: true
                },

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
        concat: {
            options: {
                separator: ';',
            },
            dist: {
                src: ['public/js/controllers/AccountCtrl.js', 'public/js/controllers/LoginCtrl.js', 'public/js/controllers/RegisterCtrl.js',
                    'public/js/appRoutes.js', 'public/js/app.js'],
                dest: 'public/js/dest/built.js',
            },
        },

    });
    // Load the plugins   

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-contrib-concat');
    // Default task(s).
    grunt.registerTask('default', ['concurrent:target']);

};