const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(express.json());

app.use(cors());

// 启用静态文件托管，将 public 目录下的内容作为静态资源提供
app.use(express.static(path.join(__dirname, '../public')));

const baseURL = 'https://api.rpggo.ai/v2/open/game';
const authorizationToken = '';  // 这里填写你的Authorization信息

// 获取游戏详情
app.post('/getGameDetails', async (req, res) => {
  const { game_id } = req.body;

  try {
    const response = await axios.post(`${baseURL}/gamemetadata`, {
      game_id
    }, {
      headers: {
        'accept': 'application/json',
        'Authorization': authorizationToken,
        'Content-Type': 'application/json'
      }
    });

    data = response.data;

    res.json(data.data);
  } catch (error) {
    console.error('Error getting game details:', error);
    res.status(500).json({ error: 'Error getting game details' });
  }
});

// 开始游戏
app.post('/startGame', async (req, res) => {
  const { game_id, session_id } = req.body;

  try {
    const response = await axios.post(`${baseURL}/startgame`, {
      game_id,
      session_id
    }, {
      headers: {
        'accept': 'application/json',
        'Authorization': authorizationToken,
        'Content-Type': 'application/json'
      }
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error starting game:', error);
    res.status(500).json({ error: 'Error starting game' });
  }
});

// 跟NPC对话
app.post('/chatWithNPC', async (req, res) => {
  const { character_id, game_id, session_id, message } = req.body;

  try {
    message_id = generateMessageId();  // 生成唯一的message_id
    console.log('message:', message);
    const response = await axios.post(`${baseURL}/chatsse`, {
      character_id,
      game_id,
      message_id,
      session_id,
      message
    }, {
      headers: {
        'accept': 'application/json',
        'Authorization': authorizationToken,
        'Content-Type': 'application/json'
      }
    });

    console.log('NPC reply:', response.data);
    res.json({ reply: response.data.reply });
  } catch (error) {
    console.error('Error chatting with NPC:', error);
    res.status(500).json({ error: 'Error chatting with NPC' });
  }
});

// 生成唯一的 message_id 方法
function generateMessageId() {
  return 'msg_' + Math.random().toString(36).substr(2, 9);
}

// 监听端口，启动服务器
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
