
import React, { useState } from 'react';
import ActionButtons from './wallet/ActionButtons';
import WithdrawDialog from './dialogs/WithdrawDialog';
import DepositDialog from './dialogs/DepositDialog';
import GasFeeTopUpDialog from './dialogs/GasFeeTopUpDialog';

interface WalletActionsProps {
  className?: string;
}

const WalletActions: React.FC<WalletActionsProps> = ({ className }) => {
  const [withdrawDialogOpen, setWithdrawDialogOpen] = useState(false);
  const [depositDialogOpen, setDepositDialogOpen] = useState(false);
  const [topUpDialogOpen, setTopUpDialogOpen] = useState(false);

  return (
    <>
      <ActionButtons 
        className={className}
        onWithdraw={() => setWithdrawDialogOpen(true)}
        onDeposit={() => setDepositDialogOpen(true)}
      />

      {/* Dialogs */}
      <WithdrawDialog 
        open={withdrawDialogOpen} 
        onOpenChange={setWithdrawDialogOpen}
        onShowTopUp={() => setTopUpDialogOpen(true)}
      />
      
      <DepositDialog 
        open={depositDialogOpen} 
        onOpenChange={setDepositDialogOpen} 
      />
      
      <GasFeeTopUpDialog 
        open={topUpDialogOpen} 
        onOpenChange={setTopUpDialogOpen} 
      />
    </>
  );
};

export default WalletActions;
