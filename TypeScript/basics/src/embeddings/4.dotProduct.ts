import {
  DataWithEmbeddings,
  generateEmbeddings,
  loadJSONData,
} from './2.readFromFile';

export function dotProduct(a: number[], b: number[]) {
  return a.map((value, index) => value * b[index]).reduce((a, b) => a + b, 0);
}

async function main() {
  const dataWithEmbeddings = loadJSONData<DataWithEmbeddings[]>(
    'dataWithEmbeddings.json'
  );

  const input = 'Honey'; // puppy, animal, dog, Dog, Plant,Bug
  const inputEmbedding = await generateEmbeddings(input);
  console.log(inputEmbedding);

  const similarities: {
    input: string;
    similarity: number;
  }[] = [];

  for (const entry of dataWithEmbeddings) {
    // dotProduct
    const similarity = dotProduct(
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
