# Quick Setup Guide for RCCG Place of Victory

## 🚀 Your Firebase Project is Already Set Up!

Great news! You already have a Firebase project with carousel data. Here's what you need to do to connect your client app:

## Step 1: Update Your `.env.local` File

Replace the placeholder values in your `.env.local` file with these actual values:

```env
REACT_APP_FIREBASE_API_KEY=your_actual_api_key_here
REACT_APP_FIREBASE_AUTH_DOMAIN=rccgplaceofvictory.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=rccgplaceofvictory
REACT_APP_FIREBASE_STORAGE_BUCKET=rccgplaceofvictory.firebasestorage.app
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_actual_messaging_sender_id
REACT_APP_FIREBASE_APP_ID=your_actual_app_id
REACT_APP_FIREBASE_MEASUREMENT_ID=your_actual_measurement_id
```

**To get the missing values:**
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your `rccgplaceofvictory` project
3. Go to **Project Settings** (gear icon)
4. Scroll down to **Your apps** section
5. Copy the missing values from your web app configuration

## Step 2: Verify Your Data Structure

Your existing data structure is perfect! The collection `carousel` already contains:

- ✅ **Collection name**: `carousel` (not `carouselSlides`)
- ✅ **Document structure**: Matches our expected format
- ✅ **Image URLs**: Using Firebase Storage correctly
- ✅ **Visibility**: `isVisible: true` for active slides
- ✅ **Ordering**: `order` field for sorting

## Step 3: Test the Integration

1. **Update `.env.local`** with your actual Firebase values
2. **Restart the development server**:
   ```bash
   npm start
   ```
3. **Check browser console** for success messages:
   ```
   [Firebase] Configuration check:
   [Firebase] Project ID: rccgplaceofvictory
   [Firebase] Successfully initialized with project: rccgplaceofvictory
   [Firebase] Fetching carousel slides from collection: carousel
   [Firebase] Found X total documents in carousel collection
   [Firebase] Carousel slides summary: - Valid slides: X
   ```

## Step 4: Verify Your Carousel Data

Your existing slide data:
- **Image**: `1752351738596_church-building.jpg`
- **Headline**: `dancing_in_church`
- **Subheadline**: `carousel_image`
- **Order**: `0`
- **Visible**: `true`

## 🎯 Expected Results

After updating `.env.local` and restarting the server, you should see:

1. **Dynamic carousel** loading your Firebase images
2. **Real-time updates** when you add/modify slides via your dashboard
3. **Proper fallback** to static content if Firebase is unavailable
4. **Console logs** showing successful data fetching

## 🔧 Troubleshooting

### Still seeing "your_project_id" errors?
- Make sure you updated `.env.local` with real values
- Restart the development server after changes
- Check that all environment variables are set

### No slides loading?
- Verify your `carousel` collection has documents with `isVisible: true`
- Check that `imageUrl` values are valid Firebase Storage URLs
- Ensure Firestore rules allow public reads

### Images not displaying?
- Test the image URLs directly in browser
- Verify Firebase Storage files are publicly accessible
- Check that the `carousel/` folder exists in Storage

## 📱 Dashboard Integration

Your existing dashboard app should continue to work perfectly. The client app will automatically consume any changes you make through the dashboard, including:

- New carousel slides
- Updated content
- Visibility changes
- Reordering

## 🚀 Next Steps

1. **Test with current data** - Verify the carousel loads your existing slides
2. **Add new slides** - Use your dashboard to add more carousel content
3. **Customize styling** - Modify the carousel appearance if needed
4. **Deploy to production** - Ensure environment variables are set in your hosting platform

The integration is now configured to work with your existing Firebase project structure! 