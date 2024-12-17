import OpenAI from 'openai';

const openai = new OpenAI();

export async function generateEmbeddings(input: string | string[]) {
  const response = await openai.embeddings.create({
    input: input,
    model: 'text-embedding-3-small',
  });
  return response;
}

async function main() {
  const data = await generateEmbeddings(
    'this is string to be converted as embeddings'
  );
  console.log(data);
}

main().catch(console.error);
