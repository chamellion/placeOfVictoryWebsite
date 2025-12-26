# Contact Details Update

## Overview

Updated church contact details across the website to use the new admin email and fetch phone numbers from the database. Office hours have also been updated.

---

## Changes Made

### 1. **Email Address Updated**

**Old:** `info@placeofvictory.co.uk` / `info@rccgplaceofvictory.org`  
**New:** `admin@placeofvictory.co.uk`

Updated in:
- ✅ `src/pages/CommunityServices.jsx` (line 719)
- ✅ `src/pages/Contact.jsx` (line 205)
- ✅ `src/components/Footer.jsx` (line 180)

---

### 2. **Phone Number - Now Fetched from Database**

**Old:** Hard-coded phone numbers  
**New:** Dynamically fetched from Firestore `SiteSettings`

#### Updated Files:

**`src/pages/CommunityServices.jsx`**
- ✅ Added import: `subscribeToSiteSettings` from Firebase client
- ✅ Added state management for site settings
- ✅ Added `useEffect` to subscribe to real-time settings updates
- ✅ Phone now displays: `{contactPhone}` with fallback "Contact for details"

**`src/pages/Contact.jsx`**
- ✅ Already had `subscribeToSiteSettings` imported
- ✅ Phone now displays: `{settings?.contactPhone || 'Please check back soon'}`

**`src/components/Footer.jsx`**
- ✅ Already fetching phone from database
- ✅ No changes needed (already implemented correctly)

---

### 3. **Office Hours Updated**

**Old:**
```
Monday - Friday: 9:00 AM - 5:00 PM
Saturday: Closed
Sunday: 8:00 AM - 1:00 PM
```

**New:**
```
Monday - Friday: 10:00 AM - 4:00 PM
```

Updated in:
- ✅ `src/pages/Contact.jsx` (lines 213-216)

---

## Database Schema

The contact phone is fetched from Firestore using the `SiteSettings` interface:

```typescript
export interface SiteSettings {
  id?: string;
  homeHeroText: string;
  contactPhone: string;        // ← Phone fetched from here
  socialLinks: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    youtube?: string;
  };
  updatedAt?: Timestamp;
}
```

**Collection:** `settings`  
**Document:** `main`  
**Field:** `contactPhone`

---

## Implementation Details

### Community Services Page

```javascript
// State management
const [settings, setSettings] = useState(null);
const contactPhone = settings?.contactPhone || 'Contact for details';

// Subscribe to real-time updates
useEffect(() => {
  const unsubscribe = subscribeToSiteSettings((result) => {
    if (result.success && result.settings) {
      setSettings(result.settings);
    }
  });
  
  return () => unsubscribe();
}, []);
```

**Display:**
```jsx
<PhoneCall className="h-6 w-6 text-yellow-300" />
<span>{contactPhone}</span>
```

---

### Contact Page

**Already had settings subscription - just updated display:**

```jsx
<Phone className="h-6 w-6 text-primary-600 mr-4 mt-1" />
<div>
  <h3 className="text-xl font-semibold text-gray-900 mb-1">Phone</h3>
  <p className="text-lg text-gray-700">
    {settings?.contactPhone || 'Please check back soon'}
  </p>
</div>
```

---

### Footer Component

**Already implemented correctly - no changes needed:**

```javascript
// Already fetches from database
const { contactPhone, socialLinks } = activeSettings;

// Already displays dynamically
{contactPhone && (
  <li className="flex items-center">
    <Phone className="mr-2 h-5 w-5 text-primary-400 flex-shrink-0" />
    <a href={`tel:${contactPhone.replace(/\s/g, '')}`}>
      {contactPhone}
    </a>
  </li>
)}
```

---

## Real-Time Updates

All phone numbers now update in **real-time** when changed in the admin dashboard:

1. Admin updates phone in dashboard
2. Firestore `settings/main` document updates
3. `subscribeToSiteSettings` detects change
4. Component state updates automatically
5. UI reflects new phone immediately

---

## Fallback Behavior

If phone number is not set in database:

| Page | Fallback Display |
|------|-----------------|
| **Community Services** | "Contact for details" |
| **Contact Page** | "Please check back soon" |
| **Footer** | Nothing displayed (conditional render) |

---

## Testing Checklist

- [x] Email updated to `admin@placeofvictory.co.uk` in all locations
- [x] Phone fetches from database in Community Services page
- [x] Phone fetches from database in Contact page
- [x] Phone already working in Footer
- [x] Office hours updated to Monday-Friday 10am-4pm
- [x] Real-time updates working
- [x] Fallback values display correctly
- [x] No linter errors

---

## Next Steps

### Update Phone Number in Database

Use the admin dashboard to set the contact phone:

1. Log into admin dashboard
2. Navigate to Settings
3. Update `contactPhone` field
4. Save changes

**Example value:** `01792 424591`

The phone will immediately appear on:
- Community Services page
- Contact page
- Footer

---

## Files Modified

| File | Changes |
|------|---------|
| `src/pages/CommunityServices.jsx` | Email updated, phone fetched from DB |
| `src/pages/Contact.jsx` | Email updated, phone fetched from DB, office hours updated |
| `src/components/Footer.jsx` | Email updated (phone already from DB) |

---

## Summary

✅ **Email:** Updated to `admin@placeofvictory.co.uk` everywhere  
✅ **Phone:** Now fetched from database with real-time updates  
✅ **Office Hours:** Updated to Monday-Friday 10am-4pm  
✅ **Dynamic:** Contact info managed through admin dashboard  
✅ **Fallbacks:** Graceful handling when data not yet set

---

**Implementation Date:** December 26, 2025  
**Status:** ✅ Complete and Ready for Production

---

## Technical Notes

- Uses existing `subscribeToSiteSettings` function from `firebaseClient.js`
- Real-time subscription using Firestore `onSnapshot`
- Proper cleanup with unsubscribe on component unmount
- TypeScript interface already defined in `src/types/SiteSettings.js`
- No breaking changes - fully backward compatible

