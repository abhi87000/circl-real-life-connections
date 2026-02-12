

# Circl — Core Flow Implementation Plan

## Design System & Foundation
- **Color palette**: Soft white background, charcoal text, deep blue (`#1E3A5F`) as primary accent, light blue-gray for secondary elements
- **Typography**: Clean, modern sans-serif with generous spacing
- **Components**: Rounded cards with subtle shadows, soft transitions, calm and trust-focused aesthetic
- **Mobile-first layout** with bottom navigation bar (Home, Create, Chats, Profile)

## Screen 1: Home Feed
- Toggle between **"Find Partner"** (1:1) and **"Find Group"** tabs
- Filter bar with icons for age, distance, group size, interest
- Clean card feed showing:
  - Plan title, category icon (Movie, Gym, Coffee, etc.)
  - Location & time
  - Group size & gender ratio indicator (subtle dot/bar visual)
  - "Join" button with micro-interaction (smooth confirmation modal)
- "Nearby" section header with location indicator
- Sample mock data for 5-6 plans

## Screen 2: Create Plan
- Step-by-step minimal flow:
  1. Select category (icon grid: Movie, Gym, Study, Coffee, Travel, etc.)
  2. Choose 1:1 or Group
  3. Add location (text input with icon)
  4. Pick date & time
  5. Set group size (if group)
  6. Optional gender preference
  7. Short description
- Clean progress indicator at top
- Confirmation screen with plan summary

## Screen 3: Profile Screen
- Verified badge with trust indicators
- Star rating from past meetups
- Interest tags (pill badges)
- Short bio section
- Past group participation history (mini cards)
- Safety score indicator (visual meter)
- Edit profile button

## Navigation & Polish
- Bottom nav bar: Home, Create (+), Chats (placeholder), Profile
- Smooth page transitions
- Join confirmation modal with subtle animation
- Consistent spacing, rounded corners, premium feel throughout
- All screens use realistic mock data

