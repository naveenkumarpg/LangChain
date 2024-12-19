import { CharacterTextSplitter } from '@langchain/textsplitters';

export async function splitText(
  document: string,
  chunkSize: number = 100,
  chunkOverlap: number = 10
) {
  const textSplitter = new CharacterTextSplitter({
    chunkSize: chunkSize,
    chunkOverlap: chunkOverlap,
  });

  const texts = await textSplitter.splitText(document);

  console.log('Splitted Text: ', texts);
  return texts;
}
