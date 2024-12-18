import { readFileSync, writeFileSync } from 'fs';
import OpenAI from 'openai';
import { join } from 'path';

const openai = new OpenAI();

export function loadJSONData<T>(fileName: string): T {
  const path = join(__dirname, fileName);
  const rawData = readFileSync(path);
  return JSON.parse(rawData.toString());
}

export async function generateEmbeddings(input: string | string[]) {
  const response = await openai.embeddings.create({
    input: input,
    model: 'text-embedding-3-small',
  });

  return response;
}

export type DataWithEmbeddings = {
  input: string;
  embedding: number[];
};

function saveDataToJsonFile(data: any, fileName: string) {
  const dataString = JSON.stringify(data);
  const dataBuffer = Buffer.from(dataString);
  const path = join(__dirname, fileName);
  writeFileSync(path, dataBuffer);
  console.log(`saved data to ${fileName}`);
}

async function main() {
  const data = loadJSONData<string[]>('movies.json');

  console.log('data');
  console.log(data);

  const embeddings = await generateEmbeddings(data);

  console.log('embeddings');
  console.log(embeddings);

  const dataWithEmbeddings: DataWithEmbeddings[] = [];

  for (let i = 0; i < data.length; i++) {
    dataWithEmbeddings.push({
      input: data[i],
      embedding: embeddings.data[i].embedding,
    });
  }
  saveDataToJsonFile(dataWithEmbeddings, 'moviesWithEmbeddings.json');
}

main();
