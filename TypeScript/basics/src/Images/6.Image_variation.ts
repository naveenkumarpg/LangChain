import { createReadStream, writeFileSync } from 'fs';
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
    response_format: 'b64_json',
  });

  console.log(response);

  const rawImage = response.data[0].b64_json;

  if (rawImage) {
    writeFileSync(`${response.created}.png`, Buffer.from(rawImage, 'base64'));
  }
}

async function createVariation() {
  const response = await openai.images.createVariation({
    image: createReadStream('1730840770.png'),
  });
}

main();
