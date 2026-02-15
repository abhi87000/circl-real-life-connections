import { useState } from 'react';
import { ChevronDown, ChevronUp, Users, Clock, Plus } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TimeCluster, Plan, categoryIcons, categoryColors } from '@/data/mockData';
import PlanCard from '@/components/PlanCard';
import { motion, AnimatePresence } from 'framer-motion';

interface TimeClusterCardProps {
  cluster: TimeCluster;
  onJoin: (plan: Plan) => void;
  onWaitlist: (plan: Plan) => void;
  onCreateOverflow: (cluster: TimeCluster) => void;
}

const TimeClusterCard = ({ cluster, onJoin, onWaitlist, onCreateOverflow }: TimeClusterCardProps) => {
  const [expanded, setExpanded] = useState(false);
  const accentColor = categoryColors[cluster.category];
  const openPlans = cluster.plans.filter(p => p.status === 'open');
  const fullPlans = cluster.plans.filter(p => p.status === 'full');

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      <Card className="border-0 shadow-md rounded-2xl overflow-hidden bg-card">
        {/* Gradient header */}
        <div
          className="px-5 py-4 cursor-pointer"
          style={{
            background: `linear-gradient(135deg, hsl(${accentColor} / 0.08), hsl(${accentColor} / 0.03))`,
          }}
          onClick={() => setExpanded(!expanded)}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-xl">{categoryIcons[cluster.category]}</span>
              <div>
                <h3 className="text-sm font-semibold text-foreground">
                  {cluster.timeSlot} {cluster.category.charAt(0).toUpperCase() + cluster.category.slice(1)} Plans
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {cluster.date}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <Users className="h-3.5 w-3.5 text-primary" />
                <span className="text-xs font-semibold text-primary">
                  {cluster.totalInterested} interested
                </span>
              </div>
              {expanded ? (
                <ChevronUp className="h-4 w-4 text-muted-foreground" />
              ) : (
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              )}
            </div>
          </div>

          {/* Quick stats */}
          <div className="flex items-center gap-3 mt-2.5">
            <span className="text-[10px] font-medium px-2.5 py-1 rounded-full bg-card text-muted-foreground">
              {cluster.plans.length} groups
            </span>
            {fullPlans.length > 0 && (
              <span className="text-[10px] font-medium px-2.5 py-1 rounded-full bg-destructive/10 text-destructive">
                {fullPlans.length} full
              </span>
            )}
            {cluster.waitlistOverflow > 0 && (
              <span
                className="text-[10px] font-medium px-2.5 py-1 rounded-full"
                style={{
                  background: `hsl(var(--circl-warning) / 0.12)`,
                  color: `hsl(var(--circl-warning))`,
                }}
              >
                {cluster.waitlistOverflow} on waitlist
              </span>
            )}
          </div>
        </div>

        {/* Expanded content */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="px-4 pb-4 pt-2 space-y-3">
                {cluster.plans.map((plan) => (
                  <PlanCard
                    key={plan.id}
                    plan={plan}
                    onJoin={plan.status === 'full' ? () => onWaitlist(plan) : () => onJoin(plan)}
                    compact
                  />
                ))}

                {/* Overflow creation prompt */}
                {cluster.waitlistOverflow >= 3 && cluster.suggestedNewTime && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="rounded-xl border border-dashed border-primary/30 bg-primary/[0.03] p-4"
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className="h-9 w-9 rounded-full flex items-center justify-center shrink-0"
                        style={{ background: `hsl(${accentColor} / 0.12)` }}
                      >
                        <Plus className="h-4 w-4" style={{ color: `hsl(${accentColor})` }} />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-semibold text-foreground">
                          {cluster.waitlistOverflow} people are waiting
                        </p>
                        <p className="text-[11px] text-muted-foreground mt-0.5">
                          Create a new group at {cluster.suggestedNewTime}?
                        </p>
                        <Button
                          size="sm"
                          className="rounded-full h-8 px-4 text-xs mt-2.5 font-semibold"
                          onClick={() => onCreateOverflow(cluster)}
                        >
                          Create {cluster.suggestedNewTime} Group
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </motion.div>
  );
};

export default TimeClusterCard;
