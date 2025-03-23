
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.8";

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
    const { email, action } = await req.json();
    
    if (!email) {
      return new Response(
        JSON.stringify({ error: "Missing required parameter: email" }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Generate a 6-digit verification code
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Initialize Supabase client with the URL and anon key from environment variables
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_ANON_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    // Store the verification code in a table for later verification
    // You would need to create this table in your Supabase project
    const { error: storeError } = await supabase
      .from('verification_codes')
      .insert({
        email: email,
        code: verificationCode,
        expires_at: new Date(Date.now() + 30 * 60 * 1000).toISOString(), // 30 minutes expiry
        action: action || 'verify_email'
      });
      
    if (storeError) {
      throw new Error(`Error storing verification code: ${storeError.message}`);
    }

    console.log(`Verification code generated for ${email}: ${verificationCode}`);

    // For a real application, here you would send an email with the verification code
    // For this demonstration, we'll just return the code
    
    return new Response(
      JSON.stringify({ 
        message: "Verification code sent successfully",
        // Only include the verification code in non-production environments for testing
        code: Deno.env.get("ENVIRONMENT") !== "production" ? verificationCode : undefined
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
    
  } catch (error) {
    console.error("Error in email-verification function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
