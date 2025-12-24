
import { GoogleGenAI, Type } from "@google/genai";
import { AnimalState, Evaluation } from "../types";

const API_KEY = process.env.API_KEY || "";

export const generateAnimalImage = async (animal: AnimalState): Promise<string | null> => {
  if (!API_KEY) return null;
  
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  const prompt = `A realistic scientific illustration of a newly evolved biological creature named "${animal.name}". 
    Environment: It lives in the ${animal.habitat}, specifically in a ${animal.subHabitat} environment. 
    Energy source: ${animal.energySource}. 
    Primary movement: ${animal.movement}. 
    Body Plan: ${animal.bodyPlan}.
    Defense: ${animal.defense.join(", ")}. 
    Physical features: ${animal.structuralAdaptation} which helps for ${animal.structuralNeed}.
    Description: ${animal.description}. 
    Style: Natural history museum style, detailed scientific realism, clear white background, biological illustration. No text or labels on the image.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: { parts: [{ text: prompt }] },
      config: {
        imageConfig: {
          aspectRatio: "1:1"
        }
      },
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    return null;
  } catch (error) {
    console.error("Error generating image:", error);
    return null;
  }
};

export const getEvolutionaryFeedback = async (animal: AnimalState): Promise<Evaluation | null> => {
  if (!API_KEY) return null;

  const ai = new GoogleGenAI({ apiKey: API_KEY });
  const prompt = `
    Analyze this student's evolved creature from an evolutionary biology perspective based on the following rubric:
    
    Rubric Criteria:
    1. Evolutionary Consistency (Logic between Energy, Habitat, Movement, Body Plan).
    2. Environmental Adaptations (Structural, Physiological, Behavioral).
    3. Biological Logic (Consistency and lack of contradictions).
    4. Evolutionary Trade-off (Cost of survival).
    5. Use of Scientific Terms (Accuracy, avoiding teleology like "wants" or "intends").
    6. Justification and Explanation (Depth of "why").

    Animal Data:
    - Name: ${animal.name}
    - Main Environment: ${animal.habitat}
    - Sub-Environment: ${animal.subHabitat}
    - Energy Source: ${animal.energySource}
    - Movement: ${animal.movement}
    - Body Plan: ${animal.bodyPlan}
    - Justification for Body Plan: ${animal.bodyPlanJustification}
    - Defense Strategy: ${animal.defense.join(", ")}
    - Reproduction Strategy: ${animal.reproduction}
    - Structural Adaptation: ${animal.structuralAdaptation} (Purpose: ${animal.structuralNeed})
    - Physiological Adaptation: ${animal.physiologicalAdaptation}
    - Behavioral Adaptation: ${animal.behavioralAdaptation}
    - Trade-off (Cost of survival): ${animal.tradeOff}

    Instructions:
    - Respond in HEBREW.
    - Evaluate each of the 6 criteria with a level: 'מצוין', 'טוב', 'בסיסי', or 'חסר'.
    - Provide a specific feedback sentence for each criterion.
    - Assign a summary category: 'חשיבה אבולוציונית חזקה', 'חשיבה אבולוציונית טובה', 'הבנה בסיסית', or 'נדרש חיזוק'.
    - Provide a general summary feedback.
    - Output must be valid JSON.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            scores: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  criterion: { type: Type.STRING },
                  level: { type: Type.STRING },
                  feedback: { type: Type.STRING },
                  score: { type: Type.NUMBER }
                },
                required: ["criterion", "level", "feedback", "score"]
              }
            },
            summaryCategory: { type: Type.STRING },
            generalFeedback: { type: Type.STRING }
          },
          required: ["scores", "summaryCategory", "generalFeedback"]
        }
      }
    });
    
    const result = JSON.parse(response.text || "{}");
    return result as Evaluation;
  } catch (error) {
    console.error("Evaluation generation failed:", error);
    return null;
  }
};
