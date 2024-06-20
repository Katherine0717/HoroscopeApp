import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
    const body = await req.json();
    // TODO: need API
    
    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: body.messages,
        });
        return NextResponse.json({ response: completion.choices[0].message });
    }catch (error) {
        console.log(error);
        return NextResponse.json({ message: 'Error communicating with OpenAI API', error }, { status: 500 });
    }
}