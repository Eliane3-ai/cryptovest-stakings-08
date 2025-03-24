
import { useState } from 'react';

/**
 * Simplified 2FA methods (functionality removed)
 */
export function useTwoFactorMethods() {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  /**
   * Simplified verify function (2FA functionality removed)
   */
  const verify2FA = async () => {
    return { 
      error: null as Error | null, 
      data: { user: null },
      success: true 
    };
  };

  /**
   * Simplified setup function (2FA functionality removed)
   */
  const setup2FA = async () => {
    return { 
      error: null as Error | null, 
      data: null,
      secret: null,
      qrCodeUrl: null 
    };
  };

  /**
   * Simplified verify setup function (2FA functionality removed)
   */
  const verify2FASetup = async () => {
    return { 
      error: null as Error | null, 
      data: { success: true },
      success: true 
    };
  };

  /**
   * Simplified disable function (2FA functionality removed)
   */
  const disable2FA = async () => {
    setTwoFactorEnabled(false);
    return { 
      error: null as Error | null, 
      data: { success: true },
      success: true 
    };
  };

  /**
   * Always returns false since 2FA is removed
   */
  const isTwoFactorEnabled = () => {
    return false;
  };

  return {
    verify2FA,
    setup2FA,
    verify2FASetup,
    disable2FA,
    isTwoFactorEnabled
  };
}
