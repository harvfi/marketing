# ScaleQmarketing - AI-Powered Marketing Platform

A full-stack SaaS platform that helps businesses scale their marketing efforts with AI-powered insights, lead management, campaign tracking, and analytics.

## Features

- 🤖 **AI Marketing Assistant** - Get instant marketing insights powered by Google Gemini
- 👥 **Lead Management** - Capture, track, and organize leads with intelligent filtering
- 📊 **Campaign Tracking** - Monitor and optimize marketing campaigns in real-time
- 📈 **Analytics Dashboard** - Visualize marketing performance with comprehensive analytics
- ⚡ **Real-time Updates** - Live performance metrics and insights
- 🎯 **Smart Automation** - AI-powered content suggestions and campaign analysis

## Tech Stack

### Frontend
- **React** - UI library
- **Vite** - Build tool
- **React Router** - Client-side routing
- **Supabase Client** - Authentication and real-time data

### Backend
- **Node.js + Express** - API server
- **Supabase** - PostgreSQL database and authentication
- **Google Gemini AI** - AI-powered insights
- **Resend** - Email notifications

## Setup Instructions

### Prerequisites
- Node.js 18+ installed
- Supabase account
- Google Gemini API key
- Resend API key (optional, for emails)

### 1. Clone the Repository
```bash
git clone https://github.com/harvfi/marketing.git
cd marketing
```

### 2. Set Up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to Project Settings > API to get your credentials
3. Run the database schema (see `database-schema.sql`)

### 3. Environment Variables

Create a `.env` file in the root directory:

```env
# Supabase
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Gemini AI
VITE_GEMINI_API_KEY=your_gemini_api_key

# Resend Email (optional)
RESEND_API_KEY=your_resend_api_key

# API Configuration
VITE_API_URL=http://localhost:5000
```

### 4. Install Dependencies

```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd api
npm install
cd ..
```

### 5. Run Development Servers

Open two terminal windows:

**Terminal 1 - Frontend:**
```bash
npm run dev
```

**Terminal 2 - Backend API:**
```bash
cd api
npm run dev
```

The frontend will run on `http://localhost:3000` and the backend on `http://localhost:5000`.

## Deployment to Vercel

### 1. Push to GitHub
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

### 2. Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) and import your repository
2. Configure environment variables in Vercel dashboard
3. Deploy!

### 3. Configure Environment Variables in Vercel

Add all the environment variables from your `.env` file to Vercel:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `VITE_GEMINI_API_KEY`
- `RESEND_API_KEY`
- `VITE_API_URL` (set to your Vercel domain)

### 4. Custom Domain

1. Go to your Vercel project settings
2. Navigate to "Domains"
3. Add your custom domain
4. Follow Vercel's instructions to configure DNS

## Database Schema

The application uses the following Supabase tables:

- **users** - User accounts (managed by Supabase Auth)
- **leads** - Lead information and tracking
- **campaigns** - Marketing campaign data
- **analytics** - Analytics events (optional)

See `database-schema.sql` for the complete schema.

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Create new account
- `POST /api/auth/login` - Login
- `POST /api/auth/logout` - Logout
- `GET /api/auth/user` - Get current user

### Leads
- `GET /api/leads` - Get all leads
- `POST /api/leads` - Create lead
- `PUT /api/leads/:id` - Update lead
- `DELETE /api/leads/:id` - Delete lead

### Campaigns
- `GET /api/campaigns` - Get all campaigns
- `POST /api/campaigns` - Create campaign
- `PUT /api/campaigns/:id` - Update campaign
- `DELETE /api/campaigns/:id` - Delete campaign

### AI
- `POST /api/ai/chat` - Chat with AI assistant
- `POST /api/ai/content-suggestions` - Get content suggestions
- `POST /api/ai/analyze-campaign` - Analyze campaign

### Analytics
- `GET /api/analytics/dashboard` - Get dashboard metrics
- `GET /api/analytics/lead-trends` - Get lead trends

### Email
- `POST /api/email/contact` - Send contact email
- `POST /api/email/welcome` - Send welcome email

## Project Structure

```
marketing/
├── api/                    # Backend API
│   ├── config/            # Configuration files
│   ├── routes/            # API routes
│   ├── package.json
│   └── server.js
├── src/                   # Frontend source
│   ├── components/        # React components
│   ├── pages/            # Page components
│   ├── services/         # API services
│   ├── config/           # Configuration
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── public/               # Static assets
├── index.html
├── package.json
├── vite.config.js
└── vercel.json
```

## License

MIT

## Support

For support, email support@scaleqmarketing.com or open an issue on GitHub.
