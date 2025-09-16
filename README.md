# URL Shortener App

A full-stack URL shortener application built with the MERN stack (MongoDB, Express.js, React, Node.js) and TypeScript. This application allows users to create short URLs from long URLs and tracks click statistics.

## 🚀 Features

- **URL Shortening**: Convert long URLs into short, shareable links
- **Click Tracking**: Monitor how many times each short URL has been clicked
- **Real-time Updates**: See your URLs and stats update in real-time
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Copy to Clipboard**: One-click copying of shortened URLs
- **URL Validation**: Client and server-side validation for secure URL handling
- **Rate Limiting**: Built-in protection against abuse
- **Error Handling**: Comprehensive error handling and user feedback

## 🛠 Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **TypeScript** - Type safety
- **MongoDB** - Database
- **Mongoose** - MongoDB object modeling
- **nanoid** - Unique ID generation
- **Helmet** - Security middleware
- **CORS** - Cross-origin resource sharing
- **Express Rate Limit** - Rate limiting middleware

### Frontend
- **React** - UI library
- **TypeScript** - Type safety
- **Axios** - HTTP client
- **CSS3** - Styling with modern features
- **React Hooks** - State management

## 📁 Project Structure

```
url-shortener-app/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.ts
│   │   ├── controllers/
│   │   │   └── urlController.ts
│   │   ├── middleware/
│   │   │   └── rateLimiter.ts
│   │   ├── models/
│   │   │   └── Url.ts
│   │   ├── routes/
│   │   │   └── urlRoutes.ts
│   │   ├── types/
│   │   │   └── index.ts
│   │   ├── utils/
│   │   │   └── urlUtils.ts
│   │   └── index.ts
│   ├── package.json
│   ├── tsconfig.json
│   ├── nodemon.json
│   └── .env.example
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── UrlShortenerForm.tsx
│   │   │   └── UrlList.tsx
│   │   ├── hooks/
│   │   │   └── useApi.ts
│   │   ├── services/
│   │   │   └── api.ts
│   │   ├── types/
│   │   │   └── index.ts
│   │   ├── utils/
│   │   │   └── validation.ts
│   │   ├── App.tsx
│   │   ├── App.css
│   │   ├── index.tsx
│   │   └── index.css
│   ├── package.json
│   ├── tsconfig.json
│   └── .env.example
├── package.json
├── README.md
└── .gitignore
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MongoDB (local installation or MongoDB Atlas)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd url-shortener-app
   ```

2. **Install root dependencies**
   ```bash
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

4. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

### Configuration

1. **Backend Environment Variables**
   ```bash
   cd backend
   cp .env.example .env
   ```
   
   Update the `.env` file with your configuration:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/url-shortener
   NODE_ENV=development
   BASE_URL=http://localhost:3000
   ```

2. **Frontend Environment Variables**
   ```bash
   cd ../frontend
   cp .env.example .env
   ```
   
   Update the `.env` file:
   ```env
   REACT_APP_API_URL=http://localhost:5000
   ```

### Database Setup

1. **Local MongoDB**
   - Install and start MongoDB on your system
   - The app will automatically create the `url-shortener` database

2. **MongoDB Atlas (Cloud)**
   - Create a free account at [MongoDB Atlas](https://www.mongodb.com/atlas)
   - Create a new cluster and get your connection string
   - Update the `MONGODB_URI` in your backend `.env` file

### Running the Application

1. **Development Mode (Recommended)**
   ```bash
   # From the root directory
   npm run dev
   ```
   This will start both backend and frontend concurrently.

2. **Separate Terminal Windows**
   ```bash
   # Terminal 1 - Backend
   cd backend
   npm run dev
   
   # Terminal 2 - Frontend
   cd frontend
   npm start
   ```

3. **Production Mode**
   ```bash
   # Build frontend
   cd frontend
   npm run build
   
   # Start backend
   cd ../backend
   npm run build
   npm start
   ```

### Accessing the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **Health Check**: http://localhost:5000/health

## 📡 API Endpoints

### Create Short URL
```http
POST /api/shorten
Content-Type: application/json

{
  "originalUrl": "https://example.com/very-long-url"
}
```

### Get All URLs
```http
GET /api/urls
```

### Get URL Statistics
```http
GET /api/stats/:shortCode
```

### Redirect to Original URL
```http
GET /:shortCode
```

## 🔧 Available Scripts

### Root Directory
- `npm run dev` - Start both frontend and backend in development mode
- `npm run backend:dev` - Start only backend in development mode
- `npm run frontend:dev` - Start only frontend in development mode

### Backend
- `npm run dev` - Start backend with nodemon
- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Start production server
- `npm run lint` - Run ESLint

### Frontend
- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests

## 🎨 Features in Detail

### URL Shortening Algorithm
- Uses `nanoid` to generate unique 7-character codes
- Ensures uniqueness by checking against existing codes
- Base62 encoding (0-9, a-z, A-Z) for URL-safe characters

### Click Tracking
- Increments click count on each redirect
- Stores click data in MongoDB
- Real-time updates in the frontend

### Rate Limiting
- URL creation: 10 requests per 15 minutes per IP
- URL redirects: 100 requests per minute per IP
- Prevents abuse and ensures service availability

### Security Features
- Helmet.js for security headers
- CORS configuration
- URL validation (prevents local URLs)
- Input sanitization
- MongoDB injection prevention

## 🔐 Security Considerations

- All URLs are validated on both client and server side
- Rate limiting prevents abuse
- Security headers are set using Helmet
- No sensitive data is logged
- Environment variables for configuration

## 🚦 Testing the Application

1. **Create a Short URL**
   - Enter a valid URL (e.g., https://google.com)
   - Click "Shorten URL"
   - Copy the generated short URL

2. **Test Redirect**
   - Paste the short URL in a new browser tab
   - Should redirect to the original URL
   - Check that click count increases

3. **View Statistics**
   - Return to the main page
   - See the updated click count in the URL list

## 📈 Future Enhancements

- User authentication and personal dashboards
- Custom short codes
- QR code generation
- Analytics dashboard with charts
- Bulk URL shortening
- API key authentication
- URL expiration dates
- Geographic click tracking

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

Maddy Kandasamy - [GitHub](https://github.com/yourusername)

## 🙏 Acknowledgments

- [nanoid](https://github.com/ai/nanoid) for unique ID generation
- [React](https://reactjs.org/) team for the amazing framework
- [Express.js](https://expressjs.com/) for the lightweight server framework
- [MongoDB](https://www.mongodb.com/) for the flexible database solution