import { serverSupabaseClient } from '#supabase/server';
import type { Database } from '@/types/database.types';

export type Recipe = Database['public']['Tables']['recipes']['Row'];

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient<Database>(event);

  const { data: recipes } = await client.from('recipes').select('*');

  return recipes;
});
