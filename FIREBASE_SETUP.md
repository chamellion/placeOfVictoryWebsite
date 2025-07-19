# Firebase Setup for Carousel

This guide explains how to set up Firebase to power the dynamic carousel on the website.

## 1. Firebase Project Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select an existing one
3. Enable Firestore Database
4. Set up Firebase Storage (for carousel images)

## 2. Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
REACT_APP_FIREBASE_API_KEY=your_firebase_api_key_here
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
```

## 3. Firestore Collection Structure

Create a collection called `carousel` with the following document structure:

```json
{
  "imageUrl": "https://firebasestorage.googleapis.com/...",
  "headline": "Welcome to RCCG Place of Victory",
  "subheadline": "Join us in worship, community, and service",
  "ctaText": "Learn More",
  "ctaLink": "/about",
  "isVisible": true,
  "order": 1,
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

### Field Descriptions:

#### Required Fields:
- `imageUrl`: Public Firebase Storage URL of the carousel image (must be a valid HTTP/HTTPS URL)
- `headline`: Main title displayed on the slide (non-empty string)
- `subheadline`: Subtitle displayed below the headline (non-empty string)
- `isVisible`: Boolean to show/hide the slide on the homepage
- `order`: Numeric order for sorting slides (non-negative integer)

#### Optional Fields:
- `ctaText`: Call-to-action button text (string, can be empty)
- `ctaLink`: Call-to-action button link (string, can be empty or relative/absolute URL)
- `createdAt`: Firestore timestamp of creation (auto-added by dashboard)
- `updatedAt`: Firestore timestamp of last update (auto-updated by dashboard)

### Validation Rules:
- All required fields must be present and non-empty
- `imageUrl` must be a valid HTTP/HTTPS URL
- `ctaLink` must be a valid URL (relative paths starting with `/` are allowed)
- `order` must be a non-negative number
- `isVisible` must be a boolean value

## 4. Firestore Security Rules

Deploy the security rules from `firestore.rules` to enforce schema consistency:

```bash
firebase deploy --only firestore:rules
```

The rules ensure:
- Public read access to all carousel slides
- Write access only for authenticated users (dashboard)
- Schema validation on create/update operations
- URL format validation for imageUrl and ctaLink

## 5. Testing

1. Start the development server: `npm start`
2. Check the browser console for logs showing fetched slide count
3. Add new slides in the Firebase console and refresh the page to see them appear
4. Test validation by creating slides with missing required fields

## 6. Dashboard Integration

The same `carousel` collection can be used by your dashboard to manage carousel content. The dashboard should:

- Set `createdAt` and `updatedAt` timestamps automatically
- Validate all required fields before saving
- Ensure `order` values are unique and sequential
- Handle image uploads to Firebase Storage and store the public URL in `imageUrl`

## 7. Error Handling

The frontend includes comprehensive error handling:

- **Missing Required Fields**: Slides with missing required fields are logged and skipped
- **Invalid URLs**: Invalid image URLs fall back to a default image
- **Empty Collections**: Graceful fallback to static content when no valid slides exist
- **Network Errors**: User-friendly error messages with refresh options

## 8. Development Logging

In development mode, the console will show:
- Number of valid slides fetched
- Warnings for invalid slides
- Image loading errors
- Validation failures

## Troubleshooting

- **No slides loading**: Check Firebase configuration and Firestore rules
- **Images not displaying**: Verify Firebase Storage URLs are public and valid
- **Validation errors**: Check console for specific field validation failures
- **Console errors**: Check browser console for detailed error messages
- **Security rule violations**: Ensure your dashboard is authenticated and follows the schema 