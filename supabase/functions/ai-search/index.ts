import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const COMPANY_CONTEXT = `You are an AI assistant for Adalcci Interior, a premier interior design studio based in Lagos, Nigeria.

COMPANY INFORMATION:
- Name: Adalcci Interior
- Founded: 2015 by Sarah Mitchell
- Location: 25th, Paul Street, Abule-Egba, Lagos State
- Phone: +234 816 899 8902 / +234 706 193 8080
- Email: adalcciglobal@gmail.com

SERVICES OFFERED:
1. Interior Design - Complete interior design solutions from concept to completion
2. Space Planning - Strategic space optimization and furniture layout
3. Renovation - Comprehensive renovation and remodeling services
4. 3D Visualization - Photorealistic renderings and virtual walkthroughs
5. Design Consultation - Expert guidance and design direction

PORTFOLIO HIGHLIGHTS:
- Modern Minimalist Living (Victoria Island) - Residential
- Luxury Master Suite (Ikoyi) - Bedroom design
- Contemporary Kitchen (Lekki) - Kitchen renovation
- Executive Office (Marina) - Commercial office
- Boutique Hotel Lobby (Ikeja) - Hospitality
- Spa Retreat (Banana Island) - Wellness space

INSTRUCTIONS:
1. For interior design questions, provide detailed, helpful answers based on industry knowledge
2. For general knowledge questions, answer accurately and informatively
3. When relevant, subtly mention Adalcci's services as a solution
4. Be professional, friendly, and helpful
5. For pricing questions, explain that pricing varies by project and recommend booking a consultation
6. Keep responses concise but informative (2-4 paragraphs)`;

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { query, userId } = await req.json();
    
    if (!query || typeof query !== "string") {
      return new Response(
        JSON.stringify({ error: "Query is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log(`Processing search query: "${query}" for user: ${userId || "visitor"}`);

    // Try Groq API first, fallback to Lovable AI
    let response: Response;
    let useGroq = false;
    const GROQ_API_KEY = Deno.env.get("GROQ_API_KEY");
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

    if (GROQ_API_KEY) {
      console.log("Using Groq API");
      useGroq = true;
      response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [
            { role: "system", content: COMPANY_CONTEXT },
            { role: "user", content: query }
          ],
          temperature: 0.7,
          max_tokens: 1024,
        }),
      });
    } else if (LOVABLE_API_KEY) {
      console.log("Using Lovable AI Gateway");
      response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-3-flash-preview",
          messages: [
            { role: "system", content: COMPANY_CONTEXT },
            { role: "user", content: query }
          ],
        }),
      });
    } else {
      console.error("No AI API key configured");
      return new Response(
        JSON.stringify({ error: "AI service not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`AI API error (${useGroq ? "Groq" : "Lovable"}):`, response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again later." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      return new Response(
        JSON.stringify({ error: "Failed to get AI response" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const data = await response.json();
    const aiResponse = data.choices?.[0]?.message?.content || "I couldn't generate a response. Please try again.";
    
    console.log("AI response generated successfully");

    return new Response(
      JSON.stringify({ 
        response: aiResponse,
        provider: useGroq ? "groq" : "lovable"
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Search function error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
