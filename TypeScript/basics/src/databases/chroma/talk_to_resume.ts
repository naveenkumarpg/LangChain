import { ChromaClient, OpenAIEmbeddingFunction } from 'chromadb';
import { readFileSync } from 'fs';
import OpenAI from 'openai';
import { join } from 'path';

const client = new ChromaClient({
  path: 'http://localhost:8000',
});

const embeddingFunction = new OpenAIEmbeddingFunction({
  openai_api_key: process.env.OPENAI_API_KEY!,
  openai_model: 'text-embedding-3-small',
});

async function createCollection(collectionName: string) {
  return await client.createCollection({
    name: collectionName,
  });
}

async function deleteCollection(collectionName: string) {
  return await client.deleteCollection({
    name: collectionName,
  });
}

async function getCollection(collectionName: string) {
  return await client.getCollection({
    name: collectionName,
    embeddingFunction: embeddingFunction,
  });
}

export function readResume(fileName: string): string {
  const path = join(__dirname, fileName);
  const rawData = readFileSync(path);
  console.log(rawData);

  return rawData.toString();
}

async function populateCollection(collectionName: string) {
  const collection = await getCollection(collectionName);
  const resumeData: string = await readResume('resume.txt');

  await collection.add({
    documents: [resumeData],
    ids: ['data'],
  });
}

async function askQuestion(collectionName: string, question: string) {
  const collection = await getCollection(collectionName);

  return await collection.query({
    queryTexts: question,
    nResults: 1,
  });
}

async function refineWithLLm(data: any, question: string) {
  if (data) {
    const relevantInfo = data.documents[0][0];
    const openai = new OpenAI();
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      temperature: 0,
      messages: [
        {
          role: 'assistant',
          content: `Answer the question using this information: ${relevantInfo}`,
        },
        {
          role: 'user',
          content: question,
        },
      ],
    });

    return response?.choices[0]?.message?.content || null;
  }
}

async function main() {
  const collectionName = 'resume-collection';

  // // Delete collection
  // const deletionResponse = await deleteCollection(collectionName);
  // console.log(deletionResponse);

  // // Create collection
  // const createResponse = await createCollection(collectionName);
  // console.log('createResponse');
  // console.log(createResponse);

  // // Populate Collection
  // const populateResponse = await populateCollection(collectionName);
  // console.log('populateResponse');
  // console.log(populateResponse);

  //Asking the question
  const question = 'What is Naveen worked on amazon project';
  const relevantInfo = await askQuestion(collectionName, question);
  console.log('dataFromDB : ', relevantInfo);

  // Calling LLM to get the answer
  const refineGetAnswer = await refineWithLLm(relevantInfo, question);
  console.log('Answer to the question: ', refineGetAnswer);
}

main();
