import {
  DataWithEmbeddings,
  generateEmbeddings,
  loadJSONData,
} from './2.readFromFile';

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

async function main() {
  const dataWithEmbeddings = loadJSONData<DataWithEmbeddings[]>(
    'dataWithEmbeddings.json'
  );

  const input = 'Dog'; // puppy, animal, dog, Dog, Plant,Bug
  const inputEmbedding = await generateEmbeddings(input);
  console.log(inputEmbedding);

  const similarities: {
    input: string;
    similarity: number;
  }[] = [];

  for (const entry of dataWithEmbeddings) {
    // cosineSimilarity
    const similarity = cosineSimilarity(
      entry.embedding,
      inputEmbedding.data[0].embedding
    );

    console.log('similarity');
    console.log(similarity);

    similarities.push({
      input: entry.input,
      similarity,
    });

    console.log(`Similarity of ${input} with :`);
    const sortedSimilarities = similarities.sort(
      (a, b) => b.similarity - a.similarity
    );

    console.log('sortedSimilarities');
    console.log(sortedSimilarities);
  }
}

main();
