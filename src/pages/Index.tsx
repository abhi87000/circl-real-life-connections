import { useState } from 'react';
import { MapPin, SlidersHorizontal, TrendingUp, Clock, Sparkles, Heart, Users, Layers } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import PlanCard from '@/components/PlanCard';
import TimeClusterCard from '@/components/TimeClusterCard';
import JoinModal from '@/components/JoinModal';
import WaitlistModal from '@/components/WaitlistModal';
import OverflowModal from '@/components/OverflowModal';
import BottomNav from '@/components/BottomNav';
import { mockPlans, mockTimeClusters, mockProfile, Plan, TimeCluster, categoryLabels } from '@/data/mockData';
import { motion } from 'framer-motion';

const SectionHeader = ({ icon: Icon, title, subtitle }: { icon: React.ElementType; title: string; subtitle?: string }) => (
  <div className="flex items-center gap-2 mb-3 mt-6 first:mt-0">
    <Icon className="h-4 w-4 text-primary" />
    <div>
      <h2 className="text-sm font-semibold text-foreground">{title}</h2>
      {subtitle && <p className="text-[10px] text-muted-foreground">{subtitle}</p>}
    </div>
  </div>
);

const SocialProofBanner = () => {
  const stats = [
    { text: '12 people met through Circl this week' },
    { text: '3 plans starting in the next 4 hours' },
    { text: '45 active members near you' },
  ];

  return (
    <div className="relative overflow-hidden rounded-xl bg-primary/[0.04] border border-primary/10 px-4 py-2.5 mb-4">
      <div className="flex items-center gap-2.5">
        <span className="relative flex h-2 w-2 shrink-0">
          <span
            className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
            style={{ background: 'hsl(var(--circl-success))' }}
          />
          <span
            className="relative inline-flex rounded-full h-2 w-2"
            style={{ background: 'hsl(var(--circl-success))' }}
          />
        </span>
        <div className="overflow-hidden h-5">
          <motion.div
            animate={{ y: [0, 0, -20, -20, -40, -40, 0] }}
            transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut', times: [0, 0.3, 0.33, 0.63, 0.66, 0.96, 1] }}
          >
            {stats.map((s, i) => (
              <p key={i} className="text-xs font-medium text-foreground/80 h-5 flex items-center">
                {s.text}
              </p>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

const Index = () => {
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [waitlistPlan, setWaitlistPlan] = useState<Plan | null>(null);
  const [waitlistOpen, setWaitlistOpen] = useState(false);
  const [overflowCluster, setOverflowCluster] = useState<TimeCluster | null>(null);
  const [overflowOpen, setOverflowOpen] = useState(false);

  const handleJoin = (plan: Plan) => {
    if (plan.status === 'full') {
      setWaitlistPlan(plan);
      setWaitlistOpen(true);
    } else {
      setSelectedPlan(plan);
      setModalOpen(true);
    }
  };

  const handleWaitlist = (plan: Plan) => {
    setWaitlistPlan(plan);
    setWaitlistOpen(true);
  };

  const handleOverflow = (cluster: TimeCluster) => {
    setOverflowCluster(cluster);
    setOverflowOpen(true);
  };

  const interestKeywords = mockProfile.interests.map((i) => i.toLowerCase());

  const filterByType = (type: 'partner' | 'group') => {
    const plans = mockPlans.filter((p) => p.type === type);
    const happeningSoon = plans.filter((p) => p.startsInHours && p.startsInHours <= 12);
    const trending = plans.filter((p) => p.isTrending);
    const forYou = plans.filter((p) => interestKeywords.includes(categoryLabels[p.category].toLowerCase()));
    const rest = plans.filter(
      (p) => !happeningSoon.includes(p) && !trending.includes(p) && !forYou.includes(p)
    );

    // Get clusters relevant to this type
    const relevantClusters = mockTimeClusters.filter(tc =>
      tc.plans.some(p => p.type === type)
    );

    return { happeningSoon, trending, forYou, rest, relevantClusters };
  };

  const renderSections = (type: 'partner' | 'group') => {
    const { happeningSoon, trending, forYou, rest, relevantClusters } = filterByType(type);

    return (
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
      >
        {happeningSoon.length > 0 && (
          <>
            <SectionHeader icon={Clock} title="Happening Soon" subtitle="Starting in the next few hours" />
            <div className="space-y-4">
              {happeningSoon.map((plan, i) => (
                <PlanCard key={plan.id} plan={plan} onJoin={handleJoin} featured={i === 0} />
              ))}
            </div>
          </>
        )}

        {/* Time Slot Clusters */}
        {relevantClusters.length > 0 && (
          <>
            <SectionHeader icon={Layers} title="Popular Time Slots" subtitle="Multiple groups at the same time" />
            <div className="space-y-4">
              {relevantClusters.map((cluster) => (
                <TimeClusterCard
                  key={cluster.id}
                  cluster={cluster}
                  onJoin={handleJoin}
                  onWaitlist={handleWaitlist}
                  onCreateOverflow={handleOverflow}
                />
              ))}
            </div>
          </>
        )}

        {trending.length > 0 && (
          <>
            <SectionHeader icon={TrendingUp} title="Trending Near You" />
            <div className="space-y-4">
              {trending.map((plan) => (
                <PlanCard key={plan.id} plan={plan} onJoin={handleJoin} />
              ))}
            </div>
          </>
        )}

        {forYou.length > 0 && (
          <>
            <SectionHeader icon={Heart} title="Based on Your Interests" />
            <div className="space-y-4">
              {forYou.map((plan) => (
                <PlanCard key={plan.id} plan={plan} onJoin={handleJoin} />
              ))}
            </div>
          </>
        )}

        {rest.length > 0 && (
          <>
            <SectionHeader icon={Sparkles} title="New Plans" />
            <div className="space-y-4">
              {rest.map((plan) => (
                <PlanCard key={plan.id} plan={plan} onJoin={handleJoin} />
              ))}
            </div>
          </>
        )}
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-card/95 backdrop-blur-md px-5 pt-12 pb-4">
        <div className="mx-auto max-w-lg">
          <div className="flex items-center justify-between mb-1">
            <div>
              <h1 className="text-2xl font-bold text-foreground tracking-tight">Circl</h1>
              <p className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                <MapPin className="h-3 w-3" /> Bangalore, India
              </p>
            </div>
            <Button variant="outline" size="icon" className="h-9 w-9 rounded-full border-border">
              <SlidersHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="mx-auto max-w-lg px-5 pt-2">
        <SocialProofBanner />

        <Tabs defaultValue="group" className="w-full">
          <TabsList className="w-full rounded-full bg-muted p-1 h-11">
            <TabsTrigger
              value="partner"
              className="flex-1 rounded-full text-xs font-semibold h-9 data-[state=active]:shadow-sm"
            >
              Find Partner
            </TabsTrigger>
            <TabsTrigger
              value="group"
              className="flex-1 rounded-full text-xs font-semibold h-9 data-[state=active]:shadow-sm"
            >
              Find Group
            </TabsTrigger>
          </TabsList>

          {/* Live indicator */}
          <div className="mt-4 mb-1 flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: 'hsl(var(--circl-success))' }} />
              <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: 'hsl(var(--circl-success))' }} />
            </span>
            <span className="text-xs text-muted-foreground font-medium">
              {mockPlans.length} active plans nearby
            </span>
          </div>

          <TabsContent value="partner" className="mt-2">
            {renderSections('partner')}
          </TabsContent>

          <TabsContent value="group" className="mt-2">
            {renderSections('group')}
          </TabsContent>
        </Tabs>
      </main>

      <JoinModal plan={selectedPlan} open={modalOpen} onClose={() => setModalOpen(false)} />
      <WaitlistModal plan={waitlistPlan} open={waitlistOpen} onClose={() => setWaitlistOpen(false)} />
      <OverflowModal cluster={overflowCluster} open={overflowOpen} onClose={() => setOverflowOpen(false)} />
      <BottomNav />
    </div>
  );
};

export default Index;
