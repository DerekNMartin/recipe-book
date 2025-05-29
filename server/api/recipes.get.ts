import { serverSupabaseClient } from '#supabase/server';
import type { Recipe } from '@/types/recipe.types.js';
import type { Database } from '@/types/database.types';

interface QueryGetRecipes {
  perPage?: number,
  page?: number
}

export type RecipesMeta = {
  total: number,
  page: number,
  perPage: number
}
export type RecipesGet = Omit<Recipe, 'ingredients' | 'preparation' |'notes' | 'servings' | 'nutrition'>[]
export type RecipesResponse = {
  meta: RecipesMeta,
  recipes: RecipesGet
}

function paginationRange(query: QueryGetRecipes) {
  const DEFAULT_PER_PAGE = 11
  const DEFAULT_PAGE = 0
  const queryPage = Number(query.page)
  const perPage = Number(query.perPage) || DEFAULT_PER_PAGE
  const min = queryPage ? queryPage + 1 * perPage : DEFAULT_PAGE
  const max = min + perPage
  return { min, max, perPage }
}

export default defineEventHandler(async (event): Promise<RecipesResponse | undefined> => {
  const client = await serverSupabaseClient<Database>(event);

  const query = getQuery<QueryGetRecipes>(event)
  const range = paginationRange(query)

  const { data: recipes, count } = await client
    .from('recipes')
    .select(
      'id, added_by, author, created_at, description, image_url, original_url, rating, title',
      {count: 'estimated'}
    )
    .order('title', {ascending: true})
    .range(range.min, range.max);

    const meta = {
      total: count || 0,
      page: range.min,
      perPage: range.perPage,
      max: range.max
    }

  if (recipes) return {recipes, meta};
});
