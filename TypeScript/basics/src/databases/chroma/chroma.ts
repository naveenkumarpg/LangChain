/**
 * installation instructions
 *
 * Installing chroma as docker container
 * - docker pull chromadb/chroma
 * - docker run -p 8000:8000 chromadb/chroma
 *
 * Installing node dependencies
 * - npm install --save chromadb chromadb-default-embed
 *
 * Checking the service with the endpoints
 * - http://localhost:8000/api/v1 - to check health endpoint
 * - http://localhost:8000/api/v1/collections - to check the collections
 *
 */

import { ChromaClient, OpenAIEmbeddingFunction } from 'chromadb';

const client = new ChromaClient({
  path: 'http://localhost:8000',
});

const embeddingFunction = new OpenAIEmbeddingFunction({
  openai_api_key: process.env.OPENAI_API_KEY!,
  openai_model: 'text-embedding-3-small',
});

async function main() {
  const collection = await client.createCollection({
    name: 'test-data',
    embeddingFunction: embeddingFunction,
  });

  console.log('collection');
  console.log(collection);

  const addResponse = await collection.add({
    documents: [
      'This is a document about pineapple',
      'This is a document about oranges',
    ],
    ids: ['id1', 'id2'],
  });

  console.log('addResponse');
  console.log(addResponse);
}

main();
