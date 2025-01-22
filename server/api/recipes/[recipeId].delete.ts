import { serverSupabaseClient } from '#supabase/server';
import type { Database } from '@/types/database.extended.types';

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient<Database>(event);
  const recipeId = Number(getRouterParam(event, 'recipeId'));

  const response = await client.from('recipes').delete().eq('id', recipeId);

  return response;
});
