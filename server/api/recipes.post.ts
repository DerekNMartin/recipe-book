import type { Database } from '@/types/database.types';
import { serverSupabaseClient } from '#supabase/server';
import { serverSupabaseUser } from '#supabase/server';

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event);
  const client = await serverSupabaseClient<Database>(event);
  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Not Authenticated',
    });
  }
  const { recipe: recipePayload } = await readBody(event);

  const { data: newRecipe } = await client
    .from('recipes')
    .insert([recipePayload])
    .select()
    .single();

  return newRecipe;
});
