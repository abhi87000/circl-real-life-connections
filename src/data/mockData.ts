export type CircleCategory = 'coding' | 'gym' | 'movie' | 'travel' | 'coffee' | 'study' | 'games' | 'hobby';
export type CircleDuration = 'one-time' | '2-week' | '4-week' | 'custom';

export interface Circle {
  id: string;
  intent: string;
  category: CircleCategory;
  location: string;
  time: string;
  date: string;
  maxSize: number;
  currentMembers: number;
  memberAvatars: string[];
  leadName: string;
  leadAvatar: string;
  leadRating: number;
  leadTagline: string;
  leadCompletedCircles?: number;
  description: string;
  spotsLeft: number;
  duration: CircleDuration;
  totalSessions: number;
  currentSession: number;
  nextMeetup: string;
  isActive?: boolean;
}

export interface IntentCard {
  id: string;
  emoji: string;
  title: string;
  subtitle: string;
  category: CircleCategory;
}

export interface UserProfile {
  name: string;
  avatar: string;
  bio: string;
  verified: boolean;
  rating: number;
  totalCircles: number;
  safetyScore: number;
  interests: string[];
  pastCircles: { title: string; category: CircleCategory; date: string; members: number; sessions: number }[];
}

export const categoryIcons: Record<CircleCategory, string> = {
  coding: '🧑‍💻',
  gym: '💪',
  movie: '🎬',
  travel: '✈️',
  coffee: '☕',
  study: '📚',
  games: '🎲',
  hobby: '🎨',
};

export const categoryLabels: Record<CircleCategory, string> = {
  coding: 'Coding',
  gym: 'Gym',
  movie: 'Movie',
  travel: 'Travel',
  coffee: 'Coffee',
  study: 'Study',
  games: 'Games',
  hobby: 'Hobby',
};

export const intentCards: IntentCard[] = [
  { id: 'i1', emoji: '🧑‍💻', title: 'Find a Coding Partner', subtitle: 'Build together, learn faster', category: 'coding' },
  { id: 'i2', emoji: '💪', title: 'Gym Accountability Circle', subtitle: 'Stay consistent with a crew', category: 'gym' },
  { id: 'i3', emoji: '🎬', title: 'Weekend Movie Group', subtitle: 'Watch & discuss together', category: 'movie' },
  { id: 'i4', emoji: '✈️', title: 'Solo Trip Circle', subtitle: 'Travel with new friends', category: 'travel' },
  { id: 'i5', emoji: '☕', title: 'New in the City', subtitle: 'Meet people over coffee', category: 'coffee' },
  { id: 'i6', emoji: '🎲', title: 'Game Night Circle', subtitle: 'Board games & good vibes', category: 'games' },
];

export const avatarPhotos: Record<string, string> = {
  AM: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face',
  PS: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face',
  NK: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face',
  RD: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face',
  RK: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face',
  DM: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&crop=face',
  AK: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&h=80&fit=crop&crop=face',
  SR: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop&crop=face',
  AT: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=80&h=80&fit=crop&crop=face',
  VD: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=80&h=80&fit=crop&crop=face',
  KS: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=80&h=80&fit=crop&crop=face',
  MJ: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=80&h=80&fit=crop&crop=face',
};

