module.exports = function (grunt) {

    build_dir = 'dist';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        config: {
            dev: {
                options: {
                    variables: {
                        'env': 'dev',
                        'build': ''
                    }
                }
            },
            prod: {
                options: {
                    variables: {
                        'env': 'prod',
                        'build': '--prod --build-optimizer'
                    }
                }
            }
        },
        clean: ["dist",],
        run: {
            options: {
                

            },
            build: {
                exec: 'ng build --base-href=. <%= grunt.config.get("build")%>'
            }
        },
        //compress: {
        //    main: {
        //        options: {
        //            archive: 'xim-<%= pkg.version %>.zip'
        //        },
        //        files: [
        //            { expand: true, cwd: 'dist/', src: ['**'], dest: '/default/' },
        //            { src: ['MANIFEST.MF'], dest: '/META-INF/' }
        //        ]
        //    }
        //},
        war: {
            target: {
                options: {
                    war_verbose: true,
                    war_dist_folder: '<%= build_dir %>',
                    war_name: '<%= pkg.name %>',         
                    webxml_welcome: 'index.html',
                    webxml_display_name: '<%= pkg.name %>'
                },
                files: [
                    {
                        expand: true,
                        cwd: '<%= build_dir %>/union-bpm-app',
                        src: ['**'],
                        dest: ''
                    }
                ]
            }
        }
        //nexusDeployer: {
        //    release: {
        //        options: {
        //            groupId: "br.com.union.bpm",
        //            artifactId: "usm-app",
        //            version: "<%= pkg.version %>",
        //            packaging: 'zip',
        //            auth: {
        //                username: 'ci_user',
        //                password: 'ngBu1ldr'
        //            },
        //            pomDir: 'dist/pom',
        //            url: 'https://<server>/nexus/content/repositories/<%= pkg.version.endsWith("SNAPSHOT") ? "snapshots" : "releases"%>',
        //            artifact: 'usm-app-<%= pkg.version %>.zip',
        //            noproxy: 'localhost',
        //            cwd: '',
        //            parallel: false,
        //            quiet: true
        //        }
        //    }
        //}
    });

    grunt.loadNpmTasks('grunt-run');

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-config');
    grunt.loadNpmTasks('grunt-war');
    //grunt.loadNpmTasks('grunt-nexus-deployer');

    // Default task(s).
    //grunt.registerTask('default', ['clean', 'config:dev', 'run:build', 'compress']);
    grunt.registerTask('default', ['clean', 'config:dev', 'run:build', 'war']);
    grunt.registerTask('prod', ['clean', 'config:prod', 'run:build', 'war']);

};


