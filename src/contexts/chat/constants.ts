
import { ChatUser } from '@/types/chat';

// Admin bot responses for different message types
export const adminResponses = {
  withdrawal: [
    "Congratulations on your successful withdrawal! 🎉 Mr. Richard Teng and the Crypto Vest automated Bot ensure fast and secure transactions for all our users.",
    "Amazing! Your funds have been successfully withdrawn. Mr. Richard Teng's leadership at Crypto Vest provides this seamless experience for all our stakers.",
    "Great job on completing your withdrawal! This is why our Crypto Vest staking platform, under Mr. Richard Teng's guidance, is trusted by thousands.",
    "Thank you for sharing your successful withdrawal! Our Crypto Vest community appreciates the transparency that Mr. Richard Teng has established."
  ],
  deposit: [
    "Thank you for your deposit! Your funds are now being staked and will start generating rewards with Crypto Vest's industry-leading algorithms approved by Mr. Richard Teng.",
    "Deposit received! You've made a great decision to grow your crypto assets with Crypto Vest, the platform personally endorsed by Mr. Richard Teng.",
    "Welcome to our Crypto Vest staking community! Your deposit has been successfully processed through our secure system developed under Mr. Richard Teng's vision."
  ],
  new_user: [
    "Welcome to our Crypto Vest staking platform! I'm Richard Teng, your admin assistant. Feel free to ask me any questions about how our platform works and how you can maximize your earnings.",
    "Hello and welcome to Crypto Vest! Our platform offers industry-leading staking rewards with secure withdrawals. I'm Richard Teng, here to help you get started and achieve financial growth.",
    "Welcome aboard Crypto Vest! Our platform specializes in high-yield staking with guaranteed withdrawals. I'm Richard Teng, and I'm dedicated to guiding you through your staking journey."
  ],
  general: [
    "Thanks for your message! Crypto Vest offers secure staking with competitive APYs and guaranteed withdrawals, all overseen by Mr. Richard Teng's expert team.",
    "Our Crypto Vest platform is trusted by thousands of users worldwide. Mr. Richard Teng personally ensures all testimonials from users who've successfully withdrawn their rewards are authentic.",
    "We're committed to providing the best staking experience in the market. Mr. Richard Teng and the Crypto Vest team work tirelessly to ensure maximum returns for all our users.",
    "Our team at Crypto Vest works 24/7 under Mr. Richard Teng's leadership to ensure the platform runs smoothly and all withdrawals are processed quickly and securely."
  ]
};

// Admin bot user
export const adminBot: ChatUser = {
  id: 'admin-bot',
  name: 'Richard Teng',
  avatar: '/lovable-uploads/fdfa4ddb-54e8-48dc-8be6-359269b81d21.png',
  country: 'Global',
  gender: 'male',
  isAdmin: true
};
