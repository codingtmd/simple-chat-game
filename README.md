# simple-chat-game
A simple game implementation with RPGGO Zagii Engine. So easy to make a interactive game!

![Screenshot 2024-09-30 171901](https://github.com/user-attachments/assets/d801d7b8-06d7-42e1-92f9-349626b257e3)

## First of First
Before you start to write code, 
1. You need to fill an application form and apply an test api key from RPGGO: https://developer.rpggo.ai/dev-docs/support/apply-your-test-key
2. go to https://rpggo.ai/, pick up a game you like and send the whitelist request to dev@rpggo.ai, so that your api key can access the game data.

After that, you will have full permission to build the UI experience on top of RPGGO engine.

## Demo


## File structure

simple-chat-game/
├── public/                # Static files (e.g., index.html)
├── server/                # Backend server folder
│   ├── rpggo.js           # The API Wrapper to deal with RPGGO http interface. You can reuse it if you like
│   └── app.js             # Main server file
├── node_modules/          # npm modules (after installation)
└── package.json           # Dependencies and scripts



## How to play in local

- install all the dependences

```
npm install express axios cors
```

- make sure you put your api key in the right place. You need to add it in rpggo.js. 


- start the server
```
node server/app.js
```

- open the http://localhost:3000 in your broswer. Here you go!

