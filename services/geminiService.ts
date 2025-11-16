
import { GoogleGenAI, Type } from "@google/genai";

export interface AnnouncementResponse {
  titulo: string;
  contenido: string;
}

export const generateAnnouncement = async (prompt: string): Promise<AnnouncementResponse | null> => {
  if (!process.env.API_KEY) {
    console.error("API key for Gemini is not set.");
    alert("La clave API para el servicio de IA no está configurada. La función de generación de anuncios no funcionará.");
    return null;
  }
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Basado en la siguiente idea, genera un título y un contenido para un anuncio de condominio en español. El tono debe ser claro, conciso y profesional. La idea es: "${prompt}"`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            titulo: {
              type: Type.STRING,
              description: "El título del anuncio."
            },
            contenido: {
              type: Type.STRING,
              description: "El contenido detallado del anuncio en formato de texto plano. Usa saltos de línea \\n para los párrafos."
            }
          },
          required: ["titulo", "contenido"]
        }
      }
    });

    const jsonText = response.text.trim();
    const parsedResponse = JSON.parse(jsonText);
    
    if (parsedResponse && typeof parsedResponse.titulo === 'string' && typeof parsedResponse.contenido === 'string') {
        return parsedResponse;
    }
    return null;

  } catch (error) {
    console.error("Error al generar anuncio con Gemini:", error);
    alert("Ocurrió un error al comunicarse con el servicio de IA. Por favor, inténtelo de nuevo.");
    return null;
  }
};
