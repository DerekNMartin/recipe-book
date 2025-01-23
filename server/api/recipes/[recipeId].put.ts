import { serverSupabaseClient } from '#supabase/server';
import type { Database } from '@/types/database.types';

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient<Database>(event);
  const recipeId = Number(getRouterParam(event, 'recipeId'));
  const { recipe: recipePayload } = await readBody(event);

  await client.from('recipes').update(recipePayload).eq('id', recipeId);

  return null;
});
