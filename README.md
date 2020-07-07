#Evaluate a News Article with Natural Language Processing
 We will build a web tool that allows users to run Natural Language Processing (NLP) on articles or blogs found on other websites. NLP is the ability of an application to understand the human language, written or oral.
- NLP is a subset of AI that provides computers ability to process or interact with natural human speech. In NLP, machine learning and deep learning are used on massive amounts of data to obtain the rules and understanding of nuance in human speech.

### Following are the project prerequisites: 
- Webserver - Node
- Web application framework for routing - Express
- Build tool - Webpack. Using webpack, we will set up the - app to have dev and prod environments, each with their  own set of tools and commands.
- External script - Service Worker
- External API - Aylien

### Getting Started - Setting up the Project:
npm install

### we installed the following loaders and plugins so far:

## Webpack:
   [http://https://webpack.js.org/](http://https://webpack.js.org/)

webpack is a static module bundler for modern JavaScript applications.
Webpack takes all the assets “bundles” or combines them into fewer files that are much easier to manage.

### Install Webpack 

1- npm install

--git checkout 1-install-webpack
  git branch
  
2- npm i webpack webpack-cli 

3- In package.json file be sure the follow is exist:-
   
"dependencies": {
 "express": "^4.17.1",
 "webpack": "^4.43.0",
 "webpack-cli": "^3.3.11"
},

4- In package.json, add a build npm script as:

"scripts": {
"build": "webpack"
},

"devDependencies":{
  "webpack-dev-server": "^3.11.0",
},

5- Create a webpack.config.js file in the root location of your project
   and add the necessary require statements, and a blank module.exports code as:
 
const path = require("path")
const webpack = require("webpack")
module.exports = {
}


6- npm run build

##Loader
[http://https://webpack.js.org/concepts/loaders/](http://https://webpack.js.org/concepts/loaders/)

Webpack only understands JavaScript and JSON files. Loaders allow webpack to process other types of files and convert them into valid modules that can be consumed by your application.

Allow us to transform files of one type into another type so that webpack can work with them.

### install Loader Babel
 

-1- npm i -D @babel/core @babel/preset-env babel-loader

-2- Create a new file .babelrc and add the follow  configration line:-
   { ‘presets’: ['@babel/preset-env'] }
   

##Plugins
[http://webpack.js.org/concepts/plugins/](http://webpack.js.org/concepts/plugins/)

While loaders are used to transform certain types of modules, plugins can be leveraged to perform a wider range of tasks like bundle optimization, asset management and injection of environment variables.

Plugins can do all sorts of things, from automatically adding asset references to an html file to allowing for hot module replacement - which is used in React’s Create React App to create an auto updating development server

### install Plugin 

1- npm i -D html-webpack-plugin

2- in the webpack-config.js add this :
   const HtmlWebPackPlugin = require("html-webpack-plugin")
   
----then also add to webpack-config.js  in module the follow line:
   - plugins:[
      new HtmlWebPackPlugin({
	      template:"./src/client/views/index.html",
		  filename:"./index.html",
	        })
          ]
3- update the server file to change the home route to use the index file from dist:
    - app.get('/', function(req,res) {
       res.sendFile('dist/index.html')
      })

-- then update the asset file from :
   - app.use(express.static('src/client'))
        TO
   - app.use(express.static('dist'))	  

##Mode
[http://webpack.js.org/configuration/mode/](http://webpack.js.org/configuration/mode/)


#### Prepare the Mode 
	
1- Create a copy of the webpack.config.js, and rename it as webpack.prod.js.
 This file should have mode: 'production' statement in module.exports.
 
2- Now, rename the webpack.config.js to webpack.dev.js.
 This file should have the following statements in module.exports

3- The statements added to the package.json for the configuration files of production and development 
 modes separately in the "script" block are:
 
"scripts": {
    "build-prod": "webpack --config webpack.prod.js",
    "build-dev": "webpack-dev-server  --config webpack.dev.js --open"
},


#### -->Convenience in Webpack

1- npm i -D webpack-dev-server

2- in the webpack-dev file:
  webpack-dev-server --config webpack.dev.js --open
  
#####3- clean webpack plugin :
   this plugin will remove all files inside webpack's output.path directory, as well as all unused webpack assets after every successful rebuild.

  npm i -D clean-webpack-plugin
 
4- in the webpack config add the follow:
const {CleanWebpackPlugin}=require('clean-webpack-plugin');
 
5- Add the plugin to Plugins array in the module.exports:-
     new CleanWebpackPlugin()
	 
OR
 new CleanWebpackPlugin({
                // Simulate the removal of files
                dry: true,
                // Write Logs to Console
                verbose: true,
                // Automatically remove all unused webpack assets on rebuild
                cleanStaleWebpackAssets: true,
                protectWebpackAssets: false
        })
		

###Sass 
Sass - it's a CSS extension language. Sass provides an extra set of CSS language syntax that helps writing more efficient styles

1- npm i -D style-loader node-sass css-loader sass-loader
  --->>>Babel loader is optional to be install
  --npm i -D @babel/core @babel/preset-env babel-loader

2- add this test case to the rules array in your dev webpack config.:
  {
        test: /\.scss$/,
        use: [ 'style-loader', 'css-loader', 'sass-loader' ]
}

3- 	  let’s go to client/index.js and add the follow:
import './styles/resets.scss'
import './styles/base.scss'
import './styles/footer.scss'
import './styles/form.scss'
import './styles/heaer.scss'

4-npm run build-dev  and npm run start


### Set up Production Configuration for Webpack 

#### 1-In packages.json append the following new entries in "devDependencies":

"mini-css-extract-plugin": "^0.9.0",
"terser-webpack-plugin": "^1.3.0",
"optimize-css-assets-webpack-plugin": "^5.0.3",

#### Updated the rule section for Sass file loaders:
{
test: /\.scss$/,
use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
}, 

####Instantiate the new plugin in the plugin list:

new MiniCssExtractPlugin({ filename: "[name].css" })
On the terminal, run the following commands:

npm i -D mini-css-extract-plugin
npm i -D optimize-css-assets-webpack-plugin terser-webpack-plugin
npm run build-prod



 ### Service Workers

####In webpack.prod.js config file,

-->>Require the plugin, by appending the new plugin statement

const WorkboxPlugin = require('workbox-webpack-plugin');

-->>Instantiate the new plugin in the plugin list:

new WorkboxPlugin.GenerateSW()

-->>On the terminal, install the plugin using

 npm install workbox-webpack-plugin --save-dev

-->we will add a script to our /src/client/views/index.html

<script>
 // Check that service workers are supported
 if ('serviceWorker' in navigator) {
     // Use the window load event to keep the page load performant
     window.addEventListener('load', () => {
         navigator.serviceWorker.register('/service-worker.js');
     });
 }
</script>


#Setting up the Aylien API

###1-Signup for an API key

[https://developer.aylien.com/](https://developer.aylien.com/)

###  2: Install the SDK 
[https://docs.aylien.com/textapi/sdks/#node-js-sdk](https://docs.aylien.com/textapi/sdks/#node-js-sdk)
### 3: Require the SDK package
Your server/index.js file must have these things:

var aylien = require("aylien_textapi"); 

### 4: Environment Variables
 in server/index.js, you need to declare your API credentials, which will look something like this:

var textapi = new aylien({
  application_id: "your-api-id",
  application_key: "your-key"
});

#####Follow the steps below to configure environment variables:

Use npm to install the dotenv package - npm install dotenv This will allow us to use environment variables we set in a new file
Create a new .env file in the root of your project.
Fill the .env file with your API keys like this:

API_ID=**************************

API_KEY=**************************

#####Add this code to the very top of your server/index.js file:

const dotenv = require('dotenv');

dotenv.config();

#####In server/index.js, your updated API credential settings should look like this:

var textapi = new aylien({
   application_id: process.env.API_ID,
   application_key: process.env.API_KEY
});

#Jest Framework
[https://jestjs.io/](https://jestjs.io/)

Jest is a framework for testing JavaScript projects.

###How does it work?

Install Jest by using npm install --save-dev jest