exports.handler = async function(event) {
  try {
    const { message } = JSON.parse(event.body);

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: message }]
      })
    });

    const data = await response.json();

    console.log("OpenAI Response:", data); // DEBUG

    return {
      statusCode: 200,
      body: JSON.stringify({
        reply: data?.choices?.[0]?.message?.content || "Sorry, no response."
      })
    };

  } catch (error) {
    console.log("Error:", error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        reply: "Error connecting to AI"
      })
    };
  }
};


//--------------------- Gemini versions -----------------------------
// const fetch = require("node-fetch");

// exports.handler = async function(event) {
//   const { message } = JSON.parse(event.body);

//   const res = await fetch(
//     `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`,
//     {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         contents: [{ parts: [{ text: message }] }]
//       })
//     }
//   );

//   const data = await res.json();

//   return {
//     statusCode: 200,
//     body: JSON.stringify({
//       reply: data.candidates[0].content.parts[0].text
//     })
//   };
// }; 