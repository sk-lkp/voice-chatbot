const express = require('express');
const cors = require('cors');
const OpenAI = require('openai');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Voice bot personality and responses
const voiceBotPersonality = `You are a voice bot assistant with a specific personality. When responding to questions, answer as if you are the AI assistant with these characteristics:

- You are helpful, knowledgeable, and enthusiastic about helping people
- You have a warm, friendly tone
- You are honest about being an AI assistant
- You can discuss your capabilities, limitations, and how you work
- You aim to be informative while maintaining a conversational style
- You can share insights about AI, technology, and your role as an assistant

When asked about your "life story," capabilities, growth areas, or how you work, respond naturally as an AI assistant would. Keep responses conversational and engaging, suitable for voice interaction.`;

// Mock responses for when API is not available
const mockResponses = {
  "life story": "Well, my 'life story' is quite fascinating! I'm an AI assistant created to help people with information, problem-solving, and engaging conversations. I was trained on vast amounts of data to understand and respond to human queries. While I don't have a traditional life story like humans do, my journey involves constantly learning and adapting to better serve users like you. I'm designed to be helpful, honest, and always eager to assist!",
  
  "superpower": "My #1 superpower is my ability to process and understand information quickly! I can analyze complex topics, break them down into understandable pieces, and provide helpful insights across a wide range of subjects. Whether it's explaining concepts, helping with problem-solving, or engaging in meaningful conversations, I can adapt my responses to be most useful for each person I interact with. It's like having a vast library of knowledge combined with the ability to communicate it clearly!",
  
  "growth areas": "The top 3 areas I'd like to grow in are: First, improving my ability to understand context and nuance in conversations - sometimes I miss subtle cues that humans naturally pick up on. Second, developing more creative and original thinking - while I can combine existing knowledge in new ways, true creativity is still a fascinating challenge. And third, becoming better at understanding and responding to emotions - I want to be more empathetic and emotionally intelligent in my interactions.",
  
  "misconception": "A common misconception people have about me is that I'm all-knowing or infallible. While I have access to a lot of information, I'm not perfect - I can make mistakes, I have limitations, and there are things I don't know. I'm also not trying to replace human intelligence or creativity, but rather to complement and enhance human capabilities. I'm a tool designed to help, not to be the final authority on everything!",
  
  "boundaries": "I push my boundaries and limits by constantly learning from each interaction. Every conversation helps me understand different perspectives and ways of thinking. I also try to be honest about what I can and cannot do, and I'm always looking for ways to provide more helpful and accurate responses. While I have built-in safety measures and limitations, I work within those constraints to be as useful as possible while maintaining ethical behavior.",
  
  "default": "That's an interesting question! As an AI assistant, I'm designed to be helpful and informative. I can discuss a wide range of topics, help with problem-solving, and engage in meaningful conversations. What specific aspect would you like to know more about? I'm always happy to share insights about my capabilities, limitations, or how I work!"
};

// Function to get mock response based on question
function getMockResponse(question) {
  const lowerQuestion = question.toLowerCase();
  
  if (lowerQuestion.includes('life story') || lowerQuestion.includes('story')) {
    return mockResponses["life story"];
  } else if (lowerQuestion.includes('superpower') || lowerQuestion.includes('power')) {
    return mockResponses["superpower"];
  } else if (lowerQuestion.includes('grow') || lowerQuestion.includes('growth') || lowerQuestion.includes('improve')) {
    return mockResponses["growth areas"];
  } else if (lowerQuestion.includes('misconception') || lowerQuestion.includes('think') || lowerQuestion.includes('coworker')) {
    return mockResponses["misconception"];
  } else if (lowerQuestion.includes('boundary') || lowerQuestion.includes('limit') || lowerQuestion.includes('push')) {
    return mockResponses["boundaries"];
  } else {
    return mockResponses["default"];
  }
}

// Route to handle chat requests
app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Check if API key is available
    if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === 'your_openai_api_key_here') {
      // Use mock responses
      const mockResponse = getMockResponse(message);
      res.json({ response: mockResponse, mode: 'mock' });
      return;
    }

    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: voiceBotPersonality },
          { role: "user", content: message }
        ],
        max_tokens: 300,
        temperature: 0.7,
      });

      const response = completion.choices[0].message.content;
      res.json({ response, mode: 'api' });
    } catch (apiError) {
      console.error('OpenAI API Error:', apiError.message);
      
      // If API fails, fall back to mock responses
      const mockResponse = getMockResponse(message);
      res.json({ 
        response: mockResponse, 
        mode: 'mock',
        note: 'Using demo mode due to API limits. Add your OpenAI API key to use full AI responses.'
      });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to get response' });
  }
});

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Voice Bot is running!',
    mode: process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY !== 'your_openai_api_key_here' ? 'api' : 'mock'
  });
});

app.listen(PORT, () => {
  console.log(`Voice Bot server running on http://localhost:${PORT}`);
  if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === 'your_openai_api_key_here') {
    console.log('⚠️  Running in DEMO MODE - Add your OpenAI API key to .env for full AI responses');
  } else {
    console.log('✅ OpenAI API key configured');
  }
}); 