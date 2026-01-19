async function generateAIReview({ code, language, problem }) {
  try {
    const prompt = `
You are an experienced coding mentor.

Analyze the following ${language} code for a DSA problem.

Problem:
${problem.title}
${problem.description}

Code:
${code}

Explain:
1. What the code does
2. Possible improvements
3. Approximate time complexity
4. Approximate space complexity
`;


    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: prompt }],
            },
          ],
        }),
      }
    );

    const data = await response.json();

    // 🔍 Handle Gemini safety or empty responses
    if (data.promptFeedback) {
      return {
        success: false,
        error: "AI response blocked by safety filters",
      };
    }

    if (!data.candidates || !data.candidates[0]?.content?.parts?.[0]?.text) {
      return {
        success: false,
        error: "Empty AI response",
      };
    }

    const text = data.candidates[0].content.parts[0].text;

    return {
      success: true,
      raw: text,
    };
  } catch (error) {
    console.error("Gemini REST AI ERROR:", error);
    return {
      success: false,
      error: error.message || "AI review failed",
    };
  }
}

module.exports = { generateAIReview };