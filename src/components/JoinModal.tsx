import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Circle, categoryIcons } from '@/data/mockData';
import { MapPin, Clock, Users, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface JoinModalProps {
  circle: Circle | null;
  open: boolean;
  onClose: () => void;
}

const JoinModal = ({ circle, open, onClose }: JoinModalProps) => {
  const [joined, setJoined] = useState(false);

  if (!circle) return null;

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
                  <span className="text-xl">{categoryIcons[circle.category]}</span>
                  Join this Circle
                </DialogTitle>
                <DialogDescription className="pt-2 text-sm">
                  {circle.intent}
                </DialogDescription>
              </DialogHeader>
              <div className="mt-4 space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" /> {circle.location}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary" /> {circle.date} · {circle.time}
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-primary" /> {circle.currentMembers}/{circle.maxSize} people building this circle
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-primary" /> Led by {circle.leadName} · {circle.leadRating}★
                </div>
              </div>
              <div className="mt-3 rounded-xl bg-muted/50 p-3 text-[11px] text-muted-foreground">
                <p className="font-medium text-foreground mb-1">
                  {circle.duration === 'one-time' ? 'One-time circle' : `${circle.totalSessions}-session circle`}
                </p>
                <p>Currently on session {circle.currentSession} of {circle.totalSessions}. Next: {circle.nextMeetup}</p>
              </div>
              <DialogFooter className="mt-6">
                <Button variant="outline" onClick={onClose} className="rounded-full">
                  Not now
                </Button>
                <Button onClick={handleJoin} className="rounded-full px-6">
                  Join this Circle
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
                <span className="text-3xl">🤝</span>
              </motion.div>
              <h3 className="text-lg font-semibold text-foreground">Welcome to the circle!</h3>
              <p className="mt-1 text-sm text-muted-foreground text-center px-4">
                See you at {circle.location}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
};

export default JoinModal;
