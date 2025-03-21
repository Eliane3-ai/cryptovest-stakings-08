
import React, { useState } from 'react';
import { Link, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

interface ReferralLinkCardProps {
  referralLink: string;
  referralCode: string;
}

const ReferralLinkCard: React.FC<ReferralLinkCardProps> = ({ referralLink, referralCode }) => {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  
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
            if (navigator.share) {
              navigator.share({
                title: 'Join Crypto Vest Staking',
                text: `Join me on Crypto Vest and get staking rewards! Use my referral code: ${referralCode}`,
                url: referralLink,
              }).catch(console.error);
            } else {
              copyToClipboard();
            }
          }}
        >
          Share Link
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ReferralLinkCard;
