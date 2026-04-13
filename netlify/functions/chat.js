exports.handler = async (event) => {
  try {
    const body = event.body ? JSON.parse(event.body) : {};
    const message = body.message || "Hello";

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant", // ✅ NEW WORKING MODEL
        messages: [
          { role: "user", content: message }
        ]
      })
    });

    const data = await response.json();

    console.log("GROQ FINAL:", JSON.stringify(data));

    let reply = "";

    if (data?.choices?.length > 0) {
      reply = data.choices[0].message.content;
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