export const mockCircles: Circle[] = [
  {
    id: '1',
    intent: 'Morning workout accountability — no excuses',
    category: 'gym',
    location: "Gold's Gym, Indiranagar",
    time: '7:00 AM',
    date: 'Every Mon & Wed',
    maxSize: 4,
    currentMembers: 3,
    memberAvatars: ['RK', 'AM', 'DM'],
    leadName: 'Rahul K.',
    leadAvatar: 'RK',
    leadRating: 4.9,
    leadTagline: 'Fitness Coach • Early Riser',
    leadCompletedCircles: 12,
    description: 'We keep each other accountable. Show up, work hard, grow together.',
    spotsLeft: 1,
    duration: '4-week',
    totalSessions: 8,
    currentSession: 3,
    nextMeetup: 'Tomorrow, 7 AM',
    isActive: true,
  },
  {
    id: '2',
    intent: 'Coffee & code — build side projects together',
    category: 'coding',
    location: 'Third Wave, HSR',
    time: '4:00 PM',
    date: 'Every Saturday',
    maxSize: 5,
    currentMembers: 4,
    memberAvatars: ['PS', 'NK', 'AK', 'SR'],
    leadName: 'Priya S.',
    leadAvatar: 'PS',
    leadRating: 4.8,
    leadTagline: 'Backend Dev • Coffee Lover',
    leadCompletedCircles: 8,
    description: 'Bring your laptop, grab a coffee, and let\'s build something cool.',
    spotsLeft: 1,
    duration: '4-week',
    totalSessions: 4,
    currentSession: 2,
    nextMeetup: 'This Saturday, 4 PM',
    isActive: true,
  },
  {
    id: '3',
    intent: 'Weekend movie + dinner — new friends welcome',
    category: 'movie',
    location: 'PVR Koramangala',
    time: '6:30 PM',
    date: 'Every Saturday',
    maxSize: 6,
    currentMembers: 3,
    memberAvatars: ['AT', 'VD', 'MJ'],
    leadName: 'Ananya T.',
    leadAvatar: 'AT',
    leadRating: 4.7,
    leadTagline: 'Film Buff • Marketing Lead',
    leadCompletedCircles: 6,
    description: 'Watch something great, then chat about it over dinner.',
    spotsLeft: 3,
    duration: '4-week',
    totalSessions: 4,
    currentSession: 1,
    nextMeetup: 'This Saturday, 6:30 PM',
  },
  {
    id: '4',
    intent: 'New in Bangalore — let\'s explore the city together',
    category: 'coffee',
    location: 'Varies — different café each week',
    time: '11:00 AM',
    date: 'Every Sunday',
    maxSize: 5,
    currentMembers: 2,
    memberAvatars: ['KS', 'RD'],
    leadName: 'Karthik S.',
    leadAvatar: 'KS',
    leadRating: 4.5,
    leadTagline: 'New in Town • Product Designer',
    leadCompletedCircles: 2,
    description: 'Just moved here. Looking for people to explore with. No agenda, just good company.',
    spotsLeft: 3,
    duration: '4-week',
    totalSessions: 4,
    currentSession: 1,
    nextMeetup: 'This Sunday, 11 AM',
  },
  {
    id: '5',
    intent: 'UPSC study circle — serious prep only',
    category: 'study',
    location: 'British Council Library',
    time: '10:00 AM',
    date: 'Mon–Fri',
    maxSize: 4,
    currentMembers: 3,
    memberAvatars: ['SR', 'AK', 'MJ'],
    leadName: 'Sneha R.',
    leadAvatar: 'SR',
    leadRating: 4.6,
    leadTagline: 'UPSC Aspirant • 2nd Attempt',
    leadCompletedCircles: 4,
    description: 'Focused daily study sessions. We share notes, quiz each other, and stay on track.',
    spotsLeft: 1,
    duration: '4-week',
    totalSessions: 20,
    currentSession: 8,
    nextMeetup: 'Tomorrow, 10 AM',
    isActive: true,
  },
  {
    id: '6',
    intent: 'Board game nights — strategy & laughs',
    category: 'games',
    location: 'Dice & Meeple Café',
    time: '7:00 PM',
    date: 'Every Friday',
    maxSize: 6,
    currentMembers: 4,
    memberAvatars: ['AM', 'NK', 'DM', 'VD'],
    leadName: 'Arjun M.',
    leadAvatar: 'AM',
    leadRating: 4.7,
    leadTagline: 'Board Game Enthusiast • UX Designer',
    leadCompletedCircles: 10,
    description: 'Settlers, Codenames, Ticket to Ride — we play everything. Beginners welcome!',
    spotsLeft: 2,
    duration: '4-week',
    totalSessions: 4,
    currentSession: 2,
    nextMeetup: 'This Friday, 7 PM',
  },
];

export const mockProfile: UserProfile = {
  name: 'Alex Johnson',
  avatar: 'AJ',
  bio: 'Love meeting new people over coffee, hikes, and good conversations. Always up for a recurring circle!',
  verified: true,
  rating: 4.8,
  totalCircles: 7,
  safetyScore: 92,
  interests: ['Coffee', 'Coding', 'Movies', 'Fitness', 'Travel', 'Games'],
  pastCircles: [
    { title: 'Morning Run Circle', category: 'gym', date: 'Jan 28', members: 4, sessions: 8 },
    { title: 'Film Discussion Circle', category: 'movie', date: 'Jan 20', members: 5, sessions: 4 },
    { title: 'Study Circle', category: 'study', date: 'Jan 15', members: 3, sessions: 12 },
    { title: 'Coffee Explorers', category: 'coffee', date: 'Jan 10', members: 4, sessions: 4 },
  ],
};
