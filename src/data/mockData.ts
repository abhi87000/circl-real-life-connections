export type PlanCategory = 'movie' | 'gym' | 'coffee' | 'study' | 'travel' | 'jogging' | 'hobby' | 'event';
export type PlanType = 'partner' | 'group';
export type PlanStatus = 'open' | 'full' | 'waitlist';

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
  creatorTagline: string;
  creatorCompletedGroups?: number;
  description: string;
  memberAvatars: string[];
  spotsLeft: number;
  isHot?: boolean;
  isTrending?: boolean;
  startsInHours?: number;
  status?: PlanStatus;
  waitlistCount?: number;
  repeatParticipants?: number;
}

export interface TimeCluster {
  id: string;
  category: PlanCategory;
  timeSlot: string;
  date: string;
  totalInterested: number;
  plans: Plan[];
  waitlistOverflow: number;
  suggestedNewTime?: string;
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
    title: "Let's catch the new release together",
    category: 'movie',
    type: 'group',
    location: 'PVR Koramangala',
    time: '6:30 PM',
    date: 'Sat, Feb 15',
    groupSize: 6,
    currentMembers: 6,
    genderRatio: { male: 3, female: 3, other: 0 },
    creatorName: 'Arjun M.',
    creatorAvatar: 'AM',
    creatorRating: 4.7,
    creatorTagline: 'Film Buff • UX Designer',
    creatorCompletedGroups: 12,
    description: 'Grabbing tickets for the latest release. Join us!',
    memberAvatars: ['AM', 'PS', 'NK', 'RD', 'DM', 'AK'],
    spotsLeft: 0,
    isHot: true,
    isTrending: true,
    startsInHours: 3,
    status: 'full',
    waitlistCount: 4,
  },
  {
    id: '1b',
    title: "Movie night — new Marvel release",
    category: 'movie',
    type: 'group',
    location: 'PVR Koramangala',
    time: '7:00 PM',
    date: 'Sat, Feb 15',
    groupSize: 5,
    currentMembers: 5,
    genderRatio: { male: 2, female: 3, other: 0 },
    creatorName: 'Neha K.',
    creatorAvatar: 'NK',
    creatorRating: 4.5,
    creatorTagline: 'Film Critic • Writer',
    creatorCompletedGroups: 8,
    description: 'Marvel fans unite! Let\'s watch together.',
    memberAvatars: ['NK', 'SR', 'AT', 'MJ', 'RP'],
    spotsLeft: 0,
    status: 'full',
    waitlistCount: 3,
    startsInHours: 3,
  },
  {
    id: '1c',
    title: "Casual movie evening — all welcome",
    category: 'movie',
    type: 'group',
    location: 'INOX, Forum Mall',
    time: '7:15 PM',
    date: 'Sat, Feb 15',
    groupSize: 6,
    currentMembers: 3,
    genderRatio: { male: 1, female: 2, other: 0 },
    creatorName: 'Priya S.',
    creatorAvatar: 'PS',
    creatorRating: 4.8,
    creatorTagline: 'Cinephile • Backend Dev',
    creatorCompletedGroups: 15,
    description: 'Open group for tonight\'s movie. Popcorn\'s on me!',
    memberAvatars: ['PS', 'VD', 'KS'],
    spotsLeft: 3,
    startsInHours: 4,
    status: 'open',
  },
  {
    id: '2',
    title: 'Need a consistent morning gym buddy',
    category: 'gym',
    type: 'partner',
    location: "Gold's Gym, Indiranagar",
    time: '7:00 AM',
    date: 'Mon, Feb 17',
    groupSize: 2,
    currentMembers: 1,
    genderRatio: { male: 1, female: 0, other: 0 },
    creatorName: 'Rahul K.',
    creatorAvatar: 'RK',
    creatorRating: 4.9,
    creatorTagline: 'Fitness Coach • Early Riser',
    creatorCompletedGroups: 28,
    description: 'Looking for someone serious about morning workouts.',
    memberAvatars: ['RK'],
    spotsLeft: 1,
    startsInHours: 14,
    status: 'open',
    repeatParticipants: 2,
  },
  {
    id: '3',
    title: 'Coffee, code, and good conversation',
    category: 'coffee',
    type: 'group',
    location: 'Third Wave, HSR',
    time: '4:00 PM',
    date: 'Sun, Feb 16',
    groupSize: 4,
    currentMembers: 4,
    genderRatio: { male: 1, female: 3, other: 0 },
    creatorName: 'Priya S.',
    creatorAvatar: 'PS',
    creatorRating: 4.8,
    creatorTagline: 'Backend Dev • Coffee Snob',
    creatorCompletedGroups: 15,
    description: 'Casual coding over great coffee. All levels welcome.',
    memberAvatars: ['PS', 'DM', 'AK', 'SR'],
    spotsLeft: 0,
    isHot: true,
    isTrending: true,
    startsInHours: 5,
    status: 'full',
    waitlistCount: 5,
  },
  {
    id: '4',
    title: 'Serious UPSC prep — join our study circle',
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
    creatorTagline: 'UPSC Aspirant • 2nd Attempt',
    creatorCompletedGroups: 6,
    description: 'Consistent study group for prelims. Serious members only.',
    memberAvatars: ['SR', 'AK', 'MJ', 'RP'],
    spotsLeft: 1,
    isHot: true,
    status: 'open',
  },
  {
    id: '5',
    title: 'Weekend jog at Cubbon Park — anyone in?',
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
    creatorTagline: 'Runner • Marketing Lead',
    creatorCompletedGroups: 9,
    description: 'Looking for a jogging buddy for weekend mornings. 5K pace.',
    memberAvatars: ['AT'],
    spotsLeft: 1,
    isTrending: true,
    startsInHours: 8,
    status: 'open',
  },
  {
    id: '6',
    title: "Sunrise trek to Nandi Hills — let's go!",
    category: 'travel',
    type: 'group',
    location: 'Nandi Hills',
    time: '5:00 AM',
    date: 'Sat, Feb 22',
    groupSize: 8,
    currentMembers: 5,
    genderRatio: { male: 3, female: 2, other: 0 },
    creatorName: 'Vikram D.',
    creatorAvatar: 'VD',
    creatorRating: 4.8,
    creatorTagline: 'Trek Leader • Photographer',
    creatorCompletedGroups: 22,
    description: 'Early morning trek with sunrise view. Transport arranged.',
    memberAvatars: ['VD', 'KS', 'RN', 'AP', 'SG'],
    spotsLeft: 3,
    status: 'open',
  },
];

export const mockTimeClusters: TimeCluster[] = [
  {
    id: 'tc1',
    category: 'movie',
    timeSlot: '7 PM',
    date: 'Sat, Feb 15',
    totalInterested: 18,
    plans: mockPlans.filter(p => p.category === 'movie'),
    waitlistOverflow: 7,
    suggestedNewTime: '7:30 PM',
  },
  {
    id: 'tc2',
    category: 'coffee',
    timeSlot: '4 PM',
    date: 'Sun, Feb 16',
    totalInterested: 9,
    plans: mockPlans.filter(p => p.category === 'coffee'),
    waitlistOverflow: 5,
    suggestedNewTime: '4:30 PM',
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
