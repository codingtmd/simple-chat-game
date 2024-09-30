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
    res.json({ reply: response.data });
  } catch (error) {
    console.error('Error chatting with NPC:', error);
    res.status(500).json({ error: 'Error chatting with NPC' });
  }
}); 
/* app.get('/chatWithNPC', (req, res) => {
    console.log('chatWithNPC:', req.query);
    const { character_id, game_id, session_id, message } = req.query;
  
    // Set headers for SSE
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
  
    // Function to send SSE messages
    const sendSSE = (data) => {
      res.write(`${JSON.stringify(data)}\n\n`);
    };
  
    // Simulate a delay and continuous message flow (this would come from your API in real use case)
    const sendMessages = async () => {
      try {
        message_id = generateMessageId();
        // First, send the user's message to the API
        const response = await axios.post(`${baseURL}/chatsse`, {
          character_id,
          game_id,
          message,
          message_id,
          session_id
        }, {
          headers: {
            'accept': 'application/json',
            'Authorization': authorizationToken,
            'Content-Type': 'application/json'
          }
        });
  
        // Send the response from the API
        sendSSE(response.data);
  
        // Simulate another message (could be an additional NPC response or event)
        setTimeout(() => {
          sendSSE({ reply: "Another NPC message!" });
        }, 3000); // Simulate delay
      } catch (error) {
        console.error('Error chatting with NPC:', error);
        res.write('data: {"error": "Error occurred while chatting with NPC"}\n\n');
        res.end();
      }
    };
  
    // Start sending messages
    sendMessages();
  
    // Keep the connection alive for multiple messages
    req.on('close', () => {
      res.end();
    });
  }); */

// Resume session API
app.post('/resumeSession', async (req, res) => {
    const { game_id, session_id } = req.body;
  
    try {
      const response = await axios.post(`${baseURL}/resumesession`, {
        game_id,
        session_id
      }, {
        headers: {
          'accept': 'application/json',
          'Authorization': authorizationToken, // Replace with your actual authorization
          'Content-Type': 'application/json'
        }
      });
      res.json(response.data); // Return the resume session data back to the client
    } catch (error) {
      console.error('Error resuming session:', error);
      res.status(500).json({ error: 'Error resuming session' });
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
