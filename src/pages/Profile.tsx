import { Star, Shield, CheckCircle2, Award } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import BottomNav from '@/components/BottomNav';
import { mockProfile, categoryIcons } from '@/data/mockData';
import { motion } from 'framer-motion';

const Profile = () => {
  const p = mockProfile;

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="border-b bg-card/95 backdrop-blur-md px-4 pt-12 pb-4">
        <div className="mx-auto max-w-lg flex items-center justify-between">
          <h1 className="text-lg font-bold text-foreground">Profile</h1>
          <Button variant="outline" size="sm" className="rounded-full text-xs">
            Edit Profile
          </Button>
        </div>
      </header>

      <main className="mx-auto max-w-lg px-4 pt-5 space-y-5">
        {/* Avatar & Name */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-4">
          <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-lg font-bold text-primary">
            {p.avatar}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-foreground">{p.name}</h2>
              {p.verified && <CheckCircle2 className="h-4 w-4 text-primary" />}
            </div>
            <div className="flex items-center gap-3 text-xs text-muted-foreground mt-0.5">
              <span className="flex items-center gap-0.5">
                <Star className="h-3 w-3 fill-primary text-primary" /> {p.rating}
              </span>
              <span>{p.totalCircles} circles completed</span>
            </div>
          </div>
        </motion.div>

        {/* Bio */}
        <p className="text-sm text-muted-foreground leading-relaxed">{p.bio}</p>

        {/* Safety Score */}
        <Card className="rounded-2xl">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2 text-sm font-medium">
                <Shield className="h-4 w-4 text-primary" /> Safety Score
              </div>
              <span className="text-sm font-bold text-primary">{p.safetyScore}%</span>
            </div>
            <Progress value={p.safetyScore} className="h-2" />
            <p className="text-[10px] text-muted-foreground mt-2">Based on verification, ratings, and community behavior</p>
          </CardContent>
        </Card>

        {/* Interests */}
        <div>
          <h3 className="text-sm font-semibold mb-2 flex items-center gap-1.5">
            <Award className="h-4 w-4 text-primary" /> Interests
          </h3>
          <div className="flex flex-wrap gap-2">
            {p.interests.map((interest) => (
              <Badge key={interest} variant="secondary" className="rounded-full text-xs px-3 py-1">
                {interest}
              </Badge>
            ))}
          </div>
        </div>

        {/* Past Circles */}
        <div>
          <h3 className="text-sm font-semibold mb-3">Past Circles</h3>
          <div className="space-y-2">
            {p.pastCircles.map((circle, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="rounded-xl">
                  <CardContent className="p-3 flex items-center gap-3">
                    <span className="text-lg">{categoryIcons[circle.category]}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{circle.title}</p>
                      <p className="text-[10px] text-muted-foreground">{circle.date} · {circle.members} people · {circle.sessions} sessions</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default Profile;
