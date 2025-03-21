
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { text, targetLanguage } = await req.json();
    
    if (!text || !targetLanguage) {
      return new Response(
        JSON.stringify({ error: "Missing required parameters: text and targetLanguage" }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Here we'd normally use a paid translation API like Google Translate or DeepL
    // For this implementation, I'll create a simple mapping for common phrases
    // This is just a demonstration - a real implementation would use an actual translation API
    const translations = {
      "en": {
        "hello": "Hello",
        "welcome": "Welcome",
        "login": "Login",
        "signup": "Sign Up",
        "wallet": "Wallet",
        "settings": "Settings",
        "staking": "Staking",
        "market": "Market",
        "analytics": "Analytics",
      },
      "fr": {
        "hello": "Bonjour",
        "welcome": "Bienvenue",
        "login": "Connexion",
        "signup": "S'inscrire",
        "wallet": "Portefeuille",
        "settings": "Paramètres",
        "staking": "Staking",
        "market": "Marché",
        "analytics": "Analytique",
      },
      "es": {
        "hello": "Hola",
        "welcome": "Bienvenido",
        "login": "Iniciar sesión",
        "signup": "Registrarse",
        "wallet": "Cartera",
        "settings": "Ajustes",
        "staking": "Staking",
        "market": "Mercado",
        "analytics": "Analítica",
      },
      // Add basic translations for other languages
      "ru": {
        "hello": "Привет",
        "welcome": "Добро пожаловать",
        "login": "Вход",
        "signup": "Регистрация",
        "wallet": "Кошелек",
        "settings": "Настройки", 
        "staking": "Стейкинг",
        "market": "Рынок",
        "analytics": "Аналитика",
      },
      "ar": {
        "hello": "مرحبا",
        "welcome": "أهلا بك",
        "login": "تسجيل الدخول",
        "signup": "التسجيل",
        "wallet": "محفظة",
        "settings": "إعدادات",
        "staking": "ستاكينج",
        "market": "سوق",
        "analytics": "تحليلات",
      }
    };
    
    // Simple translation logic - in a real implementation you would use a proper API
    const translatedText = text.split(' ').map(word => {
      const lowerWord = word.toLowerCase();
      if (translations[targetLanguage] && translations[targetLanguage][lowerWord]) {
        return translations[targetLanguage][lowerWord];
      }
      return word;
    }).join(' ');
    
    return new Response(
      JSON.stringify({ translatedText }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
    
  } catch (error) {
    console.error("Error in translate-text function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
