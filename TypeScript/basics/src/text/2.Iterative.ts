import { OpenAI } from 'openai';

const openai = new OpenAI();

const context: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
  {
    role: 'system',
    content: 'you are very helpful bot assistant',
  },
];

async function main(input: string) {
  const response = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: context,
  });

  context.push({
    role: 'assistant',
    content: response.choices[0].message.content,
  });

  console.log(response.choices[0].message.content);
  console.log('-------------------------------------------------');

  console.log('What do you want to ask .?: ');
}

process.stdin.addListener('data', async function name(params: string) {
  const input = params.toString().trim();

  context.push({
    role: 'user',
    content: input,
  });

  main(input);
});

console.log('What do you want to ask .?: ');
