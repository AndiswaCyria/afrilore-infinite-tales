# Afrilore - One Subscription. Infinite Stories.

A modern digital library platform dedicated to African literature, folklore, and educational content. Built with React, TypeScript, and Node.js.

## 🌍 About Afrilore

Afrilore is a comprehensive digital library that celebrates and preserves African literature and culture. Our platform provides unlimited access to a curated collection of books, stories, and educational materials from across the African continent.

### ✨ Features

- **Free Library**: Access to classic African literature in the public domain
- **Premium Collection**: Curated selection of contemporary African books with preview functionality
- **Subscription Model**: Affordable monthly access to the entire premium library
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **User Authentication**: Secure login and registration system
- **Modern UI**: Clean, elegant interface with smooth animations
- **Mobile-First**: Fully responsive design with mobile navigation

## 🚀 Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **shadcn/ui** for UI components
- **React Router** for navigation
- **React Query** for data fetching
- **Lucide React** for icons

### Backend
- **Node.js** with Express
- **MongoDB** with Mongoose
- **CORS** for cross-origin requests
- **Morgan** for logging
- **dotenv** for environment variables

### Database
- **MongoDB** for data storage
- **Mongoose** for object modeling

## 📚 Book Collections

### Free Library
- Things Fall Apart by Chinua Achebe
- The African Child by Camara Laye
- Mine Boy by Peter Abrahams
- The Beautiful Ones Are Not Yet Born by Ayi Kwei Armah
- So Long a Letter by Mariama Bâ
- Purple Hibiscus by Chimamanda Ngozi Adichie

### Premium Collection
- Americanah by Chimamanda Ngozi Adichie
- Half of a Yellow Sun by Chimamanda Ngozi Adichie
- The Joys of Motherhood by Buchi Emecheta
- Nervous Conditions by Tsitsi Dangarembga
- Disgrace by J.M. Coetzee
- Waiting for the Barbarians by J.M. Coetzee

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with the following variables:
   ```env
   MONGO_URI=your_mongodb_connection_string
   PORT=5000
   ```

4. Start the backend server:
   ```bash
   npm start
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with:
   ```env
   VITE_API_BASE_URL=http://localhost:5000
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:8080`

## 📱 Mobile Responsiveness

The application is fully responsive and includes:
- Mobile-optimized navigation with hamburger menu
- Touch-friendly interface elements
- Responsive grid layouts for book collections
- Optimized typography and spacing for mobile devices

## 🎨 Design Features

- **Modern Aesthetic**: Clean, professional design with careful attention to typography
- **Color Scheme**: Warm, earthy tones reflecting African heritage
- **Typography**: Playfair Display for headings, system fonts for body text
- **Animations**: Smooth transitions and hover effects
- **Accessibility**: High contrast ratios and keyboard navigation support

## 💳 Subscription Model

- **Free Tier**: Access to public domain books
- **Premium Tier**: R50/month for unlimited access to the full library
- **Preview System**: Users can read previews of premium books before subscribing
- **No Commitment**: Cancel anytime

## 🔐 Security Features

- Secure user authentication
- Password encryption
- Protected API routes
- CORS configuration
- Input validation and sanitization

## 📊 Project Structure

```
afrilore/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── data/
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   └── lib/
│   └── public/
└── README.md
```

## 🌟 Key Components

- **Navigation**: Responsive navigation with mobile menu
- **Hero Section**: Compelling landing page with call-to-action
- **Free Library**: Public domain books with direct access
- **Preview Books**: Premium collection with subscription prompts
- **About Us**: Company information and team details
- **Contact**: Support and communication channels

## 🚀 Deployment

The application is configured for easy deployment on platforms like:
- **Frontend**: Vercel, Netlify, or similar
- **Backend**: Heroku, Railway, or similar
- **Database**: MongoDB Atlas

## 🤝 Contributing

This project was built by me as a showcase of modern web development practices and African literature appreciation.

## 📄 License

This project is for educational and demonstration purposes.

## 📞 Contact

For questions or support, please visit our contact page or reach out through the live chat feature.

---

**Built with ❤️ for African Literature**

*Preserving stories, celebrating culture, connecting readers worldwide.*