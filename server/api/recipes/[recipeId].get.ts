import { serverSupabaseClient } from '#supabase/server';
import type { Database } from '@/types/database.types';

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient<Database>(event);
  const recipeId = Number(getRouterParam(event, 'recipeId'));

  const { data: recipes } = await client
    .from('recipes')
    .select('*')
    .eq('id', recipeId)
    .limit(1)
    .single();

  return recipes;
});
