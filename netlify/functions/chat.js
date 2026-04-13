exports.handler = async (event) => {
  try {
    const { message } = JSON.parse(event.body);

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: message }] }],
        }),
      }
    );

    const data = await response.json();

    console.log("RESULT:", JSON.stringify(data));

    let reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "⚠️ No reply from AI";

    return {
      statusCode: 200,
      body: JSON.stringify({ reply }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        reply: "❌ Error: " + err.message,
      }),
    };
  }
};