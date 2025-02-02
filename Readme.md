# FAQ Management System

A robust FAQ management system built with Node.js, Express, Adminjs and MongoDB, featuring automatic translation capabilities and an admin dashboard. The system automatically translates FAQ content into multiple languages (only in hindi and bengali, you can add more lang to it) and caches translations for improved performance (uses Redis).

## Features

- 📝 FAQ management through AdminJS dashboard
- 🌐 Automatic translation to multiple languages (Hindi, Bengali)
- 💾 Redis caching for translated content
- 🚀 RESTful API endpoints
- 🔧 Docker support for easy deployment
- 📱 CORS enabled for cross-origin requests

## Prerequisites

- Node.js (v14 or higher)
- Docker and Docker Compose
- MongoDB
- Redis
- Adminjs
- Google Translate Api (translate-google-api)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/SahilR2/Vibhin_Bhasha.git
cd faq-management-system
```

2. Create a `.env` file in the root directory:
```env
NODE_ENV=development
PORT=3000
MONGODB_URI=mongodb://mongodb:27017/faq-system
REDIS_HOST=redis
REDIS_PORT=6379
```

3. Start the application using Docker Compose:
```bash
docker-compose up --build
```

The application will be available at:
- API: `http://localhost:3000`
- Admin Dashboard: `http://localhost:3000/admin`

## API Documentation

### Get FAQs

Retrieve FAQs in a specific language.

```http
GET /api/faqs?lang=<language-code>
```

Parameters:
- `lang` (optional): Language code for the FAQs (default: 'en')
  - Supported values: 'en', 'hi', 'bn'

Example Response:
```json
[
  {
    "id": "60d3b41c9f7cf31234567890",
    "question": "What is this service?",
    "answer": "This is a FAQ management system..."
  }
]
```

## Architecture

The system consists of several key components:

1. **API Server**: Express.js application handling HTTP requests
2. **Admin Dashboard**: AdminJS interface for FAQ management
3. **Translation Service**: Handles automatic translation using Google Translate API
4. **Cache Service**: Redis-based caching for translated content
5. **Database**: MongoDB for storing FAQs and translations

### Database Schema

FAQ documents follow this structure:
```javascript
{
  question: String,
  answer: String,
  translations: {
    hi: {
      question: String,
      answer: String
    },
    bn: {
      question: String,
      answer: String
    }
  },
  createdAt: Date,
  updatedAt: Date
}
```

## Cache Management

The system uses Redis for caching translations with the following features:

- Default TTL: 7 days (604800 seconds)
- Cache key format: `translation:{language}:{base64-encoded-text}`
- Automatic cache invalidation on updates
- Methods for clearing cache by language or entirely


## Troubleshooting

### Common Issues

1. **Redis Connection Failed**
   - Verify Redis container is running: `docker ps`
   - Check Redis connection settings in `.env`

2. **MongoDB Connection Issues**
   - Ensure MongoDB container is running
   - Verify MongoDB URI in environment variables

3. **Translation Not Working**
   - Check network connectivity
   - Verify supported language codes
   - Check Redis cache status


## Acknowledgments

- AdminJS for the admin interface
- Google Translate API for translation services
- Express.js and MongoDB communities

