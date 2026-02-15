import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plan, categoryIcons, categoryColors } from '@/data/mockData';
import { Users, Clock, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface SimilarPlansPromptProps {
  plans: Plan[];
  onJoinExisting: (plan: Plan) => void;
  onContinueCreate: () => void;
}

const SimilarPlansPrompt = ({ plans, onJoinExisting, onContinueCreate }: SimilarPlansPromptProps) => {
  if (plans.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      <div className="text-center">
        <h3 className="text-base font-semibold text-foreground">Similar plans already exist</h3>
        <p className="text-xs text-muted-foreground mt-1">
          Join one instead? More people = more fun.
        </p>
      </div>

      <div className="space-y-2.5">
        {plans.slice(0, 3).map((plan) => {
          const accentColor = categoryColors[plan.category];
          return (
            <Card key={plan.id} className="border-0 shadow-sm rounded-xl overflow-hidden bg-card">
              <div
                className="h-0.5 w-full"
                style={{ background: `hsl(${accentColor})` }}
              />
              <div className="p-3.5 flex items-center gap-3">
                <span className="text-lg">{categoryIcons[plan.category]}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{plan.title}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {plan.time}
                    </span>
                    <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                      <Users className="h-3 w-3" /> {plan.currentMembers}/{plan.groupSize}
                    </span>
                  </div>
                </div>
                <Button
                  size="sm"
                  variant={plan.status === 'full' ? 'outline' : 'default'}
                  className="rounded-full h-8 px-4 text-xs shrink-0"
                  onClick={() => onJoinExisting(plan)}
                >
                  {plan.status === 'full' ? 'Waitlist' : 'Join'}
                </Button>
              </div>
            </Card>
          );
        })}
      </div>

      <Button
        variant="ghost"
        className="w-full rounded-full text-xs text-muted-foreground hover:text-foreground"
        onClick={onContinueCreate}
      >
        Create anyway <ArrowRight className="h-3.5 w-3.5 ml-1" />
      </Button>
    </motion.div>
  );
};

export default SimilarPlansPrompt;
