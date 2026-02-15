import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { TimeCluster, categoryIcons, categoryLabels } from '@/data/mockData';
import { MapPin, Clock, Users, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface OverflowModalProps {
  cluster: TimeCluster | null;
  open: boolean;
  onClose: () => void;
}

const OverflowModal = ({ cluster, open, onClose }: OverflowModalProps) => {
  const [created, setCreated] = useState(false);

  if (!cluster) return null;

  const firstPlan = cluster.plans[0];

  const handleCreate = () => {
    setCreated(true);
    setTimeout(() => {
      setCreated(false);
      onClose();
    }, 1800);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-sm rounded-2xl">
        <AnimatePresence mode="wait">
          {!created ? (
            <motion.div
              key="overflow-confirm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <DialogHeader>
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Sparkles className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-primary bg-primary/10 px-2.5 py-1 rounded-full">
                    Demand detected
                  </span>
                </div>
                <DialogTitle className="text-lg">
                  Create a new {categoryLabels[cluster.category].toLowerCase()} group?
                </DialogTitle>
                <DialogDescription className="pt-1 text-sm">
                  {cluster.waitlistOverflow} people are waiting for a spot. Start a new group to meet the demand.
                </DialogDescription>
              </DialogHeader>

              {/* Pre-filled details */}
              <div className="mt-4 rounded-xl bg-muted/50 p-4 space-y-2.5">
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-lg">{categoryIcons[cluster.category]}</span>
                  <span className="font-medium text-foreground">
                    {categoryLabels[cluster.category]}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>{cluster.date} · {cluster.suggestedNewTime}</span>
                </div>
                {firstPlan && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{firstPlan.location}</span>
                  </div>
                )}
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span>Group of 6 (suggested)</span>
                </div>
              </div>

              <p className="text-[11px] text-muted-foreground mt-3">
                Waitlisted members will be notified and can join instantly.
              </p>

              <DialogFooter className="mt-5">
                <Button variant="outline" onClick={onClose} className="rounded-full">
                  Cancel
                </Button>
                <Button onClick={handleCreate} className="rounded-full px-6">
                  Create Group
                </Button>
              </DialogFooter>
            </motion.div>
          ) : (
            <motion.div
              key="overflow-success"
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
                <span className="text-3xl">🎉</span>
              </motion.div>
              <h3 className="text-lg font-semibold text-foreground">Group Created!</h3>
              <p className="mt-1 text-sm text-muted-foreground text-center px-4">
                {cluster.waitlistOverflow} people have been notified.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
};

export default OverflowModal;
