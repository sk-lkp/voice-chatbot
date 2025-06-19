class VoiceBot {
    constructor() {
        this.isRecording = false;
        this.recognition = null;
        this.synthesis = window.speechSynthesis;
        this.setupSpeechRecognition();
        this.setupEventListeners();
        this.checkServerMode();
    }

    async checkServerMode() {
        try {
            const response = await fetch('/api/health');
            const data = await response.json();
            if (data.mode === 'mock') {
                this.showDemoModeNotice();
            }
        } catch (error) {
            console.log('Could not check server mode');
        }
    }

    showDemoModeNotice() {
        const chatMessages = document.getElementById('chatMessages');
        const noticeDiv = document.createElement('div');
        noticeDiv.className = 'message bot-message demo-notice';
        
        noticeDiv.innerHTML = `
            <div class="message-content">
                <i class="fas fa-info-circle bot-icon" style="background: #ffa500;"></i>
                <div class="text" style="background: #fff3cd; color: #856404; border: 1px solid #ffeaa7;">
                    <p><strong>Demo Mode Active</strong></p>
                    <p>You're currently using demo responses. To enable full AI responses:</p>
                    <ol>
                        <li>Get an OpenAI API key from <a href="https://platform.openai.com/api-keys" target="_blank">OpenAI Platform</a></li>
                        <li>Add it to your .env file</li>
                        <li>Restart the server</li>
                    </ol>
                    <p>The demo will still answer your questions with pre-written responses!</p>
                </div>
            </div>
        `;
        
        chatMessages.appendChild(noticeDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    setupSpeechRecognition() {
        // Check if browser supports speech recognition
        if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
            console.error('Speech recognition not supported');
            this.showError('Speech recognition is not supported in your browser. Please use Chrome or Edge.');
            return;
        }

        // Initialize speech recognition
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        this.recognition = new SpeechRecognition();
        
        this.recognition.continuous = false;
        this.recognition.interimResults = false;
        this.recognition.lang = 'en-US';

        this.recognition.onstart = () => {
            this.isRecording = true;
            this.updateVoiceButton();
            this.updateVoiceStatus('Listening...');
        };

        this.recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            this.handleUserInput(transcript);
        };

        this.recognition.onerror = (event) => {
            console.error('Speech recognition error:', event.error);
            this.updateVoiceStatus('Error: ' + event.error);
            this.stopRecording();
        };

        this.recognition.onend = () => {
            this.stopRecording();
        };
    }

    setupEventListeners() {
        // Voice button
        const voiceButton = document.getElementById('voiceButton');
        voiceButton.addEventListener('click', () => {
            if (this.isRecording) {
                this.stopRecording();
            } else {
                this.startRecording();
            }
        });

        // Text input
        const textInput = document.getElementById('textInput');
        const sendButton = document.getElementById('sendButton');

        textInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.handleTextInput();
            }
        });

        sendButton.addEventListener('click', () => {
            this.handleTextInput();
        });
    }

    startRecording() {
        if (this.recognition) {
            this.recognition.start();
        }
    }

    stopRecording() {
        if (this.recognition) {
            this.recognition.stop();
        }
        this.isRecording = false;
        this.updateVoiceButton();
        this.updateVoiceStatus('Click to start speaking');
    }

    updateVoiceButton() {
        const voiceButton = document.getElementById('voiceButton');
        const icon = voiceButton.querySelector('i');
        
        if (this.isRecording) {
            voiceButton.classList.add('recording');
            icon.className = 'fas fa-stop';
        } else {
            voiceButton.classList.remove('recording');
            icon.className = 'fas fa-microphone';
        }
    }

    updateVoiceStatus(status) {
        const voiceStatus = document.getElementById('voiceStatus');
        voiceStatus.textContent = status;
    }

    handleTextInput() {
        const textInput = document.getElementById('textInput');
        const message = textInput.value.trim();
        
        if (message) {
            this.handleUserInput(message);
            textInput.value = '';
        }
    }

    handleUserInput(input) {
        // Add user message to chat
        this.addMessage(input, 'user');
        
        // Show typing indicator
        this.showTypingIndicator();
        
        // Send to ChatGPT API
        this.sendToChatGPT(input);
    }

    async sendToChatGPT(message) {
        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message })
            });

            if (!response.ok) {
                throw new Error('Failed to get response from server');
            }

            const data = await response.json();
            
            // Remove typing indicator
            this.removeTypingIndicator();
            
            // Add bot response to chat
            this.addMessage(data.response, 'bot', data.mode);
            
            // Speak the response
            this.speak(data.response);
            
        } catch (error) {
            console.error('Error:', error);
            this.removeTypingIndicator();
            this.addMessage('Sorry, I encountered an error. Please try again.', 'bot');
        }
    }

    addMessage(text, sender, mode = null) {
        const chatMessages = document.getElementById('chatMessages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        
        const iconClass = sender === 'bot' ? 'fas fa-robot bot-icon' : 'fas fa-user user-icon';
        
        let modeIndicator = '';
        if (sender === 'bot' && mode === 'mock') {
            modeIndicator = '<small style="color: #ffa500; font-style: italic;">(Demo Response)</small>';
        }
        
        messageDiv.innerHTML = `
            <div class="message-content">
                <i class="${iconClass}"></i>
                <div class="text">
                    <p>${this.formatMessage(text)} ${modeIndicator}</p>
                </div>
            </div>
        `;
        
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    formatMessage(text) {
        // Convert line breaks to HTML
        return text.replace(/\n/g, '<br>');
    }

    showTypingIndicator() {
        const chatMessages = document.getElementById('chatMessages');
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message bot-message typing-indicator-message';
        typingDiv.id = 'typingIndicator';
        
        typingDiv.innerHTML = `
            <div class="message-content">
                <i class="fas fa-robot bot-icon"></i>
                <div class="typing-indicator">
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                </div>
            </div>
        `;
        
        chatMessages.appendChild(typingDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    removeTypingIndicator() {
        const typingIndicator = document.getElementById('typingIndicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    speak(text) {
        // Stop any current speech
        this.synthesis.cancel();
        
        // Create speech utterance
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.9;
        utterance.pitch = 1;
        utterance.volume = 0.8;
        
        // Get available voices and set a good one
        const voices = this.synthesis.getVoices();
        const preferredVoice = voices.find(voice => 
            voice.lang.includes('en') && voice.name.includes('Google')
        ) || voices.find(voice => 
            voice.lang.includes('en')
        );
        
        if (preferredVoice) {
            utterance.voice = preferredVoice;
        }
        
        // Speak the text
        this.synthesis.speak(utterance);
    }

    showError(message) {
        const chatMessages = document.getElementById('chatMessages');
        const errorDiv = document.createElement('div');
        errorDiv.className = 'message bot-message error-message';
        
        errorDiv.innerHTML = `
            <div class="message-content">
                <i class="fas fa-exclamation-triangle bot-icon" style="background: #ff4757;"></i>
                <div class="text" style="background: #ffe6e6; color: #d63031;">
                    <p>${message}</p>
                </div>
            </div>
        `;
        
        chatMessages.appendChild(errorDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
}

// Initialize the voice bot when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new VoiceBot();
    
    // Load voices for speech synthesis
    if (speechSynthesis.onvoiceschanged !== undefined) {
        speechSynthesis.onvoiceschanged = () => {
            // Voices are now loaded
        };
    }
});

// Add some CSS for the typing indicator and demo mode
const style = document.createElement('style');
style.textContent = `
    .typing-indicator-message .text {
        background: #f8f9fa !important;
        padding: 15px 20px !important;
    }
    
    .error-message .text {
        background: #ffe6e6 !important;
        color: #d63031 !important;
    }
    
    .demo-notice .text {
        background: #fff3cd !important;
        color: #856404 !important;
        border: 1px solid #ffeaa7 !important;
    }
    
    .demo-notice .text a {
        color: #0056b3;
        text-decoration: underline;
    }
    
    .demo-notice .text ol {
        margin: 10px 0;
        padding-left: 20px;
    }
    
    .demo-notice .text li {
        margin: 5px 0;
    }
`;
document.head.appendChild(style); 