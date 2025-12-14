import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";
import { AnalysisResult, RepoContext } from '../types';

// Get API key from environment
const getApiKey = () => {
  // @ts-ignore - Vite exposes env vars via import.meta.env
  return import.meta.env.VITE_API_KEY || "";
};

export const analyzeRepo = async (context: RepoContext): Promise<AnalysisResult> => {
  const apiKey = getApiKey();
  
  if (!apiKey) {
    throw new Error("API key is missing. Please add VITE_API_KEY to your .env file");
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ 
    model: "gemini-2.5-flash",
    systemInstruction: "You are GitGrade, an expert code reviewer and technical hiring manager. You judge repositories strictly but fairly. You prioritize clean architecture, testing, and good documentation.",
    generationConfig: {
      responseMimeType: "application/json",
      responseSchema: {
        type: SchemaType.OBJECT,
        properties: {
          score: { type: SchemaType.NUMBER },
          level: { type: SchemaType.STRING },
          summary: { type: SchemaType.STRING },
          strengths: {
            type: SchemaType.ARRAY,
            items: { type: SchemaType.STRING }
          },
          weaknesses: {
            type: SchemaType.ARRAY,
            items: { type: SchemaType.STRING }
          },
          roadmap: {
            type: SchemaType.ARRAY,
            items: {
              type: SchemaType.OBJECT,
              properties: {
                title: { type: SchemaType.STRING },
                description: { type: SchemaType.STRING },
                priority: { type: SchemaType.STRING }
              },
              required: ["title", "description", "priority"]
            }
          }
        },
        required: ["score", "level", "summary", "strengths", "weaknesses", "roadmap"]
      }
    }
  });

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

  const result = await model.generateContent(prompt);
  const response = result.response;
  const text = response.text();

  if (text) {
    return JSON.parse(text) as AnalysisResult;
  }

  throw new Error("Failed to generate analysis");
};