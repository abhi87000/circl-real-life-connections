import { useState } from 'react';
import { MapPin, SlidersHorizontal } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import PlanCard from '@/components/PlanCard';
import JoinModal from '@/components/JoinModal';
import BottomNav from '@/components/BottomNav';
import { mockPlans, Plan } from '@/data/mockData';
import { motion } from 'framer-motion';

const Index = () => {
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const partnerPlans = mockPlans.filter((p) => p.type === 'partner');
  const groupPlans = mockPlans.filter((p) => p.type === 'group');

  const handleJoin = (plan: Plan) => {
    setSelectedPlan(plan);
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b bg-card/95 backdrop-blur-md px-4 pt-12 pb-3">
        <div className="mx-auto max-w-lg">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h1 className="text-xl font-bold text-foreground tracking-tight">Circl</h1>
              <p className="flex items-center gap-1 text-xs text-muted-foreground">
                <MapPin className="h-3 w-3" /> Bangalore, India
              </p>
            </div>
            <Button variant="outline" size="icon" className="h-9 w-9 rounded-full">
              <SlidersHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="mx-auto max-w-lg px-4 pt-4">
        <Tabs defaultValue="partner" className="w-full">
          <TabsList className="w-full rounded-full bg-muted">
            <TabsTrigger value="partner" className="flex-1 rounded-full text-xs font-semibold">
              Find Partner
            </TabsTrigger>
            <TabsTrigger value="group" className="flex-1 rounded-full text-xs font-semibold">
              Find Group
            </TabsTrigger>
          </TabsList>

          <div className="mt-4 mb-3">
            <h2 className="text-sm font-medium text-muted-foreground flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              Nearby Plans
            </h2>
          </div>

          <TabsContent value="partner">
            <motion.div className="space-y-3" initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.08 } } }}>
              {partnerPlans.map((plan) => (
                <PlanCard key={plan.id} plan={plan} onJoin={handleJoin} />
              ))}
            </motion.div>
          </TabsContent>

          <TabsContent value="group">
            <motion.div className="space-y-3" initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.08 } } }}>
              {groupPlans.map((plan) => (
                <PlanCard key={plan.id} plan={plan} onJoin={handleJoin} />
              ))}
            </motion.div>
          </TabsContent>
        </Tabs>
      </main>

      <JoinModal plan={selectedPlan} open={modalOpen} onClose={() => setModalOpen(false)} />
      <BottomNav />
    </div>
  );
};

export default Index;
