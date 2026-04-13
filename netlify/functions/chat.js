exports.handler = async (event) => {
  try {
    const body = event.body ? JSON.parse(event.body) : {};
    const message = body.message || "Hello";

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
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

    console.log("FINAL DATA:", JSON.stringify(data));

    let reply = "";

    if (data?.candidates?.length > 0) {
      const parts = data.candidates[0]?.content?.parts;
      if (parts?.length > 0) {
        reply = parts.map(p => p.text || "").join(" ");
      }
    }

    if (!reply && data?.error) {
      reply = "❌ API Error: " + data.error.message;
    }

    if (!reply) {
      reply = "⚠️ No response from AI.";
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ reply }),
    };

  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        reply: "❌ Server error: " + err.message,
      }),
    };
  }
};