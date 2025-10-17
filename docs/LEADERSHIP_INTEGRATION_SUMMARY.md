# Leadership Integration with Firestore - Complete

## ✅ **What Has Been Implemented**

### 1. **Firebase Integration**
- **File**: `src/lib/firebaseClient.js`
- **Function**: `getPublicPastors()` - Fetches active pastors from Firestore `pastors` collection
- **Filtering**: Only pastors with `category == "pastor"` and `isActive == true`
- **Ordering**: Sorted by `customId` (cast to number for proper sorting)
- **Caching**: Uses SWR for efficient data fetching and caching

### 2. **Pastor Type Definition & Validation**
- **File**: `src/types/Pastor.js`
- **Validation**: `isValidPastor()` - Ensures all required fields are present and valid
- **Sorting**: `sortPastorsByCustomId()` - Numeric sorting of customId
- **URL Validation**: Validates image URLs are properly formatted

### 3. **Firestore Security Rules**
- **File**: `firestore.rules`
- **Access**: Public read access to `pastors` collection
- **Validation**: `validatePastor()` function ensures data integrity
- **Deployed**: Rules are live and active

### 4. **Updated About Page**
- **File**: `src/pages/About.jsx`
- **Data Source**: Now fetches from Firestore instead of hardcoded data
- **Loading States**: Shows loading spinner and error handling
- **Fallback UI**: Shows appropriate messages when no data is available
- **Section Title**: Preserved as "Church Leadership"

## 📋 **Pastor Document Structure**

Your Firestore `pastors` collection should contain documents with this structure:

```json
{
  "name": "Jeffrey Nsofor",
  "role": "Lead Pastor",
  "image": "https://example.com/images/jeffrey_nsofor.jpg",
  "bio": "Jeffrey oversees our spiritual direction and leads with wisdom and humility. With over 15 years of pastoral experience, he is passionate about discipleship and community transformation.",
  "customId": "1",
  "category": "pastor",
  "isActive": true,
  "createdAt": "2025-07-19T20:23:12.000Z",
  "updatedAt": "2025-07-19T20:54:49.000Z"
}
```

### **Required Fields:**
- `name` (string) - Pastor's full name
- `role` (string) - Pastor's role/title
- `image` (string) - URL to pastor's image (must be HTTPS)
- `bio` (string) - Pastor's biography
- `customId` (string) - Custom ID for ordering (should be numeric)
- `category` (string) - Must be exactly "pastor"
- `isActive` (boolean) - Whether the pastor is active

### **Optional Fields:**
- `createdAt` (timestamp) - Creation timestamp
- `updatedAt` (timestamp) - Last update timestamp

## 🎯 **How It Works**

### **Data Flow:**
1. **Firestore** → `getPublicPastors()` fetches active pastors
2. **Filtering** → Only pastors with `category == "pastor"` and `isActive == true`
3. **Validation** → `isValidPastor()` filters out invalid pastors
4. **Sorting** → Pastors sorted by `customId` numerically
5. **Display** → Pastors appear in the "Church Leadership" section

### **Display Format:**
- **Name**: Pastor's full name
- **Role**: Pastor's role/title
- **Image**: Pastor's photo (from Firestore image URL)
- **Bio**: Pastor's biography (shown on flip card)

### **FlipCard Integration:**
- Uses existing `FlipCard` component
- Front shows name, role, and image
- Back shows biography
- Maintains existing styling and animations

## 🔧 **Features**

### **✅ Implemented:**
- ✅ Fetch active pastors from Firestore (`category == "pastor"` and `isActive == true`)
- ✅ Sort by `customId` (numeric sorting)
- ✅ Validate required fields
- ✅ Show loading and error states
- ✅ Fallback UI for empty collection
- ✅ SWR caching and revalidation
- ✅ Public read access via Firestore rules
- ✅ Preserved "Church Leadership" section title
- ✅ Maintained existing FlipCard styling

### **🎨 UI/UX:**
- Loading spinner while fetching data
- Error handling with retry option
- "No leadership team members found" message
- Responsive grid layout maintained
- Smooth animations and transitions

## 🚀 **Testing the Integration**

### **1. Add Test Pastors to Firestore:**
Go to Firebase Console → Firestore → `pastors` collection and add a test pastor:

```json
{
  "name": "Test Pastor",
  "role": "Test Role",
  "image": "https://example.com/test-image.jpg",
  "bio": "This is a test pastor to verify the integration.",
  "customId": "1",
  "category": "pastor",
  "isActive": true
}
```

### **2. Check Browser Console:**
Look for these logs:
```
[Firebase] Fetching pastors from collection: pastors
[Firebase] Found X total documents in pastors collection
[About] Pastors data status: { isLoading: false, hasError: false, totalPastors: X, validPastors: X }
```

### **3. Verify Display:**
- Pastor should appear in the "Church Leadership" section
- Image should load from the provided URL
- Name, role, and bio should display correctly
- FlipCard should work with front/back content

## 📱 **Dashboard Integration**

Your existing dashboard can now:
- ✅ Create pastors in the `pastors` collection
- ✅ Update pastor details
- ✅ Set `isActive` to false to hide pastors
- ✅ Control ordering via `customId`
- ✅ All changes will automatically appear in the client app

## 🔍 **Troubleshooting**

### **No pastors showing?**
1. Check browser console for `[Firebase]` error messages
2. Verify `pastors` collection exists in Firestore
3. Ensure pastors have `category: "pastor"` and `isActive: true`
4. Check Firestore rules allow public reads

### **Pastors not loading?**
1. Verify Firebase configuration in `.env.local`
2. Check network connectivity
3. Ensure Firestore rules are deployed
4. Look for validation errors in console

### **Sorting issues?**
1. Verify `customId` is numeric (e.g., "1", "2", "10")
2. Check that `customId` is unique for each pastor
3. Ensure `customId` is a string in Firestore

### **Image not loading?**
1. Verify image URL is HTTPS
2. Check image URL is accessible
3. Ensure image URL format is valid

## 🎉 **Next Steps**

1. **Add pastors** through your dashboard
2. **Test the FlipCard** functionality
3. **Verify real-time updates** when pastors are modified
4. **Customize styling** if needed
5. **Add more pastors** to see the grid layout in action

The Leadership section is now fully integrated with Firestore and will dynamically display all active pastors from your dashboard! 🚀

## 📝 **Important Notes**

- **Inactive pastors** (`isActive: false`) will not be displayed
- **Non-pastor entries** (`category != "pastor"`) will be filtered out
- **Invalid entries** (missing required fields) will be skipped with warnings
- **Image URLs** must be HTTPS for security
- **customId** should be numeric for proper sorting (e.g., "1", "2", "10") 