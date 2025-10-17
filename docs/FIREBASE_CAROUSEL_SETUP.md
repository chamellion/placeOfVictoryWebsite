# Firebase Carousel Setup Guide

This guide will help you set up Firebase to power the dynamic carousel on your website.

## 🚨 IMPORTANT: Environment Variables Required

The carousel requires Firebase configuration to work. Without proper environment variables, it will fall back to static content.

## Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select an existing one
3. Enable Firestore Database
4. Set up Firebase Storage (for carousel images)

## Step 2: Get Firebase Configuration

1. In Firebase Console, go to **Project Settings** (gear icon)
2. Scroll down to **Your apps** section
3. Click **Add app** → **Web** if you don't have a web app
4. Copy the configuration values

## Step 3: Create Environment File

Create a `.env.local` file in the root directory with your Firebase values:

```env
REACT_APP_FIREBASE_API_KEY=your_actual_api_key_here
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
REACT_APP_FIREBASE_MEASUREMENT_ID=your_measurement_id_here
```

**Example:**
```env
REACT_APP_FIREBASE_API_KEY=AIzaSyC1234567890abcdefghijklmnopqrstuvwxyz
REACT_APP_FIREBASE_AUTH_DOMAIN=my-church-website.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=my-church-website
REACT_APP_FIREBASE_STORAGE_BUCKET=my-church-website.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=123456789012
REACT_APP_FIREBASE_APP_ID=1:123456789012:web:abcdef1234567890
```

## Step 4: Set Up Firestore Collection

1. In Firebase Console, go to **Firestore Database**
2. Create a collection called `carousel`
3. Add documents with this structure:

```json
{
  "imageUrl": "https://firebasestorage.googleapis.com/v0/b/rccgplaceofvictory.firebasestorage.app/o/carousel%2F1752351738596_church-building.jpg?alt=media&token=7ac76fb9-67cd-4559-a6b2-1e9c902d57fb",
  "headline": "dancing_in_church",
  "subheadline": "carousel_image",
  "ctaText": "",
  "ctaLink": "",
  "isVisible": true,
  "order": 0,
  "createdAt": "2025-07-12T20:23:12.000Z",
  "updatedAt": "2025-07-12T20:54:49.000Z"
}
```

### Required Fields:
- `imageUrl`: Public Firebase Storage URL (must start with `https://`)
- `headline`: Main title (non-empty string)
- `subheadline`: Subtitle (non-empty string)
- `isVisible`: Boolean (true to show, false to hide)
- `order`: Number (for sorting, 0, 1, 2, etc.)

### Optional Fields:
- `ctaText`: Call-to-action button text
- `ctaLink`: Call-to-action button link
- `createdAt`: Creation timestamp
- `updatedAt`: Last update timestamp

## Step 5: Upload Images to Firebase Storage

1. In Firebase Console, go to **Storage**
2. Create a folder called `carousel`
3. Upload your carousel images
4. For each image:
   - Right-click → **Get download URL**
   - Copy the URL and use it as the `imageUrl` in your Firestore document

## Step 6: Deploy Firestore Rules

The project includes security rules in `firestore.rules`. Deploy them:

```bash
# Install Firebase CLI if you haven't
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize Firebase (if not already done)
firebase init

# Deploy rules
firebase deploy --only firestore:rules
```

## Step 7: Test the Integration

1. Start your development server: `npm start`
2. Open browser console (F12)
3. Look for Firebase logs:
   - `[Firebase] Configuration check:`
   - `[Firebase] Successfully initialized with project:`
   - `[Firebase] Fetching carousel slides from collection:`
   - `[Firebase] Carousel slides summary:`

## Troubleshooting

### No slides loading?
1. Check browser console for errors
2. Verify `.env.local` file exists and has correct values
3. Ensure Firestore collection `carousel` exists
4. Check that documents have `isVisible: true`

### Images not displaying?
1. Verify `imageUrl` starts with `https://`
2. Check that Firebase Storage URLs are public
3. Ensure images are uploaded to Firebase Storage
4. Test image URLs directly in browser

### Configuration errors?
1. Restart development server after creating `.env.local`
2. Check that all environment variables are set
3. Verify Firebase project ID matches your project

### Permission errors?
1. Check Firestore security rules
2. Ensure `carousel` collection allows public reads
3. Verify Firebase project settings

## Development Logging

The app includes comprehensive logging in development mode:

- **Configuration**: Shows which Firebase settings are loaded
- **Initialization**: Confirms Firebase is properly initialized
- **Data Fetching**: Shows how many slides were found and processed
- **Validation**: Warns about invalid slides
- **Image Loading**: Confirms when images load successfully

## Production Deployment

For production, ensure:
1. Environment variables are set in your hosting platform
2. Firebase project is in production mode
3. Firestore rules are deployed
4. Images are publicly accessible

## Support

If you're still having issues:
1. Check the browser console for detailed error messages
2. Verify all steps in this guide were completed
3. Ensure Firebase project is active and billing is set up
4. Test with a simple slide first before adding multiple slides 