import urlMetadata from 'url-metadata';
import { Result } from 'url-metadata';
import type { Thing, Recipe, HowToSection } from 'schema-dts';

type RecipeMetadataResponse = {
  url?: string;
  title?: string;
  author?: string;
  image?: string;
  description?: string;
  ingredients?: string[];
  preparation?: string | string[];
  metadata?: Result;
};

function parseInstructions(
  instructions: Recipe['recipeInstructions']
): string | string[] | undefined {
  if (typeof instructions === 'string') return instructions;
  if (Array.isArray(instructions)) {
    const isSection = instructions?.some(
      (item) => item['@type'] === 'HowToSection'
    );
    if (isSection) {
      return instructions.reduce((steps, currentSection: HowToSection) => {
        if (Array.isArray(currentSection?.itemListElement)) {
          currentSection?.itemListElement?.forEach((item) => {
            if (item['@type'] === 'HowToStep') steps.push(item.text);
          });
        }
        return steps;
      }, []);
    }
    return instructions?.map((item) =>
      typeof item === 'string' ? item : item?.text
    );
  }
}

function parseRecipeJsonLdContent(jsonld?: Thing) {
  if (!jsonld || typeof jsonld === 'string') return;
  const recipe: Recipe = Array.isArray(jsonld)
    ? jsonld.flat(3).find((item) => item['@type'].includes('Recipe'))
    : jsonld;
  return {
    title: recipe?.name || recipe?.headline,
    description: recipe?.description,
    author: Array.isArray(recipe?.author)
      ? recipe.author[0].name
      : typeof recipe?.author === 'string'
      ? recipe?.author
      : recipe?.author?.name,
    ingredients: recipe?.recipeIngredient as string[],
    preparation: parseInstructions(recipe?.recipeInstructions),
  };
}

/**
 * Retrieves the metadata of a recipe's website to collect information about the recipe,
 * including the author, ingredients and instructions.
 */
export default defineCachedEventHandler(async (event) => {
  const query = getQuery(event);
  const requestUrl = query.url?.toString();
  const isExpanded = Boolean(query.expanded);
  if (!requestUrl) {
    throw createError({
      statusCode: 400,
      statusMessage: 'No URL was provided',
    });
  }
  try {
    const metadata = await urlMetadata(requestUrl);
    const { title, description, author, ingredients, preparation } =
      parseRecipeJsonLdContent(metadata?.jsonld) || {};
    const returnRecipe: RecipeMetadataResponse = {
      url: metadata['og:url'] || metadata?.url,
      title: title || metadata['og:title'] || metadata?.title,
      author: author || metadata?.author || metadata['article:author'],
      image: metadata['og:image'] || metadata?.image,
      description:
        description || metadata['og:description'] || metadata?.description,
      ingredients,
      preparation,
      ...(isExpanded && { metadata }),
    };
    return returnRecipe;
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: error?.message || 'Internal Server Error',
    });
  }
});
