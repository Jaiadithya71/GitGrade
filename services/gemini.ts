import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult, RepoContext } from '../types';

// Initialize Gemini
// NOTE: process.env.API_KEY is expected to be available in the environment.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeRepo = async (context: RepoContext): Promise<AnalysisResult> => {
  const model = "gemini-2.5-flash";

  // Construct a prompt that feeds the repo data to the model
  const prompt = `
    Analyze the following GitHub repository data to provide a comprehensive developer profile review.
    
    repository_metadata: ${JSON.stringify(context.metadata)}
    
    file_structure_overview:
    ${context.fileTree.join('\n')}
    
    readme_content:
    ${context.readmeContent ? context.readmeContent.substring(0, 5000) : "No README found."}
    
    package_json_summary:
    ${context.packageJsonContent ? context.packageJsonContent : "No package.json found."}
    
    Your goal is to act as a senior tech mentor. Evaluate based on:
    1. Code quality indicators implied by structure and naming.
    2. Documentation quality.
    3. Project structure and organization.
    4. Test coverage (implied by file names like *.test.js, tests/ folder).
    5. Tech stack usage.
    
    Provide:
    - A score (0-100).
    - A skill level (Beginner, Intermediate, Advanced).
    - A concise professional summary.
    - A list of Strengths and Weaknesses.
    - A Personalized Roadmap with actionable items.
  `;

  const response = await ai.models.generateContent({
    model,
    contents: prompt,
    config: {
      systemInstruction: "You are GitGrade, an expert code reviewer and technical hiring manager. You judge repositories strictly but fairly. You prioritize clean architecture, testing, and good documentation.",
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          score: { type: Type.NUMBER },
          level: { type: Type.STRING },
          summary: { type: Type.STRING },
          strengths: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          },
          weaknesses: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          },
          roadmap: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                description: { type: Type.STRING },
                priority: { type: Type.STRING }
              }
            }
          }
        },
        required: ["score", "level", "summary", "strengths", "weaknesses", "roadmap"]
      }
    }
  });

  if (response.text) {
    return JSON.parse(response.text) as AnalysisResult;
  }

  throw new Error("Failed to generate analysis");
};
