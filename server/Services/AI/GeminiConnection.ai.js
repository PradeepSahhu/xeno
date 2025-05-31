export const getGeminiResponse = async (campaignType = "Sales Campaign") => {
  const GEMINI_API_KEY = "AIzaSyAWTyhOcsDAbDbc2OgdSFz3rFtf3qYP4CE";
  const GEMINI_API_URL =
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

  try {
    const prompt = `Generate 10 realistic Indian customers for a ${campaignType} campaign. Return as JSON array with format:
  [
    {
      "name": "Rohit Sharma",
      "email": "rohit.sharma@email.com",
      "personalizedMessage": "Hi Rohit, here's 15% off on electronics you love!"
    }
  ]
  Make names diverse, emails realistic, and messages personalized based on campaign type.`;

    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
      }),
    });

    const data = await response.json();
    // console.log(data.candidates[0].content);

    return data;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return "Sorry, I'm experiencing some technical difficulties. Please try again in a moment.";
  }
};

// // Example usage:
// getGeminiResponse(
//   "The user has been inactive for 3 years but made 5 purchases in total."
// );

// Status : Working
