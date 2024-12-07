import { streamText } from 'ai';
import { openai } from '@ai-sdk/openai';

export const maxDuration = 59;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: openai('gpt-4-turbo'),
    system: 'You are a helpful assistant.',
    messages,
  });

  return result.toDataStreamResponse();
}