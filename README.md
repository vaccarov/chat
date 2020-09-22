# Technical Test for Toutes Mes Aides

## Description

The aim is to make a chat room with live data.You have to create a small Application with a a connection page and a chat page with the list of the users and all the 
messages. The chat is a page where everyone can send a message to everyone (ex: general channel in slack), so no need to 
design 1 to 1 conversations.

If you want to add/change data or feature, don't hesitate to modify everything you want. If you don't finish the test, 
don't worry, making your best is the unique requirement


## Rules
* Use Angular 6+.
* You have one week to send the link of the github repo you used or asking pull request from a branch -> (branchName: test-[[Name]]).
* Two views : SignIn/SignUp + Chat.
 The design is up to you. Try to do your best. 
* You can choose: use the node server for connection and [Socket.io](https://socket.io), The socket will send data after authentication (take a look on Node Server doc below). Or you can use firebase 


## Node Server
* [Node](https://nodejs.org/fr/download/) version: 10.16.0 or later
* To run the server : `np run dev`
* Port: 3000
* API swagger : run the server and ask the endpoints `api-doc`
* User test: `{login:'test', password:'test', uid:'test'}`
* Cors white list : `[ 'http://localhost:4200', 'http://localhost:3001']` if you want to change it, modified it in `cors.config.js`

There is no connection with a DB, so it's fake data. If you stop and run again the server the data will be empty.
There is an auth security, you have to set Authorization with `Bearer {uid}` to access endpoints which are not `auth`
The two events for Socket.io are `'users'` and `'messages'`



## Infos

Run `npm i` in the server's folder and also in angular's folder.

If you find a bug don't hesitate to write me.

