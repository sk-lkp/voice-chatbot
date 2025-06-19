# Voice Bot - AI Assistant

A modern voice-enabled chatbot that uses ChatGPT's API to respond to questions with a personalized AI assistant personality. Features speech recognition, AI-powered responses, and text-to-speech capabilities.

## Features

✅ **Speech Recognition** - Convert voice to text using browser's Web Speech API  
✅ **AI-Powered Responses** - Powered by OpenAI's ChatGPT API  
✅ **Text-to-Speech** - Hear responses spoken back to you  
✅ **Modern UI** - Beautiful, responsive web interface  
✅ **Easy Setup** - Simple installation and configuration  

## Demo Questions

The voice bot is designed to answer questions about its capabilities and personality, such as:

- "What should we know about your life story in a few sentences?"
- "What's your #1 superpower?"
- "What are the top 3 areas you'd like to grow in?"
- "What misconception do your coworkers have about you?"
- "How do you push your boundaries and limits?"

## Prerequisites

- Node.js (version 14 or higher)
- OpenAI API key
- Modern web browser (Chrome, Edge, or Firefox with speech recognition support)

## Installation

1. **Clone or download this project**
   ```bash
   git clone <repository-url>
   cd voice-bot
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up your OpenAI API key**
   - Copy `env.example` to `.env`
   - Get your API key from [OpenAI Platform](https://platform.openai.com/api-keys)
   - Add your API key to the `.env` file:
   ```
   OPENAI_API_KEY=your_actual_api_key_here
   ```

4. **Start the server**
   ```bash
   npm start
   ```

5. **Open your browser**
   - Navigate to `http://localhost:3000`
   - Allow microphone permissions when prompted

## Usage

### Voice Mode
1. Click the red microphone button
2. Speak your question clearly
3. Wait for the AI response
4. The response will be displayed and spoken back to you

### Text Mode
1. Type your question in the text input field
2. Press Enter or click the send button
3. Receive the AI response

## Browser Compatibility

- **Chrome/Edge**: Full support for speech recognition and text-to-speech
- **Firefox**: Limited speech recognition support
- **Safari**: Limited support

## API Endpoints

- `POST /api/chat` - Send a message to ChatGPT
- `GET /api/health` - Health check endpoint

## Customization

### Modifying the AI Personality
Edit the `voiceBotPersonality` variable in `server.js` to change how the AI responds:

```javascript
const voiceBotPersonality = `Your custom personality description here...`;
```

### Changing Voice Settings
Modify the speech synthesis settings in `public/script.js`:

```javascript
utterance.rate = 0.9;    // Speech rate (0.1 to 10)
utterance.pitch = 1;     // Pitch (0 to 2)
utterance.volume = 0.8;  // Volume (0 to 1)
```

## Troubleshooting

### Speech Recognition Not Working
- Ensure you're using a supported browser (Chrome recommended)
- Check that microphone permissions are granted
- Try refreshing the page

### API Errors
- Verify your OpenAI API key is correct
- Check that you have sufficient API credits
- Ensure the `.env` file is in the project root

### Text-to-Speech Issues
- Different browsers have different voice options
- Try using Chrome for the best voice quality
- Check your system's audio settings

## Security Notes

- Never commit your `.env` file to version control
- The API key is only used server-side
- All communication with OpenAI is done through your server

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Contributing

Feel free to submit issues, feature requests, or pull requests to improve this voice bot!

---

**Note**: This project requires an active internet connection and OpenAI API access to function properly. 