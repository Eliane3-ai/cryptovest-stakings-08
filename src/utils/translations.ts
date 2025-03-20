
import { Language } from '@/contexts/LanguageContext';

// Common translations used across the app
const translations = {
  assets: {
    en: 'Assets',
    fr: 'Actifs',
    es: 'Activos',
    ru: 'Активы',
    ar: 'الأصول',
    pt: 'Ativos',
    tr: 'Varlıklar',
    id: 'Aset',
    th: 'สินทรัพย์',
    ne: 'सम्पत्तिहरू'
  },
  transactions: {
    en: 'Transactions',
    fr: 'Transactions',
    es: 'Transacciones',
    ru: 'Транзакции',
    ar: 'المعاملات',
    pt: 'Transações',
    tr: 'İşlemler',
    id: 'Transaksi',
    th: 'ธุรกรรม',
    ne: 'लेनदेनहरू'
  },
  staking: {
    en: 'Staking',
    fr: 'Staking',
    es: 'Staking',
    ru: 'Стейкинг',
    ar: 'الرهان',
    pt: 'Staking',
    tr: 'Stake',
    id: 'Staking',
    th: 'สเตกกิ้ง',
    ne: 'स्टेकिंग'
  },
  wallet: {
    en: 'Wallet',
    fr: 'Portefeuille',
    es: 'Cartera',
    ru: 'Кошелек',
    ar: 'محفظة',
    pt: 'Carteira',
    tr: 'Cüzdan',
    id: 'Dompet',
    th: 'กระเป๋าเงิน',
    ne: 'वालेट'
  },
  market: {
    en: 'Market',
    fr: 'Marché',
    es: 'Mercado',
    ru: 'Рынок',
    ar: 'السوق',
    pt: 'Mercado',
    tr: 'Piyasa',
    id: 'Pasar',
    th: 'ตลาด',
    ne: 'बजार'
  },
  analytics: {
    en: 'Analytics',
    fr: 'Analytique',
    es: 'Analítica',
    ru: 'Аналитика',
    ar: 'التحليلات',
    pt: 'Análises',
    tr: 'Analitik',
    id: 'Analitik',
    th: 'วิเคราะห์',
    ne: 'विश्लेषण'
  },
  settings: {
    en: 'Settings',
    fr: 'Paramètres',
    es: 'Configuración',
    ru: 'Настройки',
    ar: 'الإعدادات',
    pt: 'Configurações',
    tr: 'Ayarlar',
    id: 'Pengaturan',
    th: 'การตั้งค่า',
    ne: 'सेटिङहरू'
  },
  startEarning: {
    en: 'Start Earning',
    fr: 'Commencer à Gagner',
    es: 'Empieza a Ganar',
    ru: 'Начать Зарабатывать',
    ar: 'ابدأ الربح',
    pt: 'Comece a Ganhar',
    tr: 'Kazanmaya Başla',
    id: 'Mulai Menghasilkan',
    th: 'เริ่มหารายได้',
    ne: 'कमाउन सुरु गर्नुहोस्'
  },
  explore: {
    en: 'Explore',
    fr: 'Explorer',
    es: 'Explorar',
    ru: 'Исследовать',
    ar: 'استكشاف',
    pt: 'Explorar',
    tr: 'Keşfet',
    id: 'Jelajahi',
    th: 'สำรวจ',
    ne: 'अन्वेषण गर्नुहोस्'
  },
  backToWallet: {
    en: 'Back to Wallet',
    fr: 'Retour au Portefeuille',
    es: 'Volver a la Cartera',
    ru: 'Назад к Кошельку',
    ar: 'العودة إلى المحفظة',
    pt: 'Voltar para a Carteira',
    tr: 'Cüzdana Dön',
    id: 'Kembali ke Dompet',
    th: 'กลับไปที่กระเป๋าเงิน',
    ne: 'वालेटमा फिर्ता'
  },
  recentTransactions: {
    en: 'Recent Transactions',
    fr: 'Transactions Récentes',
    es: 'Transacciones Recientes',
    ru: 'Недавние Транзакции',
    ar: 'المعاملات الأخيرة',
    pt: 'Transações Recentes',
    tr: 'Son İşlemler',
    id: 'Transaksi Terbaru',
    th: 'ธุรกรรมล่าสุด',
    ne: 'हालैका लेनदेनहरू'
  },
  stakingOptions: {
    en: 'Staking Options',
    fr: 'Options de Staking',
    es: 'Opciones de Staking',
    ru: 'Варианты Стейкинга',
    ar: 'خيارات الرهان',
    pt: 'Opções de Staking',
    tr: 'Stake Seçenekleri',
    id: 'Pilihan Staking',
    th: 'ตัวเลือกการสเตกกิ้ง',
    ne: 'स्टेकिंग विकल्पहरू'
  },
  learnAboutStaking: {
    en: 'Learn About Staking',
    fr: 'En Savoir Plus sur le Staking',
    es: 'Aprende Sobre Staking',
    ru: 'Узнать о Стейкинге',
    ar: 'تعلم عن الرهان',
    pt: 'Aprenda Sobre Staking',
    tr: 'Stake Hakkında Bilgi Edinin',
    id: 'Pelajari Tentang Staking',
    th: 'เรียนรู้เกี่ยวกับการสเตกกิ้ง',
    ne: 'स्टेकिंग बारे जान्नुहोस्'
  },
  learnMore: {
    en: 'Learn more',
    fr: 'En savoir plus',
    es: 'Saber más',
    ru: 'Узнать больше',
    ar: 'اعرف المزيد',
    pt: 'Saiba mais',
    tr: 'Daha fazla bilgi',
    id: 'Pelajari lebih lanjut',
    th: 'เรียนรู้เพิ่มเติม',
    ne: 'थप जान्नुहोस्'
  }
};

export const getTranslation = (key: keyof typeof translations, language: Language): string => {
  if (!translations[key]) {
    console.warn(`Translation key not found: ${key}`);
    return key;
  }
  
  if (!translations[key][language]) {
    console.warn(`Language not found for key: ${key} in language: ${language}`);
    return translations[key]['en']; // Fallback to English
  }
  
  return translations[key][language];
};

export default translations;
