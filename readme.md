# ChatApp by Simeon Nortey

[![N|Solid](http://simeon.symliq.com/img/simeon.png)](https://nodesource.com/products/nsolid)



ChatApp by Simeon Nortey. This application is a chat app created using react, node, express for API, MongoDB, SocketIO and Auth0 for authentication. This application shows you how SocketIO will work with React and Node.js so it is much more like a skeleton that you can build on it. Users can chat with individual users and users can block other users as well. The concept of blocking users can sometimes give you a headache but this helps you understand how you can go about it.

ChatApp Snippet by [sunil8107]


 




### Installation

Setup [Auth0] for easy authentication and add credentials to 

Create Application
- Set Application URLs : http://localhost:3000
- Allowed Logout URLs : http://localhost:3000
- Allowed Web Origins : http://localhost:3000
- Allowed Origins (CORS) : http://localhost:3000

config.json in 'client/src/config.json'
```
"REACT_APP_API_DOMAIN":"http://localhost:5000",
"AUTH0_CLIENT_ID":"*******",
"AUTH0_DOMAIN":"*******"
```

config.json in 'server/configuration.json'
```
{
    "DB_URL":"mongodb://mongo:27017/chatapp",
    "DB_PASSWORD":"",
    "PORT":5000,
    "APP_KEY":"",
    "AUTH0_CLIENT_ID":"",
    "AUTH0_DOMAIN":""
}
```

Install the dependencies and devDependencies and start the server.


```sh
install docker

$ docker-compose up
```

If you wish to set up to run the project individually thus (without docker)
```
cd ./client
npm install
npm start

cd ./server
npm install
npm start
```


View configuration files

```sh
$ touch ./client/configuration.json
$ touch ./server/configuration.json
```







License
----

MIT


**Free Software, Hell Yeah!**

[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)


   [dill]: <https://github.com/joemccann/dillinger>
   [sunil8107]: <https://bootsnipp.com/sunil8107>
   [auth0]: <https://auth0.com/signup>
   [git-repo-url]: <https://github.com/joemccann/dillinger.git>
   [john gruber]: <http://daringfireball.net>
   [df1]: <http://daringfireball.net/projects/markdown/>
   [markdown-it]: <https://github.com/markdown-it/markdown-it>
   [Ace Editor]: <http://ace.ajax.org>
   [node.js]: <http://nodejs.org>
   [Twitter Bootstrap]: <http://twitter.github.com/bootstrap/>
   [jQuery]: <http://jquery.com>
   [@tjholowaychuk]: <http://twitter.com/tjholowaychuk>
   [express]: <http://expressjs.com>
   [AngularJS]: <http://angularjs.org>
   [Gulp]: <http://gulpjs.com>
   [React Native]: https://reactnative.dev/

   [PlDb]: <https://github.com/joemccann/dillinger/tree/master/plugins/dropbox/README.md>
   [PlGh]: <https://github.com/joemccann/dillinger/tree/master/plugins/github/README.md>
   [PlGd]: <https://github.com/joemccann/dillinger/tree/master/plugins/googledrive/README.md>
   [PlOd]: <https://github.com/joemccann/dillinger/tree/master/plugins/onedrive/README.md>
   [PlMe]: <https://github.com/joemccann/dillinger/tree/master/plugins/medium/README.md>
   [PlGa]: <https://github.com/RahulHP/dillinger/blob/master/plugins/googleanalytics/README.md>
