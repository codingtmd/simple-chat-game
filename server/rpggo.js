const axios = require('axios');
//const EventSource = require('eventsource');

// Base URL and Authorization token
const baseURL = 'https://api.rpggo.ai/v2/open/game';
const authorizationToken = '';  // !!!!!Replace with your real token


// Utility function to generate a unique message ID
function getAuthTokken() {
    if (authorizationToken !== '') {
        return authorizationToken
    }

    return process.env.AuthToken;
}


// Function to get details of a game
async function getGameDetails(game_id) {
    try {
        const response = await axios.post(`${baseURL}/gamemetadata`, {
            game_id
        }, {
            headers: {
                'accept': 'application/json',
                'Authorization': getAuthTokken(),
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
                'Authorization': getAuthTokken(),
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
                'Authorization': getAuthTokken(),
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
        const message_id = generateMessageId();
        const response = await axios.post(`${baseURL}/chatsse`, {
            character_id,
            game_id,
            message,
            message_id,
            session_id
        }, {
            headers: {
                'accept': 'application/json',
                'Authorization': getAuthTokken(),
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
   
            var json_obj = JSON.parse(sub_str);
            if (json_obj.data.result.character_type == "common_npc") {
                return json_obj.data.result;
            }
        }
    }
    return "{'text': 'No NPC response'}";
}


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
