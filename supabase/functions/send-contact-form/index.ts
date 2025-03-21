
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
    const { fullName, email, message } = await req.json();
    
    if (!fullName || !email || !message) {
      return new Response(
        JSON.stringify({ error: "Missing required parameters: fullName, email, and message" }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // In a real implementation, you would use an email service like SendGrid, Mailgun, etc.
    // For this demonstration, we'll just log the information and return a success message
    console.log(`Contact Form Submission:
      From: ${fullName} (${email})
      Message: ${message}
    `);
    
    // Implement email sending to cryptovestbot@yahoo.com here
    // For example using SendGrid or other email service
    
    return new Response(
      JSON.stringify({ message: "Contact form submitted successfully" }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
    
  } catch (error) {
    console.error("Error in send-contact-form function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
