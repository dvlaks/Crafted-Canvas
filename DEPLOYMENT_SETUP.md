# Deployment Setup Guide

This document explains how to set up automated deployment for your portfolio using GitHub Actions and Vercel.

## Prerequisites

1. **GitHub Repository** - Your code should be in a GitHub repository
2. **Vercel Account** - Sign up at [vercel.com](https://vercel.com)

## Vercel Setup

### 1. Create Vercel Project

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your GitHub repository
4. Configure build settings:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm ci`

### 2. Get Required Tokens and IDs

#### Vercel Token
1. Go to [Vercel Account Settings](https://vercel.com/account/tokens)
2. Create a new token with a descriptive name
3. Copy the token (you'll only see it once)

#### Project ID
1. Go to your project in Vercel Dashboard
2. Click on "Settings" tab
3. Under "General", you'll find your **Project ID**

#### Organization ID
1. Go to [Vercel Team Settings](https://vercel.com/teams)
2. Under "General", you'll find your **Team ID** (this is your Org ID)
3. If you're using a personal account, this might be under your personal settings

## GitHub Secrets Setup

Add these secrets to your GitHub repository:

1. Go to your GitHub repository
2. Click on "Settings" tab
3. Click on "Secrets and variables" > "Actions"
4. Click "New repository secret" for each:

### Required Secrets:

- **VERCEL_TOKEN**: Your Vercel API token
- **ORG_ID**: Your Vercel organization/team ID
- **PROJECT_ID**: Your Vercel project ID

### Optional Secrets (for enhanced features):

- **LHCI_GITHUB_APP_TOKEN**: For Lighthouse CI GitHub integration

## Manual Deployment (Alternative)

If you prefer manual deployment or don't want to set up the secrets:

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

## Troubleshooting

### Common Issues:

1. **"Input required and not supplied: vercel-token"**
   - Make sure `VERCEL_TOKEN` is added to GitHub secrets
   - Check the secret name matches exactly (case-sensitive)

2. **Build fails on Vercel**
   - Ensure your `vercel.json` configuration is correct
   - Check that all dependencies are in `package.json`

3. **Deploy job doesn't run**
   - If secrets are not configured, the deploy jobs will be skipped
   - This is normal and expected behavior

## CI/CD Pipeline

The GitHub Actions workflow includes:

- ✅ **Testing**: Runs all tests
- ✅ **Linting**: Code quality checks
- ✅ **Building**: Verifies production build
- ✅ **Security Scanning**: Vulnerability checks
- ✅ **Accessibility Testing**: Lighthouse CI
- 🚀 **Deployment**: Automatic deploy to Vercel (when secrets are configured)

## Success Criteria

Your deployment is working correctly when:

1. All CI/CD jobs pass ✅
2. Build completes successfully ✅
3. Tests pass ✅
4. Linting passes ✅
5. Security scan completes ✅
6. Site is accessible via Vercel URL 🌐

## Support

If you encounter issues:

1. Check the [GitHub Actions logs](../../actions)
2. Verify your `vercel.json` configuration
3. Ensure all secrets are properly configured
4. Check Vercel deployment logs in your Vercel dashboard

---

**Note**: The CI/CD pipeline will work perfectly even without deployment secrets. The core functionality (testing, building, linting) will always run, ensuring code quality.
