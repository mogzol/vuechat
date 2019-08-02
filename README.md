# VueChat (WIP)

This is a very simple Vue/Vuex internet chat app that I am making to learn Veux and also to improve my Vue skills. It's pretty cool. It is still **very much a work in progress**.

There is a demo running at <https://vuechat.morganzolob.info/>. It *is* a public chatroom, so enter at your own risk. Please **be respectful** with what you say there, otherwise I'll have to take the demo down and that wouldn't be fun for anybody.

## Running VueChat

### The quick and easy way

The easiest way to run this is using Docker:

```
docker-compose up
```

Now the app should be running at <http://localhost:10100>. You can change the port by setting a `VUECHAT_PORT` environment variable.

### The harder way

First, enter the server folder, run `npm install`, and then run this command to start the WebSocket server

```
npm run start
```

Next, enter the client folder and run `npm install` again, and then run this command to start the Vue development server

```
npm run serve
```

Then navigate to <http://localhost:8080/> in your browser to see the app. You can open this page multiple times to log in as different users simultanously.