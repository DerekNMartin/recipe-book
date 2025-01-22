import { HfInference } from '@huggingface/inference';

const huggingFace = new HfInference(process.env.HF_ACCESS_TOKEN);

const SYSTEM_PROMPT = `
You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients. You don't need to use every ingredient they mention in your recipe. The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients. Your response should be in the format of JSON with the following properties: title (string), description (string), ingredients (string array), instructions (string array). Try and be creative with the title of the recipe, it should be fun - like a pun.
`;

async function generateAiRecipe(ingredientsArr: string[]) {
  const ingredientsString = ingredientsArr.join(', ');
  try {
    const response = await huggingFace.chatCompletion({
      model: 'mistralai/Mistral-7B-Instruct-v0.3',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        {
          role: 'user',
          content: `I have ${ingredientsString}. Please give me a recipe you'd recommend I make!`,
        },
      ],
      max_tokens: 1024,
    });
    return response.choices[0].message.content;
  } catch (error) {
    console.error(error.message);
    throw createError({
      statusCode: 500,
      statusMessage: 'Error when trying to generate recipe from mistral.',
    });
  }
}

export { generateAiRecipe };
