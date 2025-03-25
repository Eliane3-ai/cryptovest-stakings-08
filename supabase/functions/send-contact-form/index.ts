
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { fullName, email, message, csrf_token } = await req.json();
    
    // Validate required fields
    if (!fullName || !email || !message) {
      return new Response(
        JSON.stringify({ 
          error: "Missing required fields. Please provide fullName, email, and message."
        }),
        { 
          status: 400, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }

    console.log(`Processing contact form from ${fullName} (${email})`);
    
    // In a real implementation, you would send an email
    // For demonstration, we'll just log the message and return success
    
    // Store the message in the database (would need a contact_messages table)
    // const { error } = await supabaseAdmin
    //   .from('contact_messages')
    //   .insert({
    //     full_name: fullName,
    //     email: email,
    //     message: message,
    //     responded: false
    //   });
    
    // if (error) throw error;
    
    console.log(`Successfully processed contact form. Message: ${message.substring(0, 50)}...`);
    
    return new Response(
      JSON.stringify({ 
        success: true,
        message: "Contact form submitted successfully. An admin will respond shortly."
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  } catch (error) {
    console.error("Error processing contact form:", error);
    
    return new Response(
      JSON.stringify({ 
        error: "Failed to process contact form. Please try again later."
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  }
});
