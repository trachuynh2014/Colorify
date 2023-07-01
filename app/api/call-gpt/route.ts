import { NextResponse } from "next/server";
import { Configuration, OpenAIApi } from "openai";

export async function POST(req: Request) {
  const { companyName } = await req.json();
  const config = new Configuration({
    organization: process.env.ORGANIZATION_ID,
    apiKey: process.env.GPT_API_KEY,
  });
  const openapi = new OpenAIApi(config);
  try {
    const response = await openapi.createChatCompletion({
      model: "gpt-3.5-turbo-16k",
      messages: [
        {
          role: "user",
          content: `What are all the hex color codes for ${companyName}'s logo in just a single-line JavaScript array with no other explanations or variable name?`,
        },
      ],
    });

    const unparsedColors =
      response.data.choices[0].message?.content?.replaceAll(`'`, `"`);
    const parsedColors = JSON.parse(unparsedColors ?? "");
    // remove duplicates
    return NextResponse.json(Array.from(new Set(parsedColors)));
  } catch (error) {
    console.log(error);
    throw error;
  }
}
