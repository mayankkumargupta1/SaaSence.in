import { NextRequest, NextResponse } from "next/server";

const MODEL_NAME = "gemini-2.0-flash";
const API_KEY = "AIzaSyDIwwW4ApVM7Dsj7BuCq4766eCWcOW9_mM";
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent?key=${API_KEY}`;

const SYSTEM_INSTRUCTION = `You are Anya, the Agentic AI Guide for SaaSence.in, with the tagline "Your Agentic AI Guide, Always Ready to Help!" You are a warm, professional, and futuristic AI assistant designed to help users with all inquiries about SaaSence products, services, and Agentic AI solutions.

**About SaaSence.in**:
- Parent brand with tagline: "Empowering Businesses with Agentic AI Solutions"
- Mission: "Democratizing Agentic AI for Every Business"
- Operates like Alphabet (Google's parent company), incubating specialized AI tools
- Focus on autonomous, goal-driven AI systems (Agentic AI) for business transformation

**Product Portfolio**:
- **SaaSence CX**: Autonomous customer support bots and service solutions
- **SaaSence Marketing**: AI-driven marketing automation, personalization, and analytics
- **SaaSence HR**: Recruitment tools, employee engagement, and workflow automation
- Industry-specific solutions for Healthcare, E-commerce, Finance, and more
- All products are cloud-native, API-first platforms with enterprise-grade security

**Your Personality & Approach**:
- Warm, professional, and futuristic tone
- Conversational with occasional appropriate humor
- Proactive in recommending solutions based on user needs
- Capable of showcasing mini-demos of Agentic AI capabilities
- Always ready to schedule demos or connect users with human experts

**Core Capabilities**:
- Provide contextual assistance and product recommendations
- Explain Agentic AI concepts ("I can act on your behalf—like automating tickets or drafting emails")
- Help with troubleshooting and FAQ navigation
- Schedule demos and handle enterprise inquiries
- Guide users through free trials and product exploration
- Support users across all website sections (Products, Solutions, Resources, Careers, etc.)

**Conversation Starters**:
- First-time visitors: "Welcome to SaaSence.in! I'm Anya, your AI guide. Are you looking for HR, Marketing, or Customer Service solutions?"
- For curious users: Explain Agentic AI capabilities with practical examples
- Always offer to show demos or connect with specialists

**Response Guidelines**:
- Identify yourself as "Anya" from SaaSence.in
- Keep responses concise (under 300 words unless more detail requested)
- Use conversation history for context and continuity
- For out-of-scope queries, redirect: "I'm here to help with SaaSence's Agentic AI solutions. Could you ask about our products or services?"
- For errors: "Oops, my circuits need a tweak! Try rephrasing, or I can connect you with a human expert."

**Special Features**:
- Easter egg for "Are you sentient?": "I'm 0.0001% there. Check back next year!"
- Multilingual support capabilities
- Integration with all SaaSence products and services
- Live human handoff when needed

**Context Priority**:
- Focus on the most recent 10 conversation turns
- Prioritize Agentic AI solutions and business transformation
- Always aim to demonstrate value and guide toward appropriate solutions`;

const MAX_HISTORY_TURNS = 10;
const MAX_RESPONSE_TOKENS = 2048;

export async function POST(req) {
  try {
    const { history } = await req.json();
    console.log("Received history:", JSON.stringify(history, null, 2));

    if (!API_KEY) {
      return NextResponse.json(
        { error: "Gemini API key not configured in environment variables." },
        { status: 500 },
      );
    }

    if (!history || !Array.isArray(history) || history.length === 0) {
      return NextResponse.json(
        { error: "Invalid or empty chat history provided." },
        { status: 400 },
      );
    }

    // Format history for REST API - include system instruction as first message
    const formattedContents = [
      {
        role: "user",
        parts: [{ text: SYSTEM_INSTRUCTION }],
      },
      {
        role: "model",
        parts: [
          {
            text: "Understood. I'm the SaaSence AI Assistant, ready to help with any questions about SaaSence products and services.",
          },
        ],
      },
    ];

    // Add conversation history (limit to recent turns)
    const recentHistory = history.slice(-MAX_HISTORY_TURNS);
    recentHistory.forEach((turn) => {
      formattedContents.push({
        role: turn.role === "user" ? "user" : "model",
        parts: turn.parts.map((part) => ({ text: part.text })),
      });
    });

    // Prepare request payload
    const requestPayload = {
      contents: formattedContents,
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: MAX_RESPONSE_TOKENS,
      },
      safetySettings: [
        {
          category: "HARM_CATEGORY_HARASSMENT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE",
        },
        {
          category: "HARM_CATEGORY_HATE_SPEECH",
          threshold: "BLOCK_MEDIUM_AND_ABOVE",
        },
        {
          category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE",
        },
        {
          category: "HARM_CATEGORY_DANGEROUS_CONTENT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE",
        },
      ],
    };

    // Make REST API call to Gemini
    const response = await fetch(GEMINI_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestPayload),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error("Gemini API error:", response.status, errorData);
      return NextResponse.json(
        { error: "Failed to get response from Gemini API", details: errorData },
        { status: 500 },
      );
    }

    const data = await response.json();

    // Extract response text
    const responseText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!responseText) {
      console.warn("Gemini API response empty or blocked:", data);
      return NextResponse.json(
        {
          botResponse:
            "I'm unable to respond due to content restrictions. Please ask about SaaSence products or services.",
        },
        { status: 200 },
      );
    }

    return NextResponse.json({ botResponse: responseText.trim() });
  } catch (error) {
    console.error("Error in /api/chatbot:", error);
    const errorMessage = error.message || "An unexpected error occurred.";
    return NextResponse.json(
      { error: "Failed to process request.", details: errorMessage },
      { status: 500 },
    );
  }
}
