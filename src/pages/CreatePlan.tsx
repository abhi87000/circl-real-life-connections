import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent } from '@/components/ui/card';
import BottomNav from '@/components/BottomNav';
import { categoryIcons, categoryLabels, PlanCategory } from '@/data/mockData';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';

const steps = ['Category', 'Type', 'Location', 'Date & Time', 'Details', 'Confirm'];

const CreatePlan = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [category, setCategory] = useState<PlanCategory | null>(null);
  const [planType, setPlanType] = useState<'partner' | 'group' | null>(null);
  const [location, setLocation] = useState('');
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState('');
  const [groupSize, setGroupSize] = useState(4);
  const [genderPref, setGenderPref] = useState('any');
  const [description, setDescription] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const progress = ((step + 1) / steps.length) * 100;

  const canNext = () => {
    switch (step) {
      case 0: return !!category;
      case 1: return !!planType;
      case 2: return location.trim().length > 0;
      case 3: return !!date && time.trim().length > 0;
      case 4: return description.trim().length > 0;
      default: return true;
    }
  };

  const handleSubmit = () => {
    setSubmitted(true);
    setTimeout(() => navigate('/'), 2000);
  };

  const pageVariants = {
    enter: { opacity: 0, x: 30 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -30 },
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center pb-20">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="flex flex-col items-center text-center px-6"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
            className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10"
          >
            <Check className="h-10 w-10 text-primary" />
          </motion.div>
          <h2 className="text-xl font-bold text-foreground">Plan Created!</h2>
          <p className="mt-2 text-sm text-muted-foreground">Your plan is now live. Others can find and join it.</p>
        </motion.div>
        <BottomNav />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="sticky top-0 z-40 border-b bg-card/95 backdrop-blur-md px-4 pt-12 pb-3">
        <div className="mx-auto max-w-lg">
          <div className="flex items-center gap-3 mb-3">
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => step > 0 ? setStep(step - 1) : navigate('/')}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="flex-1">
              <h1 className="text-base font-semibold text-foreground">Create Plan</h1>
              <p className="text-[10px] text-muted-foreground">{steps[step]}</p>
            </div>
            <span className="text-xs text-muted-foreground">{step + 1}/{steps.length}</span>
          </div>
          <Progress value={progress} className="h-1" />
        </div>
      </header>

      <main className="mx-auto max-w-lg px-4 pt-6">
        <AnimatePresence mode="wait">
          <motion.div key={step} variants={pageVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.2 }}>
            {/* Step 0: Category */}
            {step === 0 && (
              <div>
                <h2 className="text-lg font-semibold mb-1">What's the plan?</h2>
                <p className="text-sm text-muted-foreground mb-5">Choose a category</p>
                <div className="grid grid-cols-2 gap-3">
                  {(Object.keys(categoryIcons) as PlanCategory[]).map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setCategory(cat)}
                      className={cn(
                        'flex items-center gap-3 rounded-xl border p-4 transition-all text-left',
                        category === cat
                          ? 'border-primary bg-primary/5 shadow-sm'
                          : 'border-border hover:border-primary/30'
                      )}
                    >
                      <span className="text-2xl">{categoryIcons[cat]}</span>
                      <span className="text-sm font-medium">{categoryLabels[cat]}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 1: Type */}
            {step === 1 && (
              <div>
                <h2 className="text-lg font-semibold mb-1">Partner or Group?</h2>
                <p className="text-sm text-muted-foreground mb-5">How many people?</p>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setPlanType('partner')}
                    className={cn(
                      'rounded-xl border p-6 text-center transition-all',
                      planType === 'partner' ? 'border-primary bg-primary/5 shadow-sm' : 'border-border hover:border-primary/30'
                    )}
                  >
                    <span className="text-3xl block mb-2">👤</span>
                    <span className="text-sm font-semibold">1:1 Partner</span>
                    <p className="text-[10px] text-muted-foreground mt-1">Find one person</p>
                  </button>
                  <button
                    onClick={() => setPlanType('group')}
                    className={cn(
                      'rounded-xl border p-6 text-center transition-all',
                      planType === 'group' ? 'border-primary bg-primary/5 shadow-sm' : 'border-border hover:border-primary/30'
                    )}
                  >
                    <span className="text-3xl block mb-2">👥</span>
                    <span className="text-sm font-semibold">Group</span>
                    <p className="text-[10px] text-muted-foreground mt-1">Multiple people</p>
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Location */}
            {step === 2 && (
              <div>
                <h2 className="text-lg font-semibold mb-1">Where?</h2>
                <p className="text-sm text-muted-foreground mb-5">Add a location</p>
                <Input
                  placeholder="e.g. Cubbon Park, Bangalore"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="rounded-xl h-12"
                />
              </div>
            )}

            {/* Step 3: Date & Time */}
            {step === 3 && (
              <div>
                <h2 className="text-lg font-semibold mb-1">When?</h2>
                <p className="text-sm text-muted-foreground mb-5">Pick date and time</p>
                <div className="space-y-3">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className={cn('w-full justify-start rounded-xl h-12 text-left font-normal', !date && 'text-muted-foreground')}>
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, 'PPP') : 'Pick a date'}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar mode="single" selected={date} onSelect={setDate} initialFocus className="p-3 pointer-events-auto" />
                    </PopoverContent>
                  </Popover>
                  <Input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="rounded-xl h-12"
                  />
                </div>
              </div>
            )}

            {/* Step 4: Details */}
            {step === 4 && (
              <div>
                <h2 className="text-lg font-semibold mb-1">Details</h2>
                <p className="text-sm text-muted-foreground mb-5">Add some info</p>
                <div className="space-y-4">
                  {planType === 'group' && (
                    <div>
                      <label className="text-sm font-medium mb-1.5 block">Group size</label>
                      <div className="flex items-center gap-3">
                        {[3, 4, 5, 6, 8].map((n) => (
                          <button
                            key={n}
                            onClick={() => setGroupSize(n)}
                            className={cn(
                              'h-10 w-10 rounded-full border text-sm font-medium transition-all',
                              groupSize === n ? 'border-primary bg-primary text-primary-foreground' : 'border-border hover:border-primary/30'
                            )}
                          >
                            {n}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Gender preference</label>
                    <div className="flex gap-2">
                      {['any', 'male', 'female', 'mixed'].map((g) => (
                        <button
                          key={g}
                          onClick={() => setGenderPref(g)}
                          className={cn(
                            'rounded-full border px-4 py-2 text-xs font-medium capitalize transition-all',
                            genderPref === g ? 'border-primary bg-primary text-primary-foreground' : 'border-border hover:border-primary/30'
                          )}
                        >
                          {g === 'any' ? 'No preference' : g}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Description</label>
                    <Textarea
                      placeholder="Tell people about this plan..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="rounded-xl min-h-[100px] resize-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 5: Confirm */}
            {step === 5 && (
              <div>
                <h2 className="text-lg font-semibold mb-4">Looks good?</h2>
                <Card className="rounded-2xl">
                  <CardContent className="p-5 space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{category && categoryIcons[category]}</span>
                      <span className="font-semibold">{category && categoryLabels[category]}</span>
                      <span className="ml-auto text-xs bg-secondary text-secondary-foreground px-2 py-0.5 rounded-full">
                        {planType === 'partner' ? '1:1' : `Group of ${groupSize}`}
                      </span>
                    </div>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <p>📍 {location}</p>
                      <p>📅 {date ? format(date, 'PPP') : '—'} · {time || '—'}</p>
                      <p>👤 {genderPref === 'any' ? 'No preference' : genderPref}</p>
                    </div>
                    <p className="text-sm border-t pt-3">{description}</p>
                  </CardContent>
                </Card>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation buttons */}
        <div className="mt-8 flex gap-3">
          {step > 0 && (
            <Button variant="outline" onClick={() => setStep(step - 1)} className="rounded-full flex-1">
              Back
            </Button>
          )}
          {step < steps.length - 1 ? (
            <Button onClick={() => setStep(step + 1)} disabled={!canNext()} className="rounded-full flex-1">
              Continue
            </Button>
          ) : (
            <Button onClick={handleSubmit} className="rounded-full flex-1">
              Create Plan
            </Button>
          )}
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default CreatePlan;
