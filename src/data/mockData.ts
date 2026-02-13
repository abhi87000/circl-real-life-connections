export type PlanCategory = 'movie' | 'gym' | 'coffee' | 'study' | 'travel' | 'jogging' | 'hobby' | 'event';
export type PlanType = 'partner' | 'group';

export interface Plan {
  id: string;
  title: string;
  category: PlanCategory;
  type: PlanType;
  location: string;
  time: string;
  date: string;
  groupSize: number;
  currentMembers: number;
  genderRatio: { male: number; female: number; other: number };
  creatorName: string;
  creatorAvatar: string;
  creatorRating: number;
  description: string;
  memberAvatars: string[];
  spotsLeft: number;
  isHot?: boolean;
}

export interface UserProfile {
  name: string;
  avatar: string;
  bio: string;
  verified: boolean;
  rating: number;
  totalMeetups: number;
  safetyScore: number;
  interests: string[];
  pastGroups: { title: string; category: PlanCategory; date: string; members: number }[];
}

export const categoryIcons: Record<PlanCategory, string> = {
  movie: '🎬',
  gym: '💪',
  coffee: '☕',
  study: '📚',
  travel: '✈️',
  jogging: '🏃',
  hobby: '🎨',
  event: '🎉',
};

export const categoryColors: Record<PlanCategory, string> = {
  movie: '262 83% 58%',
  gym: '0 84% 60%',
  coffee: '30 80% 50%',
  study: '210 52% 24%',
  travel: '173 58% 39%',
  jogging: '142 71% 45%',
  hobby: '330 65% 55%',
  event: '38 92% 50%',
};

export const categoryLabels: Record<PlanCategory, string> = {
  movie: 'Movie',
  gym: 'Gym',
  coffee: 'Coffee',
  study: 'Study',
  travel: 'Travel',
  jogging: 'Jogging',
  hobby: 'Hobby',
  event: 'Event',
};

export const mockPlans: Plan[] = [
  {
    id: '1',
    title: 'Weekend Movie Marathon',
    category: 'movie',
    type: 'group',
    location: 'PVR Cinemas, Koramangala',
    time: '6:30 PM',
    date: 'Sat, Feb 15',
    groupSize: 6,
    currentMembers: 3,
    genderRatio: { male: 2, female: 1, other: 0 },
    creatorName: 'Arjun M.',
    creatorAvatar: 'AM',
    creatorRating: 4.7,
    description: 'Catching the latest releases. Open to all film lovers!',
    memberAvatars: ['AM', 'PS', 'NK'],
    spotsLeft: 3,
    isHot: true,
  },
  {
    id: '2',
    title: 'Morning Gym Session',
    category: 'gym',
    type: 'partner',
    location: 'Gold\'s Gym, Indiranagar',
    time: '7:00 AM',
    date: 'Mon, Feb 17',
    groupSize: 2,
    currentMembers: 1,
    genderRatio: { male: 1, female: 0, other: 0 },
    creatorName: 'Rahul K.',
    creatorAvatar: 'RK',
    creatorRating: 4.9,
    description: 'Looking for a consistent gym partner for morning workouts.',
    memberAvatars: ['RK'],
    spotsLeft: 1,
  },
  {
    id: '3',
    title: 'Coffee & Code',
    category: 'coffee',
    type: 'group',
    location: 'Third Wave Coffee, HSR Layout',
    time: '4:00 PM',
    date: 'Sun, Feb 16',
    groupSize: 4,
    currentMembers: 2,
    genderRatio: { male: 1, female: 1, other: 0 },
    creatorName: 'Priya S.',
    creatorAvatar: 'PS',
    creatorRating: 4.8,
    description: 'Casual coding session over good coffee. All skill levels welcome.',
    memberAvatars: ['PS', 'DM'],
    spotsLeft: 2,
  },
  {
    id: '4',
    title: 'UPSC Study Group',
    category: 'study',
    type: 'group',
    location: 'British Council Library',
    time: '10:00 AM',
    date: 'Mon, Feb 17',
    groupSize: 5,
    currentMembers: 4,
    genderRatio: { male: 2, female: 2, other: 0 },
    creatorName: 'Sneha R.',
    creatorAvatar: 'SR',
    creatorRating: 4.6,
    description: 'Serious study group for UPSC prelims prep. Consistent members only.',
    memberAvatars: ['SR', 'AK', 'MJ', 'RP'],
    spotsLeft: 1,
    isHot: true,
  },
  {
    id: '5',
    title: 'Sunday Jogging Partner',
    category: 'jogging',
    type: 'partner',
    location: 'Cubbon Park',
    time: '6:00 AM',
    date: 'Sun, Feb 16',
    groupSize: 2,
    currentMembers: 1,
    genderRatio: { male: 0, female: 1, other: 0 },
    creatorName: 'Ananya T.',
    creatorAvatar: 'AT',
    creatorRating: 4.5,
    description: 'Looking for a jogging buddy for weekend mornings. 5K pace.',
    memberAvatars: ['AT'],
    spotsLeft: 1,
  },
  {
    id: '6',
    title: 'Weekend Trek to Nandi Hills',
    category: 'travel',
    type: 'group',
    location: 'Nandi Hills, Bangalore',
    time: '5:00 AM',
    date: 'Sat, Feb 22',
    groupSize: 8,
    currentMembers: 5,
    genderRatio: { male: 3, female: 2, other: 0 },
    creatorName: 'Vikram D.',
    creatorAvatar: 'VD',
    creatorRating: 4.8,
    description: 'Early morning trek with sunrise view. Transport arranged.',
    memberAvatars: ['VD', 'KS', 'RN', 'AP', 'SG'],
    spotsLeft: 3,
  },
];

export const mockProfile: UserProfile = {
  name: 'Alex Johnson',
  avatar: 'AJ',
  bio: 'Love meeting new people over coffee, hikes, and good conversations. Always up for a spontaneous plan!',
  verified: true,
  rating: 4.8,
  totalMeetups: 23,
  safetyScore: 92,
  interests: ['Coffee', 'Hiking', 'Movies', 'Photography', 'Fitness', 'Travel'],
  pastGroups: [
    { title: 'Morning Run Club', category: 'jogging', date: 'Jan 28', members: 4 },
    { title: 'Film Discussion Group', category: 'movie', date: 'Jan 20', members: 6 },
    { title: 'Study Session', category: 'study', date: 'Jan 15', members: 3 },
    { title: 'Coffee Meetup', category: 'coffee', date: 'Jan 10', members: 5 },
  ],
};
