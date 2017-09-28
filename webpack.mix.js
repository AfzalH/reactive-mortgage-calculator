let mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.webpackConfig({
    externals: {
        "react": "React",
        "react-dom": "ReactDOM",
        "moment": "moment"
    }
});

mix.react('assets/admin/js/app.jsx', 'admin/resources')
    .react('assets/site/js/app.jsx', 'site/resources')
    .sass('assets/admin/sass/app.scss', 'admin/resources')
    .sass('assets/site/sass/app.scss', 'site/resources')
    .sass('assets/lib/srizon-materialize/sass/materialize.scss', 'admin/resources')
    .sass('assets/lib/srizon-materialize-site/sass/materialize.scss', 'site/resources')
    .copy('assets/lib/c3/d3.min.js', 'site/resources/d3.min.js')
    .copy('assets/lib/c3/c3.min.css', 'site/resources/c3.min.css')
    .copy('assets/lib/c3/c3.min.js', 'site/resources/c3.min.js')
    .copy('assets/lib/moment/moment.min.js', 'site/resources/moment.min.js')
    .copy('assets/lib/react/react.min.js', 'site/resources/react.min.js')
    .copy('assets/lib/react/react-dom.min.js', 'site/resources/react-dom.min.js')
    .copy('assets/lib/srizon-materialize/js/bin/materialize.min.js', 'site/resources/materialize.js');
