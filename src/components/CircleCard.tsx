import { MapPin, Clock, Users } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Circle, categoryIcons, avatarPhotos } from '@/data/mockData';
import { motion } from 'framer-motion';

interface CircleCardProps {
  circle: Circle;
  onJoin: (circle: Circle) => void;
}

const MemberAvatars = ({ avatars, count }: { avatars: string[]; count: number }) => (
  <div className="flex items-center gap-2.5">
    <div className="relative flex -space-x-2.5">
      <div className="absolute inset-0 -m-1 rounded-full bg-primary/5 blur-md" />
      {avatars.slice(0, 5).map((initials, i) => {
        const photo = avatarPhotos[initials];
        return (
          <motion.div
            key={i}
            initial={{ scale: 0, x: -8 }}
            animate={{ scale: 1, x: 0 }}
            transition={{ delay: i * 0.06, type: 'spring', stiffness: 260, damping: 20 }}
            className="relative h-8 w-8 rounded-full border-2 border-card overflow-hidden shadow-sm"
            style={{ zIndex: avatars.length - i }}
          >
            {photo ? (
              <img src={photo} alt={initials} className="h-full w-full object-cover" />
            ) : (
              <div className="h-full w-full bg-primary/10 flex items-center justify-center">
                <span className="text-[9px] font-bold text-primary">{initials}</span>
              </div>
            )}
          </motion.div>
        );
      })}
    </div>
    <span className="text-[11px] font-medium text-muted-foreground">
      {count} building this circle
    </span>
  </div>
);

const CircleCard = ({ circle, onJoin }: CircleCardProps) => {
  const leadPhoto = avatarPhotos[circle.leadAvatar];
  const sessionProgress = (circle.currentSession / circle.totalSessions) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ y: -2, transition: { duration: 0.2 } }}
      whileTap={{ scale: 0.985 }}
    >
      <Card className="border-0 shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden rounded-2xl bg-card">
        <div className="p-5">
          {/* Category + Duration badge */}
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg">{categoryIcons[circle.category]}</span>
            <span className="text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-primary/8 text-primary">
              {circle.duration === 'one-time' ? 'One-time' : `${circle.totalSessions} sessions`}
            </span>
            {circle.isActive && (
              <span className="flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full"
                style={{ background: 'hsl(var(--circl-success) / 0.12)', color: 'hsl(var(--circl-success))' }}>
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: 'hsl(var(--circl-success))' }} />
                Active
              </span>
            )}
          </div>

          {/* Intent title */}
          <h3 className="text-base font-semibold text-foreground leading-snug mb-2">
            {circle.intent}
          </h3>

          {/* Circle Lead */}
          <div className="flex items-center gap-2 mb-3">
            <div className="h-6 w-6 rounded-full overflow-hidden ring-1.5 ring-primary/15">
              {leadPhoto ? (
                <img src={leadPhoto} alt={circle.leadName} className="h-full w-full object-cover" />
              ) : (
                <div className="h-full w-full bg-primary/10 flex items-center justify-center">
                  <span className="text-[7px] font-bold text-primary">{circle.leadAvatar}</span>
                </div>
              )}
            </div>
            <span className="text-[11px] text-muted-foreground">
              Led by <span className="font-semibold text-foreground">{circle.leadName}</span>
              {circle.leadCompletedCircles && (
                <span className="text-muted-foreground"> · {circle.leadCompletedCircles} circles led</span>
              )}
            </span>
          </div>

          {/* Session progress */}
          <div className="rounded-xl bg-muted/50 p-3 mb-3">
            <div className="flex items-center justify-between text-[11px] mb-1.5">
              <span className="font-medium text-foreground">
                Week {circle.currentSession} of {circle.totalSessions}
              </span>
              <span className="text-muted-foreground">{circle.nextMeetup}</span>
            </div>
            <Progress value={sessionProgress} className="h-1.5" />
          </div>

          {/* Meta — time, location */}
          <div className="flex items-center gap-3 text-[11px] text-muted-foreground mb-4">
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" /> {circle.date} · {circle.time}
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="h-3 w-3" /> {circle.location}
            </span>
          </div>

          {/* People + Spots + Join */}
          <div className="flex items-center justify-between">
            <MemberAvatars avatars={circle.memberAvatars} count={circle.currentMembers} />
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-medium text-muted-foreground">
                {circle.spotsLeft === 1
                  ? '1 seat left at the table'
                  : `${circle.spotsLeft} seats left`}
              </span>
              <motion.div whileTap={{ scale: 0.85 }} transition={{ type: 'spring', stiffness: 400, damping: 15 }}>
                <Button
                  size="sm"
                  className="rounded-full font-semibold h-9 px-5 text-xs shadow-sm"
                  onClick={() => onJoin(circle)}
                >
                  Join Circle
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default CircleCard;
