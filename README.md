# Technical Test for Toutes Mes Aides

## Description

The aim is to make a chat room with live data. The server is already code, but is not online you have 
to run it on you computer. The server uses Express and Socket.io. So you don't have to make the BackEnd, but only to focus
on the FrontEnd and the design.
 
You have to create a small Application with a a connection page and a chat page with the list of the users and all the 
messages. The chat is a page where everyone can send a message to everyone (ex: general channel in slack), so no need to 
design 1 to 1 conversations.

If you want to add/change data or feature, don't hesitate to modify everything you want. And don't worry, knowing Angular is 
not a requirement, we will only look your way to do this test. So, If you don't finish the test, 
don't worry, making your best is the unique requirement


## Rules
* You have until Friday 16h to send the files compressed at nicolas.plovie@toutesmesaides.com.
* You can choose to use [Angular](https://angular.io/) or whatever you want.
* Two views : SignIn/SignUp + Chat.
 The design is up to you. Try to do your best. 
* Use the node server for connection and [Socket.io](https://socket.io), The socket will send data after authentication..


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


## With Angular
* Last version of [Angular](https://angular.io/)
* The service are already made in `/services`. You have to create the two view with the routing and to call the good functions.

## Without Angular
* Please use [Socket.io](https://socket.io) to communicate with the server.
* The socket will send data after authentication.
* Use whatever you want (framework, js Vanilla, jquery, bootstrap ect..)

## Infos

Run `npm i` in the server's folder and also in angular's folder.
 
If you want to use angular pleas install [Angular-Cli](https://cli.angular.io/)

If you find a bug don't hesitate to write me.

