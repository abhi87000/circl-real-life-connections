import { MapPin, Clock, Flame, TrendingUp } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plan, categoryIcons, categoryColors } from '@/data/mockData';
import { motion } from 'framer-motion';

interface PlanCardProps {
  plan: Plan;
  onJoin: (plan: Plan) => void;
  featured?: boolean;
  compact?: boolean;
}

const avatarPhotos: Record<string, string> = {
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
  RN: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=80&h=80&fit=crop&crop=face',
  AP: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=80&h=80&fit=crop&crop=face',
  SG: 'https://images.unsplash.com/photo-1502323777036-f29e3972d82f?w=80&h=80&fit=crop&crop=face',
  MJ: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=80&h=80&fit=crop&crop=face',
  RP: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=80&h=80&fit=crop&crop=face',
};

const MemberAvatars = ({ avatars, count, featured }: { avatars: string[]; count: number; featured?: boolean }) => {
  const size = featured ? 'h-11 w-11' : 'h-9 w-9';
  return (
    <div className="flex items-center gap-2.5">
      <div className="relative flex -space-x-3">
        {/* Subtle glow behind stack */}
        <div className="absolute inset-0 -m-1 rounded-full bg-primary/5 blur-md" />
        {avatars.slice(0, 5).map((initials, i) => {
          const photo = avatarPhotos[initials];
          return (
            <motion.div
              key={i}
              initial={{ scale: 0, x: -10 }}
              animate={{ scale: 1, x: 0 }}
              transition={{ delay: i * 0.07, type: 'spring', stiffness: 260, damping: 20 }}
              className={`relative ${size} rounded-full border-[2.5px] border-card overflow-hidden shadow-sm`}
              style={{ zIndex: avatars.length - i }}
            >
              {photo ? (
                <img src={photo} alt={initials} className="h-full w-full object-cover" />
              ) : (
                <div className="h-full w-full bg-primary/10 flex items-center justify-center">
                  <span className="text-[10px] font-bold text-primary">{initials}</span>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
      <span className="text-xs font-medium text-muted-foreground">
        {count} already in
      </span>
    </div>
  );
};

const PlanCard = ({ plan, onJoin, featured = false, compact = false }: PlanCardProps) => {
  const accentColor = categoryColors[plan.category];
  const isUrgent = plan.spotsLeft <= 2 && plan.spotsLeft > 0;
  const isFull = plan.status === 'full';
  const hostPhoto = avatarPhotos[plan.creatorAvatar];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
      whileTap={{ scale: 0.98 }}
    >
      <Card
        className={`border-0 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden rounded-2xl ${
          featured ? 'bg-card ring-1 ring-primary/10' : 'bg-card'
        }`}
      >
        {/* Accent strip — thicker for featured */}
        <div
          className={featured ? 'h-1.5 w-full' : 'h-1 w-full'}
          style={{ background: `linear-gradient(90deg, hsl(${accentColor}), hsl(${accentColor} / 0.6))` }}
        />

        <div className={featured ? 'p-5 pb-5' : 'p-5'}>
          {/* Top badges row */}
          <div className="flex items-center gap-2 mb-3">
            <span className={featured ? 'text-xl' : 'text-lg'}>{categoryIcons[plan.category]}</span>
            <span
              className="text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full"
              style={{
                background: `hsl(${accentColor} / 0.1)`,
                color: `hsl(${accentColor})`,
              }}
            >
              {plan.type === 'partner' ? '1:1' : 'Group'}
            </span>
            {plan.isHot && (
              <motion.span
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="flex items-center gap-0.5 text-[10px] font-semibold text-destructive bg-destructive/10 px-2 py-0.5 rounded-full"
              >
                <Flame className="h-3 w-3" /> Filling fast
              </motion.span>
            )}
            {plan.isTrending && !plan.isHot && (
              <span className="flex items-center gap-0.5 text-[10px] font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                <TrendingUp className="h-3 w-3" /> Trending
              </span>
            )}
          </div>

          {/* Title — larger for featured */}
          <h3 className={`font-semibold text-foreground leading-snug mb-1.5 ${featured ? 'text-lg' : 'text-base'}`}>
            {plan.title}
          </h3>

          {/* Host identity — warmer styling */}
          <div className="flex items-center gap-2.5 mb-3">
            <div className="h-7 w-7 rounded-full overflow-hidden ring-2 ring-primary/15 shadow-sm">
              {hostPhoto ? (
                <img src={hostPhoto} alt={plan.creatorName} className="h-full w-full object-cover" />
              ) : (
                <div className="h-full w-full bg-primary/10 flex items-center justify-center">
                  <span className="text-[8px] font-bold text-primary">{plan.creatorAvatar}</span>
                </div>
              )}
            </div>
            <span className="text-xs text-muted-foreground">
              Hosted by <span className="font-semibold text-foreground">{plan.creatorName}</span>
              {plan.creatorTagline && (
                <span className="text-muted-foreground"> · {plan.creatorTagline.split('•')[0].trim()}</span>
              )}
            </span>
          </div>

          {/* Time urgency — more prominent for featured */}
          <div className="flex items-center gap-3 text-[11px] text-muted-foreground mb-4">
            {plan.startsInHours && plan.startsInHours <= 12 ? (
              <span
                className="flex items-center gap-1 font-semibold px-2.5 py-1 rounded-full"
                style={{
                  background: `hsl(var(--circl-warning) / 0.12)`,
                  color: `hsl(var(--circl-warning))`,
                }}
              >
                <Clock className="h-3 w-3" /> Starts in {plan.startsInHours}h
              </span>
            ) : (
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" /> {plan.date} · {plan.time}
              </span>
            )}
            <span className="flex items-center gap-1">
              <MapPin className="h-3 w-3" /> {plan.location}
            </span>
          </div>

          {/* People + Join */}
          <div className="flex items-center justify-between">
            <MemberAvatars avatars={plan.memberAvatars} count={plan.currentMembers} featured={featured} />
            <div className="flex items-center gap-2">
              {isFull ? (
                <span className="text-[10px] font-semibold text-destructive bg-destructive/10 px-2.5 py-1 rounded-full">
                  Full{plan.waitlistCount ? ` · ${plan.waitlistCount} waiting` : ''}
                </span>
              ) : isUrgent ? (
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-[10px] font-semibold text-destructive bg-destructive/10 px-2.5 py-1 rounded-full"
                >
                  {plan.spotsLeft === 1 ? 'Last spot!' : `${plan.spotsLeft} spots left`}
                </motion.span>
              ) : null}
              {plan.repeatParticipants && plan.repeatParticipants > 0 && (
                <span className="text-[10px] font-medium text-muted-foreground">
                  {plan.repeatParticipants} from your past meetups
                </span>
              )}
              <motion.div whileTap={{ scale: 0.85 }} transition={{ type: 'spring', stiffness: 400, damping: 15 }}>
                <Button
                  size="sm"
                  variant={isFull ? 'outline' : 'default'}
                  className={`rounded-full font-semibold shadow-sm ${
                    featured ? 'h-10 px-7 text-sm shadow-md shadow-primary/20' : compact ? 'h-8 px-5 text-xs' : 'h-9 px-6 text-xs'
                  }`}
                  onClick={() => onJoin(plan)}
                >
                  {isFull ? 'Join Waitlist' : 'Join'}
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default PlanCard;
