
import React from 'react';
import { Star, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { ReferralStats } from '@/types/referral';

interface DailyTask {
  id: string;
  title: string;
  description: string;
  reward: number;
  completed: boolean;
  progress: number;
}

interface DailyTasksCardProps {
  stats: ReferralStats;
  isLoggedIn: boolean;
}

const DailyTasksCard: React.FC<DailyTasksCardProps> = ({ stats, isLoggedIn }) => {
  // Daily tasks calculation
  const dailyTasks: DailyTask[] = [
    {
      id: '1',
      title: 'Make a deposit of 50 USDT',
      description: 'Deposit at least 50 USDT to your staking account',
      reward: 0.5,
      completed: false,
      progress: 0
    },
    {
      id: '2',
      title: 'Invite 2 friends',
      description: 'Share your referral link with friends',
      reward: 1.0,
      completed: false,
      progress: stats.completedReferrals > 0 ? (stats.completedReferrals / 2) * 100 : 0
    },
    {
      id: '3',
      title: 'Complete KYC verification',
      description: 'Verify your identity to unlock full platform features',
      reward: 2.0,
      completed: isLoggedIn,
      progress: isLoggedIn ? 100 : 0
    }
  ];

  return (
    <Card className="border-[#474D57] bg-[#1E2026] mt-6">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Star className="h-5 w-5 text-[#F0B90B]" />
          Daily Tasks
        </CardTitle>
        <CardDescription className="text-gray-400">
          Complete daily tasks to earn additional rewards
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {dailyTasks.map((task) => (
          <div key={task.id} className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className={`rounded-full h-5 w-5 flex items-center justify-center ${task.completed ? 'bg-green-500' : 'border border-gray-400'}`}>
                  {task.completed && <Check className="h-3 w-3 text-white" />}
                </div>
                <h3 className="font-medium">{task.title}</h3>
              </div>
              <Badge variant="outline" className="bg-[#F0B90B1A] border-[#F0B90B33] text-[#F0B90B]">
                +{task.reward} USDT
              </Badge>
            </div>
            <p className="text-sm text-gray-400">{task.description}</p>
            <Progress 
              value={task.progress} 
              className="h-2 bg-[#2B3139]" 
            />
            <Separator className="bg-[#474D57]" />
          </div>
        ))}
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full bg-[#F0B90B] hover:bg-[#F0B90B]/90 text-black"
          disabled={!dailyTasks.some(task => task.completed)}
        >
          Claim Completed Tasks
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DailyTasksCard;
