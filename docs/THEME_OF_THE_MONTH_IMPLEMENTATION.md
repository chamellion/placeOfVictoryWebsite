# Theme of the Month Implementation

## Overview
The Theme of the Month feature displays an inspirational section on the homepage with a bold title and a standalone image below. It's visually distinct from the Confession of the Month section and can be dynamically configured through Firestore with real-time updates.

## Features

### 🎨 Design Features
- **Clean layout**: Title above, standalone image below
- **Neutral background**: Light gray (`bg-gray-50`) for subtle appearance
- **Dynamic typography** with support for sans, serif, and display fonts
- **Customizable text colors** from Firestore
- **Responsive image**: Centered, rounded, with shadow
- **Smooth animations** with fade-in effects
- **Mobile-first responsive design**
- **Loading skeleton** while fetching data
- **Graceful error handling** with fallback message

### 🔧 Technical Features
- **Real-time Firestore updates** using `onSnapshot`
- **Type-safe data validation**
- **Comprehensive error handling**
- **Performance optimized** with proper loading states
- **Accessible design** with semantic HTML
- **Lazy image loading** for better performance

## Firestore Data Structure

### Collection: `theme_of_the_month`
### Document: `active`

```javascript
{
  title: "string",                    // Required - Main theme title
  subtitle: "string",                // Optional - Subtitle text
  imageUrl: "string",                // Required - URL to standalone image
  textColor: "string",               // Optional - Text color (hex, default: #1f2937)
  fontFamily: "sans" | "serif" | "display", // Optional - Font family
  createdAt: "timestamp",           // Auto-generated
  updatedAt: "timestamp"            // Auto-generated
}
```

## Font Families

- **sans**: Default system sans-serif font
- **serif**: System serif font (Times, Georgia, etc.)
- **display**: Playfair Display (elegant serif font)

## Component Structure

### Layout
- **Background**: `bg-gray-50` (light gray)
- **Padding**: `px-4 md:px-12 py-12` (responsive padding)
- **Max width**: `max-w-4xl` (centered content)

### Title Section
- **Title**: `text-3xl md:text-5xl font-bold` with dynamic font and color
- **Subtitle**: `text-lg md:text-2xl opacity-80` (optional)
- **Animation**: `animate-fade-in` and `animate-fade-in-delay`

### Image Section
- **Image**: `max-w-3xl w-full rounded-lg shadow-md object-contain`
- **Centered**: `flex justify-center`
- **Responsive**: Scales properly on all devices
- **Loading**: `loading="lazy"` for performance

## Setup Instructions

### 1. Run the Setup Script
```bash
node setup-theme-of-the-month.js
```

### 2. Manual Firestore Setup
1. Go to Firebase Console > Firestore
2. Create collection: `theme_of_the_month`
3. Create document with ID: `active`
4. Add the required fields

### 3. Sample Data

#### Basic Theme
```javascript
{
  title: "Walking in Victory",
  subtitle: "Embracing God's promises for breakthrough and transformation",
  imageUrl: "https://your-image-url.com/image.jpg",
  textColor: "#1f2937",
  fontFamily: "display"
}
```

#### Alternative Theme
```javascript
{
  title: "Faith Over Fear",
  subtitle: "Trusting in God's perfect love that casts out all fear",
  imageUrl: "https://your-image-url.com/image.jpg",
  textColor: "#1e3a8a",
  fontFamily: "serif"
}
```

## Component Usage

The component is automatically integrated into the Home page and positioned between the Hero Carousel and Welcome section (above Confession of the Month).

```jsx
import ThemeOfTheMonth from '../components/ThemeOfTheMonth';

// In your Home.jsx
<ThemeOfTheMonth />
```

## Styling Customization

### Tailwind Classes Used
- `font-display`: Playfair Display font family
- `animate-fade-in`: Fade-in animation
- `animate-fade-in-delay`: Delayed fade-in animation
- `bg-gray-50`: Light gray background
- `max-w-3xl`: Maximum width for content
- `rounded-lg shadow-md`: Image styling

### CSS Animations
```css
@keyframes fadeIn {
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
}
```

## Error Handling

The component handles various error scenarios:
- **Firebase not initialized**: Shows fallback message
- **Document not found**: Shows fallback message
- **Invalid data**: Shows fallback message
- **Missing imageUrl**: Shows fallback message
- **Network errors**: Shows fallback message

### Fallback Message
```jsx
<p className="text-gray-500 italic text-lg">
  Theme of the Month coming soon — check back later!
</p>
```

## Performance Considerations

- **Real-time updates**: Uses `onSnapshot` for live data
- **Lazy loading**: Images load only when needed
- **Error boundaries**: Graceful degradation on errors
- **Optimized images**: Use compressed, web-optimized images
- **Font loading**: Google Fonts preloaded for performance

## Accessibility Features

- **Semantic HTML**: Uses `<section>` element
- **Alt text**: Images have descriptive alt attributes
- **Color contrast**: Validates text color against background
- **Screen reader friendly**: Proper heading hierarchy
- **Keyboard navigation**: No interactive elements that require focus

## Best Practices

### For Content Managers
1. **Keep titles concise** (under 50 characters for mobile)
2. **Use high-quality images** (minimum 1200x800px)
3. **Ensure text contrast** (dark text on light background)
4. **Test on mobile devices** before publishing
5. **Choose appropriate font families** for your theme

### For Developers
1. **Monitor Firestore usage** for cost optimization
2. **Cache images** for better performance
3. **Validate data** before displaying
4. **Handle loading states** gracefully
5. **Test real-time updates** work correctly

## Troubleshooting

### Component Not Showing
- Check Firestore rules allow public read access
- Verify document exists with ID 'active'
- Check browser console for errors
- Ensure Firebase is properly initialized

### Image Not Loading
- Verify image URL is accessible
- Check image format (JPG, PNG, WebP)
- Ensure image is publicly accessible
- Test image URL in browser

### Font Not Loading
- Check Google Fonts is loading
- Verify font family value is correct
- Check network connectivity
- Clear browser cache

### Real-time Updates Not Working
- Verify `onSnapshot` is properly set up
- Check Firestore rules allow read access
- Ensure component is properly mounted/unmounted
- Check for console errors

## Visual Distinction from Confession of the Month

### Theme of the Month
- **Layout**: Title + standalone image
- **Background**: Light gray (`bg-gray-50`)
- **Image**: Centered, rounded, with shadow
- **Purpose**: Inspirational theme with visual impact

### Confession of the Month
- **Layout**: Text overlay on background image
- **Background**: Full-width background image
- **Image**: Background with gradient overlay
- **Purpose**: Text-focused confession/declaration

## Future Enhancements

- **Multiple themes**: Support for different themes per month
- **A/B testing**: Test different themes
- **Analytics**: Track theme engagement
- **Admin interface**: Web-based theme editor
- **Scheduled themes**: Auto-switch themes on dates
- **Image optimization**: Automatic image compression
- **Caching**: Client-side caching for better performance
