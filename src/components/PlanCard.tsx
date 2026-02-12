import { MapPin, Clock, Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Plan, categoryIcons } from '@/data/mockData';
import { motion } from 'framer-motion';

interface PlanCardProps {
  plan: Plan;
  onJoin: (plan: Plan) => void;
}

const GenderDots = ({ ratio }: { ratio: Plan['genderRatio'] }) => {
  const total = ratio.male + ratio.female + ratio.other;
  if (total === 0) return null;
  const dots = [
    ...Array(ratio.male).fill('bg-blue-400'),
    ...Array(ratio.female).fill('bg-pink-400'),
    ...Array(ratio.other).fill('bg-muted-foreground'),
  ];
  return (
    <div className="flex items-center gap-0.5">
      {dots.map((color, i) => (
        <span key={i} className={cn('h-1.5 w-1.5 rounded-full', color)} />
      ))}
    </div>
  );
};

const PlanCard = ({ plan, onJoin }: PlanCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="border-border/60 shadow-sm hover:shadow-md transition-shadow">
        <CardContent className="p-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-lg">{categoryIcons[plan.category]}</span>
                <Badge variant="secondary" className="text-[10px] font-medium uppercase tracking-wide">
                  {plan.type === 'partner' ? '1:1' : 'Group'}
                </Badge>
              </div>
              <h3 className="font-semibold text-foreground truncate">{plan.title}</h3>
              <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{plan.description}</p>
            </div>
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
              {plan.creatorAvatar}
            </div>
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <MapPin className="h-3 w-3" /> {plan.location}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" /> {plan.date} · {plan.time}
            </span>
            <span className="flex items-center gap-1">
              <Users className="h-3 w-3" /> {plan.currentMembers}/{plan.groupSize}
            </span>
          </div>

          <div className="mt-3 flex items-center justify-between">
            <GenderDots ratio={plan.genderRatio} />
            <Button
              size="sm"
              className="h-8 rounded-full px-5 text-xs font-semibold"
              onClick={() => onJoin(plan)}
            >
              Join
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default PlanCard;
