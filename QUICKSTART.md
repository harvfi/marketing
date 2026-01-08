# 🚀 Quick Start Guide - ScaleQmarketing

Get your ScaleQmarketing platform running in 15 minutes!

## Prerequisites

- Node.js 18+ installed
- A Supabase account (free tier works!)
- A Google Gemini API key (free)

## Step 1: Set Up Supabase (5 minutes)

1. **Create Project**
   - Go to [supabase.com](https://supabase.com) → Sign up/Login
   - Click "New Project"
   - Name: `scaleqmarketing`
   - Set a database password (save it!)
   - Choose a region
   - Click "Create new project"

2. **Create Database Tables**
   - Wait for project to finish setting up
   - Go to "SQL Editor" in left sidebar
   - Click "New Query"
   - Copy ALL content from `database-schema.sql`
   - Paste and click "Run"
   - You should see "Success. No rows returned"

3. **Get API Keys**
   - Go to "Project Settings" (gear icon) → "API"
   - Copy these values:
     - **Project URL** (looks like: `https://xxx.supabase.co`)
     - **anon public** key (long string starting with `eyJ...`)
     - **service_role** key (another long string)

## Step 2: Get Gemini API Key (2 minutes)

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Click "Create API Key"
3. Copy the key (starts with `AI...`)

## Step 3: Configure Environment (2 minutes)

1. **Create `.env` file** in the project root:
   ```bash
   cp .env.example .env
   ```

2. **Edit `.env`** and add your keys:
   ```env
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your_anon_key_here
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
   VITE_GEMINI_API_KEY=your_gemini_key_here
   RESEND_API_KEY=optional_for_now
   VITE_API_URL=http://localhost:5000
   ```

## Step 4: Run the Application (3 minutes)

1. **Install Dependencies** (if not already done):
   ```bash
   npm install
   cd api && npm install && cd ..
   ```

2. **Start Backend** (Terminal 1):
   ```bash
   cd api
   npm run dev
   ```
   You should see: `🚀 ScaleQmarketing API running on port 5000`

3. **Start Frontend** (Terminal 2):
   ```bash
   npm run dev
   ```
   You should see: `Local: http://localhost:3000`

4. **Open Browser**:
   - Go to `http://localhost:3000`
   - You should see the ScaleQmarketing landing page! 🎉

## Step 5: Test the Application (3 minutes)

1. **Create Account**
   - Click "Get Started" or "Sign Up"
   - Enter your email and password
   - Click "Sign Up"
   - You'll be redirected to the Dashboard

2. **Add a Lead**
   - Click "Leads" in navigation
   - Click "Add New Lead"
   - Fill in the form
   - Click "Add Lead"
   - Your lead appears in the table!

3. **Try AI Assistant**
   - Click the 🤖 button in bottom right
   - Type: "Give me 5 social media post ideas for a tech startup"
   - Watch the AI respond!

4. **Create a Campaign**
   - Click "Campaigns" in navigation
   - Click "Create Campaign"
   - Fill in campaign details
   - Click "Create Campaign"

## ✅ You're Done!

Your ScaleQmarketing platform is now running locally!

## Next Steps

### Deploy to Production

When you're ready to deploy:

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repo
   - Add the same environment variables from your `.env`
   - Change `VITE_API_URL` to your Vercel domain
   - Click "Deploy"

3. **Done!** Your app is live at `your-project.vercel.app`

For detailed deployment instructions, see [DEPLOYMENT.md](DEPLOYMENT.md)

## Troubleshooting

### "Cannot connect to API"
- Make sure backend is running on port 5000
- Check `VITE_API_URL` in `.env` is `http://localhost:5000`

### "Authentication failed"
- Verify Supabase URL and keys in `.env`
- Make sure database schema was created successfully

### "AI Assistant not working"
- Check Gemini API key is valid
- Verify you have API quota remaining

### "Build fails"
- Delete `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Make sure Node.js version is 18 or higher: `node --version`

## Need Help?

1. Check the [README.md](README.md) for full documentation
2. Review [DEPLOYMENT.md](DEPLOYMENT.md) for deployment help
3. Check browser console for errors (F12)
4. Verify all environment variables are set correctly

## Features to Explore

- 📊 **Analytics** - View your marketing metrics
- 🤖 **AI Assistant** - Get marketing insights
- 👥 **Leads** - Manage your contacts
- 🚀 **Campaigns** - Track your projects
- 🎨 **Premium UI** - Beautiful dark theme design

Enjoy building with ScaleQmarketing! 🚀
