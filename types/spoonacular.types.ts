export interface RecipeInformationExtendedIngredientsInnerMeasuresMetric {
  amount: number;
  unitLong: string;
  unitShort: string;
}

export interface RecipeInformationExtendedIngredientsInnerMeasures {
  metric: RecipeInformationExtendedIngredientsInnerMeasuresMetric;
  us: RecipeInformationExtendedIngredientsInnerMeasuresMetric;
}

export interface RecipeInformationExtendedIngredientsInner {
  aisle: string;
  amount: number;
  consistency: string;
  id: number;
  image: string;
  measures?: RecipeInformationExtendedIngredientsInnerMeasures;
  meta?: Array<string>;
  name: string;
  original: string;
  originalName: string;
  unit: string;
}

export interface IngredientInformationNutritionPropertiesInner {
  name: string;
  amount: number;
  unit: string;
}

interface SearchGroceryProductsByUPC200ResponseNutritionNutrientsInner {
  name: string;
  amount: number;
  unit: string;
  percentOfDailyNeeds: number;
}

export interface SearchGroceryProductsByUPC200ResponseNutritionCaloricBreakdown {
  percentProtein: number;
  percentFat: number;
  percentCarbs: number;
}

export interface GetShoppingList200ResponseAislesInnerItemsInnerMeasuresOriginal {
  amount: number;
  unit: string;
}

export interface IngredientInformationNutrition {
  nutrients: SearchGroceryProductsByUPC200ResponseNutritionNutrientsInner[];
  properties: IngredientInformationNutritionPropertiesInner[];
  caloricBreakdown: SearchGroceryProductsByUPC200ResponseNutritionCaloricBreakdown;
  weightPerServing: GetShoppingList200ResponseAislesInnerItemsInnerMeasuresOriginal;
}

export interface RecipeInformation {
  id: number;
  title: string;
  image: string | null;
  imageType?: string;
  servings: number;
  readyInMinutes: number;
  preparationMinutes?: number | null;
  cookingMinutes?: number | null;
  license?: string;
  sourceName: string;
  sourceUrl: string;
  spoonacularSourceUrl: string;
  aggregateLikes: number;
  healthScore: number;
  spoonacularScore: number;
  pricePerServing: number;
  analyzedInstructions: Array<any>;
  cheap: boolean;
  creditsText: string;
  cuisines: Array<string>;
  dairyFree: boolean;
  diets: Array<string>;
  gaps: string;
  glutenFree: boolean;
  instructions: string | null;
  lowFodmap: boolean;
  occasions: Array<string>;
  sustainable: boolean;
  vegan: boolean;
  vegetarian: boolean;
  veryHealthy: boolean;
  veryPopular: boolean;
  weightWatcherSmartPoints: number;
  dishTypes: Array<string>;
  extendedIngredients: RecipeInformationExtendedIngredientsInner[];
  summary: string;
  nutrition: IngredientInformationNutrition;
}
