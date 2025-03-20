
import { toast } from "sonner";
import { Language } from "@/contexts/LanguageContext";

// Function to show transaction toast based on language
export const showTransactionToast = (
  amount: number, 
  symbol: string, 
  usdValue: number, 
  language: Language
) => {
  // Translate toast messages based on language
  const receivedText = language === 'en' ? 'Received' :
                      language === 'fr' ? 'Reçu' :
                      language === 'es' ? 'Recibido' :
                      language === 'ru' ? 'Получено' :
                      language === 'ar' ? 'تم استلام' :
                      language === 'pt' ? 'Recebido' :
                      language === 'tr' ? 'Alındı' :
                      language === 'id' ? 'Diterima' :
                      language === 'th' ? 'ได้รับ' : 'प्राप्त भयो';
                      
  const addedText = language === 'en' ? 'has been added to your wallet' :
                  language === 'fr' ? 'a été ajouté à votre portefeuille' :
                  language === 'es' ? 'ha sido añadido a tu cartera' :
                  language === 'ru' ? 'добавлено в ваш кошелек' :
                  language === 'ar' ? 'تمت إضافته إلى محفظتك' :
                  language === 'pt' ? 'foi adicionado à sua carteira' :
                  language === 'tr' ? 'cüzdanınıza eklendi' :
                  language === 'id' ? 'telah ditambahkan ke dompet Anda' :
                  language === 'th' ? 'ได้ถูกเพิ่มลงในกระเป๋าเงินของคุณแล้ว' : 'तपाईंको वालेटमा थपिएको छ';
  
  toast.success(`${receivedText} ${amount.toFixed(6)} ${symbol}`, {
    description: `$${usdValue.toFixed(2)} ${addedText}`,
    position: 'top-right',
  });
};
