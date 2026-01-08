# ScaleQmarketing Deployment Guide

## Step 1: Set Up Supabase

1. **Create a Supabase Project**
   - Go to [supabase.com](https://supabase.com)
   - Click "New Project"
   - Choose your organization
   - Enter project details:
     - Name: `scaleqmarketing`
     - Database Password: (save this securely)
     - Region: Choose closest to your users

2. **Run Database Schema**
   - Go to SQL Editor in Supabase dashboard
   - Copy the contents of `database-schema.sql`
   - Paste and run the SQL
   - Verify tables are created in Table Editor

3. **Get API Credentials**
   - Go to Project Settings > API
   - Copy these values:
     - `Project URL` → `VITE_SUPABASE_URL`
     - `anon public` key → `VITE_SUPABASE_ANON_KEY`
     - `service_role` key → `SUPABASE_SERVICE_ROLE_KEY`

## Step 2: Get Google Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Click "Create API Key"
3. Copy the key → `VITE_GEMINI_API_KEY`

## Step 3: Get Resend API Key (Optional)

1. Go to [resend.com](https://resend.com)
2. Sign up and verify your email
3. Go to API Keys
4. Create a new API key
5. Copy the key → `RESEND_API_KEY`

## Step 4: Local Development Setup

1. **Create .env file**
   ```bash
   cp .env.example .env
   ```

2. **Add your credentials to .env**
   ```env
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   VITE_GEMINI_API_KEY=your_gemini_key
   RESEND_API_KEY=your_resend_key
   VITE_API_URL=http://localhost:5000
   ```

3. **Install dependencies**
   ```bash
   npm install
   cd api && npm install && cd ..
   ```

4. **Run development servers**
   
   Terminal 1 (Frontend):
   ```bash
   npm run dev
   ```
   
   Terminal 2 (Backend):
   ```bash
   cd api
   npm run dev
   ```

5. **Test the application**
   - Open http://localhost:3000
   - Create an account
   - Test all features

## Step 5: Deploy to Vercel

### Option A: Deploy via Vercel Dashboard

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit - ScaleQmarketing platform"
   git push origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository
   - Configure project:
     - Framework Preset: Vite
     - Root Directory: `./`
     - Build Command: `npm run build`
     - Output Directory: `dist`

3. **Add Environment Variables**
   
   In Vercel project settings, add:
   ```
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   VITE_GEMINI_API_KEY=your_gemini_key
   RESEND_API_KEY=your_resend_key
   VITE_API_URL=https://your-project.vercel.app
   ```

4. **Deploy**
   - Click "Deploy"
   - Wait for deployment to complete
   - Visit your site at the provided URL

### Option B: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```

4. **Add environment variables**
   ```bash
   vercel env add VITE_SUPABASE_URL
   vercel env add VITE_SUPABASE_ANON_KEY
   vercel env add SUPABASE_SERVICE_ROLE_KEY
   vercel env add VITE_GEMINI_API_KEY
   vercel env add RESEND_API_KEY
   vercel env add VITE_API_URL
   ```

5. **Deploy to production**
   ```bash
   vercel --prod
   ```

## Step 6: Configure Custom Domain

1. **In Vercel Dashboard**
   - Go to your project
   - Click "Settings" > "Domains"
   - Click "Add Domain"
   - Enter your domain name

2. **Configure DNS**
   - Add the DNS records provided by Vercel
   - Wait for DNS propagation (can take up to 48 hours)

3. **Update Environment Variables**
   - Update `VITE_API_URL` to your custom domain
   - Redeploy the project

## Step 7: Post-Deployment Checklist

- [ ] Test user registration
- [ ] Test login/logout
- [ ] Test lead creation
- [ ] Test campaign creation
- [ ] Test AI assistant
- [ ] Test analytics dashboard
- [ ] Verify all pages load correctly
- [ ] Test on mobile devices
- [ ] Check browser console for errors
- [ ] Verify email notifications (if configured)

## Troubleshooting

### Build Fails
- Check all environment variables are set
- Verify Node.js version (18+)
- Clear cache: `rm -rf node_modules package-lock.json && npm install`

### API Not Working
- Verify `VITE_API_URL` is set correctly
- Check Supabase credentials
- Verify database schema is created
- Check browser console for CORS errors

### Authentication Issues
- Verify Supabase URL and keys
- Check if email confirmation is required in Supabase settings
- Verify RLS policies are enabled

### AI Assistant Not Working
- Verify Gemini API key is valid
- Check API quota limits
- Look for errors in browser console

## Monitoring and Maintenance

1. **Monitor Vercel Analytics**
   - Check deployment logs
   - Monitor function execution times
   - Track error rates

2. **Monitor Supabase**
   - Check database usage
   - Monitor API requests
   - Review authentication logs

3. **Regular Updates**
   - Keep dependencies updated
   - Monitor security advisories
   - Backup database regularly

## Support

If you encounter issues:
1. Check the browser console for errors
2. Review Vercel deployment logs
3. Check Supabase logs
4. Verify all environment variables are set correctly

For additional help, refer to:
- [Vercel Documentation](https://vercel.com/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Vite Documentation](https://vitejs.dev)
