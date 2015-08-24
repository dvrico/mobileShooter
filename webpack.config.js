var webpack           = require('webpack'),
    path              = require('path'),
    ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = 
// [
{
    // Compiler ID
    name: 'development',
    
    // Makes sure errors in console map to the correct file and line number
    devtool: 'eval',

    // Define entry points
    entry: {
        // App entry point
        app: [
            // For hot style updates
            'webpack/hot/dev-server', 

            // The script refreshing the browser on none hot updates
            'webpack-dev-server/client?http://localhost:8080', 

            // Main app
            path.resolve(__dirname, 'app', 'index.js')
        ],

        // Common vendor packages
        vendor: [
            'jquery', 
            'underscore',
            'ampersand-router',
            'ampersand-view',
            'ampersand-model'
        ]
    },
    
    // Set modules output
    output: {
        path: path.resolve(__dirname, 'public', 'dist'),
        publicPath: '/dist/',
        filename: 'bundle.js'
    },
    
    // Define module loaders
    module: {
        loaders: [
            {   // ES6 Loader
                test: /\.jsx?$/, 
                exclude: /(node_modules|bower_components)/, 
                loader: 'babel?optional[]=runtime'
            },

            {   // JADE Loader
                test: /\.jade$/, 
                loader: 'jade'
            },

            {   // CSS Loader
                test: /\.css$/,  
                loader: ExtractTextPlugin.extract("style-loader", "css-loader") 
            },
            
            {   // LESS Loader
                test: /\.less$/, 
                loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader")
            },

            {   // SASS Loader
                test: /\.scss$/, 
                loader: ExtractTextPlugin.extract("style-loader", "css-loader!sass-loader")
            }
        ]
    },

    // Setting up resolution
    resolve: {
        alias: {
            'app': 'ampersand-app'
        },

        modulesDirectories: [
            'node_modules',
            'resources'
        ]
    },

    // Set up plugins
    plugins: [
        // Environment globals
        new webpack.DefinePlugin({
            ENV: JSON.stringify('development')
        }),
        
        // Define module globals
        new webpack.ProvidePlugin({
            '_': 'underscore',
            '$': 'jquery'
        }),

        // Deduplication
        new webpack.optimize.DedupePlugin(),


        // Chunk out vendor code
        new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js'),

        // Extract CSS files
        new ExtractTextPlugin("[name].css"),

        // Hot module replacement
        new webpack.HotModuleReplacementPlugin()
    ]
};
// ];