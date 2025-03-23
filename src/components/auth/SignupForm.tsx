import React from 'react';
import { Mail, Lock, User, MapPin, Phone } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CheckCircle } from 'lucide-react';

interface SignupFormProps {
  email: string;
  setEmail: (email: string) => void;
  username: string;
  setUsername: (username: string) => void;
  fullName: string;
  setFullName: (fullName: string) => void;
  mobileNumber: string;
  setMobileNumber: (mobileNumber: string) => void;
  country: string;
  setCountry: (country: string) => void;
  password: string;
  setPassword: (password: string) => void;
  confirmPassword: string;
  setConfirmPassword: (password: string) => void;
  loading: boolean;
  handleSignup: (e: React.FormEvent) => Promise<void>;
  setActiveTab: (tab: string) => void;
  referralCode: string | null;
  isButtonPressed: boolean;
  setIsButtonPressed: (pressed: boolean) => void;
}

const countries = [
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", 
  "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", 
  "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", 
  "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", 
  "Comoros", "Congo", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", 
  "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", 
  "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", 
  "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", 
  "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", 
  "Korea, North", "Korea, South", "Kosovo", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", 
  "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", 
  "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", 
  "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", 
  "Nigeria", "North Macedonia", "Norway", "Oman", "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea", 
  "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", 
  "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", 
  "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", 
  "South Africa", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Taiwan", 
  "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", 
  "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", 
  "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
];

const SignupForm: React.FC<SignupFormProps> = ({
  email,
  setEmail,
  username,
  setUsername,
  fullName,
  setFullName,
  mobileNumber,
  setMobileNumber,
  country,
  setCountry,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  loading,
  handleSignup,
  setActiveTab,
  referralCode,
  isButtonPressed,
  setIsButtonPressed
}) => {
  const buttonStyle = isButtonPressed 
    ? "w-full bg-yellow-400 hover:bg-yellow-500 text-black transform scale-95 transition-all duration-200" 
    : "w-full bg-[#F0B90B] hover:bg-[#F0B90B]/90 text-black transition-all duration-200";

  return (
    <form onSubmit={handleSignup} className="space-y-4">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="signup-email" className="text-white">Email</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <Input
              id="signup-email"
              type="email"
              placeholder="your.email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-10 bg-[#2B3139] border-[#474D57]"
              required
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="username" className="text-white">Username</Label>
          <div className="relative">
            <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <Input
              id="username"
              type="text"
              placeholder="johndoe"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="pl-10 bg-[#2B3139] border-[#474D57]"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="fullName" className="text-white">Full Name</Label>
          <div className="relative">
            <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <Input
              id="fullName"
              type="text"
              placeholder="John Doe"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="pl-10 bg-[#2B3139] border-[#474D57]"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="mobileNumber" className="text-white">Mobile Number</Label>
          <div className="relative">
            <Phone className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <Input
              id="mobileNumber"
              type="tel"
              placeholder="+1234567890"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              className="pl-10 bg-[#2B3139] border-[#474D57]"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="country" className="text-white">Country</Label>
          <div className="relative">
            <Select value={country} onValueChange={setCountry} required>
              <SelectTrigger className="bg-[#2B3139] border-[#474D57] pl-10">
                <MapPin className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <SelectValue placeholder="Select your country" />
              </SelectTrigger>
              <SelectContent className="bg-[#2B3139] border-[#474D57] max-h-[200px] overflow-y-auto">
                {countries.map((c) => (
                  <SelectItem key={c} value={c}>{c}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="signup-password" className="text-white">Password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <Input
              id="signup-password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pl-10 bg-[#2B3139] border-[#474D57]"
              required
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="confirm-password" className="text-white">Confirm Password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <Input
              id="confirm-password"
              type="password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="pl-10 bg-[#2B3139] border-[#474D57]"
              required
            />
          </div>
        </div>
        
        {referralCode && (
          <div className="p-3 bg-[#F0B90B]/10 border border-[#F0B90B]/20 rounded-lg flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-[#F0B90B]" />
            <span className="text-sm text-[#F0B90B]">
              Referral code applied: {referralCode}
            </span>
          </div>
        )}

        <Alert className="bg-[#263240] border-[#3E4C5C]">
          <CheckCircle className="h-4 w-4 text-[#F0B90B]" />
          <AlertTitle className="text-white">Email Verification Required</AlertTitle>
          <AlertDescription className="text-gray-300">
            After registration, you'll need to verify your email address before you can log in.
          </AlertDescription>
        </Alert>
      </div>
      
      <div className="flex flex-col mt-6">
        <Button 
          type="submit" 
          className={buttonStyle}
          disabled={loading}
          onMouseDown={() => setIsButtonPressed(true)}
          onMouseUp={() => setIsButtonPressed(false)}
          onMouseLeave={() => setIsButtonPressed(false)}
          onTouchStart={() => setIsButtonPressed(true)}
          onTouchEnd={() => setIsButtonPressed(false)}
        >
          {loading ? 'Creating Account...' : 'Create Account'}
        </Button>
        
        <p className="mt-4 text-center text-sm text-gray-400">
          Already have an account?{' '}
          <button 
            type="button"
            onClick={() => setActiveTab('login')}
            className="text-[#F0B90B] hover:text-[#F0B90B]/90"
          >
            Sign in
          </button>
        </p>
      </div>
    </form>
  );
};

export default SignupForm;
