
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Copy, Users, Gift, Check, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

const Referral: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  
  // Mock data (in a real app, this would come from an API)
  const referralCode = "CRYPTOVEST" + Math.floor(Math.random() * 1000);
  const referralLink = `https://cryptovest.com/ref/${referralCode}`;
  const referralBalance = 3.0;
  const totalReferrals = 4;
  const pendingReferrals = 1;
  const completedReferrals = 3;
  
  // Daily tasks (in a real app, this would come from an API)
  const dailyTasks = [
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
      progress: 50
    },
    {
      id: '3',
      title: 'Complete KYC verification',
      description: 'Verify your identity to unlock full platform features',
      reward: 2.0,
      completed: true,
      progress: 100
    }
  ];
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    toast({
      title: "Referral link copied!",
      description: "Your referral link has been copied to clipboard.",
    });
    setTimeout(() => setCopied(false), 3000);
  };
  
  return (
    <div className="min-h-screen bg-[#0B0E11] text-white">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-6">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate('/')}
            className="text-white hover:bg-white/10"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold">Refer & Earn</h1>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Referral Balance Card */}
          <Card className="border-[#474D57] bg-[#1E2026]">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Gift className="h-5 w-5 text-[#F0B90B]" />
                Referral Balance
              </CardTitle>
              <CardDescription className="text-gray-400">
                Rewards earned from referrals
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline">
                <span className="text-3xl font-bold">{referralBalance.toFixed(2)}</span>
                <span className="ml-2 text-lg text-[#F0B90B]">USDT</span>
              </div>
              <div className="text-xs text-gray-400 mt-1">
                ~ ${(referralBalance * 1).toFixed(2)} USD
              </div>
            </CardContent>
            <CardFooter className="pt-0">
              <Button className="w-full bg-[#F0B90B] hover:bg-[#F0B90B]/90 text-black">
                Withdraw Rewards
              </Button>
            </CardFooter>
          </Card>
          
          {/* Referral Stats Card */}
          <Card className="border-[#474D57] bg-[#1E2026]">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Users className="h-5 w-5 text-[#F0B90B]" />
                Referral Statistics
              </CardTitle>
              <CardDescription className="text-gray-400">
                Your referral performance
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Total Referrals</span>
                <span className="font-semibold">{totalReferrals}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Completed</span>
                <span className="font-semibold text-green-500">{completedReferrals}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Pending</span>
                <span className="font-semibold text-yellow-500">{pendingReferrals}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Total Earned</span>
                <span className="font-semibold text-[#F0B90B]">{(completedReferrals * 3).toFixed(2)} USDT</span>
              </div>
            </CardContent>
          </Card>
          
          {/* Referral Link Card */}
          <Card className="border-[#474D57] bg-[#1E2026]">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Link className="h-5 w-5 text-[#F0B90B]" />
                Your Referral Link
              </CardTitle>
              <CardDescription className="text-gray-400">
                Share this link to invite friends
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-[#2B3139] border border-[#474D57] rounded-md p-3 flex justify-between items-center">
                <div className="truncate text-sm mr-2">{referralLink}</div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={copyToClipboard}
                  className="flex-shrink-0"
                >
                  {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
              <div className="text-sm text-center">
                <span className="text-gray-400">Your code: </span>
                <span className="text-[#F0B90B] font-semibold">{referralCode}</span>
              </div>
            </CardContent>
            <CardFooter className="pt-0">
              <Button 
                className="w-full"
                variant="outline"
                onClick={() => {
                  // In a real app, this would open a share dialog
                  toast({
                    title: "Share with friends",
                    description: "Share options would appear here in a real app.",
                  });
                }}
              >
                Share Link
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        {/* How it works section */}
        <Card className="border-[#474D57] bg-[#1E2026] mt-6">
          <CardHeader>
            <CardTitle className="text-lg">How It Works</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-4">
              <div className="bg-[#F0B90B] text-black rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0">
                1
              </div>
              <div>
                <h3 className="font-semibold">Share Your Referral Link</h3>
                <p className="text-gray-400 text-sm">Share your unique referral link with friends and family.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="bg-[#F0B90B] text-black rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0">
                2
              </div>
              <div>
                <h3 className="font-semibold">They Sign Up & Deposit</h3>
                <p className="text-gray-400 text-sm">When your friends sign up and make their first deposit, they become your referrals.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="bg-[#F0B90B] text-black rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0">
                3
              </div>
              <div>
                <h3 className="font-semibold">Earn Rewards</h3>
                <p className="text-gray-400 text-sm">You receive 3 USDT for each successful referral. Your friends also get a bonus!</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Daily Tasks */}
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
            <Button className="w-full bg-[#F0B90B] hover:bg-[#F0B90B]/90 text-black">
              Claim Completed Tasks
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Referral;
