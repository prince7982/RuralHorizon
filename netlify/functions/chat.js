// gemini version 

exports.handler = async function (event) {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ reply: "Method Not Allowed" }),
    };
  }

  try {
    const { message } = JSON.parse(event.body || "{}");

    if (!message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ reply: "No message provided" }),
      };
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: message }],
            },
          ],
        }),
      }
    );

    const data = await response.json();

    console.log("Gemini Response:", JSON.stringify(data));

    let reply = "";

    if (
      data.candidates &&
      data.candidates.length > 0 &&
      data.candidates[0].content?.parts?.length > 0
    ) {
      reply = data.candidates[0].content.parts[0].text;
    } else if (data.error) {
      reply = "❌ API Error: " + data.error.message;
    } else {
      reply = "⚠️ No response from AI. Try again.";
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
