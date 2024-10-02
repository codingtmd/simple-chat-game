const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path');
const rpggo = require('./rpggo');

const app = express();
app.use(express.json());
app.use(cors());

// Enable serving static files
app.use(express.static(path.join(__dirname, '../public')));

// 获取游戏详情
app.post('/getGameDetails', async (req, res) => {
  const { game_id } = req.body;

  try {
    const gameData = await rpggo.getGameDetails(game_id);
    res.json(gameData);
  } catch (error) {
    console.error('Error getting game details:', error);
    res.status(500).json({ error: 'Error getting game details' });
  }
});

// Start Game
app.post('/startGame', async (req, res) => {
  const { game_id, session_id } = req.body;

  try {
    const startGameData = await rpggo.startGame(game_id, session_id);
    res.json(startGameData);
  } catch (error) {
    console.error('Error starting game:', error);
    res.status(500).json({ error: 'Error starting game' });
  }
});

/* // Chat with NPC
app.post('/chatWithNPC', async (req, res) => {
  const { character_id, game_id, session_id, message } = req.body;

  try {
    const chatData = await rpggo.chatWithNPC(character_id, game_id, message, session_id);
    console.log('NPC reply:', response.data);
    res.json(chatData);

  } catch (error) {
    console.error('Error chatting with NPC:', error);
    res.status(500).json({ error: 'Error chatting with NPC' });
  }
}); */

// Chat with NPC using SSE Endpoint
app.post('/chatWithNPC', async (req, res) => {
  const { character_id, game_id, message, session_id } = req.body;
  console.log('Chat with NPC:', req.body);
  
  try {
    const chatData = await rpggo.chatWithNPC(character_id, game_id, message, session_id);
    console.log('NPC reply:', chatData);
    res.json(chatData);

  } catch (error) {
    console.error('Error chatting with NPC:', error);
    res.status(500).json({ error: 'Error chatting with NPC' });
  }
  // rpggo.chatWithNPC(character_id, game_id, message, session_id, res);  // Pass the response object to handle SSE
});

// Resume session API
app.post('/resumeSession', async (req, res) => {
  const { game_id, session_id } = req.body;

  try {
    const resumeData = await rpggo.resumeSession(game_id, session_id);
    res.json(resumeData);
  } catch (error) {
    console.error('Error resuming session:', error);
    res.status(500).json({ error: 'Error resuming session' });
  }
});


// 监听端口，启动服务器
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
