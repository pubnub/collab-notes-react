# Collaborative Stickies

A collaborative stickie notes web app demo, written for a tutorial, **Building a Collaborative Web App with PubNub, React.js, and ES6**. (Link TBD`)

In the tutorial, I am showing how to use PubNub to build a realtime collaborative web app using React.js, which lets you manipulate DOM very efficiently, and the next generation JavaScript, ES6.



![PubNub React.js demo](https://www.pubnub.com/wp-content/uploads/2016/05/stickie-app.gif "PubNub React.js app demo")


This app has the following user-flow:

1. A user logs in. (I am using `window.prompt()` as a temp "login" in this app for now)
2. As soon as the user enters a name, the app retrieves the last 50 notes, if any.
3. The user types something on the stickie pad, and hits the return key to submit.
4. The new stickie note appears along with the other notes on your browser, as well as every other browser of all users who are currently online.


## Installing Packages

Run npm init to set up your package.json file, then install these modules.

Install webpack module builder, which compiles, concatenates, minifies, and compresses static assets for front-end:

`$ npm install webpack --save-dev`

Install webpack web server to run a local server:

`$ npm install webpack-dev-server --save-dev`

Install React, React DOM, and CSS animation add-ons:

`$ npm install react react-dom react-addons-css-transition-group --save`

Install Babel to use JSX and ES6. We’re going to write with ES6 (ES 2015), which is a next generation JavaScript, with help of Babel, a compiler:

`$ sudo npm install babel-loader babel-core babel-preset-es2015 babel-preset-react --save`

Install PubNub for real-time communication:

`$ npm install pubnub --save`


## Running Webpack Dev Server

You can run your dev server with the command, 

`$ ./node_modules/.bin/webpack-dev-server`

Or you can set it up in your package.json by adding this line:

```bash
"scripts": {
  "start": "webpack-dev-server"
},
```

So that you can run the server with `npm start` command instead.

On your browser, go to http://localhost:8080/webpack-dev-server/, and you should see your application (a blank HTML page thus far) running there.