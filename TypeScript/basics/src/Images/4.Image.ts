import { OpenAI } from 'openai';

const openai = new OpenAI();

async function main() {
  const response = await openai.images.generate({
    prompt:
      'A photo of a Kalpavriksha tree from Hindu religion (Kalpavriksha is a wish-fulfilling divine tree)',
    model: 'dall-e-3',
    style: 'vivid',
    size: '1024x1024',
    quality: 'hd',
    n: 1,
  });

  console.log(response);
}

main();
