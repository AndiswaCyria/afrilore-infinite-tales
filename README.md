# 📚 Afrilore – African Literature Streaming & Support Platform

Afrilore is a full-stack MERN web application designed to promote the consumption of African literature by connecting readers with books and emerging African authors. The platform includes a subscription-based free library, an AI-powered Help Center, and a real-time Live Chat feature for immediate support and engagement.

---

## 🚀 Live Demo

🔗 [Frontend Live on Vercel](https://afrilore-infinite-tales.vercel.app/)  
🔗 [Backend Live on Render](https://afrilore-infinite-tales.onrender.com/)  
📝 [Project Walkthrough Video](https://www.loom.com/share/cd54114724a6440e97cde219dfa1f1a1?sid=81b6dc9c-bace-46a6-81f7-e6362b0c2d3a)

---

## 📌 Features

### 🌍 General
- Responsive multi-page React app
- Clean, accessible UI with light/dark modes
- Client-side routing with `react-router-dom`
- 404 NotFound page handling

### 🧠 Help Center
- AI-powered chatbot for instant responses
- Searchable Help Center articles
- Structured layout for FAQs

### 💬 Live Chat (Real-Time)
- Socket.io integration
- Real-time messaging between user and bot
- Delivery notifications & connection status

### 📖 Free Library
- View sample books and genres
- Modular JSON structure for books
- Subscription prompt for full access

### 🔒 Authentication
- Basic auth setup with secure backend routes
- Future-ready for JWT integration

---

## 🧱 Tech Stack

### Frontend
- React.js + Vite
- React Router DOM
- Socket.io Client
- Axios for API calls
- Custom CSS

### Backend
- Express.js
- MongoDB Atlas
- Socket.io
- Dotenv, CORS, Middleware
- Modular route handling

---

## 📂 Folder Structure

```bash
afrilore/
├── frontend/            # React frontend 
    ├── pages/
│   ├── pages/           # LiveChat, HelpCenter, Home, NotFound
│   ├── components/      # Navbar, Footer, ChatBot, etc.
│   └── App.jsx
├── backend/             # Express backend
│   ├── routes/          # /chat, /auth, /books
│   ├── controllers/
│   ├── data/            # freeLibrary.js, previewBooks.js
│   ├── models/
│   └── server.js
```

---

## 🔧 Setup Instructions

### 1. Clone the Repo
```bash 
git clone https://github.com/AndiswaCyria/afrilore-infinite-tales.git
cd afrilore
```

### 2. Install Dependencies
- Frontend 
```bash
cd frontend
npm install
npm run dev
```

- Backend 
```bash
cd backend
npm install
npm run dev
```

### 3. Environment Variables (.env)
In /backend/.env 
```bash
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
```
