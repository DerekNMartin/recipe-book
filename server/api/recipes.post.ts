import type { Database } from '@/types/database.extended.types';
import type { CreateRecipe } from '@/types/recipe.types';
import type { RecipeInformation } from '@/types/spoonacular.types';

import { serverSupabaseClient } from '#supabase/server';
import { serverSupabaseUser } from '#supabase/server';
import { analyzeRecipe } from '@/server/external/recipeAnalysis';

function extendIngredients(
  extended: RecipeInformation['extendedIngredients'],
  original: CreateRecipe['ingredients']
) {
  const newIngredients = original?.map((originalIngredient) => {
    const extendedIngredient = extended.find((item) =>
      originalIngredient.includes(item.original)
    );
    return {
      name: extendedIngredient?.name,
      original: originalIngredient,
      original_name: extendedIngredient?.originalName,
      measurements: extendedIngredient?.measures,
    };
  });
  return newIngredients;
}

function extendRecipe(extended: RecipeInformation, original: CreateRecipe) {
  const extendedIngredients = extendIngredients(
    extended.extendedIngredients,
    original.ingredients
  );
  const combinedRecipe = {
    title: original.title,
    author: original.author,
    description: original.description,
    image_url: original.image_url,
    original_url: original.original_url,
    ingredients: extendedIngredients,
    preparation: original.preparation,
    notes: original.notes,
    servings: extended.servings,
    nutrition: {
      nutrients: extended.nutrition.nutrients,
      caloric_breakdown: extended.nutrition.caloricBreakdown,
      weight_per_serving: extended.nutrition.weightPerServing,
    },
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
  const { ingredients, ...recipe } = extendedRecipe;

  const { data: createdRecipe } = await client
    .from('recipes')
    .insert(recipe)
    .select()
    .single();

  const { data: createdIngredients } = await client
    .from('ingredients')
    .insert(
      ingredients.map((ingredient) => ({
        ...ingredient,
        recipe_id: createdRecipe?.id,
      }))
    )
    .select();

  return {
    ...createdRecipe,
    ingredients: createdIngredients,
  };
});
