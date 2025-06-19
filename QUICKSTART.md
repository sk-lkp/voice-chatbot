# Quick Start Guide

Get your Voice Bot running in 3 minutes! 🚀

## Step 1: Get OpenAI API Key
1. Go to [OpenAI Platform](https://platform.openai.com/api-keys)
2. Sign up or log in
3. Create a new API key
4. Copy the key (it starts with `sk-`)

## Step 2: Setup Environment
1. Copy `env.example` to `.env`
2. Replace `your_openai_api_key_here` with your actual API key

## Step 3: Install & Run
```bash
# Install dependencies
npm install

# Start the server
npm start
```

## Step 4: Test Your Bot
1. Open http://localhost:3000 in Chrome
2. Allow microphone permissions
3. Click the red microphone button
4. Ask: "What's your #1 superpower?"

## Troubleshooting

**"Speech recognition not supported"**
- Use Chrome or Edge browser
- Make sure you're on HTTPS or localhost

**"Failed to get response from ChatGPT"**
- Check your API key in `.env` file
- Verify you have OpenAI credits

**No sound from text-to-speech**
- Check your system volume
- Try refreshing the page

## Need Help?
- Check the full README.md for detailed instructions
- Ensure you're using a modern browser
- Make sure your microphone is working

Happy chatting! 🎤🤖 