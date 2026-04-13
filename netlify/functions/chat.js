// gemini version 

exports.handler = async function (event) {
  try {
    const { message } = JSON.parse(event.body);

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: message }],
            },
          ],
        }),
      }
    );

    const data = await response.json();
    console.log("FULL RESPONSE:", JSON.stringify(data));

    let reply = "⚠️ No response from AI.";

    if (
      data.candidates &&
      data.candidates.length > 0 &&
      data.candidates[0].content &&
      data.candidates[0].content.parts &&
      data.candidates[0].content.parts.length > 0
    ) {
      reply = data.candidates[0].content.parts[0].text;
    } else if (data.error) {
      reply = "❌ API Error: " + data.error.message;
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ reply }),
    };
  } catch (error) {
    console.error("Server Error:", error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        reply: "❌ Server error: " + error.message,
      }),
    };
  }
};


// --------------------- Chatgpt chatbot --------------------------------------

// exports.handler = async function(event) {
//   try {
//     const { message } = JSON.parse(event.body);

//     const response = await fetch("https://api.openai.com/v1/chat/completions", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
//       },
//       body: JSON.stringify({
//         model: "gpt-4o-mini",
//         messages: [{ role: "user", content: message }]
//       })
//     });

//     const data = await response.json();

//     console.log("OpenAI Response:", data); // DEBUG

//     return {
//       statusCode: 200,
//       body: JSON.stringify({
//         reply: data?.choices?.[0]?.message?.content || "Sorry, no response."
//       })
//     };

//   } catch (error) {
//     console.log("Error:", error);

//     return {
//       statusCode: 500,
//       body: JSON.stringify({
//         reply: "Error connecting to AI"
//       })
//     };
//   }
// };
