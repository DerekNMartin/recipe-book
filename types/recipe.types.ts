import type { Database } from '@/types/database.types';
import type { RecipeInformation } from '@/types/spoonacular.types';

type RecipeRaw = Database['public']['Tables']['recipes']['Row'];
// Typing database's Json to correct type
interface Recipe extends Omit<RecipeRaw, 'nutrition'> {
  nutrition: {
    nutrients: RecipeInformation['nutrition']['nutrients'],
    caloric_breakdown: RecipeInformation['nutrition']['caloricBreakdown'],
    weight_per_serving: RecipeInformation['nutrition']['weightPerServing']
  }
}

type CreateRecipe = Database['public']['Tables']['recipes']['Insert'];
type UpdateRecipe = Database['public']['Tables']['recipes']['Update'];

export type { Recipe, CreateRecipe, UpdateRecipe };
