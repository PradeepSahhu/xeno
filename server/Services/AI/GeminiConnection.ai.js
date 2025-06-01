export const getGeminiResponse = async (audienceSize, name, campaignRule) => {
  const GEMINI_API_KEY = "AIzaSyAWTyhOcsDAbDbc2OgdSFz3rFtf3qYP4CE";
  const GEMINI_API_URL =
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

  try {
    const prompt = `You are a marketing expert creating personalized customer data for an Indian e-commerce campaign.

TASK: Generate ${audienceSize} realistic Indian customers for the "${name}" campaign.

CAMPAIGN CONTEXT: ${campaignRule}

REQUIREMENTS:
1. Create diverse Indian names (mix of regions, genders, age groups)
2. Generate realistic email addresses matching the names
3. Craft personalized messages that directly address the campaign rule/filter
4. Messages should feel authentic and relevant to Indian customers
5. Include appropriate incentives, discounts, or offers based on the campaign context

OUTPUT FORMAT (JSON only, no additional text):
[
  {
    "name": "Priya Patel",
    "email": "priya.patel@gmail.com", 
    "personalizedMessage": "Hi Priya! As one of our valued returning customers, enjoy 20% off your next electronics purchase - just for you!"
  }
]

PERSONALIZATION GUIDELINES:
- Reference the specific campaign rule/customer behavior
- Use appropriate Indian cultural context
- Include relevant product categories or offers
- Make each message unique and conversational
- Keep messages between 15-25 words for better engagement

Generate the JSON array now:`;

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
