import { readFileSync, writeFileSync } from 'fs';
import OpenAI from 'openai';
import { join } from 'path';

export function dotProduct(a: number[], b: number[]) {
  return a.map((value, index) => value * b[index]).reduce((a, b) => a + b, 0);
}

function cosineSimilarity(a: number[], b: number[]) {
  const product = dotProduct(a, b);
  const aMagnitude = Math.sqrt(
    a.map((value) => value * value).reduce((a, b) => a + b, 0)
  );
  const bMagnitude = Math.sqrt(
    b.map((value) => value * value).reduce((a, b) => a + b, 0)
  );
  return product / (aMagnitude * bMagnitude);
}

export function loadJSONData<T>(fileName: string): T {
  const path = join(__dirname, fileName);
  const rawData = readFileSync(path);
  return JSON.parse(rawData.toString());
}

export type DataWithEmbeddings = {
  input: string;
  embedding: number[];
};

async function main() {
  const dataWithEmbeddings = loadJSONData<DataWithEmbeddings[]>(
    'dataWithEmbeddings.json'
  );
}

main();
