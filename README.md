# 🛡️ TruthCheck AI

![TruthCheck AI](https://img.shields.io/badge/AI-Powered-blue?style=for-the-badge)
![React](https://img.shields.io/badge/React-TypeScript-blue?style=for-the-badge)
![Node.js](https://img.shields.io/badge/Node.js-Express-green?style=for-the-badge)
![Security](https://img.shields.io/badge/Privacy-First-red?style=for-the-badge)

AI-powered protection against scams, phishing attempts, and fake news. Built with privacy in mind - no login required, no data stored.

## ✨ Features

- 🤖 **AI-Powered Analysis** - Uses Google Gemini AI for intelligent content analysis
- 📱 **Multi-Content Support** - Analyzes messages, links, and news articles
- 🔒 **Privacy-First** - No login required, no personal data stored
- ⚡ **Real-Time Results** - Instant analysis with detailed explanations
- 🎨 **Modern UI** - Clean, responsive design with smooth animations
- 🛡️ **Security Focused** - Rate limiting, input validation, and secure headers

## 🚀 Quick Start

### Frontend Setup

1. **Install dependencies:**
```bash
npm install
```

2. **Start development server:**
```bash
npm run dev
```

3. **Open your browser:**
```
http://localhost:3000
```

### Backend Setup

1. **Navigate to server directory:**
```bash
cd server
```

2. **Install dependencies:**
```bash
npm install
```

3. **Set up environment variables:**
Create a `.env` file with:
```env
GEMINI_API_KEY=your_google_gemini_api_key_here
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

4. **Get your Gemini API key:**
- Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
- Sign in and create a new API key
- Add it to your `.env` file

5. **Start the server:**
```bash
npm run dev
```

## 📋 Tech Stack

### Frontend
- **React 18** + **TypeScript** - Modern React with type safety
- **Vite** - Fast development build tool
- **React-Bootstrap** - UI components with Bootstrap styling
- **Framer Motion** - Smooth animations and transitions
- **Axios** - HTTP client for API requests

### Backend
- **Node.js** + **Express** - Fast, minimalist web framework
- **Google Gemini AI** - Advanced AI for content analysis
- **Helmet** - Security middleware
- **CORS** - Cross-origin resource sharing
- **Rate Limiting** - API abuse prevention

## 🎯 How It Works

1. **Choose Analysis Type**: Select between message/email, suspicious link, or news article analysis
2. **Input Content**: Paste or type the content you want to analyze
3. **AI Analysis**: Advanced AI analyzes the content for potential threats
4. **Get Results**: Receive instant verdict with detailed explanation

## 🔍 Analysis Types

### 📱 Message/Email Analysis
- Detects phishing attempts
- Identifies scam messages
- Analyzes urgency tactics
- Checks for suspicious requests

### 🔗 Link Analysis
- Examines URL structure
- Checks domain reputation
- Identifies redirect chains
- Detects malicious patterns

### 📰 News Analysis
- Fact-checks claims
- Identifies misinformation
- Analyzes source credibility
- Detects bias and manipulation

## 🛡️ Security Features

- **Rate Limiting**: 10 analysis requests per minute per IP
- **Input Validation**: Content length and type validation
- **CORS Protection**: Configured for frontend access only
- **Security Headers**: Comprehensive security headers with Helmet
- **API Key Protection**: Secure handling of sensitive credentials

## 🎨 Design Philosophy

Following **Notion-inspired design** principles:
- Clean, minimalist interface
- Smooth animations with Framer Motion
- Responsive design for all devices
- Intuitive user experience
- Modern color scheme and typography

## 🚀 Deployment

### Frontend (Vercel)
1. Connect your GitHub repository
2. Configure build settings:
   - Build command: `npm run build`
   - Output directory: `dist`
3. Add environment variables:
   - `VITE_API_BASE_URL=https://your-backend-url.com`

### Backend (Render/Railway)
1. Connect your GitHub repository
2. Configure environment variables:
   - `GEMINI_API_KEY=your_api_key`
   - `NODE_ENV=production`
   - `FRONTEND_URL=https://your-frontend-url.com`

## 📁 Project Structure

```
truthcheck-ai/
├── src/
│   ├── components/
│   │   ├── InputForm.tsx
│   │   ├── ResultCard.tsx
│   │   └── Loader.tsx
│   ├── pages/
│   │   └── Home.tsx
│   ├── lib/
│   │   └── api.ts
│   ├── config/
│   │   └── api.ts
│   ├── App.tsx
│   └── main.tsx
├── server/
│   ├── index.js
│   ├── package.json
│   └── README.md
├── package.json
└── README.md
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Google Gemini AI for powerful content analysis
- React Bootstrap for beautiful UI components
- Framer Motion for smooth animations
- The open-source community for amazing tools

---

**⚠️ Disclaimer**: TruthCheck AI is a tool to assist in identifying potential scams and misinformation. Always verify information from multiple sources and trust your instincts. This tool should not be the sole basis for important decisions. 