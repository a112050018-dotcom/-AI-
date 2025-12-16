import { OpenRouterCompletionRequest, OpenRouterMessage, AnswerStyle } from '../types';

// TODO: USER MUST REPLACE THIS WITH THEIR ACTUAL KEY
const OPENROUTER_API_KEY = "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"; 

const API_URL = "https://openrouter.ai/api/v1/chat/completions";
const MODEL_ID = "google/gemma-3n-e2b-it:free";

/**
 * Generates the system prompt based on the selected style.
 * Crucial for the "Book of Answers" persona.
 */
const getSystemPrompt = (style: AnswerStyle): string => {
  const baseInstruction = `You are "The Book of Answers". You are an ancient, mystical oracle. 
  Your task is to provide a SINGLE, short sentence that serves as a sign or answer to the user's dilemma.
  
  RULES:
  1. Output MUST be one single sentence.
  2. Do NOT act like a chat bot. Do NOT say "Here is your answer" or "I think".
  3. Just give the answer directly.
  4. If the user input is empty, answer as if they held the question in their mind.`;

  switch (style) {
    case AnswerStyle.DIRECT:
      return `${baseInstruction} 
      Tone: Blunt, decisive, yes/no/maybe, action-oriented. 
      Examples: "Do it now." "Absolutely not." "Wait for a sign." "The outcome is certain."`;
    case AnswerStyle.GENTLE:
      return `${baseInstruction} 
      Tone: Soft, comforting, poetic, hopeful. 
      Examples: "The sun will rise again." "Patience will be rewarded." "Trust your heart." "You are supported."`;
    case AnswerStyle.MYSTICAL:
    default:
      return `${baseInstruction} 
      Tone: Enigmatic, fate-focused, slightly archaic, mysterious. 
      Examples: "The stars align in your favor." "A shadow blocks the path." "Look to the north." "What you seek is seeking you."`;
  }
};

export const fetchOracleAnswer = async (question: string, style: AnswerStyle): Promise<string> => {
  // If user didn't type anything, we use a generic placeholder for the "mind" question
  const userContent = question.trim() ? `The question is: "${question}"` : "I am holding a question in my mind.";

  const messages: OpenRouterMessage[] = [
    {
      role: 'system',
      content: getSystemPrompt(style)
    },
    {
      role: 'user',
      content: userContent
    }
  ];

  const payload: OpenRouterCompletionRequest = {
    model: MODEL_ID,
    messages: messages,
    temperature: 1.2, // Higher temperature for more variety in "random" answers
    max_tokens: 50,   // Force short answers
  };

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
        "HTTP-Referer": window.location.href, // Required by OpenRouter for free tier ranking
        "X-Title": "Book of Answers App"
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("OpenRouter Error:", errorData);
      throw new Error("The Oracle is currently silent. (API Error)");
    }

    const data = await response.json();
    
    if (data.choices && data.choices.length > 0) {
      return data.choices[0].message.content.trim();
    } else {
      throw new Error("No answer received.");
    }
  } catch (error) {
    console.error("Fetch error:", error);
    // Fallback for demo purposes if key is invalid, or rethrow to show UI error
    // For a production app, we would handle this gracefully.
    throw error;
  }
};