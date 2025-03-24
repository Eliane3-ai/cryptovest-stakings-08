
import { useState } from 'react';

/**
 * Hook that manages the form state for authentication
 */
export function useAuthForm() {
  // Form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [country, setCountry] = useState('');
  
  // UI state
  const [loading, setLoading] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);
  const [activeTab, setActiveTab] = useState('login');
  const [isButtonPressed, setIsButtonPressed] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  
  return {
    // Form fields
    email, setEmail,
    password, setPassword,
    confirmPassword, setConfirmPassword,
    username, setUsername,
    fullName, setFullName,
    mobileNumber, setMobileNumber,
    country, setCountry,
    // UI state
    loading, setLoading,
    verificationSent, setVerificationSent,
    activeTab, setActiveTab,
    isButtonPressed, setIsButtonPressed,
    resendLoading, setResendLoading
  };
}
