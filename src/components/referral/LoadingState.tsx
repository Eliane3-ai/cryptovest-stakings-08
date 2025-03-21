
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useNavigate } from 'react-router-dom';

const LoadingState: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-[#0B0E11] text-white">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-6">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate('/wallet')}
            className="text-white hover:bg-white/10"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold">Refer & Earn</h1>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="border-[#474D57] bg-[#1E2026]">
              <CardHeader className="pb-2">
                <Skeleton className="h-6 w-40 bg-[#2B3139]" />
                <Skeleton className="h-4 w-32 mt-2 bg-[#2B3139]" />
              </CardHeader>
              <CardContent className="space-y-4">
                <Skeleton className="h-16 w-full bg-[#2B3139]" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoadingState;
