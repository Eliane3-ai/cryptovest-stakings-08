
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Trophy, Star, Award, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { getTranslation } from '@/utils/translations';

interface Winner {
  id: string;
  name: string;
  avatar: string;
  country: string;
  amount: string;
  currency: string;
  date: string;
}

const WinnersPage: React.FC = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  
  // Mock data for winners
  const winners: Winner[] = [
    {
      id: '1',
      name: 'James Wilson',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      country: 'UK',
      amount: '12,500',
      currency: 'USDT',
      date: '2 days ago'
    },
    {
      id: '2',
      name: 'Sophia Chen',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      country: 'Singapore',
      amount: '8,750',
      currency: 'USDT',
      date: '3 days ago'
    },
    {
      id: '3',
      name: 'Carlos Rodriguez',
      avatar: 'https://randomuser.me/api/portraits/men/67.jpg',
      country: 'Spain',
      amount: '7,200',
      currency: 'USDT',
      date: '4 days ago'
    },
    {
      id: '4',
      name: 'Emma Thompson',
      avatar: 'https://randomuser.me/api/portraits/women/23.jpg',
      country: 'Australia',
      amount: '6,500',
      currency: 'USDT',
      date: '5 days ago'
    },
    {
      id: '5',
      name: 'Akira Tanaka',
      avatar: 'https://randomuser.me/api/portraits/men/91.jpg',
      country: 'Japan',
      amount: '5,800',
      currency: 'USDT',
      date: '1 week ago'
    },
    {
      id: '6',
      name: 'Maria Santos',
      avatar: 'https://randomuser.me/api/portraits/women/67.jpg',
      country: 'Brazil',
      amount: '4,900',
      currency: 'USDT',
      date: '1 week ago'
    },
    {
      id: '7',
      name: 'Fatima Al-Farsi',
      avatar: 'https://randomuser.me/api/portraits/women/82.jpg',
      country: 'UAE',
      amount: '4,300',
      currency: 'USDT',
      date: '1 week ago'
    },
    {
      id: '8',
      name: 'John Smith',
      avatar: 'https://randomuser.me/api/portraits/men/42.jpg',
      country: 'USA',
      amount: '3,900',
      currency: 'USDT',
      date: '2 weeks ago'
    }
  ];

  const topWinners = winners.slice(0, 3);
  const otherWinners = winners.slice(3);

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
          <h1 className="text-xl font-bold">{getTranslation('winners', language)}</h1>
        </div>
        
        <div className="mb-6">
          <Card className="bg-gradient-to-r from-[#F0B90B]/20 to-[#F0B90B]/5 border-[#F0B90B]/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[#F0B90B]">
                <Trophy className="h-5 w-5" />
                Top Staking Winners
              </CardTitle>
              <CardDescription className="text-white/70">
                Congratulations to our top performers who have successfully withdrawn their staking rewards
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {topWinners.map((winner, index) => (
                  <Card key={winner.id} className="bg-[#1E2026] border-[#474D57] overflow-hidden">
                    <div className={`h-1 ${
                      index === 0 ? 'bg-yellow-500' : 
                      index === 1 ? 'bg-gray-400' : 
                      'bg-amber-700'
                    }`}></div>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <Avatar className="h-12 w-12 border-2 border-[#F0B90B]">
                          <AvatarImage src={winner.avatar} />
                          <AvatarFallback>{winner.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{winner.name}</div>
                          <div className="text-sm text-white/60">{winner.country}</div>
                        </div>
                        <Badge className="ml-auto bg-[#F0B90B] text-black">
                          {index === 0 ? <Star className="h-3 w-3 mr-1" /> : 
                           index === 1 ? <Award className="h-3 w-3 mr-1" /> : 
                           <Trophy className="h-3 w-3 mr-1" />}
                          #{index + 1}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center border-t border-[#474D57] pt-3">
                        <div className="text-sm text-white/60">Withdrawal</div>
                        <div className="font-medium text-[#F0B90B]">{winner.amount} {winner.currency}</div>
                      </div>
                      <div className="text-xs text-right text-white/50 mt-1">{winner.date}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Card className="bg-[#1E2026] border-[#474D57]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Recent Winners
            </CardTitle>
            <CardDescription>
              Members who have successfully withdrawn their staking rewards
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {otherWinners.map((winner) => (
                <div 
                  key={winner.id} 
                  className="flex items-center justify-between p-3 rounded-lg border border-[#474D57] bg-[#2B3139] hover:bg-[#2B3139]/80 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={winner.avatar} />
                      <AvatarFallback>{winner.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{winner.name}</div>
                      <div className="text-sm text-white/60">{winner.country}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-[#F0B90B]">{winner.amount} {winner.currency}</div>
                    <div className="text-xs text-white/50">{winner.date}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WinnersPage;
