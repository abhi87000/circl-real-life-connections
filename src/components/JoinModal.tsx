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
import { MapPin, Clock, Users, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface JoinModalProps {
  plan: Plan | null;
  open: boolean;
  onClose: () => void;
}

const JoinModal = ({ plan, open, onClose }: JoinModalProps) => {
  const [joined, setJoined] = useState(false);

  if (!plan) return null;

  const handleJoin = () => {
    setJoined(true);
    setTimeout(() => {
      setJoined(false);
      onClose();
    }, 1500);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-sm rounded-2xl">
        <AnimatePresence mode="wait">
          {!joined ? (
            <motion.div
              key="confirm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-lg">
                  <span className="text-xl">{categoryIcons[plan.category]}</span>
                  {plan.title}
                </DialogTitle>
                <DialogDescription className="pt-2 text-sm">
                  {plan.description}
                </DialogDescription>
              </DialogHeader>
              <div className="mt-4 space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" /> {plan.location}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary" /> {plan.date} · {plan.time}
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-primary" /> {plan.currentMembers}/{plan.groupSize} joined
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-primary" /> {plan.creatorName} · {plan.creatorRating}★
                </div>
              </div>
              <DialogFooter className="mt-6">
                <Button variant="outline" onClick={onClose} className="rounded-full">
                  Cancel
                </Button>
                <Button onClick={handleJoin} className="rounded-full px-6">
                  Confirm Join
                </Button>
              </DialogFooter>
            </motion.div>
          ) : (
            <motion.div
              key="success"
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
                <span className="text-3xl">✓</span>
              </motion.div>
              <h3 className="text-lg font-semibold text-foreground">You're in!</h3>
              <p className="mt-1 text-sm text-muted-foreground">See you at {plan.location}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
};

export default JoinModal;
