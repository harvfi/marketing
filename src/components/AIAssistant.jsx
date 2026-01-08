import { useState } from 'react';
import apiService from '../services/apiService';
import './AIAssistant.css';

function AIAssistant() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'assistant', content: 'Hi! I\'m your AI marketing assistant. How can I help you today?' }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!input.trim() || loading) return;

        const userMessage = input.trim();
        setInput('');
        setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
        setLoading(true);

        try {
            const { response } = await apiService.chatWithAI(userMessage);
            setMessages(prev => [...prev, { role: 'assistant', content: response }]);
        } catch (error) {
            console.error('AI chat error:', error);
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: 'Sorry, I encountered an error. Please try again.'
            }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <button
                className="ai-assistant-toggle"
                onClick={() => setIsOpen(!isOpen)}
                title="AI Assistant"
            >
                🤖
            </button>

            {isOpen && (
                <div className="ai-assistant-panel card-glass">
                    <div className="ai-assistant-header">
                        <h3>🤖 AI Marketing Assistant</h3>
                        <button className="close-btn" onClick={() => setIsOpen(false)}>×</button>
                    </div>

                    <div className="ai-assistant-messages">
                        {messages.map((msg, index) => (
                            <div key={index} className={`message message-${msg.role}`}>
                                <div className="message-content">{msg.content}</div>
                            </div>
                        ))}
                        {loading && (
                            <div className="message message-assistant">
                                <div className="message-content">
                                    <div className="typing-indicator">
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <form onSubmit={handleSubmit} className="ai-assistant-input">
                        <input
                            type="text"
                            className="input"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ask me anything about marketing..."
                            disabled={loading}
                        />
                        <button type="submit" className="btn btn-primary" disabled={loading || !input.trim()}>
                            Send
                        </button>
                    </form>
                </div>
            )}
        </>
    );
}

export default AIAssistant;
