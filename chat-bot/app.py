import openai
from flask import Flask, request, jsonify

app = Flask(__name__)

# Set your OpenAI API key
openai.api_key = "your_openai_api_key_here"

# Persistent chat history
chat_history = [{"role": "system", "content": "You are a helpful, friendly chatbot."}]

@app.route('/chat', methods=['POST'])
def chat():
    user_message = request.json.get('message', '')
    
    # Add the user's message to chat history
    chat_history.append({"role": "user", "content": user_message})
    
    try:
        # Call GPT-4 API
        response = openai.ChatCompletion.create(
            model="gpt-4",
            messages=chat_history,
            max_tokens=150,
            temperature=0.7,
        )
        bot_reply = response['choices'][0]['message']['content']
        
        # Add the bot's reply to chat history
        chat_history.append({"role": "assistant", "content": bot_reply})
        
        return jsonify({'response': bot_reply})
    except Exception as e:
        return jsonify({'response': f"An error occurred: {str(e)}"})

if __name__ == '__main__':
    app.run(debug=True)
