import { useState } from 'react';
import { MapPin, SlidersHorizontal, TrendingUp, Clock, Sparkles, Heart } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import PlanCard from '@/components/PlanCard';
import JoinModal from '@/components/JoinModal';
import BottomNav from '@/components/BottomNav';
import { mockPlans, mockProfile, Plan, categoryLabels } from '@/data/mockData';
import { motion } from 'framer-motion';

const SectionHeader = ({ icon: Icon, title }: { icon: React.ElementType; title: string }) => (
  <div className="flex items-center gap-2 mb-3 mt-6 first:mt-0">
    <Icon className="h-4 w-4 text-primary" />
    <h2 className="text-sm font-semibold text-foreground">{title}</h2>
  </div>
);

const Index = () => {
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleJoin = (plan: Plan) => {
    setSelectedPlan(plan);
    setModalOpen(true);
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
    return { happeningSoon, trending, forYou, rest };
  };

  const renderSections = (type: 'partner' | 'group') => {
    const { happeningSoon, trending, forYou, rest } = filterByType(type);

    return (
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
      >
        {happeningSoon.length > 0 && (
          <>
            <SectionHeader icon={Clock} title="Happening Soon" />
            <div className="space-y-4">
              {happeningSoon.map((plan) => (
                <PlanCard key={plan.id} plan={plan} onJoin={handleJoin} />
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
        <Tabs defaultValue="partner" className="w-full">
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
      <BottomNav />
    </div>
  );
};

export default Index;
