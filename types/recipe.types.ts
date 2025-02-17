import type { Database } from '@/types/database.types';

type Recipe = Database['public']['Tables']['recipes']['Row'];
type CreateRecipe = Database['public']['Tables']['recipes']['Insert'];
type UpdateRecipe = Database['public']['Tables']['recipes']['Update'];

export type { Recipe, CreateRecipe, UpdateRecipe };
