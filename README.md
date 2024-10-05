# simple-chat-game
A simple game implementation with RPGGO Zagii Engine. So easy to make a interactive game!

![Screenshot 2024-10-02 135707](https://github.com/user-attachments/assets/44ec7d5d-8b27-43e0-9bd4-75fe03ea9241)


### 🤞 First of First
Before you start to write code, 
1. You need to fill an application form and apply an test api key from RPGGO: https://developer.rpggo.ai/dev-docs/support/apply-your-test-key
2. go to https://rpggo.ai/, pick up a game you like and send the whitelist request to dev@rpggo.ai, so that your api key can access the game data.

After that, you will have full permission to build the UI experience on top of RPGGO engine.

### 🎮 Demo
[click me](https://simple-chat-game-1089107932175.us-central1.run.app)


## ❓ How it works

![whiteboard_exported_image (2)](https://github.com/user-attachments/assets/69092864-0f96-439b-8c0e-c0cd44710aa8)


This graph tells the exact magic about how the system works. Basically, RPGGO covers the end2end pipeline from building a game to rendering a game in real time. As a game developer, all you need to do is very simple:
1. find a game you want to make it live in 2D graphic. Either, go to https://creator.rpggo.ai to build your own game if you are a good game designer, or go to https://rpggo.ai game lobby to find a game you like. Remember the game id.
2. fill an [API Key Application form](https://forms.gle/SgYbkZE2aDj38mhT9) with the Game ID you chose.
3. After you get your key, you can use rpggo.js to access the game data and integrate it with your own code, like node.js. This project is also a good example to tell how the integration code will be.

<br>


### 📂 File structure

simple-chat-game/ <br>
├── public/                # Static files (e.g., index.html) <br>
├── server/                # Backend server folder <br>
│   ├── rpggo.js           # The API Wrapper to deal with RPGGO http interface. You can reuse it if you like <br>
│   └── app.js             # Main server file <br>
├── node_modules/          # npm modules (after installation) <br>
└── package.json           # Dependencies and scripts <br>



### ⚡️ How to play in local

- install all the dependences

  ```
  npm install express axios cors
  ```

- make sure you put your api key in the right place. You need to add it in rpggo.js
  
  ![Screenshot 2024-10-02 143216](https://github.com/user-attachments/assets/1c10a743-6597-4858-a646-d12e64166998)



  or use .env file
  

  ![Screenshot 2024-10-02 143118](https://github.com/user-attachments/assets/4dd0f9d5-9a1d-46d6-aeaa-c6215a208dfd)


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

