# Site Settings Integration

This document explains how site settings (social media links and contact information) are integrated from Firestore into the client application.

## Overview

The site settings are dynamically fetched from Firestore and displayed throughout the application, specifically in the Footer and Contact page. This allows administrators to update social media links and contact information through the admin dashboard without needing to redeploy the application.

## Database Schema

**Collection**: `settings`  
**Document ID**: `main`

**Data Structure**:
```javascript
{
  contactPhone: string;           // e.g., "01792 424591"
  homeHeroText: string;           // e.g., "Welcome to RCCG Place of Victory"
  socialLinks: {
    facebook?: string;            // e.g., "https://facebook.com/..."
    instagram?: string;           // e.g., "https://instagram.com/..."
    twitter?: string;             // e.g., "https://twitter.com/..."
    youtube?: string;             // e.g., "https://youtube.com/..."
  };
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}
```

## Implementation

### 1. Type Validation (`src/types/SiteSettings.js`)

Created a type definition and validation functions for site settings:
- `isValidSiteSettings(settings)` - Validates the settings object structure
- `isValidSocialUrl(url)` - Validates social media URLs

### 2. Firebase Client Functions (`src/lib/firebaseClient.js`)

Added two functions following the existing codebase patterns:

#### `getSiteSettings()`
Fetches site settings once from Firestore.

```javascript
const result = await getSiteSettings();
if (result.success) {
  console.log(result.settings);
}
```

#### `subscribeToSiteSettings(callback)`
Subscribes to real-time updates of site settings.

```javascript
const unsubscribe = subscribeToSiteSettings((result) => {
  if (result.success) {
    setSettings(result.settings);
  }
});

// Clean up subscription
return () => unsubscribe();
```

### 3. Component Updates

#### Footer Component (`src/components/Footer.jsx`)
- Subscribes to real-time site settings updates
- Displays dynamic social media links (Facebook, Instagram, YouTube)
- Displays dynamic contact phone number
- Falls back to hardcoded values if Firestore is unavailable

**Features:**
- Only renders social media icons if the corresponding URL exists
- Automatically updates when settings change in the database
- Gracefully handles errors with fallback values

#### Contact Page (`src/pages/Contact.jsx`)
- Subscribes to real-time site settings updates
- Displays dynamic social media links in the "Follow Us" section
- Conditionally renders each social media icon only if URL is available
- Falls back to default values if Firestore is unavailable

## Fallback Values

Both components include fallback values to ensure the application works even if:
- Firebase is not initialized
- The settings document doesn't exist
- There's a network error

**Default fallback values:**
```javascript
{
  contactPhone: '01792 424591',
  socialLinks: {
    facebook: 'https://www.facebook.com/share/1AnoUwe1t1/?mibextid=wwXIfr',
    instagram: 'https://www.instagram.com/placeofvictory?igsh=d3JkdW0xc2Fnczl1&utm_source=qr',
    twitter: '',
    youtube: 'https://www.youtube.com/@rccgplaceofvictoryswansea',
  }
}
```

## Best Practices Used

1. **Real-time Updates**: Using `onSnapshot` for automatic UI updates when settings change
2. **Error Handling**: Comprehensive error handling with detailed logging
3. **Validation**: Type checking and validation before rendering
4. **Fallback Strategy**: Graceful degradation with fallback values
5. **Conditional Rendering**: Only show social media icons if URLs are configured
6. **Code Consistency**: Following existing patterns in the codebase
7. **Accessibility**: Proper ARIA labels and semantic HTML
8. **Performance**: Automatic cleanup of subscriptions on component unmount

## Usage in Other Components

To use site settings in other components, follow this pattern:

```javascript
import React, { useState, useEffect } from 'react';
import { subscribeToSiteSettings } from '../lib/firebaseClient';

const MyComponent = () => {
  const [settings, setSettings] = useState(null);
  
  // Fallback values
  const fallbackSettings = {
    contactPhone: '01792 424591',
    socialLinks: { /* ... */ }
  };
  
  // Subscribe to settings
  useEffect(() => {
    const unsubscribe = subscribeToSiteSettings((result) => {
      if (result.success && result.settings) {
        setSettings(result.settings);
      }
    });
    
    return () => unsubscribe();
  }, []);
  
  // Use settings with fallback
  const activeSettings = settings || fallbackSettings;
  
  return (
    // Your component JSX using activeSettings
  );
};
```

## Testing

To test the integration:

1. **Check Current Settings**: Verify settings load correctly from Firestore
2. **Update via Dashboard**: Change settings in the admin dashboard
3. **Verify Real-time Updates**: Confirm changes appear immediately without page refresh
4. **Test Fallbacks**: Disable network or Firebase to verify fallback values work
5. **Test Conditional Rendering**: Remove social media URLs to verify icons hide correctly

## Future Enhancements

Potential improvements for the future:

1. **Settings Context**: Create a React Context to share settings across all components without multiple subscriptions
2. **Caching**: Implement local storage caching for faster initial load
3. **Additional Fields**: Add more configurable fields (e.g., email address, church address)
4. **Email Settings**: Add email configuration for contact forms
5. **Multi-language Support**: Support for multiple language versions of settings

## Troubleshooting

### Settings Not Loading

1. Check Firebase configuration in `.env.local`
2. Verify Firestore rules allow public read access to `settings` collection
3. Check browser console for error messages
4. Verify the `settings/main` document exists in Firestore

### Social Media Icons Not Appearing

1. Verify URLs are properly formatted in Firestore
2. Check that URLs start with `http://` or `https://`
3. Look for validation errors in the browser console
4. Ensure the socialLinks object structure is correct

### Updates Not Reflecting

1. Check if real-time subscription is active
2. Verify component is properly unmounting and cleaning up subscriptions
3. Check for JavaScript errors preventing re-render
4. Clear browser cache if necessary

## Related Files

- `/src/types/SiteSettings.js` - Type definitions and validation
- `/src/lib/firebaseClient.js` - Firebase helper functions
- `/src/components/Footer.jsx` - Footer component with social links
- `/src/pages/Contact.jsx` - Contact page with social links
- `/docs/SITE_SETTINGS_INTEGRATION.md` - This documentation

## Support

For issues or questions about the site settings integration, refer to the codebase patterns or contact the development team.

