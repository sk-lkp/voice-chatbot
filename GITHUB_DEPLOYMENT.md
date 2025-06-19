# 🚀 GitHub Deployment Guide

This guide shows you how to deploy your Voice Bot using GitHub and various hosting platforms.

## 📋 **Prerequisites**

1. **GitHub Account** - [github.com](https://github.com)
2. **Git installed** on your computer
3. **Your voice bot code** ready

## 🔄 **Step 1: Push Code to GitHub**

### If you haven't created a repository yet:

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit changes
git commit -m "Initial commit: Voice Bot with ChatGPT integration"

# Create repository on GitHub.com first, then:
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

### If you already have a repository:

```bash
git add .
git commit -m "Add voice bot deployment configs"
git push
```

## 🌟 **Option 1: Deploy to Vercel (Recommended)**

### Step 1: Connect to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Sign up with your GitHub account
3. Click "New Project"
4. Import your GitHub repository
5. Configure settings:
   - **Framework Preset:** Node.js
   - **Root Directory:** `./`
   - **Build Command:** `npm install`
   - **Output Directory:** `public`
   - **Install Command:** `npm install`

### Step 2: Add Environment Variables
1. In Vercel dashboard, go to your project
2. Click "Settings" → "Environment Variables"
3. Add:
   - **Name:** `OPENAI_API_KEY`
   - **Value:** Your OpenAI API key
   - **Environment:** Production, Preview, Development

### Step 3: Deploy
1. Click "Deploy"
2. Your app will be live at: `https://your-app-name.vercel.app`

### Step 4: Auto-Deploy with GitHub Actions
1. Get your Vercel tokens:
   - Go to Vercel → Settings → Tokens
   - Create new token
   - Copy Project ID and Org ID from project settings

2. Add GitHub Secrets:
   - Go to your GitHub repo → Settings → Secrets and variables → Actions
   - Add these secrets:
     - `VERCEL_TOKEN` = Your Vercel token
     - `ORG_ID` = Your Vercel org ID
     - `PROJECT_ID` = Your Vercel project ID

3. Push code - it will auto-deploy!

---

## 🚂 **Option 2: Deploy to Railway**

### Step 1: Connect to Railway
1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your repository

### Step 2: Add Environment Variables
1. Go to "Variables" tab
2. Add:
   - `OPENAI_API_KEY` = Your OpenAI API key

### Step 3: Auto-Deploy with GitHub Actions
1. Get Railway token:
   - Go to Railway → Account → Tokens
   - Create new token

2. Add GitHub Secret:
   - Go to GitHub repo → Settings → Secrets → Actions
   - Add: `RAILWAY_TOKEN` = Your Railway token

3. Push code - it will auto-deploy!

---

## 🐳 **Option 3: Deploy to Heroku**

### Step 1: Setup Heroku
```bash
# Install Heroku CLI
# Download from: https://devcenter.heroku.com/articles/heroku-cli

# Login to Heroku
heroku login

# Create app
heroku create your-voice-bot-name

# Add environment variables
heroku config:set OPENAI_API_KEY=your_api_key_here
```

### Step 2: Deploy
```bash
# Deploy to Heroku
git push heroku main

# Open your app
heroku open
```

---

## 📱 **Option 4: GitHub Pages (Static Frontend Only)**

**Note:** This only works for the frontend since GitHub Pages doesn't support Node.js servers.

### Step 1: Create Static Version
1. Create a `docs` folder
2. Copy `public` folder contents to `docs`
3. Add a simple API proxy or use demo mode only

### Step 2: Enable GitHub Pages
1. Go to repo Settings → Pages
2. Source: "Deploy from a branch"
3. Branch: `main`
4. Folder: `/docs`
5. Click "Save"

Your app will be at: `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME`

---

## 🔧 **Environment Variables Setup**

For all deployments, you need these environment variables:

| Platform | How to Add |
|----------|------------|
| **Vercel** | Settings → Environment Variables |
| **Railway** | Variables tab |
| **Heroku** | `heroku config:set KEY=value` |
| **GitHub Actions** | Repository Secrets |

**Required Variables:**
- `OPENAI_API_KEY` = Your OpenAI API key
- `PORT` = 3000 (or platform default)

---

## 🎯 **Post-Deployment Checklist**

- [ ] Test voice recognition (requires HTTPS)
- [ ] Test text input functionality
- [ ] Test text-to-speech
- [ ] Verify demo mode works
- [ ] Check mobile responsiveness
- [ ] Test with different browsers
- [ ] Monitor API usage

---

## 🆘 **Troubleshooting**

### GitHub Actions Fail
- Check workflow logs in Actions tab
- Verify secrets are set correctly
- Ensure all dependencies are in `package.json`

### Deployment Fails
- Check build logs
- Verify environment variables
- Ensure `server.js` is the main file

### Speech Recognition Issues
- Must use HTTPS (GitHub Pages provides this)
- Check browser permissions
- Try Chrome or Edge

---

## 💡 **Pro Tips**

1. **Use Demo Mode First** - Deploy without API key to test
2. **Monitor Deployments** - Check GitHub Actions tab
3. **Set Up Branch Protection** - Prevent broken deployments
4. **Use Custom Domains** - Most platforms support this
5. **Monitor API Usage** - Avoid quota limits

---

## 🎉 **Your Voice Bot is Live!**

Once deployed, your voice bot will be accessible to anyone with the URL. Share it and let people test with questions like:

- "What's your #1 superpower?"
- "What should we know about your life story?"
- "How do you push your boundaries?"

**Happy deploying! 🚀** 