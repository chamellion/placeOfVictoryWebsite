# Confession of the Month - Setup Guide

## 🎯 **Overview**

The Confession of the Month section has been successfully implemented on your church website homepage. It replaces the previous Mission & Vision section and provides a dynamic, admin-controlled way to share monthly confessions, Bible verses, or spiritual declarations.

## 🏗️ **What Was Implemented**

### **1. New Component**
- **File**: `src/components/ConfessionOfTheMonth.jsx`
- **Features**: Dynamic content, responsive design, beautiful animations
- **Background Modes**: Image (with parallax) or solid color
- **Real-time Updates**: Uses Firestore `onSnapshot` for live updates

### **2. Updated Homepage**
- **File**: `src/pages/Home.jsx`
- **Changes**: Replaced Mission & Vision section with Confession of the Month
- **Position**: Between Community Services and Service Times sections

### **3. Firestore Rules**
- **Collection**: `confession_of_the_month`
- **Access**: Public read, authenticated write (admin dashboard)
- **Document ID**: `active` (for the current confession)

## 📋 **Firestore Document Structure**

Create a document in the `confession_of_the_month` collection with ID `active`:

```json
{
  "title": "Confession of the Month",
  "text": "I am blessed and highly favored by God. His grace is sufficient for me, and His strength is made perfect in my weakness.\n\nI walk in victory because Christ has overcome the world. I am more than a conqueror through Him who loves me.\n\nScripture References: 2 Corinthians 12:9, John 16:33, Romans 8:37",
  "backgroundMode": "image",
  "backgroundImageUrl": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
  "backgroundColor": "#f9fafb",
  "textColor": "#ffffff",
  "createdAt": "2025-01-01T00:00:00.000Z"
}
```

### **Field Descriptions**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | string | ✅ | Main heading (e.g., "Confession of the Month") |
| `text` | string | ✅ | Confession text (use `\n\n` for paragraph breaks) |
| `backgroundMode` | enum | ✅ | Either `"image"` or `"color"` |
| `backgroundImageUrl` | string | ⚠️ | Required if `backgroundMode = "image"` |
| `backgroundColor` | string | ❌ | Default: `#f9fafb` (light gray) |
| `textColor` | string | ❌ | Default: `#111827` (dark gray) |
| `createdAt` | timestamp | ❌ | Auto-managed by client |

## 🎨 **Background Mode Examples**

### **Image Background Mode**
```json
{
  "backgroundMode": "image",
  "backgroundImageUrl": "https://example.com/church-image.jpg",
  "textColor": "#ffffff"
}
```
- **Effect**: Parallax-style background with dark overlay
- **Best for**: Dramatic, impactful presentations
- **Text Color**: Usually white for readability

### **Color Background Mode**
```json
{
  "backgroundMode": "color",
  "backgroundColor": "#1f2937",
  "textColor": "#ffffff"
}
```
- **Effect**: Solid color background
- **Best for**: Clean, minimalist look
- **Text Color**: Choose for optimal contrast

## 🚀 **How to Set Up**

### **1. Create the Collection**
1. Go to Firebase Console → Firestore
2. Create collection: `confession_of_the_month`
3. Create document with ID: `active`

### **2. Add Sample Content**
Use the JSON structure above as a starting point. Customize:
- **Title**: Your monthly confession theme
- **Text**: Your confession with Bible references
- **Background**: Choose image or color mode
- **Colors**: Ensure good contrast for readability

### **3. Test the Display**
- Visit your homepage
- The confession should appear between Community Services and Service Times
- Check mobile responsiveness
- Verify text readability

## 🔧 **Admin Dashboard Integration**

Your existing admin dashboard can now:
- ✅ **Create** new confessions
- ✅ **Update** the active confession
- ✅ **Change** background modes and colors
- ✅ **Manage** content in real-time

## 📱 **Responsive Design Features**

- **Mobile**: Single column, optimized typography
- **Tablet**: Medium typography, centered layout
- **Desktop**: Large typography, maximum impact
- **Animations**: Subtle fade-in effects
- **Loading**: Skeleton loader while fetching data

## 🎭 **Animation Details**

- **Title**: Fade-in animation
- **Text**: Fade-in-up with 0.2s delay
- **Background**: Smooth transitions
- **Decorative Elements**: Subtle pulsing circles

## 🔍 **Troubleshooting**

### **Confession Not Showing?**
1. Check Firestore collection exists: `confession_of_the_month`
2. Verify document ID is exactly: `active`
3. Ensure all required fields are present
4. Check browser console for errors

### **Background Not Working?**
1. Verify `backgroundMode` is `"image"` or `"color"`
2. For images: ensure `backgroundImageUrl` is valid HTTPS URL
3. For colors: ensure `backgroundColor` is valid hex color

### **Text Not Readable?**
1. Adjust `textColor` for better contrast
2. For dark backgrounds, use light text (`#ffffff`)
3. For light backgrounds, use dark text (`#111827`)

## 🎉 **Next Steps**

1. **Create your first confession** in Firestore
2. **Test the display** on your homepage
3. **Customize colors and styling** as needed
4. **Update monthly** with new confessions
5. **Integrate with admin dashboard** for easy management

The Confession of the Month section is now fully integrated and ready to inspire your congregation! 🚀
