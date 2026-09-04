const axios = require('axios');

const structureComplaint = async (complaintText, category) => {
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: process.env.AI_MODEL,
        messages: [
          {
            role: 'system',
            content: `You are a complaint structuring AI. Extract key facts, identify missing information, and summarize complaints into government-ready reports. Return a JSON object with: extractedFacts (array), missingInfo (array), summary (string), suggestedCategory (string).`,
          },
          {
            role: 'user',
            content: `Complaint Category: ${category}\n\nComplaint Text:\n${complaintText}`,
          },
        ],
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.AI_API_KEY}`,
        },
      }
    );

    const content = response.data.choices[0].message.content;
    return JSON.parse(content);
  } catch (error) {
    console.error('❌ AI Processing Error:', error.message);
    return {
      extractedFacts: [],
      missingInfo: ['Unable to process with AI'],
      summary: complaintText,
      suggestedCategory: category,
    };
  }
};

module.exports = { structureComplaint };
