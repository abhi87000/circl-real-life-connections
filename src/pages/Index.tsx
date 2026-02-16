import { useState } from 'react';
import { MapPin, Users, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CircleCard from '@/components/CircleCard';
import JoinModal from '@/components/JoinModal';
import BottomNav from '@/components/BottomNav';
import { mockCircles, intentCards, Circle, IntentCard } from '@/data/mockData';
import { motion } from 'framer-motion';

const HeroBanner = () => (
  <div className="mb-6">
    <p className="text-xs font-medium text-primary tracking-wide uppercase mb-2">
      Real plans. Small groups. No awkward crowds.
    </p>
    <h1 className="text-[22px] font-bold text-foreground leading-tight">
      What kind of connection<br />are you looking for today?
    </h1>
  </div>
);

const IntentCardComponent = ({ intent, onClick }: { intent: IntentCard; onClick: () => void }) => (
  <motion.button
    whileTap={{ scale: 0.96 }}
    onClick={onClick}
    className="flex items-center gap-3.5 rounded-2xl border border-border bg-card p-4 text-left shadow-sm hover:shadow-md hover:border-primary/20 transition-all duration-200 w-full"
  >
    <span className="text-2xl shrink-0">{intent.emoji}</span>
    <div className="min-w-0">
      <p className="text-sm font-semibold text-foreground leading-tight">{intent.title}</p>
      <p className="text-[11px] text-muted-foreground mt-0.5">{intent.subtitle}</p>
    </div>
    <ArrowRight className="h-4 w-4 text-muted-foreground/50 shrink-0 ml-auto" />
  </motion.button>
);

const LiveIndicator = () => (
  <div className="flex items-center gap-2 mb-4 mt-2">
    <span className="relative flex h-2 w-2">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: 'hsl(var(--circl-success))' }} />
      <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: 'hsl(var(--circl-success))' }} />
    </span>
    <span className="text-xs text-muted-foreground font-medium">
      {mockCircles.filter(c => c.isActive).length} circles meeting this week near you
    </span>
  </div>
);

const Index = () => {
  const [selectedCircle, setSelectedCircle] = useState<Circle | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedIntent, setSelectedIntent] = useState<string | null>(null);

  const handleJoin = (circle: Circle) => {
    setSelectedCircle(circle);
    setModalOpen(true);
  };

  const handleIntentClick = (category: string) => {
    setSelectedIntent(selectedIntent === category ? null : category);
  };

  const filteredCircles = selectedIntent
    ? mockCircles.filter(c => c.category === selectedIntent)
    : mockCircles;

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-card/95 backdrop-blur-md px-5 pt-12 pb-4">
        <div className="mx-auto max-w-lg">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground tracking-tight">Circl</h1>
              <p className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                <MapPin className="h-3 w-3" /> Bangalore, India
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="mx-auto max-w-lg px-5 pt-2">
        <HeroBanner />

        {/* Intent Cards Grid */}
        <div className="grid grid-cols-1 gap-2.5 mb-8">
          {intentCards.map((intent) => (
            <IntentCardComponent
              key={intent.id}
              intent={intent}
              onClick={() => handleIntentClick(intent.category)}
            />
          ))}
        </div>

        {/* Circles Near You */}
        <div className="mb-3">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold text-foreground">
                {selectedIntent ? `${intentCards.find(i => i.category === selectedIntent)?.title}` : 'Circles Near You'}
              </h2>
              <p className="text-[11px] text-muted-foreground mt-0.5">
                <Users className="h-3 w-3 inline mr-1" />
                Limited to 6 people for better connection
              </p>
            </div>
            {selectedIntent && (
              <Button variant="ghost" size="sm" className="text-xs rounded-full" onClick={() => setSelectedIntent(null)}>
                Show all
              </Button>
            )}
          </div>
          <LiveIndicator />
        </div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
          className="space-y-4"
        >
          {filteredCircles.map((circle) => (
            <CircleCard key={circle.id} circle={circle} onJoin={handleJoin} />
          ))}
        </motion.div>

        {filteredCircles.length === 0 && (
          <div className="text-center py-16">
            <p className="text-sm text-muted-foreground">No circles yet for this intent.</p>
            <Button className="rounded-full mt-4" onClick={() => {}}>
              Start one yourself
            </Button>
          </div>
        )}
      </main>

      <JoinModal circle={selectedCircle} open={modalOpen} onClose={() => setModalOpen(false)} />
      <BottomNav />
    </div>
  );
};

export default Index;
