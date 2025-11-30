import { serverSupabaseClient } from '#supabase/server';
import type { Recipe } from '@/types/recipe.types.js';
import type { Database } from '@/types/database.types';

export type QueryGetRecipes = {
  perPage?: number;
  page?: number;
  search?: string;
};

export type RecipesMeta = {
  total: number;
  page: number;
  perPage: number;
};
export type RecipesGet = Omit<
  Recipe,
  'ingredients' | 'preparation' | 'notes' | 'servings' | 'nutrition'
>[];
export type RecipesResponse = {
  meta: RecipesMeta;
  recipes: RecipesGet;
};

function paginationRange(query: QueryGetRecipes) {
  const DEFAULT_PER_PAGE = 12; // 12 divides evenly into grid-cols-2, 3, and 4
  const page = Number(query.page) || 0;
  const perPage = Number(query.perPage) || DEFAULT_PER_PAGE;

  // Standard calculation
  const min = page * perPage;
  const max = min + perPage - 1; // inclusive range in Supabase

  return { min, max, perPage, page };
}

export default defineEventHandler(async (event): Promise<RecipesResponse | undefined> => {
  const client = await serverSupabaseClient<Database>(event);

  const queryParams = getQuery<QueryGetRecipes>(event);
  const range = paginationRange(queryParams);

  let query = client
    .from('recipes')
    .select(
      'id, added_by, author, created_at, description, image_url, original_url, rating, title',
      { count: 'estimated' }
    )
    .order('title', { ascending: true })
    .range(range.min, range.max);

  if (queryParams.search) {
    query = query.textSearch('title', queryParams.search, { type: 'websearch' });
  }

  const { data: recipes, count, error } = await query;

  if (error) {
    throw createError({ statusCode: 500, statusMessage: error.message });
  }

  const meta = {
    total: count || 0,
    page: range.min,
    perPage: range.perPage,
    max: range.max,
  };

  return { recipes: recipes || [], meta };
});
