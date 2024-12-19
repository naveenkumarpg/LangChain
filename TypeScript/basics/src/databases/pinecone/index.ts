import { Pinecone } from '@pinecone-database/pinecone';
import { readFileSync } from 'fs';
import { join } from 'path';
import { splitText } from '../../utils/splitters';
import OpenAI from 'openai';

// Creating client
const pc = new Pinecone({
  apiKey: process.env.PINECONE_KEY!,
});

const openai = new OpenAI();

// Create index, like creating database
async function createIndex() {
  const ciResponse = await pc.createIndex({
    name: 'sample-index',
    dimension: 1536,
    spec: {
      serverless: {
        cloud: 'aws',
        region: 'us-east-1',
      },
    },
  });

  console.log('CreateIndex --- : ', ciResponse);
}

// Reading data from the resume.txt
export function readResume(fileName: string): string {
  const path = join(__dirname, fileName);
  const rawData = readFileSync(path);
  const stringData = rawData.toString();

  console.log('File data : ', stringData);

  return stringData;
}

//  list of all available indexes
async function listIndexes() {
  const result = await pc.listIndexes();
  console.log('listIndexes : ', result);
}

// get the index detail of particular index
async function getIndex() {
  const index = pc.index('learning');
  console.log('index : ', index);
  return index;
}

function genNumArr(length: number) {
  return Array.from({ length }, () => Math.random());
}

export async function generateEmbeddings(input: string | string[]) {
  const response = await openai.embeddings.create({
    input: input,
    model: 'text-embedding-3-small',
  });
  return response;
}

async function readUpsertData() {
  // shows selected index details
  const index = await getIndex();

  const resumeData = readResume('resume.txt');

  const splittedText = await splitText(resumeData);
  console.log(splittedText);

  const embeddings = await generateEmbeddings(splittedText);
  console.log(embeddings);

  const response = await embeddings.data.map(async (item, i) => {
    return await index.upsert([
      {
        id: `id-${i}`,
        values: item.embedding,
        metadata: { source: 'Resume', info: splittedText[i] },
      },
    ]);
  });

  return response;
}

async function askQuestion(question: string) {
  const embeddings = await generateEmbeddings(question);
  const index = await getIndex();

  const response = await index.query({
    topK: 4,
    vector: embeddings?.data[0]?.embedding || null,
    includeValues: true,
    includeMetadata: true,
    filter: { source: { $eq: 'Resume' } },
  });

  return response;
}

async function askOpenai(info: any, question: string) {
  console.log('info', info);
  console.log('question', question);

  const response = await openai.chat.completions.create({
    model: 'gpt-4o',
    temperature: 0,
    messages: [
      {
        role: 'assistant',
        content: `Answer the next question using this information ${info}`,
      },
      {
        role: 'user',
        content: question,
      },
    ],
  });

  const answer = response.choices[0].message.content;
  return answer;
}

async function main() {
  // Creating index, this can be done from the the pinecone webpage also
  // await createIndex();
  // Shows the available indexes
  // await listIndexes();

  //   const upsertResponse = await readUpsertData();
  //   console.log('upsertResponse : ', upsertResponse);

  const question = 'what is naveen qualification';
  const askQuestionRes = await askQuestion(question);
  console.log('askQuestionRes : ', askQuestionRes);

  const finalInfo = askQuestionRes.matches.map((item) => {
    return item.metadata?.info;
  });

  const answer = await askOpenai(finalInfo, question);

  console.log(answer);
}

main();
