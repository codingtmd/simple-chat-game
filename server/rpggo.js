const axios = require('axios');
//const EventSource = require('eventsource');

// Base URL and Authorization token
const baseURL = 'https://api.rpggo.ai/v2/open/game';
const authorizationToken = '';  // Replace with your real token


// Function to get details of a game
async function getGameDetails(game_id) {
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
        return response.data.data;
    } catch (error) {
        console.error('Error getting game details:', error);
        throw new Error('Error getting game details');
    }
}


// Function to start a game session
async function startGame(game_id, session_id) {
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
        return response.data;
    } catch (error) {
        console.error('Error starting game:', error);
        throw new Error('Error starting game');
    }
}

// Function to resume a game session
async function resumeSession(game_id, session_id) {
    try {
        const response = await axios.post(`${baseURL}/resumesession`, {
            game_id,
            session_id
        }, {
            headers: {
                'accept': 'application/json',
                'Authorization': authorizationToken,
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error resuming session:', error);
        throw new Error('Error resuming session');
    }
}

// Function to chat with an NPC
async function chatWithNPC(character_id, game_id, message, session_id) {
     try {
        const response = await axios.post(`${baseURL}/chatsse`, {
            character_id,
            game_id,
            message,
            message_id: generateMessageId(),
            session_id
        }, {
            headers: {
                'accept': 'application/json',
                'Authorization': authorizationToken,
                'Content-Type': 'application/json'
            }
        });
        raw_messages = response.data;
        
        parsed_msg = parseMessages(raw_messages);
        return parsed_msg
    } catch (error) {
        console.error('Error chatting with NPC:', error);
        throw new Error('Error chatting with NPC');
    }  
}

function parseMessages(raw_messages){
    data_array = raw_messages.split('\n');

    for (let i = 0; i < data_array.length; i++) {
        if (data_array[i].startsWith("data:")) {
            start_index = data_array[i].indexOf("{");
            last_index = data_array[i].lastIndexOf("}");
            sub_str = data_array[i].substring(start_index, last_index + 1);
            //console.log('sub_str:', sub_str);   
            var json_obj = JSON.parse(sub_str);
            if (json_obj.data.result.character_type == "common_npc") {
                return json_obj.data.result;
            }
        }
    }
    return "{'text': 'No NPC response'}";
}


/* // Function to chat with an NPC and stream SSE messages
function chatWithNPC(character_id, game_id, message, session_id, res) {
    let message_id= generateMessageId();
    const url = `${baseURL}/chatsse?character_id=${character_id}&game_id=${game_id}&message=${encodeURIComponent(message)}&session_id=${session_id}&message_id=${message_id}`;

    console.log('SSE URL:', url);
    const eventSource = new EventSource(url, {
        headers: {
            'Authorization': authorizationToken,
            'Content-Type': 'application/json',
        },
    });

    // Set up headers for SSE response
    res.setHeader('Connection', 'keep-alive');

    // On receiving a message
    eventSource.onmessage = (event) => {
        console.log('Received message from NPC:', event.data);
        const data = JSON.parse(event.data);
        
        // Send the message as SSE to the client
        res.write(`data: ${JSON.stringify(data)}\n\n`);

        // If the message signifies the end of the conversation
        if (data.isFinalMessage) {
            eventSource.close();
            res.end();
        }
    };

    // Handle connection errors
    eventSource.onerror = (error) => {
        console.error('Error with SSE connection:', error);
        eventSource.close();
        res.write('data: {"error": "Error with SSE connection"}\n\n');
        res.end();
    };

    // Keep the connection alive until all messages are received
    res.on('close', () => {
        eventSource.close();
        res.end();
    });
} */


// Utility function to generate a unique message ID
function generateMessageId() {
    return 'msg_' + Math.random().toString(36).substr(2, 9);
}

// Exporting functions for use in app.js
module.exports = {
    getGameDetails,
    startGame,
    resumeSession,
    chatWithNPC
};
