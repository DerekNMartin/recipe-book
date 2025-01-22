import { serverSupabaseClient } from '#supabase/server';
import type { Database } from '@/types/database.extended.types';

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient<Database>(event);

  const { data: recipes } = await client
    .from('recipes')
    .select(
      'id, added_by, author, created_at, description, image_url, original_url, rating, title'
    );

  return recipes;
});
