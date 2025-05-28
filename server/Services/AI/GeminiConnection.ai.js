const getGeminiResponse = async (userMessage) => {
  const GEMINI_API_KEY = "AIzaSyAWTyhOcsDAbDbc2OgdSFz3rFtf3qYP4CE"; // Consider securing this
  const GEMINI_API_URL =
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

  try {
    const payload = {
      contents: [
        {
          parts: [
            {
              text: `You are an AI built for CRM (Customer Relationship Management). Here is the user's info: ${userMessage}`,
            },
          ],
        },
      ],
    };

    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    console.log(data.candidates[0].content);

    return data;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return "Sorry, I'm experiencing some technical difficulties. Please try again in a moment.";
  }
};

// Example usage:
getGeminiResponse(
  "The user has been inactive for 3 years but made 5 purchases in total."
);

// Status : Working
