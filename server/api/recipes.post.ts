import type { Database, Json } from '@/types/database.types';
import type { CreateRecipe } from '@/types/recipe.types';
import type { RecipeInformation } from '@/types/spoonacular.types';

import { serverSupabaseClient } from '#supabase/server';
import { serverSupabaseUser } from '#supabase/server';
import { analyzeRecipe } from '@/server/external/recipeAnalysis';

function extendRecipe(extended: RecipeInformation, original: CreateRecipe) {
  const combinedRecipe = {
    title: original.title,
    author: original.author,
    description: original.description,
    image_url: original.image_url,
    original_url: original.original_url,
    ingredients: original.ingredients,
    preparation: original.preparation,
    notes: original.notes,
    servings: extended.servings,
    nutrition: {
      nutrients: extended.nutrition.nutrients,
      caloric_breakdown: extended.nutrition.caloricBreakdown,
      weight_per_serving: extended.nutrition.weightPerServing,
    } as unknown as Json,
  };

  return combinedRecipe;
}

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

  const analyzedRecipeData = await analyzeRecipe(recipePayload);
  const extendedRecipe = extendRecipe(analyzedRecipeData, recipePayload);

  const { data: createdRecipe } = await client
    .from('recipes')
    .insert(extendedRecipe)
    .select()
    .single();

  return createdRecipe;
});
