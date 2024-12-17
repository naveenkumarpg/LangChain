import { writeFileSync } from 'fs';
import { OpenAI } from 'openai';

const openai = new OpenAI();

async function main() {
  const response = await openai.images.generate({
    prompt:
      'A animal looks like Giraffe with wings to have squirrel tail and elephant trunk',
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

main();
