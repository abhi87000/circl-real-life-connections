import { MapPin, Clock, Flame, TrendingUp } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plan, categoryIcons, categoryColors } from '@/data/mockData';
import { motion } from 'framer-motion';

interface PlanCardProps {
  plan: Plan;
  onJoin: (plan: Plan) => void;
}

const MemberAvatars = ({ avatars, count }: { avatars: string[]; count: number }) => (
  <div className="flex items-center gap-2">
    <div className="flex -space-x-3">
      {avatars.slice(0, 5).map((initials, i) => (
        <motion.div
          key={i}
          initial={{ scale: 0, x: -10 }}
          animate={{ scale: 1, x: 0 }}
          transition={{ delay: i * 0.07, type: 'spring', stiffness: 260, damping: 20 }}
          className="relative h-9 w-9 rounded-full border-[2.5px] border-card bg-primary/10 flex items-center justify-center shadow-sm"
          style={{ zIndex: avatars.length - i }}
        >
          <span className="text-[10px] font-bold text-primary">{initials}</span>
        </motion.div>
      ))}
    </div>
    <span className="text-xs font-medium text-muted-foreground">
      {count} already in
    </span>
  </div>
);

const PlanCard = ({ plan, onJoin }: PlanCardProps) => {
  const accentColor = categoryColors[plan.category];
  const isUrgent = plan.spotsLeft <= 2;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
      whileTap={{ scale: 0.98 }}
    >
      <Card className="border-0 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden rounded-2xl bg-card">
        {/* Accent strip */}
        <div className="h-1 w-full" style={{ background: `hsl(${accentColor})` }} />

        <div className="p-5">
          {/* Top badges row */}
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg">{categoryIcons[plan.category]}</span>
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

          {/* Title */}
          <h3 className="font-semibold text-foreground text-base leading-snug mb-1.5">
            {plan.title}
          </h3>

          {/* Host identity */}
          <div className="flex items-center gap-2 mb-3">
            <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-[8px] font-bold text-primary">{plan.creatorAvatar}</span>
            </div>
            <span className="text-xs text-muted-foreground">
              Hosted by <span className="font-medium text-foreground">{plan.creatorName}</span>
              {plan.creatorTagline && (
                <span className="text-muted-foreground"> · {plan.creatorTagline.split('•')[0].trim()}</span>
              )}
            </span>
          </div>

          {/* Compact meta */}
          <div className="flex items-center gap-3 text-[11px] text-muted-foreground mb-4">
            <span className="flex items-center gap-1">
              <MapPin className="h-3 w-3" /> {plan.location}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {plan.startsInHours && plan.startsInHours <= 12
                ? `In ${plan.startsInHours}h`
                : `${plan.date} · ${plan.time}`}
            </span>
          </div>

          {/* People + Join */}
          <div className="flex items-center justify-between">
            <MemberAvatars avatars={plan.memberAvatars} count={plan.currentMembers} />
            <div className="flex items-center gap-2">
              {isUrgent && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-[10px] font-semibold text-destructive bg-destructive/10 px-2.5 py-1 rounded-full"
                >
                  {plan.spotsLeft === 1 ? 'Last spot!' : `${plan.spotsLeft} spots left`}
                </motion.span>
              )}
              <motion.div whileTap={{ scale: 0.9 }}>
                <Button
                  size="sm"
                  className="h-9 rounded-full px-6 text-xs font-semibold shadow-sm"
                  onClick={() => onJoin(plan)}
                >
                  Join
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
