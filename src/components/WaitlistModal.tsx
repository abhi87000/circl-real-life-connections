import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Plan, categoryIcons } from '@/data/mockData';
import { Users, Clock, Bell } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface WaitlistModalProps {
  plan: Plan | null;
  open: boolean;
  onClose: () => void;
}

const WaitlistModal = ({ plan, open, onClose }: WaitlistModalProps) => {
  const [joined, setJoined] = useState(false);

  if (!plan) return null;

  const handleJoinWaitlist = () => {
    setJoined(true);
    setTimeout(() => {
      setJoined(false);
      onClose();
    }, 1800);
  };

  const threshold = 3;
  const currentWaitlist = plan.waitlistCount || 0;
  const needed = Math.max(0, threshold - currentWaitlist);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-sm rounded-2xl">
        <AnimatePresence mode="wait">
          {!joined ? (
            <motion.div
              key="waitlist-confirm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-lg">
                  <span className="text-xl">{categoryIcons[plan.category]}</span>
                  This group is full
                </DialogTitle>
                <DialogDescription className="pt-2 text-sm">
                  {plan.title}
                </DialogDescription>
              </DialogHeader>

              <div className="mt-4 space-y-3">
                {/* Waitlist status */}
                <div className="rounded-xl bg-muted/50 p-4 space-y-2.5">
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="h-4 w-4 text-primary" />
                    <span className="font-medium text-foreground">
                      {currentWaitlist} people on waitlist
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>{plan.date} · {plan.time}</span>
                  </div>
                </div>

                {/* Threshold progress */}
                <div className="rounded-xl border border-primary/10 bg-primary/[0.03] p-4">
                  <p className="text-xs font-medium text-foreground">
                    {needed > 0
                      ? `If ${needed} more join, we'll open another group nearby.`
                      : "Enough demand — a new group will be created soon!"}
                  </p>
                  <div className="mt-2 h-1.5 rounded-full bg-muted overflow-hidden">
                    <motion.div
                      className="h-full rounded-full bg-primary"
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min((currentWaitlist / threshold) * 100, 100)}%` }}
                      transition={{ duration: 0.6, ease: 'easeOut' }}
                    />
                  </div>
                  <p className="text-[10px] text-muted-foreground mt-1.5">
                    {currentWaitlist}/{threshold} needed for new group
                  </p>
                </div>
              </div>

              <DialogFooter className="mt-6">
                <Button variant="outline" onClick={onClose} className="rounded-full">
                  Cancel
                </Button>
                <Button onClick={handleJoinWaitlist} className="rounded-full px-6">
                  <Bell className="h-3.5 w-3.5 mr-1.5" />
                  Join Waitlist
                </Button>
              </DialogFooter>
            </motion.div>
          ) : (
            <motion.div
              key="waitlist-success"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex flex-col items-center py-8"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
                className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10"
              >
                <Bell className="h-7 w-7 text-primary" />
              </motion.div>
              <h3 className="text-lg font-semibold text-foreground">You're on the waitlist!</h3>
              <p className="mt-1 text-sm text-muted-foreground text-center px-4">
                We'll notify you when a spot opens or a new group is created.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
};

export default WaitlistModal;
