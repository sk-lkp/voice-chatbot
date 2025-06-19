# 🚀 Deployment Guide

Choose your preferred hosting platform and follow the steps below:

## 🌟 **Recommended: Vercel (Easiest)**

### Step 1: Prepare Your Code
1. Make sure all files are committed to GitHub
2. Ensure your `.env` file is NOT in the repository (it's in `.gitignore`)

### Step 2: Deploy to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Sign up with your GitHub account
3. Click "New Project"
4. Import your GitHub repository
5. Add environment variables:
   - Go to Settings → Environment Variables
   - Add `OPENAI_API_KEY` with your API key
6. Click "Deploy"

**Your app will be live at:** `https://your-app-name.vercel.app`

---

## 🚂 **Railway (Good Alternative)**

### Step 1: Deploy to Railway
1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your repository
5. Add environment variables:
   - Go to Variables tab
   - Add `OPENAI_API_KEY` with your API key
6. Railway will auto-deploy

**Your app will be live at:** `https://your-app-name.railway.app`

---

## 🐳 **Heroku (Paid but Reliable)**

### Step 1: Install Heroku CLI
```bash
# Download from: https://devcenter.heroku.com/articles/heroku-cli
```

### Step 2: Deploy
```bash
# Login to Heroku
heroku login

# Create new app
heroku create your-voice-bot-name

# Add environment variables
heroku config:set OPENAI_API_KEY=your_api_key_here

# Deploy
git push heroku main
```

**Your app will be live at:** `https://your-voice-bot-name.herokuapp.com`

---

## ☁️ **DigitalOcean App Platform**

### Step 1: Deploy
1. Go to [DigitalOcean App Platform](https://cloud.digitalocean.com/apps)
2. Click "Create App"
3. Connect your GitHub repository
4. Configure environment variables
5. Deploy

---

## 🔧 **Environment Variables Setup**

For all platforms, you need to set these environment variables:

| Variable | Value | Required |
|----------|-------|----------|
| `OPENAI_API_KEY` | Your OpenAI API key | Yes (for full AI mode) |
| `PORT` | 3000 (or platform default) | No |

---

## 🎯 **Post-Deployment Checklist**

- [ ] Test voice recognition works
- [ ] Test text input works
- [ ] Test text-to-speech works
- [ ] Verify demo mode works without API key
- [ ] Check mobile responsiveness
- [ ] Test with different browsers

---

## 🆘 **Troubleshooting**

### Speech Recognition Not Working
- Ensure you're using HTTPS (required for speech recognition)
- Check browser permissions
- Try Chrome or Edge

### API Errors
- Verify environment variables are set correctly
- Check OpenAI API key is valid
- Ensure you have API credits

### Deployment Fails
- Check build logs for errors
- Verify all dependencies are in `package.json`
- Ensure `server.js` is the main file

---

## 💡 **Pro Tips**

1. **Use Demo Mode for Testing** - Deploy without API key first
2. **Monitor Usage** - Keep track of API calls to avoid quota limits
3. **Custom Domain** - Most platforms support custom domains
4. **Auto-Deploy** - Connect GitHub for automatic deployments
5. **Environment Variables** - Never commit API keys to code

---

## 🎉 **Your Voice Bot is Live!**

Once deployed, share your URL and let people test your voice bot with questions like:
- "What's your #1 superpower?"
- "What should we know about your life story?"
- "How do you push your boundaries?"

Happy deploying! 🚀 