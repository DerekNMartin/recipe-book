import { serverSupabaseUser } from '#supabase/server';
import { generateAiRecipe } from '@/server/external/ai';

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event);
  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Not Authenticated',
    });
  }

  const { ingredients: ingredientsPayload } = await readBody(event);
  const generatedRecipe = await generateAiRecipe(ingredientsPayload);
  return generatedRecipe;
});
