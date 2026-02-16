import { MessageCircle } from 'lucide-react';
import BottomNav from '@/components/BottomNav';

const Chats = () => {
  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="border-b bg-card/95 backdrop-blur-md px-4 pt-12 pb-4">
        <div className="mx-auto max-w-lg">
          <h1 className="text-lg font-bold text-foreground">Circle Chats</h1>
        </div>
      </header>
      <main className="mx-auto max-w-lg px-4 flex flex-col items-center justify-center pt-32 text-center">
        <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4">
          <MessageCircle className="h-7 w-7 text-muted-foreground" />
        </div>
        <h2 className="text-base font-semibold text-foreground">No circle chats yet</h2>
        <p className="text-sm text-muted-foreground mt-1">Join a circle to start chatting with your group</p>
      </main>
      <BottomNav />
    </div>
  );
};

export default Chats;
