import { serverSupabaseClient } from '#supabase/server';
import type { Recipe } from '@/types/recipe.types.js';
import type { Database } from '@/types/database.types';

export type RecipesResponse = Omit<Recipe, 'ingredients' | 'preparation' |'notes' | 'servings' | 'nutrition'>[]

export default defineEventHandler(async (event): Promise<RecipesResponse | undefined> => {
  const client = await serverSupabaseClient<Database>(event);

  const { data: recipes } = await client
    .from('recipes')
    .select(
      'id, added_by, author, created_at, description, image_url, original_url, rating, title'
    );

  if (recipes) return recipes;
});
