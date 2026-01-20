async function generateAIReview({ code, language, problem }) {
  try {
    const prompt = `
You are a senior coding reviewer for DSA problems.

Review the following ${language} solution.

Problem:
${problem.title}
${problem.description}

Code:
${code}

Instructions:
- First determine whether the solution is logically correct.
- If the solution is CORRECT, give a concise review.
- If the solution is INCORRECT, DO NOT give a full solution.
  Instead, give hints that help the candidate rethink.

Respond strictly in this format (no extra text):

Correctness:
- Correct / Incorrect (1 line reason)

If Correct:
Improvements:
- Up to 3 specific improvement points

Time Complexity:
- Big-O with 1 line explanation

Space Complexity:
- Big-O with 1 line explanation

If Incorrect:
Hints:
- 2–4 conceptual hints (no code, no full solution)
- Mention which idea or step is flawed
- Suggest what to reconsider (edge cases, logic, data structure, etc.)
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


async function generateInterviewEvaluation({
  code,
  language,
  problem,
  interviewAnswers,
}) {
  try {
    const prompt = `
You are a senior technical interviewer conducting a DSA interview.

You are given:
1. The problem statement
2. The candidate's submitted code
3. The candidate's interview answers

Your task is to evaluate the candidate like a real interviewer.

Problem:
${problem.title}
${problem.description}

Candidate Code (${language}):
${code}

Interview Answers:
- Approach Explanation:
${interviewAnswers.approachExplanation}

- Time Complexity Explanation:
${interviewAnswers.timeComplexity}

- Space Complexity Explanation:
${interviewAnswers.spaceComplexity}

- Optimization Ideas:
${interviewAnswers.optimizationIdeas || "Not provided"}

- Edge Cases Mentioned:
${interviewAnswers.edgeCases || "Not provided"}

Evaluate the candidate on:
1. Correctness of understanding
2. Accuracy of complexity analysis
3. Code–approach consistency
4. Missing edge cases
5. Quality of explanation

Respond STRICTLY in JSON format:

{
  "score": number (0 to 10),
  "strengths": string[],
  "weaknesses": string[],
  "improvements": string[],
  "flags": string[]
}
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

    if (data.promptFeedback) {
      return {
        success: false,
        error: "AI response blocked by safety filters",
      };
    }

    const rawText =
      data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!rawText) {
      return {
        success: false,
        error: "Empty AI response",
      };
    }

    return {
      success: true,
      raw: rawText,
    };
  } catch (error) {
    console.error("Interview AI ERROR:", error);
    return {
      success: false,
      error: error.message || "Interview AI failed",
    };
  }
}


module.exports = {
  generateAIReview,
  generateInterviewEvaluation,
};