# simple-chat-game
A simple game implementation with RPGGO Zagii Engine. So easy to make a interactive game!

![Screenshot 2024-10-02 135707](https://github.com/user-attachments/assets/44ec7d5d-8b27-43e0-9bd4-75fe03ea9241)


### First of First
Before you start to write code, 
1. You need to fill an application form and apply an test api key from RPGGO: https://developer.rpggo.ai/dev-docs/support/apply-your-test-key
2. go to https://rpggo.ai/, pick up a game you like and send the whitelist request to dev@rpggo.ai, so that your api key can access the game data.

After that, you will have full permission to build the UI experience on top of RPGGO engine.

### Demo
[click me](https://simple-chat-game-1089107932175.us-central1.run.app)



### File structure

simple-chat-game/
├── public/                # Static files (e.g., index.html)
├── server/                # Backend server folder
│   ├── rpggo.js           # The API Wrapper to deal with RPGGO http interface. You can reuse it if you like
│   └── app.js             # Main server file
├── node_modules/          # npm modules (after installation)
└── package.json           # Dependencies and scripts



### How to play in local

- install all the dependences

  ```
  npm install express axios cors
  ```

- make sure you put your api key in the right place. You need to add it in rpggo.js
  
  ![Screenshot 2024-10-02 143216](https://github.com/user-attachments/assets/8285bb4f-26c4-422e-a697-fdcee0c92619)


  or use .env file
  
  ![Screenshot 2024-10-02 143118](https://github.com/user-attachments/assets/4804737d-a97b-46bc-8acb-f51cd7262fd2)


- start the server

  if you don't use .env, run
  ```
  node server/app.js
  ```

  if you does use .env, run 
  ```
  node --env-file=.env server/app.js
  ```

- open the http://localhost:3000 in your broswer. Here you go!

