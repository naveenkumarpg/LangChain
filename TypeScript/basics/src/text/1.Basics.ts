import { OpenAI } from 'openai';

const openai = new OpenAI();

async function main() {
  const response = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      {
        role: 'system',
        content: 'you are Superman, who helps people',
      },
      {
        role: 'user',
        content: 'Who are you',
      },
    ],
  });

  console.log(response.choices);
}

main();
