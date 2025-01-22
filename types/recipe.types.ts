import type { Database } from '@/types/database.extended.types';

type Recipe = Database['public']['Tables']['recipes']['Row'];
type CreateRecipe = Database['public']['Tables']['recipes']['Insert'];
type UpdateRecipe = Database['public']['Tables']['recipes']['Update'];

type Ingredient = Database['public']['Tables']['ingredients']['Row'];

export type { Recipe, CreateRecipe, UpdateRecipe, Ingredient };
