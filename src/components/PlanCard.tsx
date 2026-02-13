import { MapPin, Clock, Flame } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Plan, categoryIcons, categoryColors } from '@/data/mockData';
import { motion } from 'framer-motion';

interface PlanCardProps {
  plan: Plan;
  onJoin: (plan: Plan) => void;
}

const MemberAvatars = ({ avatars, spotsLeft }: { avatars: string[]; spotsLeft: number }) => (
  <div className="flex items-center">
    <div className="flex -space-x-2.5">
      {avatars.slice(0, 4).map((initials, i) => (
        <motion.div
          key={i}
          initial={{ scale: 0, x: -8 }}
          animate={{ scale: 1, x: 0 }}
          transition={{ delay: i * 0.06, type: 'spring', stiffness: 300 }}
          className="relative h-7 w-7 rounded-full border-2 border-card bg-primary/10 flex items-center justify-center"
          style={{ zIndex: avatars.length - i }}
        >
          <span className="text-[9px] font-bold text-primary">{initials}</span>
        </motion.div>
      ))}
      {avatars.length > 4 && (
        <div className="relative h-7 w-7 rounded-full border-2 border-card bg-muted flex items-center justify-center" style={{ zIndex: 0 }}>
          <span className="text-[9px] font-medium text-muted-foreground">+{avatars.length - 4}</span>
        </div>
      )}
    </div>
    <span className="ml-2 text-xs text-muted-foreground">
      {avatars.length} going
    </span>
  </div>
);

const PlanCard = ({ plan, onJoin }: PlanCardProps) => {
  const accentColor = categoryColors[plan.category];
  const isUrgent = plan.spotsLeft <= 2;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.985 }}
    >
      <Card className="border-border/60 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden">
        {/* Category accent strip */}
        <div className="h-1 w-full" style={{ background: `hsl(${accentColor})` }} />

        <CardContent className="p-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-lg">{categoryIcons[plan.category]}</span>
                <span
                  className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full"
                  style={{
                    background: `hsl(${accentColor} / 0.1)`,
                    color: `hsl(${accentColor})`,
                  }}
                >
                  {plan.type === 'partner' ? '1:1' : 'Group'}
                </span>
                {plan.isHot && (
                  <motion.span
                    animate={{ scale: [1, 1.15, 1] }}
                    transition={{ repeat: Infinity, duration: 1.8 }}
                    className="flex items-center gap-0.5 text-[10px] font-semibold text-destructive"
                  >
                    <Flame className="h-3 w-3" /> Hot
                  </motion.span>
                )}
              </div>
              <h3 className="font-semibold text-foreground truncate text-[15px] leading-tight">{plan.title}</h3>
              <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{plan.description}</p>
            </div>
          </div>

          {/* Meta row */}
          <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-muted-foreground">
            <span className="flex items-center gap-1">
              <MapPin className="h-3 w-3" /> {plan.location}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" /> {plan.date} · {plan.time}
            </span>
          </div>

          {/* Bottom row: avatars + urgency + join */}
          <div className="mt-3.5 flex items-center justify-between">
            <MemberAvatars avatars={plan.memberAvatars} spotsLeft={plan.spotsLeft} />
            <div className="flex items-center gap-2">
              {isUrgent && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-[10px] font-semibold text-destructive bg-destructive/10 px-2 py-0.5 rounded-full"
                >
                  {plan.spotsLeft === 1 ? 'Last spot!' : `${plan.spotsLeft} left`}
                </motion.span>
              )}
              <Button
                size="sm"
                className="h-8 rounded-full px-5 text-xs font-semibold shadow-sm"
                onClick={() => onJoin(plan)}
              >
                Join
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default PlanCard;
