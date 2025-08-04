import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageCircle, 
  X, 
  Send, 
  Bot, 
  User, 
  Shield, 
  AlertTriangle,
  HelpCircle,
  Zap,
  CheckCircle,
  Clock
} from 'lucide-react';
import { ChatbotAPI } from '../services/api';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  isTyping?: boolean;
}

interface ChatbotModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ChatbotModal: React.FC<ChatbotModalProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: 'Hello! I\'m Sentinel. I can help you with threat analysis, incident response guidance, security best practices, and network monitoring. How can I assist you today?',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickActions = [
    {
      icon: AlertTriangle,
      label: 'Threat Analysis',
      action: () => handleQuickAction('I need help analyzing a potential threat')
    },
    {
      icon: Shield,
      label: 'Incident Response',
      action: () => handleQuickAction('Guide me through incident response steps')
    },
    {
      icon: Zap,
      label: 'Security Best Practices',
      action: () => handleQuickAction('What are the current security best practices?')
    },
    {
      icon: HelpCircle,
      label: 'General Help',
      action: () => handleQuickAction('I need general cybersecurity assistance')
    }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleQuickAction = (message: string) => {
    setInputMessage(message);
    handleSendMessage(message);
  };

  const handleSendMessage = async (messageText?: string) => {
    const messageToSend = messageText || inputMessage.trim();
    if (!messageToSend) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: messageToSend,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

          // Add typing indicator
      const typingMessage: Message = {
        id: 'typing',
        type: 'bot',
        content: 'Sentinel AI is analyzing...',
        timestamp: new Date(),
        isTyping: true
      };
    setMessages(prev => [...prev, typingMessage]);

    try {
      // Simulate API call to chatbot service
      const response = await ChatbotAPI.sendMessage(messageToSend);
      
      // Remove typing indicator and add actual response
      setMessages(prev => {
        const filtered = prev.filter(msg => msg.id !== 'typing');
        return [...filtered, {
          id: Date.now().toString(),
          type: 'bot',
          content: response.message || getBotResponse(messageToSend),
          timestamp: new Date()
        }];
      });
    } catch (error) {
      // Remove typing indicator and add error message
      setMessages(prev => {
        const filtered = prev.filter(msg => msg.id !== 'typing');
        return [...filtered, {
          id: Date.now().toString(),
          type: 'bot',
          content: 'I apologize, but I\'m experiencing technical difficulties. Please try again or contact our support team for immediate assistance.',
          timestamp: new Date()
        }];
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('threat') || message.includes('malware') || message.includes('virus')) {
      return `🛡️ **Threat Analysis Guidance:**

1. **Immediate Actions:**
   - Isolate affected systems from the network
   - Document all observed symptoms and behaviors
   - Preserve evidence for forensic analysis

2. **Assessment Steps:**
   - Run a full system scan with updated definitions
   - Check network logs for suspicious activity
   - Verify integrity of critical files and databases

3. **Containment:**
   - Block suspicious IP addresses
   - Update firewall rules if necessary
   - Monitor for lateral movement

Would you like specific guidance for a particular type of threat?`;
    }
    
    if (message.includes('incident') || message.includes('response') || message.includes('breach')) {
      return `🚨 **Incident Response Protocol:**

**Phase 1: Preparation**
- Activate incident response team
- Gather necessary tools and contact information
- Establish communication channels

**Phase 2: Identification**
- Determine scope and severity
- Classify the incident type
- Document initial findings

**Phase 3: Containment**
- Implement short-term containment
- Create system backups
- Develop long-term containment strategy

**Phase 4: Eradication & Recovery**
- Remove threat from environment
- Restore systems from clean backups
- Implement additional monitoring

Need help with a specific incident type?`;
    }
    
    if (message.includes('best practices') || message.includes('security') || message.includes('protection')) {
      return `🔒 **Current Security Best Practices:**

**Access Control:**
- Implement multi-factor authentication (MFA)
- Use principle of least privilege
- Regular access reviews and deprovisioning

**Network Security:**
- Deploy network segmentation
- Monitor network traffic continuously
- Keep firewalls and IDS/IPS updated

**Data Protection:**
- Encrypt data at rest and in transit
- Regular backup testing and validation
- Implement data loss prevention (DLP)

**Monitoring & Response:**
- 24/7 security monitoring
- Automated threat detection
- Regular security assessments

Would you like me to elaborate on any of these areas?`;
    }
    
    if (message.includes('help') || message.includes('assist') || message.includes('support')) {
      return `🤖 **I can help you with:**

**Threat Management:**
- Malware analysis and removal
- Suspicious activity investigation
- Vulnerability assessments

**Incident Response:**
- Step-by-step response procedures
- Containment strategies
- Recovery planning

**Security Operations:**
- Log analysis guidance
- Alert triage assistance
- Compliance requirements

**Best Practices:**
- Security policy recommendations
- Training and awareness tips
- Technology implementation guidance

What specific area would you like assistance with?`;
    }
    
    return `Thank you for your question. I'm here to help with cybersecurity matters including:

• Threat detection and analysis
• Incident response procedures  
• Security best practices
• Compliance guidance
• Risk assessment

Could you please provide more details about what specific security challenge you're facing? This will help me give you more targeted assistance.`;
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-800 rounded-2xl shadow-2xl border border-slate-700 w-full max-w-2xl h-[600px] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-full flex items-center justify-center">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Sentinel AI Assistant</h3>
              <p className="text-sm text-gray-400">AI-Powered Security Support</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors duration-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-start space-x-3 max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.type === 'user' 
                    ? 'bg-gradient-to-br from-teal-400 to-cyan-500' 
                    : 'bg-slate-700'
                }`}>
                  {message.type === 'user' ? (
                    <User className="w-4 h-4 text-white" />
                  ) : (
                    <Bot className="w-4 h-4 text-teal-400" />
                  )}
                </div>
                <div className={`rounded-xl p-4 ${
                  message.type === 'user'
                    ? 'bg-gradient-to-r from-teal-500 to-cyan-600 text-white'
                    : 'bg-slate-700 text-gray-100'
                }`}>
                  {message.isTyping ? (
                    <div className="flex items-center space-x-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-teal-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-teal-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-teal-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                      <span className="text-sm text-gray-400">Analyzing...</span>
                    </div>
                  ) : (
                    <div className="whitespace-pre-wrap text-sm leading-relaxed">
                      {message.content}
                    </div>
                  )}
                  <div className={`text-xs mt-2 ${
                    message.type === 'user' ? 'text-teal-100' : 'text-gray-400'
                  }`}>
                    {message.timestamp.toLocaleTimeString()}
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Actions */}
        {messages.length <= 1 && (
          <div className="px-6 py-4 border-t border-slate-700">
            <p className="text-sm text-gray-400 mb-3">Quick actions:</p>
            <div className="grid grid-cols-2 gap-2">
              {quickActions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <button
                    key={index}
                    onClick={action.action}
                    className="flex items-center space-x-2 p-3 bg-slate-700/50 hover:bg-slate-700 rounded-lg transition-colors duration-200 text-left"
                  >
                    <Icon className="w-4 h-4 text-teal-400" />
                    <span className="text-sm text-gray-300">{action.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="p-6 border-t border-slate-700">
          <div className="flex space-x-3">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about threats, incidents, or security best practices..."
              className="flex-1 px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 text-white placeholder-gray-400"
              disabled={isLoading}
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={!inputMessage.trim() || isLoading}
              className="px-6 py-3 bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 disabled:from-gray-600 disabled:to-gray-700 text-white rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl disabled:cursor-not-allowed flex items-center space-x-2"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};