
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Referral, ReferralStats } from '@/types/referral';
import { useToast } from '@/hooks/use-toast';

export const useReferrals = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [referralCode, setReferralCode] = useState<string>("");
  const [stats, setStats] = useState<ReferralStats>({
    totalReferrals: 0,
    completedReferrals: 0,
    pendingReferrals: 0,
    totalEarned: 0
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Load referrals for current user
  useEffect(() => {
    if (!user) {
      setReferrals([]);
      setIsLoading(false);
      return;
    }

    const fetchReferrals = async () => {
      setIsLoading(true);
      
      try {
        // Get existing referral code
        const { data: existingReferral } = await supabase
          .from('referrals')
          .select('*')
          .eq('referrer_id', user.id)
          .limit(1)
          .single();
          
        if (existingReferral) {
          setReferralCode(existingReferral.code);
        } else {
          // Generate a new referral code
          const newCode = `CRYPTOVEST${Math.floor(Math.random() * 10000)}`;
          const { data: newReferral, error } = await supabase
            .from('referrals')
            .insert([
              { referrer_id: user.id, code: newCode }
            ])
            .select()
            .single();
            
          if (!error && newReferral) {
            setReferralCode(newReferral.code);
          }
        }
        
        // Get all referrals for this user
        const { data } = await supabase
          .from('referrals')
          .select('*')
          .eq('referrer_id', user.id);
          
        if (data) {
          // Ensure the data conforms to the Referral type
          const typedReferrals: Referral[] = data.map(ref => ({
            ...ref,
            status: ref.status as 'pending' | 'completed' | string,
            referred_id: ref.referred_id || null,
            completed_at: ref.completed_at || null
          }));
          
          setReferrals(typedReferrals);
          
          // Calculate stats
          const completed = typedReferrals.filter(r => r.status === 'completed');
          setStats({
            totalReferrals: typedReferrals.length,
            completedReferrals: completed.length,
            pendingReferrals: typedReferrals.length - completed.length,
            totalEarned: completed.length * 3 // Assuming 3 USDT per completed referral
          });
        }
      } catch (error) {
        console.error('Error fetching referrals:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReferrals();
    
    // Set up real-time listener for referrals
    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'referrals',
          filter: `referrer_id=eq.${user.id}`
        },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            const newReferral = payload.new as Referral;
            setReferrals(prev => [...prev, {
              ...newReferral,
              referred_id: newReferral.referred_id || null,
              completed_at: newReferral.completed_at || null,
              status: newReferral.status as 'pending' | 'completed' | string
            }]);
            
            toast({
              title: "New referral created!",
              description: "Your referral link is ready to be shared.",
            });
          } else if (payload.eventType === 'UPDATE') {
            setReferrals(prev => 
              prev.map(ref => ref.id === payload.new.id ? {
                ...payload.new as Referral,
                referred_id: payload.new.referred_id || null,
                completed_at: payload.new.completed_at || null,
                status: payload.new.status as 'pending' | 'completed' | string
              } : ref)
            );
            
            if (payload.old.status === 'pending' && payload.new.status === 'completed') {
              toast({
                title: "Referral completed!",
                description: "Someone signed up using your referral link. You earned 3 USDT!",
              });
            }
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, toast]);

  return {
    referrals,
    referralCode,
    stats,
    isLoading,
    referralLink: referralCode ? `https://cryptovest.com/ref/${referralCode}` : ""
  };
};

export default useReferrals;
