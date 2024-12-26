export async function fetchGptTranslation(
  text: string,
  apiToken: string,
  translateLanguages: string
): Promise<string> {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiToken}`, // トークンを使用
    },
    body: JSON.stringify({
      model: "gpt-4o",
      max_tokens: 4000,
      messages: [
        {
          role: "system",
          content: `You are a helpful assistant. Translate the following text to ${translateLanguages}.`,
        },
        {
          role: "user",
          content: text,
        },
      ],
    }),
  });

  const data = await response.json();
  return data.choices[0].message.content.trim();
}
