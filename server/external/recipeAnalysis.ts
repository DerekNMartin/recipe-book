import type { Recipe } from '@/types/recipe.types';
import type { RecipeInformation } from '@/types/spoonacular.types';

interface AnalyzeRecipeRequest {
  title?: string;
  servings?: number;
  ingredients?: Array<string>;
  instructions?: string;
}

const baseUrl = 'https://api.spoonacular.com';

/**
 * Analyze Recipe
 * @description This endpoint allows you to send raw recipe information, such as title, servings, and ingredients, to then see what we compute (badges, diets, nutrition, and more). This is useful if you have your own recipe data and want to enrich it with our semantic analysis.
 * https://spoonacular.com/food-api/docs#Analyze-Recipe
 * @param recipe
 */
async function analyzeRecipe(recipe: AnalyzeRecipeRequest) {
  const data: RecipeInformation = await $fetch(`${baseUrl}/recipes/analyze`, {
    method: 'POST',
    params: { apiKey: process.env.SPOONACULAR_API_KEY, includeNutrition: true },
    body: recipe,
  });
  return data;
}

export { analyzeRecipe };
