import { streamText } from 'ai';
import { openai } from '@ai-sdk/openai';

export const maxDuration = 59;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: openai('gpt-4-turbo'),
    system: 'You are a helpful assistant. Your answers will be rendered as markdown, so be sure to use it correctly.',
    messages,
  });

  return result.toDataStreamResponse();
}